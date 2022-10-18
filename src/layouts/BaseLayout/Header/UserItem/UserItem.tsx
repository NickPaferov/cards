import s from "./UserItem.module.css";
import mockUserPic from "../../../../assets/images/mock-user-pic.jpg";
import { useAppSelector } from "../../../../hooks/useAppSelector";

export const UserItem = () => {
  const name = useAppSelector((state) => state.auth.user?.name);

  return (
    <div className={s.wrapper}>
      <span className={s.userName}> {name} </span>
      <img src={mockUserPic} alt="Ivan" />
    </div>
  );
};
