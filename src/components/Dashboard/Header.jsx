import React from "react";
import Menu from "./Menu";

export default function Header() {
  return (
    <div className="dashboard__header">
      <h1 className="dashboard__header-count">72*</h1>
      <h4 className="dashboard__header-status">Passwords are secured</h4>

      <Menu />
    </div>
  );
}
