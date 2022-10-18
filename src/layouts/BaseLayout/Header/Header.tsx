import logo from "../../../assets/images/logo.svg";
import s from "./Header.module.css";
import { Container } from "../Container/Container";
import { Link } from "react-router-dom";
import { UserItem } from "./UserItem/UserItem";
import { Button } from "@mui/material";
import { useAppSelector } from "../../../hooks/useAppSelector";

export const Header = () => {
  const user = useAppSelector((state) => state.auth.user);

  return (
    <nav className={s.wrapper}>
      <Container>
        <div className={s.container}>
          <Link to="">
            <img src={logo} alt="IT-INCUBATOR" className={s.logo} />
          </Link>
          {user ? (
            <UserItem />
          ) : (
            <Button variant="contained" component={Link} to="/signin">
              Sign in
            </Button>
          )}
        </div>
      </Container>
    </nav>
  );
};
