# 🍊 제주 관광 안내 (Jeju Tourism Guide)

제주도의 관광지와 추천 여행 코스를 한눈에 볼 수 있는 웹 애플리케이션입니다.
관광지·코스 데이터는 마크다운(`.md`) 파일로 관리하며, React + Vite로 구현했습니다.

## ✨ 주요 기능

- **홈**: 제목·검색창, 인기 관광지 4개, 추천 코스 2개
- **관광지 목록**: 카드형 목록 + 카테고리 필터(자연/문화/음식/액티비티) + 실시간 검색
- **관광지 상세**: 위치·개방시간·입장료·설명·방문 팁 (마크다운 렌더링)
- **코스 목록/상세**: 1일·2일 추천 코스, Day별 방문 순서
- **반응형**: 모바일 1열 / 태블릿 2열 / 데스크톱 3열

## 🛠 기술 스택

- React 18
- Vite 5
- React Router DOM 6
- 순수 CSS (BEM 네이밍, 외부 UI 라이브러리 없음)
- 마크다운 파서: 외부 의존성 없는 경량 구현 (`src/utils/markdownParser.js`)

## 🚀 실행 방법

```bash
# 1) 의존성 설치
npm install

# 2) 개발 서버 실행 (기본 http://localhost:5173)
npm run dev

# 3) 프로덕션 빌드
npm run build

# 4) 빌드 결과 미리보기
npm run preview
```

## 📁 프로젝트 구조

```
jeju-tourism-guide/
├── index.html
├── public/
│   └── favicon.svg
├── src/
│   ├── components/       # Header, Navigation, Footer, AttractCard, CourseCard
│   ├── pages/            # Home, AttractList, AttractDetail, CourseList, CourseDetail
│   ├── data/
│   │   ├── attractions/  # 관광지 마크다운 (*.md)
│   │   ├── courses/      # 코스 마크다운 (*.md)
│   │   └── index.js      # 마크다운 자동 로드·파싱 (import.meta.glob)
│   ├── styles/           # global.css, components.css, responsive.css
│   ├── utils/            # markdownParser, filterUtils, searchUtils
│   ├── App.jsx           # 라우팅
│   └── index.jsx         # 진입점
├── CLAUDE.md             # 개발 가이드라인
└── package.json
```

## 📝 데이터 추가 방법

### 관광지 추가
`src/data/attractions/` 에 `kebab-case.md` 파일을 만들고 아래 형식으로 작성하면 자동으로 목록에 반영됩니다.

```markdown
---
id: my-place
name: 관광지명
category: 자연        # 자연 / 문화 / 음식 / 액티비티
location: 주소
hours: 개방시간
fee: 입장료
summary: 카드에 보일 한 줄 소개
image: 🏝️
---

# 관광지명

## 기본정보
- **위치**: ...
- **개방시간**: ...
- **입장료**: ...
- **카테고리**: 자연

## 설명
...

## 방문 팁
- ...
```

### 코스 추가
`src/data/courses/` 에 `기간-테마-course.md` 형식으로 작성합니다. (frontmatter: `id, name, duration, theme, summary, image`)

## ✅ 검증 완료 항목

- 빌드 성공 (에러 0)
- 콘솔 에러/경고 0 (React Router v7 future flag 적용)
- 홈 → 검색 → 목록 → 필터 → 상세 라우팅 정상 동작
- 모바일/태블릿/데스크톱 반응형 정상

---

> 본 프로젝트는 `docs/jeju-tourism-step-requests.md`의 STEP 1~10을
> `docs/CLAUDE.md` 가이드라인에 따라 단계별로 구현한 실습 결과물입니다.
