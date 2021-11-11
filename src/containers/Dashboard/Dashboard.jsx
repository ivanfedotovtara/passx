import React from "react";
import Categories from "../../components/Dashboard/Categories";
import Header from "../../components/Dashboard/Header";

export default function Dashboard() {
  return (
    <div className="dashboard">
      <Header />

      <div className="dashboard__content">
        <Categories />
      </div>
    </div>
  );
}
