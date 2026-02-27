/**
 * Email Service Utility
 * Sends adoption certificates via email
 */

import nodemailer from 'nodemailer';
import fs from 'fs';

export interface CertificateEmailData {
    email: string;
    adopterName: string;
    alpacaName: string;
    pdfPath: string;
    locale: 'en' | 'pl';
}

export interface VoucherEmailData {
    adminEmail: string;
    voucherCode: string;
    amount: number;
    currency: string;
    buyerName: string;
    buyerEmail: string;
    pdfPath: string;
}

export class EmailService {
    private transporter: nodemailer.Transporter;

    constructor() {
        // Configure SMTP transporter
        this.transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST || 'smtp.zoho.eu',
            port: parseInt(process.env.SMTP_PORT || '465'),
            secure: process.env.SMTP_SECURE === 'true' || true, // true for 465, false for other ports
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS,
            },
        });
    }

    /**
     * Send adoption certificate email
     */
    async sendCertificate(data: CertificateEmailData): Promise<boolean> {
        try {
            const { subject, html } = this.getEmailContent(data);

            const mailOptions = {
                from: process.env.EMAIL_FROM || 'Alpaca Farm <noreply@alpacafarm.com>',
                to: data.email,
                subject: subject,
                html: html,
                attachments: [
                    {
                        filename: `Adoption-Certificate-${data.alpacaName}.pdf`,
                        path: data.pdfPath,
                        contentType: 'application/pdf'
                    }
                ]
            };

            const info = await this.transporter.sendMail(mailOptions);
            console.log('Certificate email sent:', info.messageId);
            return true;
        } catch (error) {
            console.error('Error sending certificate email:', error);
            return false;
        }
    }

    /**
     * Send voucher to admin
     */
    async sendVoucherToAdmin(data: VoucherEmailData): Promise<boolean> {
        try {
            const subject = `🎫 New Voucher Order: ${data.voucherCode}`;
            const amountDisplay = `${data.amount / 100} ${data.currency}`;

            const html = `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                    <h1 style="color: #D97706;">New Voucher Purchased! 🎫</h1>
                    <div style="background-color: #f9fafb; padding: 20px; border-radius: 8px; border: 1px solid #e5e7eb;">
                        <p><strong>Buyer:</strong> ${data.buyerName} (<a href="mailto:${data.buyerEmail}">${data.buyerEmail}</a>)</p>
                        <p><strong>Amount:</strong> ${amountDisplay}</p>
                        <p><strong>Code:</strong> <code style="background: #fee2e2; padding: 4px 8px; border-radius: 4px; font-weight: bold;">${data.voucherCode}</code></p>
                    </div>
                    <p style="margin-top: 20px; line-height: 1.6;">
                        Please find the generated voucher PDF attached.<br>
                        <strong>Action Required:</strong> Review and forward this PDF to the buyer/recipient.
                    </p>
                </div>
            `;

            const mailOptions = {
                from: process.env.EMAIL_FROM || 'Alpaca Farm <noreply@alpacafarm.com>',
                to: data.adminEmail,
                subject: subject,
                html: html,
                attachments: [
                    {
                        filename: `Voucher-${data.voucherCode}.pdf`,
                        path: data.pdfPath,
                        contentType: 'application/pdf'
                    }
                ]
            };

            const info = await this.transporter.sendMail(mailOptions);
            console.log('Voucher email sent to admin:', info.messageId);
            return true;
        } catch (error) {
            console.error('Error sending voucher email:', error);
            return false;
        }
    }

    /**
     * Send system alert to admin
     */
    async sendAdminAlert(subject: string, message: string): Promise<boolean> {
        try {
            const html = `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                    <h1 style="color: #dc2626;">System Alert ⚠️</h1>
                    <div style="background-color: #fef2f2; padding: 20px; border-radius: 8px; border: 1px solid #fecaca; color: #991b1b;">
                        <pre style="white-space: pre-wrap; font-family: monospace; font-size: 14px;">${message}</pre>
                    </div>
                </div>
            `;

            const mailOptions = {
                from: process.env.EMAIL_FROM || 'Alpaca Farm <noreply@alpacafarm.com>',
                to: process.env.ADMIN_EMAIL || 'admin@zagrodaalpakoterapii.com',
                subject: `[SYSTEM ALERT] ${subject}`,
                html: html
            };

            const info = await this.transporter.sendMail(mailOptions);
            console.log('Admin alert email sent:', info.messageId);
            return true;
        } catch (error) {
            console.error('Error sending admin alert email:', error);
            return false;
        }
    }

    /**
     * Get localized email content
     */
    private getEmailContent(data: CertificateEmailData): { subject: string; html: string } {
        if (data.locale === 'pl') {
            return {
                subject: `🦙 Certyfikat Adopcji - ${data.alpacaName}`,
                html: this.getPolishEmailTemplate(data)
            };
        }

        return {
            subject: `🦙 Your Adoption Certificate - ${data.alpacaName}`,
            html: this.getEnglishEmailTemplate(data)
        };
    }

    /**
     * English email template
     */
    private getEnglishEmailTemplate(data: CertificateEmailData): string {
        return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Your Adoption Certificate</title>
</head>
<body style="margin: 0; padding: 0; font-family: 'Helvetica Neue', Arial, sans-serif; background-color: #f5f5f0;">
    <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f5f5f0; padding: 40px 20px;">
        <tr>
            <td align="center">
                <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
                    <!-- Header -->
                    <tr>
                        <td style="background: linear-gradient(135deg, #8B4513 0%, #D2691E 100%); padding: 40px; text-align: center; border-radius: 12px 12px 0 0;">
                            <h1 style="margin: 0; color: #ffffff; font-size: 32px; font-weight: bold;">🦙 Congratulations!</h1>
                        </td>
                    </tr>
                    
                    <!-- Content -->
                    <tr>
                        <td style="padding: 40px 40px 20px 40px;">
                            <h2 style="margin: 0 0 20px 0; color: #2C1810; font-size: 24px;">Dear ${data.adopterName},</h2>
                            <p style="margin: 0 0 20px 0; color: #5C4033; font-size: 16px; line-height: 1.6;">
                                Thank you for adopting <strong>${data.alpacaName}</strong>! Your support helps us care for our wonderful alpacas and maintain our farm.
                            </p>
                            <p style="margin: 0 0 20px 0; color: #5C4033; font-size: 16px; line-height: 1.6;">
                                Please find your <strong>official adoption certificate</strong> attached to this email. You can print it, frame it, or share it with your friends and family!
                            </p>
                            
                            <!-- Certificate Note -->
                            <div style="background-color: #FFF8DC; border-left: 4px solid #D4AF37; padding: 15px; margin: 20px 0; border-radius: 4px;">
                                <p style="margin: 0; color: #5C4033; font-size: 14px; line-height: 1.5;">
                                    <strong>📄 Your certificate is attached as a PDF file.</strong><br>
                                    You can download it, print it, and display it proudly!
                                </p>
                            </div>
                            
                            <p style="margin: 20px 0; color: #5C4033; font-size: 16px; line-height: 1.6;">
                                We look forward to welcoming you to the farm to meet ${data.alpacaName} in person!
                            </p>
                        </td>
                    </tr>
                    
                    <!-- CTA Button -->
                    <tr>
                        <td style="padding: 0 40px 40px 40px; text-align: center;">
                            <a href="${process.env.NEXT_PUBLIC_BASE_URL || 'https://alpacafarm.com'}/adoptions" 
                               style="display: inline-block; background: linear-gradient(135deg, #8B4513 0%, #D2691E 100%); color: #ffffff; text-decoration: none; padding: 15px 40px; border-radius: 8px; font-size: 16px; font-weight: bold; margin-top: 10px;">
                                Visit Our Farm
                            </a>
                        </td>
                    </tr>
                    
                    <!-- Footer -->
                    <tr>
                        <td style="background-color: #f9f9f9; padding: 30px 40px; text-align: center; border-radius: 0 0 12px 12px; border-top: 1px solid #e0e0e0;">
                            <p style="margin: 0 0 10px 0; color: #888; font-size: 14px;">
                                With warmest regards,<br>
                                <strong style="color: #5C4033;">The Alpaca Farm Team</strong>
                            </p>
                            <p style="margin: 10px 0 0 0; color: #aaa; font-size: 12px;">
                                If you have any questions, please contact us at info@alpacafarm.com
                            </p>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>
</html>
        `;
    }

    /**
     * Polish email template
     */
    private getPolishEmailTemplate(data: CertificateEmailData): string {
        return `
<!DOCTYPE html>
<html lang="pl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Twój Certyfikat Adopcji</title>
</head>
<body style="margin: 0; padding: 0; font-family: 'Helvetica Neue', Arial, sans-serif; background-color: #f5f5f0;">
    <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f5f5f0; padding: 40px 20px;">
        <tr>
            <td align="center">
                <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
                    <!-- Header -->
                    <tr>
                        <td style="background: linear-gradient(135deg, #8B4513 0%, #D2691E 100%); padding: 40px; text-align: center; border-radius: 12px 12px 0 0;">
                            <h1 style="margin: 0; color: #ffffff; font-size: 32px; font-weight: bold;">🦙 Gratulacje!</h1>
                        </td>
                    </tr>
                    
                    <!-- Content -->
                    <tr>
                        <td style="padding: 40px 40px 20px 40px;">
                            <h2 style="margin: 0 0 20px 0; color: #2C1810; font-size: 24px;">Drogi/a ${data.adopterName},</h2>
                            <p style="margin: 0 0 20px 0; color: #5C4033; font-size: 16px; line-height: 1.6;">
                                Dziękujemy za adopcję <strong>${data.alpacaName}</strong>! Twoje wsparcie pomaga nam dbać o nasze wspaniałe alpaki i utrzymywać naszą farmę.
                            </p>
                            <p style="margin: 0 0 20px 0; color: #5C4033; font-size: 16px; line-height: 1.6;">
                                W załączniku znajdziesz <strong>oficjalny certyfikat adopcji</strong>. Możesz go wydrukować, oprawić lub podzielić się nim ze znajomymi i rodziną!
                            </p>
                            
                            <!-- Certificate Note -->
                            <div style="background-color: #FFF8DC; border-left: 4px solid #D4AF37; padding: 15px; margin: 20px 0; border-radius: 4px;">
                                <p style="margin: 0; color: #5C4033; font-size: 14px; line-height: 1.5;">
                                    <strong>📄 Twój certyfikat jest załączony jako plik PDF.</strong><br>
                                    Możesz go pobrać, wydrukować i dumnie wyświetlić!
                                </p>
                            </div>
                            
                            <p style="margin: 20px 0; color: #5C4033; font-size: 16px; line-height: 1.6;">
                                Czekamy na Ciebie na farmie, aby osobiście poznać ${data.alpacaName}!
                            </p>
                        </td>
                    </tr>
                    
                    <!-- CTA Button -->
                    <tr>
                        <td style="padding: 0 40px 40px 40px; text-align: center;">
                            <a href="${process.env.NEXT_PUBLIC_BASE_URL || 'https://alpacafarm.com'}/pl/adoptions" 
                               style="display: inline-block; background: linear-gradient(135deg, #8B4513 0%, #D2691E 100%); color: #ffffff; text-decoration: none; padding: 15px 40px; border-radius: 8px; font-size: 16px; font-weight: bold; margin-top: 10px;">
                                Odwiedź Naszą Farmę
                            </a>
                        </td>
                    </tr>
                    
                    <!-- Footer -->
                    <tr>
                        <td style="background-color: #f9f9f9; padding: 30px 40px; text-align: center; border-radius: 0 0 12px 12px; border-top: 1px solid #e0e0e0;">
                            <p style="margin: 0 0 10px 0; color: #888; font-size: 14px;">
                                Z serdecznymi pozdrowieniami,<br>
                                <strong style="color: #5C4033;">Zespół Farmy Alpak</strong>
                            </p>
                            <p style="margin: 10px 0 0 0; color: #aaa; font-size: 12px;">
                                W razie pytań skontaktuj się z nami pod adresem info@alpacafarm.com
                            </p>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>
</html>
        `;
    }

    /**
     * Verify SMTP connection
     */
    async verifyConnection(): Promise<boolean> {
        try {
            await this.transporter.verify();
            console.log('SMTP server connection verified');
            return true;
        } catch (error) {
            console.error('SMTP connection verification failed:', error);
            return false;
        }
    }
}

export const emailService = new EmailService();
