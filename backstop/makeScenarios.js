const Chromy = require('chromy');
const qs = require('query-string');
const fs = require('fs');

const host = process.env.STORYBOOK_URL || 'http://localhost:9009';

const storyDefaults = {
  delay: 100,
};
const backstopConfig = {
  'id': 'Redux Storybook',
  'viewports': [
    {
      'label': 'fullhd',
      'width': 1920,
      'height': 1080
    }
  ],
  'onReadyScript': 'chromy/onReady.js',
  'scenarios': [],
  'report': [
    'browser'
  ],
  // 'engine': 'puppeteer',
  'engine': 'chromy',
  'engineFlags': [],
  'asyncCaptureLimit': 5,
  'asyncCompareLimit': 50,
  'debug': false,
  'debugWindow': false,
  'misMatchThreshold': 0.005,
  'engineOptions': {
    'visible': true,
    'waitTimeout': 10000
  },
  'paths': {
    'bitmaps_reference': 'backstop_data/bitmaps_reference',
    'bitmaps_test': 'backstop_data/bitmaps_test',
    'engine_scripts': 'backstop_data/engine_scripts',
    'html_report': 'backstop_data/html_report',
    'ci_report': 'backstop_data/ci_report'
  }
};

const chrome = new Chromy({visible: true});
chrome.chain()
  .goto(host)
  .wait(1000) // need a selector
  .evaluate(() => {
    // expand the tree of menu items
    let notExpanded = [];
    do {
      notExpanded = Array.from(document.querySelectorAll('.sidebar-expander.css-1sbepsv'));
      notExpanded.forEach(n => n.click())
    } while (notExpanded.length)
  })
  .wait(500)
  .evaluate(() => {
    const hrefs = [];
    document.querySelectorAll('a.css-1uwvbks').forEach(a => hrefs.push(a.href));
    return hrefs;
  })
  .end()
  .then(hrefs => chrome.close().then(() => {
    if (!hrefs.length) {
      throw new Error('Not stories found at ' + host);
    }

    const stories = hrefs
      .map(qs.extract)
      .map(qs.parse)
      .map(q => q.path)
      .filter(storyId => storyId)
      .map(storyId => storyId.replace('/story/', ''))
      .map(storyId => {
        return {
          ...storyDefaults,
          label: storyId.split('--').join(' '),
          url: `${host}/iframe.html?id=${storyId}&noanimate`,
        };
      });


    return {
      ...backstopConfig,
      scenarios: stories
    }
  }))
  .then(config => fs.writeFileSync('backstop.json', JSON.stringify(config, null, 2), 'utf-8'));