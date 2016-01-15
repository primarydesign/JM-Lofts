import configs from '../../configure';
import Path from 'path';

const build = configs.paths.root.build;
module.exports = function(path) {
	let trim = path.replace(/$\.\//g, '');
	let build = Path.resolve(configs.paths.root.build);
	return path;
}
