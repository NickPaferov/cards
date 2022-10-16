import { Header } from "./Header/Header";
import s from "./BaseLayout.module.css";
import { Main } from "./Main/Main";
import { IconButton, LinearProgress } from "@mui/material";
import { useAppSelector } from "../../hooks/useAppSelector";
import { useSnackbar } from "notistack";
import { useEffect } from "react";
import CloseIcon from "@mui/icons-material/Close";

export const BaseLayout = ({ center, wrap }: PropsType) => {
  const { isLoading, snackbar } = useAppSelector((state) => state.app);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  useEffect(() => {
    snackbar.message &&
      enqueueSnackbar(snackbar.message, {
        variant: snackbar.variant,
        action: (key) => (
          <IconButton
            size="small"
            aria-label="close"
            color="inherit"
            onClick={() => {
              closeSnackbar(key);
            }}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        ),
      });
  }, [snackbar, enqueueSnackbar, closeSnackbar]);

  return (
    <div className={s.wrapper}>
      {isLoading && (
        <LinearProgress
          sx={{ position: "absolute", width: "100%", zIndex: 2 }}
        />
      )}
      <Header />
      <Main center={center} wrap={wrap} />
    </div>
  );
};

type PropsType = {
  center?: boolean;
  wrap?: boolean;
};
