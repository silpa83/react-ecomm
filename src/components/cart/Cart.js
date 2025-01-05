import React from "react";
import cartEmpty from "../../img/cart-empty.jpg";
import { AppContext } from "../../context/appContext.js";
import { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Cart.css";
import axios from 'axios'
export default function Cart() {
  const API = process.env.REACT_APP_API;
  const { flag, cartItems, setCartItems, products, setOrders, user } =
    useContext(AppContext);
    console.log(cartItems)
    console.log(products)
  const [order, setOrder] = useState({});
  const [orderValue, setOrderValue] = useState(0);
  const [items, setItems] = useState(0);
  const navigate = useNavigate()
  useEffect(() => {
    setOrderValue((prev) =>
      products.reduce((total, value) => {
        return total + value.price * (cartItems[value._id] ?? 0);
      }, 0)
    );
    const values = Object.values(cartItems);
    let total = values.filter(((elem)=>elem>0))
    total = total.length;
    setItems(() => total);
  }, [cartItems]);

  const updateCart = (id, qty) => {
      setCartItems((prev) => ({ ...prev, [id]: qty }));
  };

  const submitOrder = async () => {
    if (flag < 2) {
      navigate("/ecomm-react/login");
    } else {
      // order.date = Date().slice(0, 15);
      order.email = user.email;
      order.details = cartItems;
      // order.items = cartItems;
      order.total = orderValue;
      order.status = "pending";
      setOrder((prev) => ({ ...prev, order }));
      // setOrders((prev) => [...prev, order]);
      const res = await axios.post(`${API}/orders/add`,order)
      setCartItems(() => []);
      navigate("/ecomm-react/order");
    }
  };

  return (
    <div className="Cart-container">
      {Object.keys(cartItems).length > 0 ? (
        <>
          <div className="Cart-div-left">
            <table className="Cart-table">
              <tr>
                <th>Item</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Total</th>
              </tr>
              {products && products.map((elem) => {
                if (cartItems[elem._id]) {
                  return (
                    <tr key={elem._id} ClassName="Cart-items">
                      <td className="Cart-item-name">{elem.name}</td>
                      <td className="Cart-item-cells">₹{elem.price}</td>
                      <td className="Cart-item-buttons">
                        <button
                          className="Cart-button"
                          onClick={() =>
                            updateCart(elem._id, cartItems[elem._id] - 1)
                          }
                        >
                          -
                        </button>
                        <span style={{ padding: "5px" }}>
                          {cartItems[elem._id]}
                        </span>
                        <button
                          className="Cart-button"
                          onClick={() =>
                            updateCart(elem._id, cartItems[elem._id] + 1)
                          }
                        >
                          +
                        </button>
                      </td>
                      <td className="Cart-item-cells">
                        ₹{elem.price * cartItems[elem._id]}
                      </td>
                    </tr>
                  );
                }
              })}
              {/* <tr><td colspan="3">Total Order Value</td><td className="Cart-order-value">{orderValue}</td></tr> */}
            </table>
          </div>
          <div className="Cart-div-right">
            <div className="Cart-order-value">
              Subtotal({items} item{items > 1 && "s"}): ₹{orderValue}
            </div>
            <div className="Cart-order-value">
              <button onClick={submitOrder} className="Cart-place-order">
                {flag < 2 ? "Login to order" : "Submit Order"}
              </button>
            </div>
          </div>
      
        </>
      ) : (
        <div>
          <img src={cartEmpty} alt="Cart is empty"></img>
        </div>
      )}
    </div>
  );
}
