var fs = require('fs');
var client = require('scp2');
var result = require('dotenv').config();
var entryPath = process.env.PATH_WORKSPACES + process.env.BRANCH_NAME + '/WebRoot/static/';
var outputPath = '/opt/deploy/code/webapps/ROOT/app/';
var specificsPath = process.env.CONTEXT + '/' + process.env.DEVICE + '/specifics/' + process.env.SPECIFICS_NAME + '/';

if (result.error) {
  throw result.error;
}

client.scp(entryPath + specificsPath, {
  host: process.env.HOST,
  username: 'code',
  privateKey: fs.readFileSync(process.env.PATH_PRIVATE_KEY),
  path: outputPath + specificsPath
}, function (err) {
  if (typeof err !== 'undefined') {
    return console.log(err);
  }
  return console.log('Deploy success!');
});
