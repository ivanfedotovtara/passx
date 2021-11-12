import axios from "axios";
import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import { useSelector } from "react-redux";

export default function FirstEntry() {
  const userState = useSelector((state) => state.user);
  const user_id = userState.id;

  const [modalIsOpen, setIsOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  const [logoImg, setLogoImg] = useState('')

  useEffect(() => {
    axios.post("/api/categories", { user_id }).then((res) => {
      const data = res.data.data;
      console.log(data);
      setCategories(data);
    });

    axios.get('https://logo.clearbit.com/microsoft.com')
    .then(res => {
      console.log('logo: ', res)

      setLogoImg(res.data)
    })
    .catch(err => console.log(err))
  }, []);

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  return (
    <div className="dashboard__firstEntry">
      <h2>Add first password in our secure repository</h2>

      <button onClick={openModal}>+</button>

      <img src={logoImg} alt="" />
      <img src="https://logo.clearbit.com/vk.com" alt="" />

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
        ariaHideApp={false}
        closeTimeoutMS={300}
      >
        <div className="dashboard__categories-modal">
          <form>
            <div className="dashboard__categories-modal-item">
              <span>Service Title</span>
              <input
                type="text"
                name="title"
                // placeholder="Example: Instagram"
                maxLength="30"
              />
            </div>
          </form>
        </div>

        <div className="dashboard__categories-modal">
          <form>
            <div className="dashboard__categories-modal-item">
              <span>Service Password</span>
              <input
                type="password"
                name="password"
                // placeholder="Example: Instagram"
                maxLength="30"
              />
            </div>
          </form>
        </div>

        <div className="dashboard__categories-modal">
          <form>
            <div className="dashboard__categories-modal-item">
              <span>Category</span>
              <select>
                {categories.map((x, index) => {
                  return (
                    <option value={x.id} key={index}>
                      {x.title}
                    </option>
                  );
                })}
              </select>
            </div>
          </form>
        </div>
      </Modal>
    </div>
  );
}

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    border: "none",
    boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
    borderRadius: 20,
  },
};
