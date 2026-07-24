import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="header">
      <div className="header__inner">
        <Link to="/" className="header__logo">
          🍊 제주 관광 안내
        </Link>
      </div>
    </header>
  );
};

export default Header;
