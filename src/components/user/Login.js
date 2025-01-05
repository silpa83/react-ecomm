import React from "react";
import { useContext } from "react";
import { AppContext } from "../../context/appContext";
import Register from "./Register";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import "./Login.css";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
export default function Login() {
  const { user, setUser, users, setUsers, flag, setFlag } =
    useContext(AppContext);
  const [visible, setvisible] = useState(false);
  const [msg, setMsg] = useState();
  const PATH = process.env.REACT_APP_PATH;
  const Navigate = useNavigate();
  const API = process.env.REACT_APP_API;
  const validateUser = async () => {
    console.log(user);
    const found = await axios.post(`${API}/users/signin`, user);
    console.log(found.data.user.name);
    // const found = users.find(
    //   (elem) => elem.email === user.email && elem.pass === user.pass
    // );
    if (found) {
      // setUser((prev) => ({ ...prev, name: found.name }));
      setUser((prev) => ({
        ...prev,
        id: found.data.user._id,
        name: found.data.user.name,
        email: found.data.user.email,
        role: found.data.user.role,
        token: found.data.token,
      }));
      setFlag(() => 2);
      Navigate(`${PATH}/order`);
    } else setMsg(() => "Invalid email or password");
  };
  return (
    <div className="Login-container">
      <div className="Login-signup-title">Sign In</div>
      <div className="">
        <div className="Login-msg">{msg}</div>
        <div className="txtBox">
          <input
            onChange={(e) =>
              setUser((prev) => ({ ...prev, email: e.target.value }))
            }
            placeholder="Enter Email"
            autoFocus
          ></input>
        </div>
        <div className="pwdEye">
          <input
            onChange={(e) =>
              setUser((prev) => ({ ...prev, pass: e.target.value }))
            }
            type={visible ? "text" : "password"}
            placeholder="Enter Passcode"
          ></input>
          <span onClick={() => setvisible(() => !visible)}>
            {visible ? <FaEye size={20} /> : <FaEyeSlash size={20} />}
          </span>
        </div>
        <div>
          <button onClick={validateUser}>Log in</button>
        </div>
        <br></br>
        <div>Forgot Password?</div>
        <br></br>

        <div className="Register-login">
          <Link to={`${PATH}/register`}>
            <button className="newAccBtn">Create new account</button>
          </Link>
        </div>

        <div></div>
      </div>
    </div>
  );
}
