import styled from "styled-components";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { Input, Error, FormButton } from "../../components";
import { setUser } from "../../actions";
import { useDispatch, useStore, useSelector } from "react-redux";
import { selectUserRole } from "../../selectors";
import { ROLE } from "../../assets/constants";
import { request } from "../../utilits/request.js";

const authFormSchema = yup.object().shape({
  login: yup
    .string()
    .required("Заполните поле логин")
    .matches(/^[a-z0-9]+$/, "Неверный логин. Допускаются только буквы и цифры")
    .min(3, "Неверный логин. Минимум 3 символа")
    .max(20, "Неверный логин. максимум 20 символов"),
  password: yup
    .string()
    .required("Заполните поле пароль")
    .matches(
      /^[\w#%]+$/,
      "Пароль должен содержать только буквы, цифры и спецсимволы % #",
    )
    .min(5, "Неверный пароль. Минимум 5 символов")
    .max(30, "Неверный пароль. максимум 30 символов"),
});

const AuthorizationContainer = ({ className }) => {
  const [serverError, setServerError] = useState(null);
  const roleId = useSelector(selectUserRole);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      login: "",
      password: "",
    },
    resolver: yupResolver(authFormSchema),
  });

  const dispatch = useDispatch();
  const store = useStore();

  useEffect(() => {
    let currentWasLogout = store.getState().app.wasLogout;
    return store.subscribe(() => {
      let prevWasLogout = currentWasLogout;
      currentWasLogout = store.getState().app.wasLogout;

      if (currentWasLogout !== prevWasLogout) {
        reset();
      }
    });
  }, [reset, store]);

  const onSubmit = ({ login, password }) => {
    request("/login", "POST", { login, password }).then(({ data, error }) => {
      if (error) {
        setServerError(error);
        return;
      }

      sessionStorage.setItem("userData", JSON.stringify(data.user));
      dispatch(setUser(data.user));
    });
  };

  const formError = errors?.login?.message || errors?.password?.message;

  const errorMessage = serverError || formError;

  if (roleId !== ROLE.GUEST) {
    return <Navigate to="/" />;
  }

  return (
    <div className={className}>
      <h2 className="header-auth">Вход</h2>
      <form className="form" onSubmit={handleSubmit(onSubmit)}>
        <Input
          type="text"
          placeholder="Логин"
          {...register("login", { onChange: () => setServerError(null) })}
        />
        <Input
          type="password"
          placeholder="Пароль"
          {...register("password", { onChange: () => setServerError(null) })}
        />
        <FormButton type="submit" disabled={!!formError}>
          Войти
        </FormButton>
        {errorMessage && <Error>{errorMessage}</Error>}
        <Link className="form-link" to="/register">
          Зарегестрироваться
        </Link>
      </form>
    </div>
  );
};

export const Authorization = styled(AuthorizationContainer)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 540px;

  .header-auth {
    font-size: 24px;
    font-weight: normal;
    color: var(--choko-color);
  }

  .form {
    display: flex;
    flex-direction: column;
  }

  .form-link {
    text-decoration: none;
    color: var(--choko-color);
    text-align: center;
    margin: 20px;
    font-weight: bold;
    &:hover {
      cursor: pointer;
      color: var(--brand-color-hover);
    }
  }
`;
