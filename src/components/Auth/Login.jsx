import React from "react";
import { Link } from "react-router-dom";

export default function Login() {
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
                        name="user_passx_email"
                        placeholder="Enter your E-mail:"
                      />
                      <input
                        type="password"
                        name="user_passx_password"
                        placeholder="Enter your password:"
                      />
                      <button>Login</button>

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
    </div>
  );
}
