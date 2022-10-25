import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Checkbox,
  FormControl,
  FormControlLabel,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
  TextField,
} from "@mui/material";
import { useState } from "react";
import s from "./SignInPage.module.css";
import { SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Link, Navigate } from "react-router-dom";
import { authThunks } from "../../store/auth-reducer";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { LoadingButton } from "@material-ui/lab";
import { useAppSelector } from "../../hooks/useAppSelector";

const schema = yup.object({
  email: yup.string().required("Email is required").email("Invalid email"),
  password: yup.string().required("Password is required"),
});

export const SignInPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<Inputs>({
    resolver: yupResolver(schema),
  });
  const dispatch = useAppDispatch();
  const isAuth = useAppSelector((state) => !!state.auth.user);

  const onSubmit: SubmitHandler<Inputs> = (values) => {
    dispatch(authThunks.signIn(values));
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  if (isAuth) {
    return <Navigate to="/profile" />;
  }

  return (
    <div className={s.wrapper}>
      <h1>Sign In</h1>
      <form onSubmit={handleSubmit(onSubmit)} className={s.form}>
        <div className={s.fieldsContainer}>
          <TextField
            label={errors.email ? errors.email.message : "Email"}
            variant="standard"
            {...register("email")}
            error={!!errors.email}
          />
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
          <FormControlLabel
            control={<Checkbox defaultChecked />}
            label="Remember me"
            {...register("rememberMe")}
          />
        </div>
        <div className={s.forgotPasswordContainer}>
          <Link className={s.forgotPasswordLink} to="/forgot-password">
            Forgot Password?
          </Link>
        </div>
        <LoadingButton
          type="submit"
          className={s.button}
          loading={isSubmitting}
          loadingPosition="start"
          variant="contained"
          startIcon={<></>}
        >
          Sign In
        </LoadingButton>
      </form>
      <div className={s.signInContainer}>
        <span className={s.signInText}>Already have an account?</span>
        <Link className={s.signInLink} to="/signup">
          Sign Up
        </Link>
      </div>
    </div>
  );
};

type Inputs = {
  email: string;
  password: string;
  rememberMe: boolean;
};
