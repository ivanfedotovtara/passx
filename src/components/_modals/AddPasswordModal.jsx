import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import {
  Box,
  TextField,
  Autocomplete,
  MenuItem,
  Select,
  FormControl,
} from "@mui/material";
import axios from "axios";
import { useSelector } from "react-redux";
import { auth } from "../../helpers/dates";

import {
  ErrorNotification,
  SuccessNotification,
} from "../../helpers/notifications";

import { ToastContainer } from "react-toastify";

const initialPassword = {
  title: "",
  logo: "",
  password: "",
  category: null,
  created_on: auth,
};

const AddPasswordModal = () => {
  const authState = useSelector((state) => state.user);
  const user_id = authState.id;

  const [modalIsOpen, setIsOpen] = useState(false);
  const [inputTitle, setInputTitle] = useState("");
  const [inputData, setInputData] = useState([]);
  const [categories, setCategories] = useState([]);
  const [newPassword, setNewPassword] = useState(initialPassword);

  // open when it called
  useEffect(() => {
    setIsOpen(true);
  }, []);

  // get all categories
  useEffect(() => {
    axios.post("/api/categories", { user_id }).then((res) => {
      const data = res.data.data;
      setCategories(data);
    });
  }, []);

  // logo and title service handle
  useEffect(() => {
    axios
      .get(
        "https://autocomplete.clearbit.com/v1/companies/suggest?query=:" +
          inputTitle
      )
      .then((res) => {
        setInputData(res.data);
      });
  }, [inputTitle]);

  function handleCreatePassword(e) {
    e.preventDefault();
    axios
      .get(
        "https://autocomplete.clearbit.com/v1/companies/suggest?query=:" +
          newPassword.title
      )
      .then((res) => {
        const data = res.data;
        let findArr = data.find((x) => (x.name = newPassword.title));

        setNewPassword({
          ...newPassword,
          title: findArr.domain,
          logo: findArr.logo,
        });

        axios
          .post("/api/passwords/add", {
            title: findArr.domain,
            logo: findArr.logo,
            password: newPassword.password,
            category: newPassword.category,
            created_on: newPassword.created_on,
            user_id,
          })
          .then((res) => {
            const data = res.data;

            if (data.status == 0) {
              ErrorNotification(data.msg);
            } else {
              SuccessNotification(data.msg);

              setIsOpen(false);
            }
          });
      });
  }

  return (
    <div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setIsOpen(false)}
        style={customStyles}
        contentLabel="Example Modal"
        ariaHideApp={false}
        closeTimeoutMS={300}
      >
        <div className="dashboard__categories-modal">
          <form>
            <div className="dashboard__categories-modal-item">
              <span>Service Title</span>
              <Autocomplete
                id="service_title_and_logo"
                options={inputData}
                disableClearable
                freeSolo
                getOptionLabel={(option) => option.name}
                renderOption={(props, option) => (
                  <Box
                    component="li"
                    sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
                    {...props}
                  >
                    <img loading="lazy" width="20" src={option.logo} alt="" />
                    {option.name}
                  </Box>
                )}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label=""
                    onChange={(e) => {
                      setInputTitle(e.target.value);

                      setNewPassword({
                        ...newPassword,
                        title: e.target.value,
                      });
                    }}
                    inputProps={{
                      ...params.inputProps,
                      autoComplete: "new-password", // disable autocomplete and autofill
                    }}
                  />
                )}
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
                onChange={(e) => {
                  setNewPassword({
                    ...newPassword,
                    password: e.target.value,
                  });
                }}
              />
            </div>
          </form>
        </div>

        <div className="dashboard__categories-modal">
          <form>
            <div className="dashboard__categories-modal-item">
              <span>Category</span>
              <FormControl>
                <Select
                  labelId="demo-simple-select-helper-label"
                  id="demo-simple-select-helper"
                  label=""
                  defaultValue=""
                  onChange={(e) => {
                    setNewPassword({
                      ...newPassword,
                      category: e.target.value,
                    });
                  }}
                >
                  {categories.map((x, index) => {
                    return (
                      <MenuItem value={x.id} key={index}>
                        {x.title}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
            </div>

            <button onClick={(e) => handleCreatePassword(e)}>
              Add New Password
            </button>
          </form>
        </div>
      </Modal>
      <ToastContainer />
    </div>
  );
};

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

export default AddPasswordModal;
