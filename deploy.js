const fs = require('fs');
const client = require('scp2');
const env = require('./config');

const entryPath = 'dist';
const outputPath = '/opt/deploy/code/webapps/ROOT/app';
const deployPath = env.DEPLOY_PATH;
const userHome = process.env[(process.platform === 'win32') ? 'USERPROFILE' : 'HOME'];

const host = 'qvals-mng-starter-shop.dev.mango.com';
const pathPrivateKey = `${userHome}/.ssh/AmazonTests.ppk`;

client.scp(entryPath + deployPath, {
  host,
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
