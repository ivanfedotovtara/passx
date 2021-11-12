import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { ErrorNotification } from "../../helpers/notifications";
import { setUser } from "../../redux/reducers/user.reducer";
import { useHistory } from "react-router-dom";
import { ToastContainer } from "react-toastify";

const initialLoginData = {
  email: "",
  password: "",
};

export default function Login() {
  const dispatch = useDispatch();
  const history = useHistory();
  const [userData, setUserData] = useState(initialLoginData);

  function onInputChange(event) {
    const { name, value } = event.target;

    setUserData({
      ...userData,
      [name]: value,
    });
  }

  function handleLogin(e) {
    e.preventDefault();

    const email = userData.email;
    const password = userData.password;

    axios
      .post("/api/auth/login", {
        email,
        password,
      })
      .then((res) => {
        const data = res.data;
        const status = data.status;
        const msg = data.msg;
        const user_id = data.user_id;

        if (status == 0) {
          console.log(data);
          ErrorNotification(msg);
        } else {
          dispatch(
            setUser({
              email: email,
              status: true,
              activated: true,
              role: 0,
              temp_id: "",
              user_id,
            })
          );
          history.push("/dashboard");
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
                  <h3 className="auth-greeting">Good morning!</h3>

                  <div className="login">
                    <h5>
                      <span>Login</span> to your account
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
                      <button onClick={(e) => handleLogin(e)}>Login</button>

                      <Link to="/register" className="auth-link">
                        Create account
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
