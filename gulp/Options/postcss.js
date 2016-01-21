import direque from 'require-dir';
/**
 * PEFORMATIVE ROLES
 * * importing
 * * aliasing
 * * interpolating
 * * transforming
 * * optimizing
 */
import imports from 'postcss-import';
/* aliasing */
import media_custom from "postcss-custom-media";
import selectors from 'postcss-custom-selectors';
import easings from 'postcss-easings';
import magician from 'postcss-font-magician';
import media_minmax from 'postcss-media-minmax';
import size from 'postcss-short-size';
import spacing from 'postcss-short-spacing';
/* interpolating */
import mixins from 'postcss-mixins';
import variables from 'postcss-simple-vars';
import functions from 'postcss-functions';
import nested from 'postcss-nested';
import extend from 'postcss-extend';
import lookup from 'postcss-property-lookup';
import root from 'postcss-atroot';
/* transforming */
import color_alpha from 'postcss-color-alpha';
import color_mix from 'postcss-color-mix';
import time_machine from 'postcss-time-machine';
/* optimizing */
import doiuse from 'doiuse';
import focus from 'postcss-focus';
import matches from "postcss-selector-matches";
import not from "postcss-selector-not";
import autoprefixer from 'autoprefixer';
import mqpacker from "css-mqpacker";
/* logistic */
import reporter from 'postcss-reporter';

module.exports = [
  imports({
    glob: true
  }),
  media_custom,
  selectors,
  time_machine,
  color_alpha,
  color_mix,
  easings,
  magician,
  media_minmax,
  size,
  spacing,
  mixins,
  variables,
  functions({
    functions: direque('../postcss/')
  }),
  nested,
  extend,
  lookup,
  root,
  matches,
  not,
  autoprefixer({browsers: ['ie >= 9', 'last 4 versions']}),
  mqpacker,
  reporter({clearMessages: true})
];
