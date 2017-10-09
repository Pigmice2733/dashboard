const Spike = require('spike-core')

const jsStandards = require('spike-js-standards')
const cssStandards = require('spike-css-standards')
const htmlStandards = require('reshape-standard')
const preactPreset = require('babel-preset-preact')
const sugarss = require('sugarss')
const sugarml = require('sugarml')

const spikeConfig = {
  root: __dirname,
  matchers: { html: '*(**/)*.sgr', css: '*(**/)*.sss' },
  ignore: [
    'components/*/*.sss',
    'build.js',
    'spike.js',
    'main.js',
    'dist/**/*'
  ],
  entry: { index: './index' },
  server: { open: false },
  babel: jsStandards({ appendPresets: preactPreset }),
  postcss: cssStandards({
    parser: sugarss,
    minify: true,
    warnForDuplicates: false
  }),
  reshape: htmlStandards({ parser: sugarml, locals: {}, minify: true }),
  target: 'electron'
}

const spike = new Spike(spikeConfig)

spike.on('error', err => console.error(`error: ${err}`))
spike.on('warning', warn => spike.on('compile', console.log))

module.exports = spike
