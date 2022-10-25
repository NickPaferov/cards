import { useAppSelector } from "../../hooks/useAppSelector";
import { Navigate, useNavigate } from "react-router-dom";
import { authThunks, UserDomainType } from "../../store/auth-reducer";
import s from "../ProfilePage/ProfilePage.module.css";
import { EditableSpan } from "../../components/EditableSpan/EditableSpan";
import { Button, FormControl, IconButton } from "@mui/material";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import mockUserPic from "../../assets/images/mock-user-pic.jpg";
import { useAppDispatch } from "../../hooks/useAppDispatch";

export const ProfilePage = () => {
  let user = useAppSelector<UserDomainType>((state) => state.auth.user);
  let name = user?.name;
  let email = user?.email;
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const onChangeName = (name: string) => {
    dispatch(authThunks.changeData({ name }));
  };

  const handleLogout = () => {
    dispatch(authThunks.logout());
  };
  if (!name) {
    return <Navigate to="/signin" />;
  }

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
                  {email}
                </p>
              </h3>
              <div className={s.fieldsContainer}></div>
            </FormControl>
            <Button onClick={handleLogout} variant="outlined" color={"inherit"}>
              Log out
            </Button>
          </div>
        </form>
      </div>
    </>
  );
};
