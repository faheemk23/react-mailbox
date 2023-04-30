import { NavLink } from "react-router-dom";

export function Header() {
  const activeStyle = ({ isActive }) =>
    isActive
      ? { fontWeight: 700, color: "red", borderRight: "4px solid black" }
      : {};

  return (
    <>
      {/* <h1 className="app-heading">faheem's mail box</h1> */}
      <NavLink style={activeStyle} className="nav-link" to="/">
        Inbox
      </NavLink>
      <NavLink style={activeStyle} className="nav-link" to="/spam">
        Spam
      </NavLink>
      <NavLink style={activeStyle} className="nav-link" to="/trash">
        Trash
      </NavLink>
    </>
  );
}
