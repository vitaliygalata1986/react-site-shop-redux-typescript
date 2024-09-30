import { Outlet } from 'react-router-dom';
import styles from './AuthLayout.module.css';

import cn from 'classnames';

function AuthLayout() {
  return (
    <main className={styles['auth-layout']}>
      <div className={styles['auth-layout__left']}>
        <img src="/logo.svg" alt="logo" />
      </div>
      <div className={styles['auth-layout__right']}>
        {/* сюда будет подставляться вложенная страница */}
        <Outlet />
      </div>
    </main>
  );
}

export default AuthLayout;
