import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import cn from 'classnames';
import styles from './Layout.module.css';
import Button from '../../components/Button/Button';
import { logOut, getProfile } from '../../store/user.slice';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispath, RootState } from '../../store/store';
import { useEffect } from 'react';

export function Layout() {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispath>();
  const profile = useSelector((s: RootState) => s.user.profile);
  const items = useSelector((s: RootState) => s.cart.items);

  // const location = useLocation(); // информация о том, где мы сейчас находимся

  /*
  useEffect(() => {
    console.log(location); // {pathname: '/', search: '', hash: '', state: null, key: '6hlh1y9w'}
  }, [location]);
*/

  useEffect(() => {
    dispatch(getProfile());
  }, []);

  const logout = () => {
    dispatch(logOut());
    // localStorage.removeItem('jwt');
    navigate('/auth/login');
  };

  return (
    <main className={styles['main-layout']}>
      <div className={styles['main-layout__left']}>
        <div className={styles['main-layout__user']}>
          <img
            className={styles['main-layout__avatar']}
            src={`${import.meta.env.BASE_URL}avatar.png`}
            alt="avatar"
          />
          <div className={styles['main-layout__user-info']}>
            {profile?.name}
          </div>
          <a
            href={`mailto:${profile?.email}`}
            className={styles['main-layout__user-email']}
          >
            {profile?.email}
          </a>
        </div>
        <nav className={styles['main-layout__navigation']}>
          <NavLink
            to="/"
            className={({ isActive }) =>
              cn(styles['main-layout__navigation-link'], {
                [styles.active]: isActive, // еслши это пункт меню активный, то установим ему клас active
              })
            }
          >
            <img
              src={`${import.meta.env.BASE_URL}menu-icon.svg`}
              alt="menu-icon"
            />
            Меню
          </NavLink>
          <NavLink
            to="/cart"
            className={({ isActive }) =>
              cn(styles['main-layout__navigation-link'], {
                [styles.active]: isActive,
              })
            }
          >
            <img
              src={`${import.meta.env.BASE_URL}cart-icon.svg`}
              alt="cart-icon"
            />
            Корзина
            <span className={styles['main-layout__cart']}>
              {items.reduce((acc, item) => (acc += item.count), 0)}
            </span>
          </NavLink>
        </nav>
        <Button
          appearence="small"
          className={styles['main-layout__logout']}
          onClick={logout}
        >
          <img src={`${import.meta.env.BASE_URL}logout.svg`} alt="Выйти" />
          Выйти
        </Button>
      </div>
      <div className={styles['main-layout__right']}>
        {/* сюда будет подставляться вложенная страница */}
        <Outlet />
      </div>
    </main>
  );
}
