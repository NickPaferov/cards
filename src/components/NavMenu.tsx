import { NavLink } from "react-router-dom";

export const NavMenu = () => {
  return (
    <ul>
      <li>
        <NavLink to="test">Test Page </NavLink>
      </li>
      <li>
        <NavLink to="">Home Page</NavLink>
      </li>
      <li>
        <NavLink to="signin">Sign In Page</NavLink>
      </li>
      <li>
        <NavLink to="signup">Sign Up Page</NavLink>
      </li>
      <li>
        <NavLink to="profile">Profile Page</NavLink>
      </li>
      <li>
        <NavLink to="forgot-password">Forgot Password Page</NavLink>
      </li>
      <li>
        <NavLink to="reset-password">Reset Password Page</NavLink>
      </li>
      <li>
        <NavLink to="abrakadabra">Not Found Page</NavLink>
      </li>
    </ul>
  );
};
