import { NavLink } from 'react-router-dom';

const NAV_ITEMS = [
  { to: '/', label: '홈', end: true },
  { to: '/attractions', label: '관광지' },
  { to: '/courses', label: '추천 코스' },
];

const Navigation = () => {
  return (
    <nav className="navigation">
      <ul className="navigation__list">
        {NAV_ITEMS.map((item) => (
          <li key={item.to} className="navigation__item">
            <NavLink
              to={item.to}
              end={item.end}
              className={({ isActive }) =>
                isActive ? 'navigation__link is-active' : 'navigation__link'
              }
            >
              {item.label}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navigation;
