const fs = require('fs');
const client = require('scp2');

// Dotenv configuration
const envPath = (fs.existsSync('.env')) ? '.env' : '.env.default';
require('dotenv').config({ path: envPath });

const entryPath = 'dist';
const outputPath = '/opt/deploy/code/webapps/ROOT/app';
const deployPath = process.env.DEPLOY_PATH;
const userHome = process.env[(process.platform === 'win32') ? 'USERPROFILE' : 'HOME'];
const pathPrivateKey = `${userHome}/.ssh/AmazonTests.ppk`;

client.scp(entryPath + deployPath, {
  host: process.env.DEPLOY_HOST,
  username: 'code',
  privateKey: fs.readFileSync(pathPrivateKey),
  path: outputPath + deployPath,
}, (err) => {
  if (typeof err !== 'undefined') {
    console.log(err);
    return false;
  }

  console.log('\n--------------');
  console.log('DEPLOY SUCCESS');
  console.log('--------------\n');
  return true;
});
