import { Button } from "@mui/material";
import s from "./SuccessfulScreen.module.css";
import letter from "../../../assets/images/letter.svg";
import { Link, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";

export const SuccessfulScreen = ({ email }: PropsType) => {
  const [count, setCount] = useState(5);

  useEffect(() => {
    const counInterval = setInterval(() => {
      setCount((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(counInterval);
  }, []);

  if (count === 0) {
    return <Navigate to="/signin" />;
  }

  return (
    <div className={s.wrapper}>
      <h1>Sign up successfully</h1>
      <img src={letter} alt="Letter" className={s.image} />
      <span className={s.text}>
        Your email {email}. You will be redirected to the sign in page
      </span>
      <Button variant="contained" component={Link} to="/signin">
        Back to login after {count}
      </Button>
    </div>
  );
};

type PropsType = {
  email: string;
};
