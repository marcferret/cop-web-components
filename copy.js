const fs = require('fs');
const { ncp } = require('ncp');

// Dotenv configuration
const envPath = (fs.existsSync('.env')) ? '.env' : '.env.default';
require('dotenv').config({ path: envPath });

const source = 'dist';
const destination = process.env.COPY_DESTINATION_PATH;

ncp.limit = 16;
ncp(source, destination, (err) => {
  if (err) {
    return console.error(err);
  }
  console.log('\n---------');
  console.log('COPY DONE');
  console.log('---------\n');
  return true;
});
