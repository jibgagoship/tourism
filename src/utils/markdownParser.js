// 의존성 없이 frontmatter + 본문을 파싱하는 경량 마크다운 파서

/**
 * '--- ... ---' 형태의 frontmatter를 분리해 { data, content }로 반환한다.
 */
export const parseFrontmatter = (raw) => {
  const match = /^---\s*\n([\s\S]*?)\n---\s*\n?([\s\S]*)$/.exec(raw);
  if (!match) {
    return { data: {}, content: raw.trim() };
  }

  const [, frontmatter, content] = match;
  const data = {};

  frontmatter.split('\n').forEach((line) => {
    const idx = line.indexOf(':');
    if (idx === -1) return;
    const key = line.slice(0, idx).trim();
    const value = line.slice(idx + 1).trim();
    if (key) data[key] = value;
  });

  return { data, content: content.trim() };
};

/**
 * 아주 단순한 마크다운 → HTML 변환기 (제목/목록/굵게/문단만 지원).
 * 외부 라이브러리 없이 상세 페이지 렌더링에 사용한다.
 */
export const markdownToHtml = (markdown) => {
  const escapeHtml = (text) =>
    text
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');

  const inline = (text) =>
    escapeHtml(text).replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');

  const lines = markdown.split('\n');
  const html = [];
  // 들여쓰기 깊이별로 열린 <ul>을 추적 (중첩 리스트 지원)
  const listDepths = [];

  const closeListsTo = (depth) => {
    while (listDepths.length > depth) {
      html.push('</ul>');
      listDepths.pop();
    }
  };

  lines.forEach((rawLine) => {
    const line = rawLine.trimEnd();
    const listMatch = /^(\s*)[-*]\s+(.*)$/.exec(line);

    if (/^###\s+/.test(line)) {
      closeListsTo(0);
      html.push(`<h3>${inline(line.replace(/^###\s+/, ''))}</h3>`);
    } else if (/^##\s+/.test(line)) {
      closeListsTo(0);
      html.push(`<h2>${inline(line.replace(/^##\s+/, ''))}</h2>`);
    } else if (/^#\s+/.test(line)) {
      closeListsTo(0);
      html.push(`<h1>${inline(line.replace(/^#\s+/, ''))}</h1>`);
    } else if (listMatch) {
      // 들여쓰기 2칸을 한 단계로 간주
      const depth = Math.floor(listMatch[1].length / 2) + 1;
      if (depth > listDepths.length) {
        while (listDepths.length < depth) {
          html.push('<ul>');
          listDepths.push(true);
        }
      } else {
        closeListsTo(depth);
      }
      html.push(`<li>${inline(listMatch[2])}</li>`);
    } else if (line.trim() === '') {
      closeListsTo(0);
    } else {
      closeListsTo(0);
      html.push(`<p>${inline(line)}</p>`);
    }
  });

  closeListsTo(0);
  return html.join('\n');
};
