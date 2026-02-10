/**
 * Voucher Generator Utility
 * Generates personalized gift vouchers as PDFs
 */

import PDFDocument from 'pdfkit';
import fs from 'fs';
import path from 'path';

export interface VoucherPDFData {
    code: string;
    amount: number;
    currency: 'EUR' | 'PLN';
    buyerName: string;
    recipientName?: string;
    personalMessage?: string;
    expiryDate: string;
}

export class VoucherGenerator {
    private outputDir: string;
    private logoPath: string;

    constructor() {
        // Output directory for generated vouchers
        this.outputDir = process.env.VOUCHER_STORAGE_PATH || path.join(process.cwd(), 'public', 'vouchers');
        this.logoPath = path.join(process.cwd(), 'public', 'images', 'zagrodanewlogo.png');

        // Ensure output directory exists
        if (!fs.existsSync(this.outputDir)) {
            fs.mkdirSync(this.outputDir, { recursive: true });
        }
    }

    /**
     * Generate a personalized voucher PDF
     */
    async generateVoucher(data: VoucherPDFData): Promise<{ filePath: string; fileName: string }> {
        const fileName = `Voucher-${data.code}.pdf`;
        const filePath = path.join(this.outputDir, fileName);

        // Create PDF document (A5 Landscape: 595.28 x 419.53 points)
        const doc = new PDFDocument({
            size: 'A5',
            layout: 'landscape',
            margins: { top: 40, bottom: 40, left: 40, right: 40 }
        });

        // Pipe to file
        const stream = fs.createWriteStream(filePath);
        doc.pipe(stream);

        // --- Background & Border ---
        const width = doc.page.width;
        const height = doc.page.height;

        // Light cream background
        doc.rect(0, 0, width, height).fill('#FFFBF0');

        // Ornamental border
        doc.rect(20, 20, width - 40, height - 40)
            .lineWidth(2)
            .stroke('#D97706'); // Orange-600

        doc.rect(25, 25, width - 50, height - 50)
            .lineWidth(1)
            .stroke('#FCD34D'); // Amber-300

        // --- Design Elements ---

        // Logo (if exists)
        if (fs.existsSync(this.logoPath)) {
            doc.image(this.logoPath, width / 2 - 30, 45, { width: 60 });
        }

        // Title
        doc.moveDown(4);
        doc.font('Helvetica-Bold')
            .fontSize(24)
            .fillColor('#78350F') // Amber-900
            .text('ZAGRODA ALPAKOTERAPII', { align: 'center' });

        doc.font('Helvetica')
            .fontSize(10)
            .text('Alpaca Therapy Farm', { align: 'center', characterSpacing: 2 });

        doc.moveDown();

        // "GIFT VOUCHER"
        doc.font('Helvetica-Bold')
            .fontSize(16)
            .fillColor('#D97706') // Orange-600
            .text('GIFT VOUCHER', { align: 'center', characterSpacing: 4 });

        // --- Value Section ---
        const amountDisplay = `${data.amount / 100} ${data.currency === 'EUR' ? '€' : 'zł'}`;

        doc.moveDown();
        doc.font('Helvetica-Bold')
            .fontSize(48)
            .fillColor('#78350F')
            .text(amountDisplay, { align: 'center' });

        // --- Details Section ---
        doc.moveDown();

        // To / From
        const startY = doc.y;

        doc.font('Helvetica-Bold').fontSize(12).fillColor('#4B5563').text('To:', 60, startY);
        doc.font('Helvetica').text(data.recipientName || 'You', 90, startY);

        doc.font('Helvetica-Bold').text('From:', 350, startY);
        doc.font('Helvetica').text(data.buyerName, 400, startY);

        // Message (if exists)
        if (data.personalMessage) {
            doc.moveDown();
            doc.font('Helvetica-Oblique')
                .fontSize(11)
                .fillColor('#4B5563')
                .text(`"${data.personalMessage}"`, 60, doc.y, {
                    align: 'center',
                    width: width - 120
                });
        }

        // --- Footer / Code ---
        const bottomY = height - 100;

        // Voucher Code Box
        doc.rect(width / 2 - 100, bottomY, 200, 30)
            .lineWidth(1)
            .stroke('#D97706');

        doc.fontSize(14)
            .font('Courier-Bold')
            .fillColor('#000000')
            .text(data.code, 0, bottomY + 8, { align: 'center', width: width });

        // Valid until
        doc.fontSize(9)
            .font('Helvetica')
            .fillColor('#6B7280')
            .text(`Valid until: ${data.expiryDate}`, 0, bottomY + 36, { align: 'center', width: width });

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

export const voucherGenerator = new VoucherGenerator();
