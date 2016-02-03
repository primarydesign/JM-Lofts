import units from '../../../src/assets/_data/units';
import configs from '../../configure';
import Path from 'path';
import fs from 'fs';

const $ = configs.paths;
const planImages = fs.readdirSync(`${$.img.src}/plans`);
const plans = {};
units.forEach(function(unit) {
  planImages.forEach(function(plan) {
    let planName = Path.basename(plan, '.svg');
    if (planName.search(unit.un) > -1) {
      plans[unit.un] = planName;
    }
  });
});

module.exports = plans;
