import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";

import {
  SuccessNotification,
  ErrorNotification,
} from "../../helpers/notifications";

import Modal from "react-modal";

import { colors, symbols } from "../../assets/data/categories";

const initialCategory = {
  title: "",
  icon: "",
  color: "",
  user_id: "",
};

export default function Categories() {
  const userState = useSelector((state) => state.user);
  const user_id = userState.id;

  const [categories, setCategories] = useState([]);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [testColor, setTestColor] = useState("#000");
  const [createCategory, setCreateCategory] = useState(initialCategory);
  const [createCategoryIcon, setCreateCategoryIcon] = useState("♦");

  useEffect(() => {
    axios
      .post("/api/categories", {
        user_id,
      })
      .then((res) => {
        setCategories(res.data.data);
      });
  }, []);

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  function handleCreateCategory(e) {
    e.preventDefault();
    axios
      .post("/api/categories/create", {
        title: createCategory.title,
        icon: createCategoryIcon,
        color: testColor,
        user_id,
      })
      .then((res) => {
        const data = res.data;
        const status = data.status;
        console.log(res.data);

        if (status == 0) {
          ErrorNotification(data.msg);
        } else {
          SuccessNotification(data.msg);
          closeModal();
        }
      });
  }

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
            <div
              className="dashboard__categories-item"
              onClick={() => openModal()}
            >
              <span style={{ color: "#000" }}>+</span>
              <h5>Add new</h5>
            </div>
          </div>
        </div>
      </div>

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
              <span>Category</span>
              <input
                type="text"
                name="title"
                placeholder="Enter the category title:"
                value={createCategory.title}
                onChange={(e) => setCreateCategory({ title: e.target.value })}
                maxLength="30"
              />
            </div>
            <div className="dashboard__categories-modal-item">
              <span>Color</span>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                {colors.slice(0, 10).map((x, index) => {
                  return (
                    <div key={index} onClick={() => setTestColor(x.hex)}>
                      <span
                        style={{
                          color: x.hex,
                          fontSize: 30,
                          cursor: "pointer",
                        }}
                      >
                        🞓
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="dashboard__categories-modal-item">
              <span>Symbol</span>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                {symbols.slice(0, 10).map((x, index) => {
                  return (
                    <div key={index}>
                      <span
                        style={{
                          color: testColor,
                          fontSize: 30,
                          cursor: "pointer",
                        }}
                        onClick={() => setCreateCategoryIcon(x.item)}
                      >
                        {x.item}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            <button onClick={(e) => handleCreateCategory(e)}>Create</button>
          </form>
        </div>
      </Modal>
      <ToastContainer />
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
