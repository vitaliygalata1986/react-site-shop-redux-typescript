import Headling from '../../components/Headling/Headling';
import Input from '../../components/Input/Input';
import Button from '../../components/Button/Button';
import styles from './Login.module.css';
import { Link, useNavigate } from 'react-router-dom';
import { FormEvent, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispath, RootState } from '../../store/store';
import { clearLoginError, login } from '../../store/user.slice';

/*
FormEvent — это тип события в React, который используется для работы с событиями форм, такими как отправка формы, ввод текста, выбор опций и т.д. 
Он представляет собой синтетическое событие, которое React использует для обеспечения кросс-браузерной совместимости.
*/

export type LoginForm = {
  email: {
    value: string;
  };
  password: {
    value: string;
  };
  name: {
    value: string;
  };
};

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispath>(); // экспортировали из базового store: export type AppDispath = typeof store.dispatch;
  const { jwt, loginErrorMessage } = useSelector((s: RootState) => s.user); // получим из стейта jwt, loginErrorMessage
  // console.log(loginErrorMessage);

  useEffect(() => {
    if (jwt) {
      navigate('/');
    }
  }, [jwt, navigate]);

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    dispatch(clearLoginError()); // очищаем ошибку
    // console.log(e); // SyntheticBaseEvent
    const target = e.target as typeof e.target & LoginForm; // приводим к типу e.target и при этом он должен обладать некоторыми значениями type LoginForm
    const { email, password } = target; // const email = target.email; const password = target.password
    // console.log(email.value, password.value);
    await sendLogin(email.value, password.value);
  };

  const sendLogin = async (email: string, password: string) => {
    dispatch(login({ email, password }));
  };

  return (
    <div className={styles['login']}>
      <Headling>Вход</Headling>
      {loginErrorMessage && (
        <div className={styles['error']}>{loginErrorMessage}</div>
      )}
      <form className={styles['form']} onSubmit={submit}>
        <div className={styles['field']}>
          <label htmlFor="email">Ваш email</label>
          <Input type="email" placeholder="email" id="email" name="email" />
        </div>
        <div className={styles['field']}>
          <label htmlFor="password">Ваш пароль</label>
          <Input
            type="password"
            placeholder="Пароль"
            id="password"
            name="password"
          />
        </div>
        <Button type="submit" appearence="big">
          Вход
        </Button>
      </form>
      <div className={styles['links']}>
        <div>Нет аккаунта?</div>
        <div>
          <Link to="/auth/register">Зарегестрироваться</Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
