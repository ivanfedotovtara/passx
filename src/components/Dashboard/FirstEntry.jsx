import React, { useState } from "react";
import AddPasswordModal from "../_modals/AddPasswordModal";

export default function FirstEntry() {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="dashboard__firstEntry">
      <h2>Add first password in our secure repository</h2>

      <button onClick={() => setShowModal(true)}>+</button>

      {showModal ? <AddPasswordModal /> : null}
    </div>
  );
}
