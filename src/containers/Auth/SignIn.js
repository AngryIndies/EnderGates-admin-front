import React from "react";
import { Link, Navigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { ToastContainer, toast } from "react-toastify";

import { onSignIn } from "../../actions/authAction";

const SignIn = () => {
  const isAuthenticated = useSelector((state) => state.auth.authenticated);
  const dispatch = useDispatch();

  const signIn = () => {
    let result = dispatch(onSignIn());
    if (result.success) {
      toast.info(result.message);
    } else {
      toast.error(result.message);
    }
  };

  if (isAuthenticated) {
    return <Navigate to="/dashboard" />;
  }

  return (
    <div className="wrapper">
      <div className="full-page-background bg-darker"></div>
      <div className="d-flex align-items-center justify-content-center h-100 w-100 flex-column">
        <div className="card card-flat" style={{ width: "300px" }}>
          <div className="card-header text-center bg-transparent border-0">
            <Link href="/">
              <img
                className="block-center rounded width_50"
                src="../assets/img/logo/logo.png"
                alt="Logo"
              />
            </Link>
          </div>
          <div className="card-body">
            <p className="text-center py-2 text-bold">SIGN IN TO CONTINUE.</p>
            <div id="loginForm" noValidate>
              <button
                className="btn btn-block btn-primary mt-3"
                onClick={() => signIn()}
              >
                SIGN IN
              </button>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer
        autoClose={3000}
        hideProgressBar={true}
        theme="colored"
        position="bottom-right"
      />
    </div>
  );
};

export default SignIn;
