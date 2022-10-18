import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  FormControl,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
  TextField,
} from "@mui/material";
import { useState } from "react";
import s from "./SignUpPage.module.css";
import { useForm, SubmitHandler } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Link } from "react-router-dom";
import { authThunks } from "../../store/auth-reducer";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { LoadingButton } from "@material-ui/lab";
import { CheckEmailScreen } from "./CheckEmailScreen/CheckEmailScreen";

const schema = yup.object({
  email: yup.string().required("Email is required").email("Invalid email"),
  password: yup
    .string()
    .required("Password is required")
    .min(8, "Password must be more than 7 characters"),
  confirmPassword: yup
    .string()
    .required("Confirm password is required")
    .oneOf([yup.ref("password")], "Passwords does not match"),
});

export const SignUpPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSuccessful, setIsSuccessful] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    getValues,
  } = useForm<Inputs>({
    resolver: yupResolver(schema),
  });
  const dispatch = useAppDispatch();

  const onSubmit: SubmitHandler<Inputs> = async ({ email, password }) => {
    const isSuccessful = await dispatch(authThunks.signUp({ email, password }));
    setIsSuccessful(isSuccessful);
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleClickShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  if (isSuccessful) {
    return <CheckEmailScreen email={getValues("email")} />;
  }

  return (
    <div className={s.wrapper}>
      <h1>Sign Up</h1>
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
          Sign Up
        </LoadingButton>
      </form>
      <div className={s.signInContainer}>
        <span className={s.signInText}>Already have an account?</span>
        <Link className={s.signInLink} to="/signin">
          Sign In
        </Link>
      </div>
    </div>
  );
};

type Inputs = {
  email: string;
  password: string;
  confirmPassword: string;
};
