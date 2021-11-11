import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export default function Categories() {
  const userState = useSelector((state) => state.user);
  const user_id = userState.id;

  const [categories, setCategories] = useState([]);
  useEffect(() => {
    axios
      .post("/api/categories", {
        user_id,
      })
      .then((res) => {
        setCategories(res.data.data);
      });
  }, []);

  return (
    <div className="container">
      <div className="dashboard__categories">
        <div className="row">
          {categories.map((x, index) => {
            return (
              <div key={index} className="col-xl-3 col-lg-3 col-md-3 col-6">
                <div className="dashboard__categories-item">
                  <span style={{ color: `${x.color}` }}>{x.icon}</span>
                  <h5>{x.title}</h5>
                </div>
              </div>
            );
          })}
          <div className="col-xl-3 col-lg-3 col-md-3 col-6">
            <div className="dashboard__categories-item">
              <span style={{ color: "#000" }}>+</span>
              <h5>Add new</h5>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
