import { useParams, Link } from 'react-router-dom';
import { getCourseById } from '@/data/index.js';
import { markdownToHtml } from '@/utils/markdownParser.js';

const CourseDetail = () => {
  const { id } = useParams();
  const course = getCourseById(id);

  if (!course) {
    return (
      <section className="page page--course-detail">
        <p className="empty-message">존재하지 않는 코스입니다.</p>
        <Link to="/courses" className="back-link">
          ← 코스 목록으로
        </Link>
      </section>
    );
  }

  const { name, duration, theme, image, content } = course;
  // 상단에 이미 이름을 표시하므로 본문 맨 앞의 H1 제목은 제거
  const body = content.replace(/^#\s+.*\r?\n+/, '');

  return (
    <section className="page page--course-detail">
      <Link to="/courses" className="back-link">
        ← 코스 목록으로
      </Link>

      <div className="detail-hero">
        <div className="detail-hero__thumb" aria-hidden="true">
          {image || '🗺️'}
        </div>
        <div>
          <div className="card__badges">
            <span className="card__badge">{duration}</span>
            {theme && (
              <span className="card__badge card__badge--soft">{theme}</span>
            )}
          </div>
          <h1 className="page__title">{name}</h1>
        </div>
      </div>

      <article
        className="markdown-body"
        dangerouslySetInnerHTML={{ __html: markdownToHtml(body) }}
      />
    </section>
  );
};

export default CourseDetail;
