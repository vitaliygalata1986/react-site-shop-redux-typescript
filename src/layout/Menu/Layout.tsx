import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import cn from 'classnames';
import styles from './Layout.module.css';
import Button from '../../components/Button/Button';
import { logOut, getProfile } from '../../store/user.slice';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispath, RootState } from '../../store/store';
import { useEffect } from 'react';
import { useMemo } from 'react';

export function Layout() {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispath>();
  const profile = useSelector((s: RootState) => s.user.profile);
  const items = useSelector((s: RootState) => s.cart.items);
  const jwt = useSelector((s: RootState) => s.user.jwt);

  const cartCount = useMemo(
    () => items.reduce((acc, i) => acc + i.count, 0),
    [items],
  );

  useEffect(() => {
    if (jwt) {
      dispatch(getProfile());
    }
  }, [jwt, dispatch]);

  const logout = () => {
    dispatch(logOut());
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
          {profile ? (
            <>
              <div className={styles['main-layout__user-info']}>
                {profile.name}
              </div>
              <a
                href={`mailto:${profile.email}`}
                className={styles['main-layout__user-email']}
              >
                {profile.email}
              </a>
            </>
          ) : (
            <div className={styles['main-layout__user-info']}>Гость</div>
          )}
        </div>
        <nav className={styles['main-layout__navigation']}>
          <NavLink
            to="/"
            className={({ isActive }) =>
              cn(styles['main-layout__navigation-link'], {
                [styles.active]: isActive,
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
              cn(
                styles['main-layout__navigation-link'],
                styles['main-layout__navigation-link-cart'],
                {
                  [styles.active]: isActive,
                },
              )
            }
          >
            <img
              src={`${import.meta.env.BASE_URL}cart-icon.svg`}
              alt="cart-icon"
            />
            Корзина
            <span className={styles['main-layout__cart']}>{cartCount}</span>
          </NavLink>

          {!profile && (
            <>
              <NavLink
                to="/auth/login"
                className={styles['main-layout__navigation-link']}
              >
                <img
                  className={styles['main-layout__icon']}
                  src={`${import.meta.env.BASE_URL}login.png`}
                  alt="cart-icon"
                />
                Войти
              </NavLink>
              <NavLink
                to="/auth/register"
                className={styles['main-layout__navigation-link']}
              >
                <img
                  className={styles['main-layout__icon']}
                  src={`${import.meta.env.BASE_URL}login.png`}
                  alt="cart-icon"
                />
                Регистрация
              </NavLink>
            </>
          )}
        </nav>
        {profile ? (
          <Button
            appearence="small"
            className={styles['main-layout__logout']}
            onClick={logout}
          >
            <img src={`${import.meta.env.BASE_URL}logout.svg`} alt="Выйти" />
            Выйти
          </Button>
        ) : null}
      </div>
      <div className={styles['main-layout__right']}>
        <Outlet />
      </div>
    </main>
  );
}

export default Layout;
