import React from "react";
import "./Register.css";
import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import { AppContext } from "../../context/appContext";
import { useNavigate } from "react-router-dom";
import axios from 'axios'
export default function Register() {
  const API = process.env.REACT_APP_API
  const [msg, setMsg] = useState();
  const Navigate = useNavigate();
  const { user, setUser, users, setUsers, flag, setFlag } =
    useContext(AppContext);
const PATH = process.env.REACT_APP_PATH
  const newUser = async () => {
    if (Object.keys(user).length < 2) {
      setMsg(() => "Please complete the form");
    } else if (user.name === "" || user.email === "" || user.pass === "") {
      setMsg(() => "Fields cannot be blank");
    } else {
      // setUsers((prev) => [...prev, user]);
      user.role = "user"
      const res = await axios.post(`${API}/users/signup`,user)
      setFlag(()=>2)
      Navigate(`${PATH}/`)
    }
  };

  return (
    <div className="modal-content">
      <div className="Register-msg">{msg}</div>
      <div className="Rigister-header">
        <div className="Register-signup-title">Create Account</div>
    
      </div>
      <div className="Register-text-box">
        <input
          required
          onChange={(e) =>
            setUser((prev) => ({ ...prev, name: e.target.value }))
          }
          placeholder="Enter Name"
          autoFocus
        ></input>
      </div>
      <div className="Register-text-box">
        <input
          onChange={(e) =>
            setUser((prev) => ({ ...prev, email: e.target.value }))
          }
          placeholder="Enter Email"
        ></input>
      </div>
      <div className="Register-text-box">
        <input
          onChange={(e) =>
            setUser((prev) => ({ ...prev, pass: e.target.value }))
          }
          type="password"
          placeholder="New Password"
        ></input>
      </div>

      <div>
        <button onClick={newUser}> Sign Up</button>
      </div>
      <br></br>
      <div className="Register-login">Already have an account? <Link to={`${PATH}/login`}>Sign in</Link></div>
    </div>
  );
}
