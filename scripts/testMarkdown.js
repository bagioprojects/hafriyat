const { renderMarkdown } = require('../src/helpers/markdownParser');
const blog = require('../data/blog');

const rendered = renderMarkdown(blog[0].content);
console.log('Sample rendered length:', rendered.length);
console.log('Contains table:', rendered.includes('<table class="prose-table">'));
console.log('Contains responsive wrapper:', rendered.includes('<div class="table-responsive-wrapper">'));
console.log('Contains prose-list:', rendered.includes('<ul class="prose-list">'));
const idx = rendered.indexOf('<table');
if (idx !== -1) {
  console.log('Snippet:\n', rendered.substring(idx - 40, idx + 250));
}

