import Fs from 'fs';
import Path from 'path';
import reglob from './Library/reglob';

let user = JSON.parse(Fs.readFileSync(Path.resolve('.gulprc'), "utf8"));
user.paths = reglob(user.paths);

module.exports = user;
