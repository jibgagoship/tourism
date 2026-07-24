import { useParams, Link } from 'react-router-dom';
import { getAttractionById } from '@/data/index.js';
import { markdownToHtml } from '@/utils/markdownParser.js';

const AttractDetail = () => {
  const { id } = useParams();
  const attraction = getAttractionById(id);

  if (!attraction) {
    return (
      <section className="page page--attract-detail">
        <p className="empty-message">존재하지 않는 관광지입니다.</p>
        <Link to="/attractions" className="back-link">
          ← 관광지 목록으로
        </Link>
      </section>
    );
  }

  const { name, category, image, content } = attraction;
  // 상단에 이미 이름을 표시하므로 본문 맨 앞의 H1 제목은 제거
  const body = content.replace(/^#\s+.*\r?\n+/, '');

  return (
    <section className="page page--attract-detail">
      <Link to="/attractions" className="back-link">
        ← 관광지 목록으로
      </Link>

      <div className="detail-hero">
        <div className="detail-hero__thumb" aria-hidden="true">
          {image || '📍'}
        </div>
        <div>
          <span className="card__badge">{category}</span>
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

export default AttractDetail;
