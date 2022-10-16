import { Link } from "react-router-dom";

export const HomePage = () => {
  return (
    <ul>
      <li>
        <Link to="">Home Page</Link>
      </li>
      <li>
        <Link to="signin">Sign In Page</Link>
      </li>
      <li>
        <Link to="signup">Sign Up Page</Link>
      </li>
      <li>
        <Link to="profile">Profile Page</Link>
      </li>
      <li>
        <Link to="forgot-password">Forgot Password Page</Link>
      </li>
      <li>
        <Link to="reset-password">Reset Password Page</Link>
      </li>
      <li>
        <Link to="abrakadabra">Not Found Page</Link>
      </li>
    </ul>
  );
};
