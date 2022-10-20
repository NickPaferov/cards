import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  FormControl,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
} from "@mui/material";
import { useState } from "react";
import s from "./ResetPassword.module.css";
import { useForm, SubmitHandler } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Navigate, useParams } from "react-router-dom";
import { authThunks } from "../../store/auth-reducer";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { LoadingButton } from "@material-ui/lab";

const schema = yup.object({
  password: yup
    .string()
    .required("Password is required")
    .min(8, "Password must be more than 7 characters"),
  confirmPassword: yup
    .string()
    .required("Confirm password is required")
    .oneOf([yup.ref("password")], "Passwords does not match"),
});

export const ResetPasswordPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSuccessful, setIsSuccessful] = useState(false);
  const resetPasswordToken = useParams().id;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<Inputs>({
    resolver: yupResolver(schema),
  });
  const dispatch = useAppDispatch();

  if (!resetPasswordToken) {
    return <Navigate to="/" />;
  }

  const onSubmit: SubmitHandler<Inputs> = async ({ password }) => {
    debugger;
    const isSuccessful = await dispatch(
      authThunks.resetPassword({ password, resetPasswordToken })
    );
    setIsSuccessful(isSuccessful);
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleClickShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  if (isSuccessful) {
    return <Navigate to="/signin" />;
  }

  return (
    <div className={s.wrapper}>
      <h1>Reset Password</h1>
      <form onSubmit={handleSubmit(onSubmit)} className={s.form}>
        <div className={s.fieldsContainer}>
          <FormControl variant="standard">
            <InputLabel htmlFor="password" error={!!errors.password}>
              {errors.password ? errors.password.message : "Password"}
            </InputLabel>
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton onClick={handleClickShowPassword}>
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              {...register("password")}
              error={!!errors.password}
            />
          </FormControl>
          <FormControl variant="standard">
            <InputLabel
              htmlFor="confirmPassword"
              error={!!errors.confirmPassword}
            >
              {errors.confirmPassword
                ? errors.confirmPassword.message
                : "Confirm password"}
            </InputLabel>
            <Input
              id="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton onClick={handleClickShowConfirmPassword}>
                    {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              {...register("confirmPassword")}
              error={!!errors.confirmPassword}
            />
          </FormControl>
        </div>
        <LoadingButton
          type="submit"
          className={s.button}
          loading={isSubmitting}
          loadingPosition="start"
          variant="contained"
          startIcon={<></>}
        >
          Reset Password
        </LoadingButton>
      </form>
    </div>
  );
};

type Inputs = {
  password: string;
  confirmPassword: string;
};
