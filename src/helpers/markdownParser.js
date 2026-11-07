/**
 * Adem Hafriyat - Güvenli, Hafif ve %100 Duyarlı Markdown Ayrıştırıcı Motoru
 * Tabloları otomatik olarak .table-responsive-wrapper içine sarar.
 * Listeleri, başlıkları, alıntıları ve kalın/italik stilleri biçimlendirir.
 */

function renderMarkdown(content) {
  if (!content || typeof content !== 'string') return '';

  let html = content;

  // 1. Windows Satır Sonu Normalizasyonu
  html = html.replace(/\r\n/g, '\n').replace(/\r/g, '\n');

  // 2. Markdown Tablolarını Ayrıştır ( | th | th | ... )
  html = html.replace(/((?:^|[ \t]*\n)\|[^\n]+\|\n\|[ \t]*[-:| ]+[ \t]*\|\n(?:\|[^\n]+\|\n?)+)/g, (match) => {
    const lines = match.trim().split('\n').map(l => l.trim()).filter(l => l.startsWith('|') && l.endsWith('|'));
    if (lines.length < 2) return match;

    const parseRow = (line) => {
      return line.slice(1, -1).split('|').map(c => c.trim());
    };

    const headerCells = parseRow(lines[0]);
    // lines[1] is the separator (e.g. |---|---|)
    const bodyRows = lines.slice(2).map(parseRow);

    let tableHtml = '<div class="table-responsive-wrapper">\n<table class="prose-table">\n<thead>\n<tr>\n';
    headerCells.forEach(cell => {
      tableHtml += `  <th>${parseInline(cell)}</th>\n`;
    });
    tableHtml += '</tr>\n</thead>\n<tbody>\n';

    bodyRows.forEach(row => {
      tableHtml += '<tr>\n';
      row.forEach(cell => {
        tableHtml += `  <td>${parseInline(cell)}</td>\n`;
      });
      tableHtml += '</tr>\n';
    });

    tableHtml += '</tbody>\n</table>\n</div>\n';
    return '\n' + tableHtml + '\n';
  });

  // 3. Başlıklar (H2 - H4)
  html = html.replace(/^#### (.*?)$/gm, '<h4>$1</h4>');
  html = html.replace(/^### (.*?)$/gm, '<h3>$1</h3>');
  html = html.replace(/^## (.*?)$/gm, '<h2>$1</h2>');

  // 4. Yatay Çizgi
  html = html.replace(/^---$/gm, '<hr class="prose-divider">');

  // 5. Blok Alıntılar (> Alıntı)
  html = html.replace(/^> (.*?)$/gm, '<blockquote class="prose-quote"><p>$1</p></blockquote>');

  // 6. Sırasız Listeler (- Liste veya * Liste)
  html = html.replace(/((?:^[ \t]*[-*] .*$\n?)+)/gm, (match) => {
    const items = match.trim().split('\n').map(l => l.replace(/^[ \t]*[-*] /, '').trim());
    return '<ul class="prose-list">\n' + items.map(i => `  <li>${parseInline(i)}</li>`).join('\n') + '\n</ul>\n';
  });

  // 7. Sıralı Listeler (1. Liste)
  html = html.replace(/((?:^[ \t]*\d+\. .*$\n?)+)/gm, (match) => {
    const items = match.trim().split('\n').map(l => l.replace(/^[ \t]*\d+\. /, '').trim());
    return '<ol class="prose-ordered-list">\n' + items.map(i => `  <li>${parseInline(i)}</li>`).join('\n') + '\n</ol>\n';
  });

  // 8. Satır İçi (Inline) Formatlar: Kalın, İtalik, Kod
  html = parseInline(html);

  // 9. Paragraf Ayrımı (Çift satır sonları)
  // Tablo, başlık veya liste bloklarını gereksiz <p> içine almamak için temizle
  const blocks = html.split(/\n{2,}/);
  const formattedBlocks = blocks.map(block => {
    const b = block.trim();
    if (!b) return '';
    if (b.startsWith('<h') || b.startsWith('<div') || b.startsWith('<ul') || b.startsWith('<ol') || b.startsWith('<blockquote') || b.startsWith('<hr')) {
      return b;
    }
    return `<p>${b.replace(/\n/g, '<br>')}</p>`;
  });

  return formattedBlocks.join('\n\n');
}

function parseInline(text) {
  if (!text) return '';
  return text
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    .replace(/`([^`]+)`/g, '<code>$1</code>');
}

module.exports = { renderMarkdown };
