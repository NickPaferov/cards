import s from "./UserItem.module.css";
import mockUserPic from "../../../../assets/images/mock-user-pic.jpg";

export const UserItem = () => {
  return (
    <div className={s.wrapper}>
      <span className={s.userName}>Ivan</span>
      <img src={mockUserPic} alt="Ivan" />
    </div>
  );
};
