import { Link } from 'react-router-dom';

const AttractCard = ({ attraction }) => {
  const { id, name, category, summary, image } = attraction;

  return (
    <Link to={`/attractions/${id}`} className="card">
      <div className="card__thumb" aria-hidden="true">
        {image || '📍'}
      </div>
      <div className="card__body">
        <span className="card__badge">{category}</span>
        <h3 className="card__title">{name}</h3>
        <p className="card__desc">{summary}</p>
      </div>
    </Link>
  );
};

export default AttractCard;
