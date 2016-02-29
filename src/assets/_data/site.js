var argv = require('yargs').argv;

module.exports.url = Boolean(argv.production)
 ? "http://jmlofts.com"
 : Boolean(argv.staging)
 ? "http://primaryman.com/jm-lofts"
 : Boolean(argv.refactor)
 ? "http://primaryman.com/jm-lofts/refactor"
 : "http://localhost:3000";

// console.log(module.exports.url);
