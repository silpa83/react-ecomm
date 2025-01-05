import React, { useContext,useEffect } from "react";
import { AppContext } from "../../context/appContext";
import "./Orders.css";
export default function Orders() {
  const { orders, setOrders, products, user } = useContext(AppContext);
  const myOrders = orders.filter(elem=>elem.email===user.email)
  const API = process.env.REACT_APP_API;
    const url = `${API}/orders/all`;
    useEffect(() => {
      fetch(url)
        .then((res) => res.json())
        .then((data) => setOrders(data))
        .catch((err) => console.log(err));
    }, []);


  return (
    <div className="Orders-container">
      <table>
        {myOrders.length > 0 && (
          <tr>
            <th>Order Date</th>
            <th>Items</th>
            <th>Total</th>
            <th>Status</th>
          </tr>
        )}
        {myOrders.map((elem, index) => (
          <tr key={index}>
            <td>{elem.date}</td>
            <td>{Object.keys(elem.items).length}</td>
            <td>₹{elem.total}</td>
            <td>{elem.status}</td>
          </tr>
        ))}
      </table>
    </div>
  );
}
