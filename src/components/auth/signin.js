import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import Dashboard from "../dashboard";
import { onSignin, onSignup } from "../../actions/authAction";

const Signin = ({onSignup, onSignin, isAuthenticated}) => {

    const signIn = async () => {
        onSignup();
    };

    if(isAuthenticated){
        return <Dashboard />
    }

    return (
        <div className="wrapper">
            <div className="full-page-background bg-darker"></div>
            <div className="d-flex align-items-center justify-content-center h-100 w-100 flex-column">
                <div className="card card-flat" style={{ "width": "300px" }}>
                    <div className="card-header text-center bg-transparent border-0">
                        <Link href="/">
                            <img className="block-center rounded width_50" src="../assets/img/logo/logo.png" alt="Logo"/>
                        </Link>
                    </div>
                    <div className="card-body">
                        <p className="text-center py-2 text-bold">SIGN IN TO CONTINUE.</p>
                        {/* <p className="pt-3 text-right"><Link className="text-muted" href="register.html">Need to Signup?</Link></p> */}
                        <div id="loginForm" noValidate>
                            {/* <div className="form-group">
                                <div className="input-group with-focus">
                                    <input className="form-control border-right-0" id="exampleInputEmail1" type="email" placeholder="Enter email" autoComplete="off" required />
                                    <div className="input-group-append">
                                        <span className="input-group-text text-muted bg-transparent border-left-0"><em className="fa fa-envelope"></em></span>
                                    </div>
                                </div>
                            </div>
                            <div className="form-group">
                                <div className="input-group with-focus">
                                    <input className="form-control border-right-0" id="exampleInputPassword1" type="password" placeholder="Password" required />
                                    <div className="input-group-append">
                                        <span className="input-group-text text-muted bg-transparent border-left-0"><em className="fa fa-lock"></em></span>
                                    </div>
                                </div>
                            </div>
                            <div className="clearfix">
                                <div className="custom-control custom-checkbox float-left mt-0">
                                    <input className="custom-control-input" id="rememberme" type="checkbox" name="remember" />
                                    <label className="custom-control-label">Remember Me</label>
                                </div>
                                <div className="float-right"><Link className="text-muted" href="recover.html">Forgot your password?</Link></div>
                            </div> */}
                            <button className="btn btn-block btn-primary mt-3" onClick={() => signIn()}>SIGN IN</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

const mapStateToProps = (state) => ({
    isAuthenticated             : state.authReducer.isAuthenticated,
    dashboardReducer_main       : state.dashboardReducer.main_data,
    dashboardReducer_chart      : state.dashboardReducer.chart_data,
    dashboardReducer_activity   : state.dashboardReducer.activity_data,
});

export default connect(mapStateToProps, {
    onSignin,
    onSignup,
})(Signin);
