import { NavLink } from 'react-router-dom';
import css from './Navigation.module.css';

export const Navigation = () => {
  return (
    <div className={css.navigation}>
      <NavLink to="/" activeclassname={css.active}>
        Home
      </NavLink>
      <NavLink to="/movies" activeclassname={css.active}>
        Movies
      </NavLink>
    </div>
  );
};
