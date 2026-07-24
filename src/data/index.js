import { parseFrontmatter } from '@/utils/markdownParser.js';

// Vite glob import: data 폴더의 모든 .md를 raw 문자열로 한 번에 로드
const attractionFiles = import.meta.glob('./attractions/*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
});

const courseFiles = import.meta.glob('./courses/*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
});

// 파일 경로에서 확장자 민 파일명을 fallback id로 사용
const filenameToId = (path) => path.split('/').pop().replace(/\.md$/, '');

const buildItems = (files) =>
  Object.entries(files)
    .map(([path, raw]) => {
      const { data, content } = parseFrontmatter(raw);
      return {
        id: data.id || filenameToId(path),
        ...data,
        content,
      };
    })
    .sort((a, b) => a.name.localeCompare(b.name, 'ko'));

export const attractions = buildItems(attractionFiles);
export const courses = buildItems(courseFiles);

export const getAttractionById = (id) =>
  attractions.find((item) => item.id === id) || null;

export const getCourseById = (id) =>
  courses.find((item) => item.id === id) || null;

// 카테고리 목록 (필터 UI용)
export const ATTRACTION_CATEGORIES = ['자연', '문화', '음식', '액티비티'];
