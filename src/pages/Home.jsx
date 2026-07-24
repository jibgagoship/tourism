import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { attractions, courses } from '@/data/index.js';
import AttractCard from '@/components/AttractCard.jsx';
import CourseCard from '@/components/CourseCard.jsx';

const Home = () => {
  const navigate = useNavigate();
  const [keyword, setKeyword] = useState('');

  // 인기 관광지 4개, 추천 코스 2개만 노출
  const popularAttractions = attractions.slice(0, 4);
  const featuredCourses = courses.slice(0, 2);

  const handleSubmit = (event) => {
    event.preventDefault();
    const query = keyword.trim();
    navigate(query ? `/attractions?q=${encodeURIComponent(query)}` : '/attractions');
  };

  return (
    <div className="home">
      <section className="hero">
        <h1 className="hero__title">🍊 제주 관광 안내</h1>
        <p className="hero__subtitle">
          제주의 관광지와 추천 여행 코스를 한눈에 만나보세요.
        </p>
        <form className="hero__search" onSubmit={handleSubmit} role="search">
          <input
            type="search"
            className="search-box__input"
            placeholder="가고 싶은 관광지를 검색해보세요"
            value={keyword}
            onChange={(event) => setKeyword(event.target.value)}
            aria-label="관광지 검색"
          />
          <button type="submit" className="hero__search-button">
            검색
          </button>
        </form>
      </section>

      <section className="home-section">
        <h2 className="home-section__title">인기 관광지</h2>
        <div className="card-grid">
          {popularAttractions.map((attraction) => (
            <AttractCard key={attraction.id} attraction={attraction} />
          ))}
        </div>
      </section>

      <section className="home-section">
        <h2 className="home-section__title">추천 코스</h2>
        <div className="card-grid card-grid--two">
          {featuredCourses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
