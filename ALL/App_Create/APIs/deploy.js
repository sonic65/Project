var request = require('superagent');
var host = require('../host/host.js')

deploy =  (host+'/k/v1/preview/app/deploy.json');

module.exports = deploy;
