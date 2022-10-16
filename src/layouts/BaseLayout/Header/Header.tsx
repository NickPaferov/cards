import logo from "../../../assets/images/logo.svg";
import s from "./Header.module.css";
import { Container } from "../Container/Container";
import { Link } from "react-router-dom";
import { UserItem } from "./UserItem/UserItem";
import { Button } from "@mui/material";

export const Header = () => {
  return (
    <nav className={s.wrapper}>
      <Container>
        <div className={s.container}>
          <Link to="">
            <img src={logo} alt="IT-INCUBATOR" />
          </Link>
          {true ? (
            <Button variant="contained" component={Link} to="/signin">
              Sign in
            </Button>
          ) : (
            <UserItem />
          )}
        </div>
      </Container>
    </nav>
  );
};
