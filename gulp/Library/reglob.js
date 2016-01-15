import Path from 'path';

module.exports = function(Paths) {
  Object.keys(Paths).map(function(key) {
    Object.keys(Paths[key]).map(function(subkey) {
      if (subkey !== 'src') {
        Paths[key][subkey] = interpolate(Paths[key][subkey], Paths[key]['src']);
      }
    });
    if (Paths[key].hasOwnProperty('globs') && !Paths[key].hasOwnProperty('watch')) {
      Paths[key].watch = Paths[key].globs;
    }
  });
  return Paths;
}

function interpolate(input, src) {
  if (Array.isArray(input)) {
    for(let i = 0; i < input.length; i++) {
      input[i] = interpolate(input[i], src);
    }
    return input;
  } else {
    if (!src.endsWith('/')) src += '/';
    return input.replace('~/', src);
  }
}
