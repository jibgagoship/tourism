# 제주 관광 안내 프로젝트 - 개발 가이드라인

이 문서는 프로젝트 전반에 적용되는 구조, 컬벤션, 코드 스타일 기준입니다.
각 단계별 요청(PRD)은 별도로 입력하며, 이 가이드는 모든 단계에 공통으로 적용됩니다.

---

## �프로젝트 개요

**프로젝트명**: 제주 관광 안내 사이트
**기술 스택**: React (또는 HTML/CSS/JS)
**페이지 구성**: 홈 / 관광지 목록 / 관광지 상세 / 코스 목록 / 코스 상세

---

## �프로젝트 구조

```
jeju-tourism-guide/
├── public/
│   ├── index.html
│   └── favicon.ico
├── src/
│   ├── components/
│   │   ├── Header.jsx
│   │   ├── Navigation.jsx
│   │   ├── AttractCard.jsx
│   │   ├── CourseCard.jsx
│   │   └── Footer.jsx
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── AttractList.jsx
│   │   ├── AttractDetail.jsx
│   │   ├── CourseList.jsx
│   │   └── CourseDetail.jsx
│   ├── data/
│   │   ├── attractions/
│   │   │   └── *.md
│   │   ├── courses/
│   │   │   └── *.md
│   │   └── index.js (데이터 통합 관리)
│   ├── styles/
│   │   ├── global.css
│   │   ├── components.css
│   │   └── responsive.css
│   ├── utils/
│   │   ├── markdownParser.js
│   │   ├── filterUtils.js
│   │   └── searchUtils.js
│   ├── App.jsx
│   └── index.js
├── README.md
├── CLAUDE.md (이 파일)
└── package.json
```

---

## �데이터 파일 규칙

### 관광지 마크다운 템플릿
```markdown
# [관광지명]

## 기본정보
- **위치**: [주소]
- **개방시간**: [시간]
- **입장료**: [요금]
- **카테고리**: 자연 / 문화 / 음식 / 액티비티

## 설명
[상세한 설명 텍스트]

## 방문 팁
- [팁 1]
- [팁 2]
```

### 코스 마크다운 템플릿
```markdown
# [코스명]

## 코스정보
- **기간**: 1일 / 2일
- **테마**: [테마 설명]

## Day 1
### 오전
- **[관광지1]** (09:00 - 11:00)
  - 이용 팁

## Day 2
[동일 구조]
```

### 파일명 규칙
```
관광지 데이터: lowercase-kebab-case.md   예) hallasan.md, black-sand-beach.md
코스 데이터:   기간-테마-course.md        예) 1day-hanok-course.md
```

---

## �코드 스타일 가이드

### 파일명 규칙
```
컴포넌트: PascalCase   (AttractCard.jsx)
유틸함수: camelCase    (markdownParser.js)
데이터:   kebab-case   (hallasan.md)
CSS:      kebab-case   (components.css)
```

### 컴포넌트 작성 패턴
```javascript
// 1. import
import { useState, useEffect } from 'react';

// 2. 컴포넌트 선언
const ComponentName = ({ prop1, prop2 }) => {
  // 3. 상태 관리
  const [state, setState] = useState(null);

  // 4. 이펙트
  useEffect(() => {
    // 로직
  }, []);

  // 5. 이벤트 핸들러
  const handleClick = () => {};

  // 6. 렌더링
  return (
    <div>
      {/* JSX */}
    </div>
  );
};

export default ComponentName;
```

### 네이밍 컬벤션
```javascript
// 상태 변수
const [attractions, setAttractions] = useState([]);

// 이벤트 핸들러 (handle 접두사)
const handleSearch = () => {};
const handleFilterClick = () => {};

// 불리언 변수 (is/has 접두사)
const isLoading = true;
const hasError = false;

// 배열 변수 (복수형)
const attractions = [];
const filteredResults = [];
```

### CSS 클래스명 (BEM 방식)
```css
.component-name { }
.component-name__element { }
.component-name--modifier { }
.is-active { }   /* 상태 클래스 */
.has-error { }
```

---

## �반응형 디자인 기준

```css
/* 모바일: 1열 레이아웃 */
@media (max-width: 640px) { }

/* 태블릿: 2열 레이아웃 */
@media (min-width: 641px) and (max-width: 1024px) { }

/* 데스크톱: 3열 이상 레이아웃 */
@media (min-width: 1025px) { }
```

- 터치 타겟 최소 크기: 44x44px
- box-sizing: border-box 기본 적용
- 이미지는 반응형 최적화 (srcset 권장)

---

## �공통 검증 기준

모든 단계 작업 완료 후 다음을 확인합니다.

1. **콘솔 확인**: 에러/경고 없음
2. **링크 확인**: 모든 라우팅 및 네비게이션 정상 동작
3. **엣지 케이스**: 빈 데이터, 검색 결과 0건 등 예외 처리
4. **반응형 확인**: 모바일/태블릿/데스크톱 레이아웃 정상
5. **브라우저 호환성**: Chrome, Firefox, Safari, Edge 기준 확인

---

## �의존성 라이브러리

### 필수
```json
{
  "dependencies": {
    "react": "^18.0.0",
    "react-dom": "^18.0.0",
    "react-router-dom": "^6.0.0"
  }
}
```

### 권장
```json
{
  "devDependencies": {
    "gray-matter": "마크다운 frontmatter 처리",
    "lodash": "유틸리티 함수 (debounce 등)",
    "classnames": "동적 className 관리"
  }
}
```

---

## �자주 발생하는 문제와 해결책

**마크다운 파일이 로드되지 않을 때**
```javascript
import attractionData from '@/data/attractions/hallasan.md?raw';
```

**라우팅이 동작하지 않을 때**
```javascript
<Route path="/attract/:id" element={<AttractDetail />} />
```

**검색이 느릴 때**
```javascript
import { debounce } from 'lodash';
const debouncedSearch = debounce(handleSearch, 300);
```

**모바일에서 레이아웃이 깨질 때**
```css
* { box-sizing: border-box; }
.container { max-width: 100%; padding: 0 1rem; }
```

---

**마지막 업데이트**: 2026년 7월
**버전**: 1.0
