/**
 * Adoption Certificate Generator Utility
 * Generates personalized adoption certificates as PDFs
 */

import PDFDocument from 'pdfkit';
import fs from 'fs';
import path from 'path';

export interface AdoptionPDFData {
    adoptionId: string;
    alpacaName: string;
    customerName: string;
    tier: string;
    startDate: string;
}

export class AdoptionGenerator {
    private outputDir: string;
    private logoPath: string;

    constructor() {
        // Output directory for generated certificates
        this.outputDir = process.env.CERTIFICATE_STORAGE_PATH || path.join(process.cwd(), 'public', 'certificates');
        this.logoPath = path.join(process.cwd(), 'public', 'images', 'zagrodanewlogo.png');

        // Ensure output directory exists
        if (!fs.existsSync(this.outputDir)) {
            fs.mkdirSync(this.outputDir, { recursive: true });
        }
    }

    /**
     * Generate a personalized adoption certificate PDF
     */
    async generateCertificate(data: AdoptionPDFData): Promise<{ filePath: string; fileName: string }> {
        const fileName = `Certificate-${data.adoptionId}.pdf`;
        const filePath = path.join(this.outputDir, fileName);

        // Create PDF document (A4 Landscape)
        const doc = new PDFDocument({
            size: 'A4',
            layout: 'landscape',
            margins: { top: 50, bottom: 50, left: 50, right: 50 }
        });

        // Pipe to file
        const stream = fs.createWriteStream(filePath);
        doc.pipe(stream);

        // --- Background & Border ---
        const width = doc.page.width;
        const height = doc.page.height;

        // Light parchment background
        doc.rect(0, 0, width, height).fill('#FFFBF0');

        // Elegant double border
        doc.rect(20, 20, width - 40, height - 40)
            .lineWidth(3)
            .stroke('#78350F'); // Amber-900

        doc.rect(30, 30, width - 60, height - 60)
            .lineWidth(1)
            .stroke('#D97706'); // Orange-600

        // --- Header Section ---

        // Logo
        if (fs.existsSync(this.logoPath)) {
            doc.image(this.logoPath, width / 2 - 40, 50, { width: 80 });
        }

        doc.moveDown(6);

        // "CERTIFICATE OF ADOPTION"
        doc.font('Helvetica-Bold')
            .fontSize(32)
            .fillColor('#78350F')
            .text('CERTIFICATE OF ADOPTION', { align: 'center', characterSpacing: 2 });

        doc.moveDown(0.5);

        doc.font('Helvetica')
            .fontSize(14)
            .fillColor('#4B5563') // Gray-600
            .text('This certifies that', { align: 'center' });

        doc.moveDown(1);

        // Customer Name
        doc.font('Helvetica-Bold')
            .fontSize(36)
            .fillColor('#000000')
            .text(data.customerName, { align: 'center' });

        doc.moveDown(1);

        doc.font('Helvetica')
            .fontSize(14)
            .fillColor('#4B5563')
            .text('Has officially adopted', { align: 'center' });

        doc.moveDown(1);

        // Alpaca Name & Image Placeholder Logic (if we had images)
        doc.font('Helvetica-Bold')
            .fontSize(42)
            .fillColor('#D97706') // Orange-600
            .text(data.alpacaName, { align: 'center' });

        doc.moveDown(0.5);

        doc.font('Helvetica-Oblique')
            .fontSize(16)
            .fillColor('#78350F')
            .text(`${data.tier} Package`, { align: 'center' });

        // --- Footer Section ---
        const bottomY = height - 120;

        doc.fontSize(12)
            .font('Helvetica')
            .fillColor('#4B5563')
            .text(`Adoption Date: ${data.startDate}`, 0, bottomY, { align: 'center', width: width });

        doc.moveDown(2);

        doc.fontSize(10)
            .text('Values valid for one year from date of adoption.', { align: 'center' });

        doc.text('Zagroda Alpakoterapii', { align: 'center' });

        // Finalize PDF
        doc.end();

        // Wait for file to be written
        await new Promise((resolve, reject) => {
            stream.on('finish', resolve);
            stream.on('error', reject);
        });

        return { filePath, fileName };
    }
}

export const adoptionGenerator = new AdoptionGenerator();
