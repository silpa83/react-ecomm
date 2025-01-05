import React from "react";
import { useContext } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import { AppContext } from "../../context/appContext";
export default function Navbar() {
  const { cartItems, orders, user, setUser, flag, setFlag } =
    useContext(AppContext);
  const PATH = process.env.REACT_APP_PATH;
  const values = Object.values(cartItems);
  let total = values.filter((elem) => elem > 0);
  total = total.length;
  const myOrders = orders.filter((elem) => elem.email === user.email);
  const handleLogout = () => {
    setUser((prev) => ({ ...prev, ...{ name: "", email: "", pass: "" } }));
    setFlag((prev) => 0);
  };
  return (
    <div className="navbar">
      <div className="title">My Store</div>
      <div>
        <h3>{flag > 1 && user.name}</h3>
      </div>
      <div className="links">
        <Link to={`${PATH}/`}> Products </Link>
        {(myOrders.length > 0 && flag > 1) && (
          <Link to={`${PATH}/order`}> Orders({myOrders.length}) </Link>
        )}
        <Link to={`${PATH}/cart`}> Cart({total}) </Link>
        {flag < 2 ? (
          <Link to={`${PATH}/login`}>Login</Link>
        ) : (
          <Link to={`${PATH}/login`} onClick={handleLogout}>
            Logout
          </Link>
        )}
      </div>
    </div>
  );
}
