import { TextField } from "@mui/material";
import s from "./ForgotPasswordPage.module.css";
import { useForm, SubmitHandler } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { authThunks } from "../../store/auth-reducer";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { LoadingButton } from "@material-ui/lab";
import { useState } from "react";
import { Navigate } from "react-router-dom";

const schema = yup.object({
  email: yup.string().required("Email is required").email("Invalid email"),
});

export const ForgotPasswordPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<Inputs>({
    resolver: yupResolver(schema),
  });
  const [isSuccessful, setIsSuccessful] = useState(false);
  const dispatch = useAppDispatch();

  const onSubmit: SubmitHandler<Inputs> = async ({ email }) => {
    const from = "test-front-admin <ai73a@yandex.by>";
    const message = `<div style=\"background-color: lime; padding: 15px\">password recovery link:<a href='http://localhost:3000/cards?#/reset-password/$token$'>link</a></div>`;

    const isSuccessful = await dispatch(
      authThunks.forgotPassword({ email, from, message })
    );
    setIsSuccessful(isSuccessful);
  };

  if (isSuccessful) {
    return <Navigate to="/" />;
  }

  return (
    <div className={s.wrapper}>
      <h1>Forgot Password</h1>
      <form onSubmit={handleSubmit(onSubmit)} className={s.form}>
        <div className={s.fieldsContainer}>
          <TextField
            label={errors.email ? errors.email.message : "Email"}
            variant="standard"
            {...register("email")}
            error={!!errors.email}
          />
        </div>
        <LoadingButton
          type="submit"
          className={s.button}
          loading={isSubmitting}
          loadingPosition="start"
          variant="contained"
          startIcon={<></>}
        >
          Forgot
        </LoadingButton>
      </form>
    </div>
  );
};

type Inputs = {
  email: string;
  from: string;
  message: string;
};
