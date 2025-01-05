import React from "react";
import { useContext } from "react";
import { AppContext } from "../../context/appContext";
import "./AddButton.css";
export default function AddButton(props) {
  const { cartItems, setCartItems} = useContext(AppContext);
  const addtoCart = (id) => {
    setCartItems((prev) => ({ ...prev, [id]: (prev[id] ?? 0) + 1 }));
  };
  const updateCart = (id, qty) => {
    setCartItems((prev) => ({ ...prev, [id]: qty }));
  };

  if (!cartItems[props.id]) {
    return (
      <div>
        <button className="AddButton-button" onClick={() => addtoCart(props.id)}>
          Add
        </button>
      </div>
    );
  } else {
    return (
      <div>
        <button
          className="Plusminus-button" 
          onClick={() => updateCart(props.id, cartItems[props.id] - 1)}
        >
          -
        </button>
        <input disabled type="text" className="Txtbox" value={cartItems[props.id]}></input>
        <button
          className="Plusminus-button"
          onClick={() => updateCart(props.id, cartItems[props.id] + 1)}
        >
          +
        </button>
      </div>
    );
  }
}
