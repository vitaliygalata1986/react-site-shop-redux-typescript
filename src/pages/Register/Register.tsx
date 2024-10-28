import Headling from '../../components/Headling/Headling';
import Input from '../../components/Input/Input';
import Button from '../../components/Button/Button';
import styles from '../Login/Login.module.css';
import { Link, useNavigate } from 'react-router-dom';
import { FormEvent, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispath, RootState } from '../../store/store';
import { clearRegisterError, register } from '../../store/user.slice';
import { LoginForm } from '../Login/Login';

/*
FormEvent — это тип события в React, который используется для работы с событиями форм, такими как отправка формы, ввод текста, выбор опций и т.д. 
Он представляет собой синтетическое событие, которое React использует для обеспечения кросс-браузерной совместимости.
*/

export type RegisterForm = {
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

function Register() {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispath>(); // экспортировали из базового store: export type AppDispath = typeof store.dispatch;
  const { jwt, registerErrorMessage } = useSelector((s: RootState) => s.user); // получим из стейта jwt, registerErrorMessage
  // console.log(loginErrorMessage);

  useEffect(() => {
    if (jwt) {
      navigate('/');
    }
  }, [jwt, navigate]);

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    dispatch(clearRegisterError()); // очищаем ошибку
    // console.log(e); // SyntheticBaseEvent
    const target = e.target as typeof e.target & LoginForm; // приводим к типу e.target и при этом он должен обладать некоторыми значениями type LoginForm
    const { email, password, name } = target; // const email = target.email; const password = target.password
    dispatch(
      register({
        email: email.value,
        password: password.value,
        name: name.value,
      })
    );
  };

  return (
    <div className={styles['login']}>
      <Headling>Регистрация</Headling>
      {registerErrorMessage && (
        <div className={styles['error']}>{registerErrorMessage}</div>
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
        <div className={styles['field']}>
          <label htmlFor="name">Ваше имя</label>
          <Input type="text" placeholder="Имя" id="name" name="name" />
        </div>
        <Button type="submit" appearence="big">
          Зарегестрироваться
        </Button>
      </form>
      <div className={styles['links']}>
        <div>Есть аккаунт?</div>
        <div>
          <Link to="/auth/login">Войти</Link>
        </div>
      </div>
    </div>
  );
}

export default Register;
