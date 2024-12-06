const fs = require('fs-extra');
const path = require('path');

async function copyPublicToStandalone() {
    try {
        const source = path.join(process.cwd(), 'public');
        const dest = path.join(process.cwd(), '.next', 'standalone', 'public');
        
        console.log('Copying public directory to standalone...');
        await fs.copy(source, dest);
        console.log('Successfully copied public directory');
    } catch (err) {
        console.error('Error copying public directory:', err);
        process.exit(1);
    }
}

copyPublicToStandalone();
