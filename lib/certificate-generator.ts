/**
 * Certificate Generator Utility
 * Generates personalized adoption certificates as PDFs
 */

import PDFDocument from 'pdfkit';
import fs from 'fs';
import path from 'path';

export interface CertificateData {
    adoptionId: string;
    adopterName: string;
    alpacaName: string;
    adoptionDate: string;
    tier: 'bronze' | 'silver' | 'gold';
    locale: 'en' | 'pl';
}

export class CertificateGenerator {
    private certificateTemplatePath: string;
    private outputDir: string;

    constructor() {
        // Path to existing certificate background image
        this.certificateTemplatePath = path.join(process.cwd(), 'public', 'images', 'adoption', 'certificate.png');

        // Output directory for generated certificates
        this.outputDir = process.env.CERTIFICATE_STORAGE_PATH || path.join(process.cwd(), 'public', 'certificates');

        // Ensure output directory exists
        if (!fs.existsSync(this.outputDir)) {
            fs.mkdirSync(this.outputDir, { recursive: true });
        }
    }

    /**
     * Generate a personalized certificate PDF
     */
    async generateCertificate(data: CertificateData): Promise<{ filePath: string; publicUrl: string }> {
        const fileName = `${data.adoptionId}.pdf`;
        const filePath = path.join(this.outputDir, fileName);

        // Create PDF document (A4 landscape to match certificate design)
        const doc = new PDFDocument({
            size: [842, 595], // A4 landscape in points
            margins: { top: 0, bottom: 0, left: 0, right: 0 }
        });

        // Pipe to file
        const stream = fs.createWriteStream(filePath);
        doc.pipe(stream);

        // Add certificate background image
        if (fs.existsSync(this.certificateTemplatePath)) {
            doc.image(this.certificateTemplatePath, 0, 0, { width: 842, height: 595 });
        } else {
            console.warn('Certificate template not found, generating text-only certificate');
        }

        // Get localized text
        const text = this.getLocalizedText(data.locale);

        // Add personalized text overlays
        // Note: These positions are estimates and may need fine-tuning based on your actual certificate design

        // Adopter's name - center, large and bold
        doc.fontSize(32)
            .font('Helvetica-Bold')
            .fillColor('#2C1810') // Dark brown
            .text(data.adopterName.toUpperCase(), 50, 280, {
                width: 742,
                align: 'center'
            });

        // "has proudly adopted an alpaca on this day" text
        doc.fontSize(16)
            .font('Helvetica-Oblique')
            .fillColor('#5C4033')
            .text(text.adoptedText, 50, 330, {
                width: 742,
                align: 'center'
            });

        // Adoption date
        const formattedDate = this.formatDate(data.adoptionDate, data.locale);
        doc.fontSize(16)
            .font('Helvetica-Oblique')
            .text(formattedDate, 50, 355, {
                width: 742,
                align: 'center'
            });

        // Alpaca name
        doc.fontSize(20)
            .font('Helvetica-Bold')
            .fillColor('#2C1810')
            .text(`${text.alpacaNameLabel}: ${data.alpacaName}`, 50, 390, {
                width: 742,
                align: 'center'
            });

        // Adoption ID
        doc.fontSize(14)
            .font('Helvetica')
            .fillColor('#5C4033')
            .text(`${text.adoptionIdLabel}: ${data.adoptionId}`, 50, 425, {
                width: 742,
                align: 'center'
            });

        // Tier badge (optional enhancement)
        if (data.tier === 'gold') {
            doc.fontSize(12)
                .font('Helvetica-Bold')
                .fillColor('#D4AF37') // Gold color
                .text('★ GOLD TIER ★', 50, 460, {
                    width: 742,
                    align: 'center'
                });
        }

        // Finalize PDF
        doc.end();

        // Wait for file to be written
        await new Promise((resolve, reject) => {
            stream.on('finish', resolve);
            stream.on('error', reject);
        });

        // Generate public URL
        const publicUrl = this.getPublicUrl(fileName);

        return { filePath, publicUrl };
    }

    /**
     * Get localized text based on locale
     */
    private getLocalizedText(locale: 'en' | 'pl') {
        const texts = {
            en: {
                adoptedText: 'has proudly adopted an alpaca on this day,',
                alpacaNameLabel: 'Alpaca Name',
                adoptionIdLabel: 'Adoption ID'
            },
            pl: {
                adoptedText: 'z dumą adoptował alpakę w dniu',
                alpacaNameLabel: 'Imię Alpaki',
                adoptionIdLabel: 'ID Adopcji'
            }
        };

        return texts[locale] || texts.en;
    }

    /**
     * Format date based on locale
     */
    private formatDate(dateString: string, locale: 'en' | 'pl'): string {
        const date = new Date(dateString);

        if (locale === 'pl') {
            return date.toLocaleDateString('pl-PL', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            });
        }

        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    }

    /**
     * Generate public URL for certificate
     */
    private getPublicUrl(fileName: string): string {
        const baseUrl = process.env.CERTIFICATE_PUBLIC_URL || process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
        return `${baseUrl}/certificates/${fileName}`;
    }

    /**
     * Delete a certificate file
     */
    async deleteCertificate(adoptionId: string): Promise<boolean> {
        const fileName = `${adoptionId}.pdf`;
        const filePath = path.join(this.outputDir, fileName);

        try {
            if (fs.existsSync(filePath)) {
                fs.unlinkSync(filePath);
                return true;
            }
            return false;
        } catch (error) {
            console.error('Error deleting certificate:', error);
            return false;
        }
    }
}

export const certificateGenerator = new CertificateGenerator();
