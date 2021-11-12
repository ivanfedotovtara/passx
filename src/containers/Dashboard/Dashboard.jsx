import React from "react";
import FirstEntry from "../../components/Dashboard/FirstEntry";
// import Categories from "../../components/Dashboard/Categories";
import Header from "../../components/Dashboard/Header";

export default function Dashboard() {
  console.log('Dashboard')
  return (
    <div className="dashboard">
      <Header />

      <div className="dashboard__content">
        {/* <Categories /> */}

        <FirstEntry />
      </div>
    </div>
  );
}
