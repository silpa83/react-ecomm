import React from "react";
import { useState,useEffect,useContext } from "react";
// import products from "./products.json";
import { AppContext } from "../../context/appContext.js";
import "./Products.css";
import AddButton from "./AddButton.js";

export default function Products() {
  const PATH = process.env.REACT_APP_PATH;
  const API = process.env.REACT_APP_API;
  const { products,setProducts } = useContext(AppContext);
  const url = `${API}/products/all`;
  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.log(err));
  }, []);
  return (
    <div className="Product-container">
      {products &&
        products.map((value) => (
          <div key={value._id} className="Product-items">
            <div>
              <img
                className="Product-img"
                src={`${value.url}`}
                alt={value.url}
              />
            </div>
            <h3>{value.name}</h3>
            <p style={{ textAlign: "justify", padding: "10px" }}>
              {value.desc}
            </p>
            <div className="priceBtn">
              <div className="priceTxt">₹{value.price}</div>
              <div className="Product-button">
                <AddButton id={value._id} />
              </div>
            </div>
          </div>
        ))}
    </div>
  );
}
