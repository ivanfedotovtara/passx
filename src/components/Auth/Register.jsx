import React, { useState } from "react";
import axios from "axios";
import { Link, useHistory } from "react-router-dom";
import { auth } from "../../helpers/dates";
import { ErrorNotification } from "../../helpers/notifications";
import { ToastContainer } from "react-toastify";
import Greeting from "../../helpers/greeting";
import { useDispatch } from "react-redux";
import { setUser } from "../../redux/reducers/user.reducer";

const initialUserData = {
  email: "",
  password: "",
  rePassword: "",
};

export default function Register() {
  const history = useHistory();
  const dispatch = useDispatch();
  const [userData, setUserData] = useState(initialUserData);

  function onInputChange(event) {
    const { name, value } = event.target;

    setUserData({
      ...userData,
      [name]: value,
    });
  }

  function handleRegister(e) {
    e.preventDefault();

    const email = userData.email;
    const password = userData.password;
    const rePassword = userData.rePassword;

    if (password != rePassword) {
      ErrorNotification("Passwords does not matches.");
    }

    axios
      .post("/api/auth/register", {
        email,
        password,
        created_on: auth.toString(),
        last_login: auth.toString(),
        status: false,
        activated: false,
        role: 0,
      })
      .then((res) => {
        const data = res.data;
        const status = data.status;
        const msg = data.msg;
        const temp_id = data.temp_id;

        if (status == 0) {
          console.log(data);
          ErrorNotification(msg);
        } else {
          dispatch(
            setUser({
              email: email,
              status: false,
              activated: false,
              role: 0,
              temp_id,
            })
          );
          history.push("/activate");
        }
      })
      .catch((err) => console.log(err));
  }

  return (
    <div className="auth">
      <div className="container">
        <div className="auth__content">
          <div className="auth__content-form">
            <div className="row">
              <div className="col-xl-6"></div>
              <div className="col-xl-6">
                <div className="auth__content-form-control">
                  <h3 className="auth-greeting">{Greeting()}</h3>

                  <div className="register">
                    <h5>
                      <span>Register</span> your new account
                    </h5>
                    <form autoComplete="off">
                      <input
                        type="text"
                        name="email"
                        placeholder="Enter your E-mail:"
                        onChange={(e) => onInputChange(e)}
                      />
                      <input
                        type="password"
                        name="password"
                        placeholder="Enter your password:"
                        onChange={(e) => onInputChange(e)}
                      />
                      <input
                        type="password"
                        name="rePassword"
                        placeholder="Repeat your password:"
                        onChange={(e) => onInputChange(e)}
                      />
                      <button onClick={(e) => handleRegister(e)}>
                        Register
                      </button>

                      <Link to="/login" className="auth-link">
                        Login to account
                      </Link>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}
