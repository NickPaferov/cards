import { Header } from "./Header/Header";
import s from "./BaseLayout.module.css";
import { Main } from "./Main/Main";
import { LinearProgress } from "@mui/material";
import { useAppSelector } from "../../hooks/useAppSelector";

type PropsType = {
  center?: boolean;
  wrap?: boolean;
};

export const BaseLayout = ({ center, wrap }: PropsType) => {
  const isLoading = useAppSelector((state) => state.app.isLoading);

  return (
    <div className={s.wrapper}>
      {isLoading && <LinearProgress />}
      <Header />
      <Main center={center} wrap={wrap} />
    </div>
  );
};
