import React from "react";
import { Link, Navigate } from 'react-router-dom';
import { connect } from "react-redux";


import Logo from '../../assets/img/5HEADGAMES_Final_logo.png';
import { onSignout } from '../../actions/authAction';

// import '../../assets/js/app';
// import '../../assets/vendor/bootstrap/dist/js/bootstrap';

import '../../../node_modules/bootstrap/dist/js/bootstrap.min.js';

const Header = ({onSignout, isAuthenticated}) => {

    const signout = () => {
        // localStorage.removeItem('EndersGate');
        onSignout();
    }

    // if(isAuthenticated){
    //     return <Navigate to="/dashboard" />
    // }

    return (
        <header className="topnavbar-wrapper">
            <nav className="navbar topnavbar">
                <div className="navbar-header">
                    <Link className="navbar-brand" to="/">
                        <div className="brand-logo">
                            <img className="img-fluid" src={Logo} alt="App Logo"  style={{ 'width' : '50%'}}/>
                        </div>
                        <div className="brand-logo-collapsed">
                            <img className="img-fluid" src="img/logo-single.png" alt="App Logo"/>
                        </div>
                    </Link>
               </div>
                <ul className="navbar-nav mr-auto flex-row">
                    <li className="nav-item">
                        <Link className="nav-link d-none d-md-block d-lg-block d-xl-block" to="#" data-trigger-resize="" data-toggle-state="aside-collapsed">
                            <em className="fas fa-align-left"></em>
                        </Link>
                        <Link className="nav-link sidebar-toggle d-md-none" to="#" data-toggle-state="aside-toggled" data-no-persist="true">
                            <em className="fas fa-align-left"></em>
                        </Link>
                    </li>
                    {/* <li className="nav-item">
                        <Link className="nav-link" to="#" data-search-open="">
                            <em className="fas fa-search"></em>
                        </Link>
                    </li> */}
                </ul>
                <ul className="navbar-nav flex-row">
                    <li className="nav-item dropdown dropdown-list">
                        <Link className="nav-link dropdown-toggle dropdown-toggle-nocaret" to="#" data-toggle="dropdown">
                            <em className="fas fa-envelope"></em>
                            <span className="badge badge-danger">300</span>
                        </Link>
                        <div className="dropdown-menu dropdown-menu-right animated bounceIn">
                            <div className="dropdown-header">You have 5 new messages</div>
                            <div data-scrollable data-height="210">
                                <div className="dropdown-item">
                                <div className="list-group">
                                    <div className="list-group-item list-group-item-action">
                                        <div className="media">
                                            <div className="align-self-start mr-2">
                                                {/* <img className="media-object rounded" style="width: 48px; height: 48px;" src="img/user/01.jpg" alt="Image" /> */}
                                            </div>
                                            <div className="media-body clearfix"><small className="float-right">2h</small><strong className="media-heading text-primary"><span className="p-1 rounded d-inline-block bg-success mr-2"></span><span>Sheila Carter</span></strong>
                                            <p className="mb-sm"><small>Cras sit amet nibh libero, in gravida nulla. Nulla...</small></p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                </div>
                                <div className="dropdown-item">
                                <div className="list-group">
                                    <div className="list-group-item list-group-item-action">
                                        <div className="media">
                                            <div className="align-self-start mr-2">
                                                {/* <img className="media-object rounded" style="width: 48px; height: 48px;" src="img/user/04.jpg" alt="Image" /> */}
                                            </div>
                                            <div className="media-body clearfix">
                                                <small className="float-right">3h</small>
                                                <strong className="media-heading text-primary">
                                                    <span className="p-1 rounded d-inline-block bg-success mr-2"></span>
                                                    <span>Rich Reynolds</span>
                                                </strong>
                                                <p className="mb-sm">
                                                    <small>Cras sit amet nibh libero, in gravida nulla. Nulla...</small>
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                </div>
                                <div className="dropdown-item">
                                <div className="list-group">
                                    <div className="list-group-item list-group-item-action">
                                        <div className="media">
                                            <div className="align-self-start mr-2">
                                                {/* <img className="media-object rounded" style="width: 48px; height: 48px;" src="img/user/03.jpg" alt="Image" /> */}
                                            </div>
                                            <div className="media-body clearfix">
                                                <small className="float-right">4h</small>
                                                <strong className="media-heading text-primary">
                                                    <span className="p-1 rounded d-inline-block bg-danger mr-2"></span>
                                                    <span>Beverley Pierce</span>
                                                </strong>
                                                <p className="mb-sm">
                                                    <small>Cras sit amet nibh libero, in gravida nulla. Nulla...</small>
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                </div>
                                <div className="dropdown-item">
                                <div className="list-group">
                                    <div className="list-group-item list-group-item-action">
                                        <div className="media">
                                            <div className="align-self-start mr-2">
                                                {/* <img className="media-object rounded" style="width: 48px; height: 48px;" src="img/user/05.jpg" alt="Image" /> */}
                                            </div>
                                            <div className="media-body clearfix">
                                                <small className="float-right">4h</small>
                                                <strong className="media-heading text-primary">
                                                    <span className="p-1 rounded d-inline-block bg-danger mr-2"></span>
                                                    <span>Perry Cole</span>
                                                </strong>
                                                <p className="mb-sm">
                                                    <small>Cras sit amet nibh libero, in gravida nulla. Nulla...</small>
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                </div>
                                <div className="dropdown-item">
                                <div className="list-group">
                                    <div className="list-group-item list-group-item-action">
                                        <div className="media">
                                            <div className="align-self-start mr-2">
                                                {/* <img className="media-object rounded" style="width: 48px; height: 48px;" src="img/user/06.jpg" alt="Image" /> */}
                                            </div>
                                            <div className="media-body clearfix">
                                                <small className="float-right">4h</small>
                                                <strong className="media-heading text-primary">
                                                    <span className="p-1 rounded d-inline-block bg-danger mr-2"></span>
                                                    <span>Carolyn Carpenter</span>
                                                </strong>
                                                <p className="mb-sm">
                                                    <small>Cras sit amet nibh libero, in gravida nulla. Nulla...</small>
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                </div>
                            </div>
                            <div className="p-3 text-center"><small className="text-primary">READ ALL</small></div>
                        </div>
                    </li>
                    <li className="nav-item dropdown dropdown-list">
                        <Link className="nav-link dropdown-toggle dropdown-toggle-nocaret" to="#" data-toggle="dropdown">
                            <em className="fas fa-bell"></em>
                            <span className="badge badge-info">120</span>
                        </Link>
                        <div className="dropdown-menu dropdown-menu-right animated bounceIn">
                            <div className="dropdown-item">
                                <div className="list-group">
                                    <div className="list-group-item list-group-item-action">
                                        <div className="media">
                                            <div className="align-self-start mr-3">
                                                <em className="far fa-envelope fa-2x text-success"></em>
                                            </div>
                                            <div className="media-body">
                                                <p className="mb-1">Unread messages</p>
                                                <p className="m-0 text-muted text-sm">You have 10 unread messages</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="list-group-item list-group-item-action">
                                        <div className="media">
                                            <div className="align-self-start mr-3">
                                                <em className="fas fa-cog fa-2x"></em>
                                            </div>
                                            <div className="media-body">
                                                <p className="mb-1">New settings</p>
                                                <p className="m-0 text-muted text-sm">There are new settings available</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="list-group-item list-group-item-action">
                                        <div className="media">
                                            <div className="align-self-start mr-3">
                                                <em className="fas fa-fire fa-2x"></em>
                                            </div>
                                            <div className="media-body">
                                                <p className="mb-1">Updates</p>
                                                <p className="m-0 text-muted">
                                                    <small>There are<strong className="mx-1 text-primary">2</strong>new updates available</small>
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="list-group-item list-group-item-action">
                                        <span className="d-flex align-items-center">
                                            <small>Unread notifications</small>
                                            <span className="badge bg-gray ml-auto">14</span>
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </li>
                    <li className="nav-item dropdown">
                        <Link className="nav-link dropdown-toggle dropdown-toggle-nocaret" data-toggle="dropdown"><em className="fas fa-user"></em></Link>
                        <div className="dropdown-menu dropdown-menu-right animated bounceIn">
                            <div className="dropdown-item">
                                <div className="p-1">
                                    <p>Overall progress</p>
                                    <div className="progress progress-xs m-0">
                                        <div className="progress-bar progress-bar-striped bg-success" role="progressbar" aria-valuenow="80" aria-valuemin="0" aria-valuemax="100" style={{'width': '80%', }}>
                                            <span className="sr-only">80% Complete</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="dropdown-divider"></div>
                            <div className="dropdown-item">Profile</div>
                            <div className="dropdown-item">Settings</div>
                            <div className="dropdown-item">Notifications<div className="badge badge-info float-right">5</div>
                            </div>
                            <div className="dropdown-item">Messages<div className="badge badge-danger float-right">10</div>
                            </div>
                            <div className="dropdown-item">Logout</div>
                        </div>
                    </li>
                    <li className="nav-item dropdown">
                        <div className="nav-link dropdown-toggle dropdown-toggle-nocaret" onClick={() => signout()}><em className="fas fa-sign-out-alt"></em></div>
                    </li>
                    {/* <li className="nav-item">
                        <Link className="nav-link" to="#" data-toggle-state="offsidebar-open" data-no-persist="true">
                            <em className="fas fa-align-right"></em>
                        </Link>
                    </li> */}
                </ul>
            
                <form className="navbar-form" role="search" action="search.html">
                    <div className="form-group">
                        <input className="form-control" type="text" placeholder="Type and hit enter ..." />
                        <div className="fas fa-times navbar-form-close" data-search-dismiss=""></div>
                    </div>
                    <button className="d-none" type="submit">Submit</button>
                </form>
            </nav>
        </header>
    );
}


const mapStateToProps = (state) => ({
    isAuthenticated : state.authReducer.isAuthenticated,
});

export default connect(mapStateToProps, {
    onSignout,
})(Header);