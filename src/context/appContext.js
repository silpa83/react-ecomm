import { createContext, useState } from "react";
// import products from "../components/product/products.json";
export const AppContext = createContext(null);

export const AppContextProvider = (props) => {
  const [cartItems, setCartItems] = useState({});
  const [orders, setOrders] = useState([]);
  const [user, setUser] = useState({});
  const [users, setUsers] = useState([]);
  const [flag, setFlag] = useState(0);
  const [products, setProducts] = useState(0);
 
  const val = {
    cartItems,
    setCartItems,
    products,
    setProducts,
    orders,
    setOrders,
    user,
    setUser,
    users,
    setUsers,
    flag,
    setFlag,
  };
  return (
    <AppContext.Provider value={val}>{props.children}</AppContext.Provider>
  );
};
