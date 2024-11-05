const fs = require('fs');
const path = require('path');

// Create a .next directory if it doesn't exist
const nextDir = path.join(process.cwd(), '.next');
if (!fs.existsSync(nextDir)) {
  fs.mkdirSync(nextDir);
}

// Create a build-manifest.json file
const manifest = {
  pages: {},
  buildId: new Date().getTime().toString()
};

fs.writeFileSync(
  path.join(nextDir, 'build-manifest.json'),
  JSON.stringify(manifest, null, 2)
); 