import configs from '../configure';
import direque from 'require-dir';
import Path from 'path';
import _ from 'lodash';

const $ = configs.paths;

module.exports = function() {
  const custom = direque('../swig', {recurse: true});
  const locals = Boolean($.data) ? direque(Path.resolve($.data.src)) : {};
  let options = {};

  options.setup = function(swig) {
    swig.setDefaults({
      cache: false,
      locals: _.assign(locals, {fn: custom.locals}),
      loader: swig.loaders.fs(Path.resolve($.pages.temp))
    });
    if (custom.filters) {
      var filter, filters = Object.keys(custom.filters);
      if (filters.length > 0) {
        for (let i = 0; i < filters.length; i++) {
          if (filters[i].search('_') === 0) continue;
          filter = custom.filters[filters[i]];
          swig.setFilter(filters[i], custom.filters[filters[i]]);
        }
      }
    }
    if (custom.tags) {
      var tag, tags = Object.keys(custom.tags);
      if (tags.length > 0) {
        for (let i = 0; i < tags.length; i++) {
          if (tags[i].search('_') === 0) continue;
          tag = custom.tags[tags[i]];
          swig.setTag(tags[i], tag.parse, tag.compile, tag.ends, tag.blockLevel);
        }
      }
    }
  };
  return options;
}
