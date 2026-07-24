import { Link } from 'react-router-dom';

const CourseCard = ({ course }) => {
  const { id, name, duration, theme, summary, image } = course;

  return (
    <Link to={`/courses/${id}`} className="card">
      <div className="card__thumb card__thumb--course" aria-hidden="true">
        {image || '🗺️'}
      </div>
      <div className="card__body">
        <div className="card__badges">
          <span className="card__badge">{duration}</span>
          {theme && <span className="card__badge card__badge--soft">{theme}</span>}
        </div>
        <h3 className="card__title">{name}</h3>
        <p className="card__desc">{summary}</p>
      </div>
    </Link>
  );
};

export default CourseCard;
