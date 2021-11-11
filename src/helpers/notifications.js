import React from "react";
import { ToastContainer, toast } from "react-toastify";

export function ErrorNotification(props) {
  toast.error(props, {
    position: "top-center",
    autoClose: 2500,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: true,
  });

  return <ToastContainer />;
}

export function WarningNotification(props) {
  toast.warn(props, {
    position: "top-center",
    autoClose: 2500,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: true,
  });

  return <ToastContainer />;
}

export function SuccessNotification(props) {
  toast.success(props, {
    position: "top-center",
    autoClose: 2500,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: true,
  });

  return <ToastContainer />;
}

export function InfoNotification(props) {
  toast.info(props, {
    position: "top-center",
    autoClose: 2500,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: true,
  });

  return <ToastContainer />;
}
