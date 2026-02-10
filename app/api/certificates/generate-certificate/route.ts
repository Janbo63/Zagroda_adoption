import { NextResponse } from 'next/server';
import { certificateGenerator } from '@/lib/certificate-generator';
import { emailService } from '@/lib/email-service';
import { zoho } from '@/lib/zoho';
import fs from 'fs';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const {
            adoptionId,
            adopterName,
            alpacaName,
            adoptionDate,
            tier,
            email,
            locale,
            zohoRecordId
        } = body;

        // Validate required fields
        if (!adoptionId || !adopterName || !alpacaName || !email) {
            return NextResponse.json(
                { error: 'Missing required fields' },
                { status: 400 }
            );
        }

        // 1. Generate PDF certificate
        console.log(`Generating certificate for ${adopterName} - ${alpacaName}`);
        const { filePath, publicUrl } = await certificateGenerator.generateCertificate({
            adoptionId,
            adopterName,
            alpacaName,
            adoptionDate: adoptionDate || new Date().toISOString().split('T')[0],
            tier: tier || 'bronze',
            locale: locale || 'en'
        });

        console.log(`Certificate generated at: ${filePath}`);

        // 2. Send email with certificate
        const emailSent = await emailService.sendCertificate({
            email,
            adopterName,
            alpacaName,
            pdfPath: filePath,
            locale: locale || 'en'
        });

        if (!emailSent) {
            console.error('Failed to send certificate email');
        }

        // 3. Upload to Zoho CRM (if zohoRecordId provided)
        if (zohoRecordId) {
            try {
                // Read PDF file as buffer
                const pdfBuffer = fs.readFileSync(filePath);

                // Upload attachment to Zoho
                await zoho.uploadCertificateAttachment(zohoRecordId, pdfBuffer, `${adoptionId}.pdf`);

                // Update adoption record with certificate info
                await zoho.updateAdoptionCertificate(
                    zohoRecordId,
                    publicUrl,
                    new Date().toISOString().split('T')[0]
                );

                console.log('Certificate info saved to Zoho CRM');
            } catch (zohoError) {
                console.error('Error updating Zoho CRM:', zohoError);
                // Don't fail the request if Zoho update fails
            }
        }

        return NextResponse.json({
            success: true,
            certificateUrl: publicUrl,
            emailSent,
            message: 'Certificate generated and sent successfully'
        });

    } catch (error: any) {
        console.error('Certificate generation error:', error);
        return NextResponse.json(
            { error: error.message || 'Failed to generate certificate' },
            { status: 500 }
        );
    }
}
