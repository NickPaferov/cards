import { Outlet } from "react-router-dom";
import { Container } from "../Container/Container";
import s from "./Main.module.css";

type PropsType = {
  center?: boolean;
  wrap?: boolean;
};

export const Main = ({ center, wrap }: PropsType) => {
  const classNameValue = [s.wrapper, ...(center ? [s.center] : [])].join(" ");

  return (
    <main className={classNameValue}>
      <Container>
        {wrap ? (
          <div className={s.wrapContainer}>
            <Outlet />
          </div>
        ) : (
          <Outlet />
        )}
      </Container>
    </main>
  );
};
