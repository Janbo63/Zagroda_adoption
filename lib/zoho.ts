/**
 * Zoho CRM Utility
 * Handles authentication and communication with Zoho CRM API
 */

interface ZohoTokens {
    access_token: string;
    api_domain: string;
    token_type: string;
    expires_in: number;
}

export class ZohoCRM {
    private clientId: string;
    private clientSecret: string;
    private refreshToken: string;
    private accessToken: string | null = null;
    private apiDomain: string = 'https://www.zohoapis.eu'; // Default to EU, can be adjusted

    constructor() {
        this.clientId = process.env.ZOHO_CLIENT_ID || '';
        this.clientSecret = process.env.ZOHO_CLIENT_SECRET || '';
        this.refreshToken = process.env.ZOHO_REFRESH_TOKEN || '';
    }

    /**
     * Refresh the access token using the refresh token
     */
    private async refreshAccessToken(): Promise<void> {
        if (!this.clientId || !this.clientSecret || !this.refreshToken) {
            throw new Error('Missing Zoho API credentials in environment variables');
        }

        const url = `https://accounts.zoho.eu/oauth/v2/token?refresh_token=${this.refreshToken}&client_id=${this.clientId}&client_secret=${this.clientSecret}&grant_type=refresh_token`;

        const response = await fetch(url, { method: 'POST' });
        const data = await response.json() as ZohoTokens;

        if (data.access_token) {
            this.accessToken = data.access_token;
            if (data.api_domain) {
                this.apiDomain = data.api_domain;
            }
        } else {
            throw new Error(`Failed to refresh Zoho access token: ${JSON.stringify(data)}`);
        }
    }

    /**
     * Standardized request method with automatic token refresh
     */
    public async request(endpoint: string, options: RequestInit = {}): Promise<any> {
        if (!this.accessToken) {
            await this.refreshAccessToken();
        }

        const url = `${this.apiDomain}/crm/v3/${endpoint}`;
        const headers = {
            ...options.headers,
            'Authorization': `Zoho-oauthtoken ${this.accessToken}`,
            'Content-Type': 'application/json',
        };

        let response = await fetch(url, { ...options, headers });

        // If unauthorized, token might have expired, try once more after refresh
        if (response.status === 401) {
            await this.refreshAccessToken();
            response = await fetch(url, {
                ...options,
                headers: {
                    ...headers,
                    'Authorization': `Zoho-oauthtoken ${this.accessToken}`
                }
            });
        }

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(`Zoho API Error (${response.status}): ${JSON.stringify(errorData)}`);
        }

        return await response.json();
    }

    /**
     * Create a record in a specific module
     */
    public async createRecord(moduleName: string, data: any): Promise<any> {
        return this.request(moduleName, {
            method: 'POST',
            body: JSON.stringify({ data: [data] }),
        });
    }

    /**
     * Update a record in a specific module
     */
    public async updateRecord(moduleName: string, recordId: string, data: any): Promise<any> {
        return this.request(`${moduleName}/${recordId}`, {
            method: 'PUT',
            body: JSON.stringify({ data: [data] }),
        });
    }

    /**
     * Search for a record based on criteria
     */
    public async searchRecord(moduleName: string, criteria: string): Promise<any> {
        return this.request(`${moduleName}/search?criteria=${encodeURIComponent(criteria)}`);
    }

    /**
     * Create or find a Contact in Zoho CRM
     * Returns the Contact ID
     */
    public async createOrFindContact(data: {
        email: string;
        firstName?: string;
        lastName?: string;
        phone?: string;
    }): Promise<string | null> {
        try {
            // Search for existing contact by email
            const searchResult = await this.searchRecord('Contacts', `(Email:equals:${data.email})`);

            if (searchResult.data && searchResult.data.length > 0) {
                console.log(`Found existing contact for ${data.email}`);
                return searchResult.data[0].id;
            }

            // Create new contact if not found
            const contactData: any = {
                Email: data.email,
            };

            if (data.firstName) contactData.First_Name = data.firstName;
            if (data.lastName) contactData.Last_Name = data.lastName;
            if (data.phone) contactData.Phone = data.phone;

            const createResult = await this.createRecord('Contacts', contactData);

            if (createResult.data && createResult.data[0].details.id) {
                console.log(`Created new contact for ${data.email}`);
                return createResult.data[0].details.id;
            }

            return null;
        } catch (error) {
            console.error('Error creating/finding contact:', error);
            return null;
        }
    }

    /**
     * Specialized: Find Adoption by Stripe Session ID
     */
    public async findAdoptionBySessionId(sessionId: string) {
        try {
            const response = await this.searchRecord('Adoptions', `(Stripe_Session_ID:equals:${sessionId})`);
            return response.data?.[0];
        } catch (error) {
            console.error('Error finding adoption by session ID:', error);
            return null;
        }
    }

    /**
     * Specialized: Sync Adoption to Zoho
     */
    public async syncAdoption(data: {
        email: string;
        alpaca: string;
        tier: string;
        amount: number;
        status: string;
        stripeSessionId: string;
        campaign?: string;
        firstName?: string;
        lastName?: string;
        phone?: string;
    }) {
        // Create or find contact
        const contactId = await this.createOrFindContact({
            email: data.email,
            firstName: data.firstName,
            lastName: data.lastName,
            phone: data.phone
        });

        const recordData: any = {
            "Name": `Adoption - ${data.alpaca}`,
            "Email": data.email,
            "Alpaca": data.alpaca,
            "Tier": data.tier,
            "Amount_Paid": data.amount / 100,
            "Status": data.status,
            "Stripe_Session_ID": data.stripeSessionId,
            "Date_Started": new Date().toISOString().split('T')[0]
        };

        // Link to contact if found/created
        if (contactId) {
            recordData.Client = contactId;
        }

        return this.createRecord('Adoptions', recordData);
    }

    /**
     * Specialized: Sync Voucher to Zoho
     */
    public async syncVoucher(data: {
        code: string;
        amount: number;
        currency: string;
        status: string;
        buyerEmail: string;
        buyerFirstName?: string;
        buyerLastName?: string;
        recipientName?: string;
        expirationDate: string;
        phone?: string;
    }) {
        // Create or find contact for buyer
        const contactId = await this.createOrFindContact({
            email: data.buyerEmail,
            firstName: data.buyerFirstName,
            lastName: data.buyerLastName,
            phone: data.phone
        });

        const recordData: any = {
            "Email": data.buyerEmail,
            "Recipient_Name": data.recipientName || "",
            "Expiration_Date": data.expirationDate,
            "Status": data.status,
            "Description": `Voucher Code: ${data.code}`
        };

        // Link to contact if found/created
        if (contactId) {
            recordData.Buyer = contactId;
        }

        return this.createRecord('Vouchers', recordData);
    }
}

export const zoho = new ZohoCRM();
