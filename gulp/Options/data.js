import path from 'path';
module.exports = function(file) {
	return {
		filename: path.basename(file.path, '.html')
	}
}