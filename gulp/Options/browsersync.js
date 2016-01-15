import $ from '../configure.js';
import { argv } from 'yargs';

module.exports = {
  server: { baseDir: $.paths.root.app },
  port: argv.port || 3000,
  ghostMode: false,
  open: Boolean(argv.u)
    ? 'ui'
    : Boolean(argv.o)
      ? 'local'
      : false,
  browser: Boolean(argv.cross)
    ? ['google chrome', 'firefox', 'safari']
    : 'default',
  notify: false
};
