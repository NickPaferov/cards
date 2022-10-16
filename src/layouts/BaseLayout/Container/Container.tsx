import { ReactNode } from "react";
import s from "./Container.module.css";

export const Container = ({ children }: PropsType) => {
  return <div className={s.wrapper}>{children}</div>;
};

type PropsType = {
  children: ReactNode;
};
