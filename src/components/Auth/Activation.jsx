import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";
import { updateActivation } from "../../redux/reducers/user.reducer";

export default function Activation() {
  const history = useHistory();
  const dispatch = useDispatch();
  const [code, setCode] = useState(null);

  const userState = useSelector((state) => state.user);
  const temp_id = userState.temp_id;

  function compare(e) {
    e.preventDefault();
    if (Number(code) == temp_id) {
      dispatch(updateActivation()); // update the redux state
      history.push("/dashboard"); // redirect to dashboard

      axios
        .post("/api/auth/activate", {
          email: userState.email,
          tempId: code,
        })
        .then((res) => {
          console.log(res);
        });
    } else console.log("Not equal");
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
                  <div className="login">
                    <h5>
                      <span>Activate</span> your account
                    </h5>
                    <form autoComplete="off">
                      <input
                        type="text"
                        name="activate_code"
                        placeholder="Enter the code from your mail:"
                        maxLength="6"
                        onChange={(e) => setCode(e.target.value)}
                      />
                      <button onClick={(e) => compare(e)}>Activate</button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
