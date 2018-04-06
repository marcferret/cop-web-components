const fs = require('fs');
const client = require('scp2');
const result = require('dotenv').config();
const entryPath = `${process.env.PATH_WORKSPACES}${process.env.BRANCH_NAME}/WebRoot/app/`;
const outputPath = '/opt/deploy/code/webapps/ROOT/app/';
const specificsPath = `${process.env.CONTEXT}/${process.env.DEVICE}/${process.env.SPECIFICS_NAME}/`;

if (result.error) {
  throw result.error;
}

client.scp(entryPath + specificsPath, {
  host: process.env.HOST,
  username: 'code',
  privateKey: fs.readFileSync(process.env.PATH_PRIVATE_KEY),
  path: outputPath + specificsPath,
}, (err) => {
  if (typeof err !== 'undefined') {
    return console.log(err);
  }
  return console.log('Deploy success!');
});
