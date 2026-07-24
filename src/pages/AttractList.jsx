import { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { attractions, ATTRACTION_CATEGORIES } from '@/data/index.js';
import { filterByCategory, ALL_CATEGORY } from '@/utils/filterUtils.js';
import { searchAttractions } from '@/utils/searchUtils.js';
import AttractCard from '@/components/AttractCard.jsx';

const CATEGORY_OPTIONS = [ALL_CATEGORY, ...ATTRACTION_CATEGORIES];

const AttractList = () => {
  const [searchParams] = useSearchParams();
  const [activeCategory, setActiveCategory] = useState(ALL_CATEGORY);
  // 홈에서 넘어온 ?q= 검색어를 초기값으로 사용
  const [keyword, setKeyword] = useState(searchParams.get('q') || '');

  const handleFilterClick = (category) => {
    setActiveCategory(category);
  };

  const handleSearchChange = (event) => {
    setKeyword(event.target.value);
  };

  // 카테고리 필터 → 검색 순으로 조합 (입력마다 재계산은 useMemo로 최소화)
  const visibleAttractions = useMemo(() => {
    const byCategory = filterByCategory(attractions, activeCategory);
    return searchAttractions(byCategory, keyword);
  }, [activeCategory, keyword]);

  return (
    <section className="page page--attract-list">
      <h1 className="page__title">관광지 목록</h1>
      <p className="page__subtitle">제주의 다양한 관광지를 만나보세요.</p>

      <div className="search-box">
        <input
          type="search"
          className="search-box__input"
          placeholder="관광지 이름이나 설명으로 검색"
          value={keyword}
          onChange={handleSearchChange}
          aria-label="관광지 검색"
        />
      </div>

      <div className="filter-bar" role="group" aria-label="카테고리 필터">
        {CATEGORY_OPTIONS.map((category) => (
          <button
            key={category}
            type="button"
            className={
              activeCategory === category
                ? 'filter-bar__button is-active'
                : 'filter-bar__button'
            }
            onClick={() => handleFilterClick(category)}
          >
            {category}
          </button>
        ))}
      </div>

      {visibleAttractions.length === 0 ? (
        <p className="empty-message">검색 결과가 없습니다.</p>
      ) : (
        <div className="card-grid">
          {visibleAttractions.map((attraction) => (
            <AttractCard key={attraction.id} attraction={attraction} />
          ))}
        </div>
      )}
    </section>
  );
};

export default AttractList;
