import { ReactNode } from "react";
import s from "./Container.module.css";

type PropsType = {
  children: ReactNode;
};

export const Container = ({ children }: PropsType) => {
  return <div className={s.wrapper}>{children}</div>;
};
