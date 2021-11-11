import React from "react";
import SettingsIcon from "../../assets/img/icons/settings.png";
import AccountIcon from "../../assets/img/icons/account.png";

export default function Menu() {
  return (
    <div className="dashboard__menu">
      <div className="dashboard__menu-section">
        <div className="dashboard__menu-section-container">
          <div className="dashboard__menu-section-img">
            <img src={SettingsIcon} alt="settings-icon" />
          </div>

          <div style={{ paddingLeft: 15 }}>
            <h4>Settings</h4>
            <span>No alerts</span>
          </div>
        </div>
      </div>
      <div className="dashboard__menu-section">
        <div className="dashboard__menu-section-container">
          <div className="dashboard__menu-section-img">
            <img src={AccountIcon} alt="settings-icon" />
          </div>

          <div style={{ paddingLeft: 15 }}>
            <h4>Personal info</h4>
            <span>0 information</span>
          </div>
        </div>
      </div>
    </div>
  );
}
