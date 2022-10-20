import { useAppSelector } from "../../hooks/useAppSelector";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthStateType, authThunks } from "../../store/auth-reducer";
import s from "../ProfilePage/ProfilePage.module.css";
import { EditableSpan } from "../../components/EditableSpan/EditableSpan";
import { Button, FormControl, IconButton } from "@mui/material";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import mockUserPic from "../../assets/images/mock-user-pic.jpg";
import { useAppDispatch } from "../../hooks/useAppDispatch";

export const ProfilePage = () => {
  const state = useAppSelector<AuthStateType>((state) => state.auth);
  const navigate = useNavigate();
  const name = state.user?.name;
  console.log(state);
  useEffect(() => {
    state.user == null && navigate("/signin");
  }, [state]);
  const dispatch = useAppDispatch();
  const onChangeName = (name: string) => {
    dispatch(authThunks.changeData({ name }));
  };
  return (
    <>
      <IconButton onClick={() => navigate("/")} color="default">
        <KeyboardBackspaceIcon fontSize={"small"} color={"disabled"} />
        <p color={"0f172a"}> Back to Packs List</p>
      </IconButton>
      <div className={s.wrapper}>
        <h1>Profile</h1>
        <form className={s.form}>
          <div className={s.fieldsContainer}>
            <FormControl variant="standard">
              <div className={s.renameContainer}>
                <img src={mockUserPic} alt="Ivan" width={"200px"} />
                <EditableSpan title={name!} changeTitle={onChangeName} />
              </div>
              <h3>
                <p className={s.textMail} color={"0f172a"}>
                  {state.user?.email}
                </p>
              </h3>
              <div className={s.fieldsContainer}></div>
            </FormControl>
            <Button variant="outlined" color={"inherit"}>
              Log out
            </Button>
          </div>
        </form>
      </div>
    </>
  );
};

// type Inputs = {
//     name: string;
// };
