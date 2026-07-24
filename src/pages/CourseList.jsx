import { courses } from '@/data/index.js';
import CourseCard from '@/components/CourseCard.jsx';

const CourseList = () => {
  return (
    <section className="page page--course-list">
      <h1 className="page__title">추천 코스</h1>
      <p className="page__subtitle">테마별 제주 여행 코스를 확인해보세요.</p>

      {courses.length === 0 ? (
        <p className="empty-message">등록된 코스가 없습니다.</p>
      ) : (
        <div className="card-grid">
          {courses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      )}
    </section>
  );
};

export default CourseList;
