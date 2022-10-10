import React, { useEffect, useState } from "react";
import { connect, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import {onSetSidebarTag} from '../../actions/sidebarAction'
import { SIDEBAR_TAG_DASHBOARD, SIDEBAR_TAG_LEADERBOARD } from "../../actions/types";
import GLOBAL from '../../global/variable';

import avatar from '../../assets/img/ProfileImages/0.png';
// import avatar1 from '../../assets/img/ProfileImages/1.png';
// import avatar2 from '../../assets/img/ProfileImages/2.png';
// import avatar3 from '../../assets/img/ProfileImages/3.png';
// import avatar4 from '../../assets/img/ProfileImages/4.png';
// import avatar5 from '../../assets/img/ProfileImages/5.png';
// import avatar6 from '../../assets/img/ProfileImages/6.png';
// import avatar7 from '../../assets/img/ProfileImages/7.png';




const Sidebar = ({onSetSidebarTag}) => {
    
    // const [tagName, setTagName] = useState(GLOBAL.DASHBOARD);

    const setSidebarTag = (type, tag) => {
        onSetSidebarTag(type, tag);
    }

    const sidebar_tag = '';
    // sidebar_tag = useSelector(({sidebar}) => sidebar.sidebar_tag);
    // console.log("sidebar tag : " + sidebar_tag);

    return (
        <aside className="aside-container">
            <div className="aside-inner">
                <nav className="sidebar" data-sidebar-anyclick-close>
                    <ul className="sidebar-nav">
                        <li className="sidebar-app-logo d-flex align-items-center justify-content-center py-3 d-md-none">
                            <img className="img-fluid" src="img/logo.png" alt="App Logo" />
                        </li>
                        <li className="has-user-block">
                            <div id="user-block" data-toggle="collapse" data-target="#user-links">
                                <div className="item user-block">
                                    <div className="user-block-content">
                                        <div className="user-block-picture">
                                            <img className="img-thumbnail rounded-circle" src={avatar} alt="Avatar" width="60" height="60" />
                                        </div>
                                        <div className="user-block-info"><span className="user-block-name">Welcome, Alex</span><span className="user-block-role">Designer</span>
                                            <div className="btn-group user-block-status">
                                                <button className="btn btn-inverse btn-xs dropdown-toggle no-caret" type="button" data-toggle="dropdown">
                                                    <div className="p-1 rounded d-inline-block bg-success mr-2"></div><span>Online</span>
                                                </button>
                                                <ul className="dropdown-menu">
                                                    <div className="dropdown-item"><span className="p-1 rounded d-inline-block bg-success mr-1 mr-2"></span>Online</div>
                                                    <div className="dropdown-item"><span className="p-1 rounded d-inline-block bg-warning mr-1 mr-2"></span>Away</div>
                                                    <div className="dropdown-item"><span className="p-1 rounded d-inline-block bg-danger mr-1 mr-2"></span>Busy</div>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </li>
                        <li className="nav collapse" id="user-links">
                            <ul className="sidebar-nav sidebar-subnav">
                                <li>
                                    <Link href="#">Profile</Link>
                                </li>
                                <li>
                                    <Link href="#">Settings</Link>
                                </li>
                                <li>
                                    <Link href="#">
                                        <span>Notifications</span>
                                        <span className="badge badge-danger float-right">120</span>
                                    </Link>
                                </li>
                                <li>
                                    <Link href="#">
                                        <span>Messages</span>
                                        <span className="badge badge-success float-right">300</span>
                                    </Link>
                                </li>
                                <li>
                                    <Link href="#">Logout</Link>
                                </li>
                            </ul>
                        </li>
                        <li className={"sidebar_tag " + `${sidebar_tag === GLOBAL.DASHBOARD ? 'active' : ''}`} onClick={() => setSidebarTag(SIDEBAR_TAG_DASHBOARD, GLOBAL.DASHBOARD)}>
                            <Link to="/" title="Dashboard">
                                {/* <div className="float-right badge badge-primary">12</div> */}
                                <em className="fas fa-tachometer-alt"></em>
                                <span>Dashboard</span>
                            </Link>
                        </li>
                        <li className={"sidebar_tag " + `${sidebar_tag === GLOBAL.LEADERBOARD ? 'active' : ''}`} onClick={() => setSidebarTag(SIDEBAR_TAG_LEADERBOARD, GLOBAL.LEADERBOARD)}>
                            <Link to="/leaderboard" title="Leaderboard">
                                {/* <div className="float-right badge badge-primary">12</div> */}
                                <em className="fas fa-tachometer-alt"></em>
                                <span>Leaderboard</span>
                            </Link>
                        </li>
                       <li className=" ">
                            <Link href="#charts" title="Charts" data-toggle="collapse">
                                <em className="fas fa-chart-bar"></em>
                                <span>Players</span>
                            </Link>
                            <ul className="sidebar-nav sidebar-subnav collapse" id="charts">
                                <li className="sidebar-subnav-header">Charts</li>
                                <li className=" ">
                                    <Link href="chart-flot.html" title="Flot"><span>Decks</span></Link>
                                </li>
                                <li className=" ">
                                    <Link href="chart-radial.html" title="Radial"><span>Radial</span></Link>
                                </li>
                            </ul>
                        </li>
                        {/* 
                        <li className=" "><Link href="#tables" title="Tables" data-toggle="collapse"><em className="fas fa-table"></em><span>Tables</span></Link>
                            <ul className="sidebar-nav sidebar-subnav collapse" id="tables">
                                <li className="sidebar-subnav-header">Tables</li>
                                <li className=" ">
                                    <Link href="table-datatable.html" title="Data Tables">
                                        <span>Data Tables</span>
                                    </Link>
                                </li>
                                <li className=" ">
                                    <Link href="table-standard.html" title="Standard">
                                        <span>Standard</span>
                                    </Link>
                                </li>
                                <li className=" ">
                                    <Link href="table-extended.html" title="Extended">
                                        <span>Extended</span>
                                    </Link>
                                </li>
                            </ul>
                        </li>
                        <li className=" "><Link href="#forms" title="Forms" data-toggle="collapse"><em className="fas fa-edit"></em><span>Forms</span></Link>
                            <ul className="sidebar-nav sidebar-subnav collapse" id="forms">
                                <li className="sidebar-subnav-header">Forms</li>
                                <li className=" "><Link href="form-standard.html" title="Standard">
                                    <span>Standard</span></Link>
                                </li>
                                <li className=" "><Link href="form-extended.html" title="Extended">
                                    <span>Extended</span></Link>
                                </li>
                                <li className=" "><Link href="form-validation.html" title="Validation">
                                    <span>Validation</span></Link>
                                </li>
                                <li className=" "><Link href="form-wizard.html" title="Wizard">
                                    <span>Wizard</span></Link>
                                </li>
                            </ul>
                        </li>
                        <li className=" "><Link href="#elements" title="Elements" data-toggle="collapse"><em className="fas fa-wrench"></em><span>Elements</span></Link>
                            <ul className="sidebar-nav sidebar-subnav collapse" id="elements">
                                <li className="sidebar-subnav-header">Elements</li>
                                <li className=" ">
                                    <Link href="cards.html" title="Cards">
                                        <span>Cards</span>
                                    </Link>
                                </li>
                                <li className=" ">
                                    <Link href="portlets.html" title="Portlets">
                                        <span>Portlets</span>
                                    </Link>
                                </li>
                                <li className=" ">
                                    <Link href="buttons.html" title="Buttons">
                                        <span>Buttons</span>
                                    </Link>
                                </li>
                                <li className=" ">
                                    <Link href="icons.html" title="Icons">
                                        <span>Icons</span>
                                    </Link>
                                </li>
                                <li className=" ">
                                    <Link href="notifications.html" title="Notifications">
                                        <span>Notifications</span>
                                    </Link>
                                </li>
                                <li className=" ">
                                    <Link href="typo.html" title="Typography">
                                        <span>Typography</span>
                                    </Link>
                                </li>
                                <li className=" ">
                                    <Link href="grid.html" title="Grid">
                                        <span>Grid</span>
                                    </Link>
                                </li>
                                <li className=" ">
                                    <Link href="grid-masonry.html" title="Grid Masonry">
                                        <span>Grid Masonry</span>
                                    </Link>
                                </li>
                                <li className=" ">
                                    <Link href="dropdown-animations.html" title="Dropdown">
                                        <span>Dropdown</span>
                                    </Link>
                                </li>
                                <li className=" ">
                                    <Link href="widgets.html" title="Widgets">
                                        <span>Widgets</span>
                                    </Link>
                                </li>
                                <li className=" ">
                                    <Link href="maps.html" title="Maps">
                                        <span>Maps</span>
                                    </Link>
                                </li>
                                <li className=" ">
                                    <Link href="calendar.html" title="Calendar">
                                        <span>Calendar</span>
                                    </Link>
                                </li>
                                <li className=" ">
                                    <Link href="spinners.html" title="Spinners">
                                        <span>Spinners</span>
                                    </Link>
                                </li>
                            </ul>
                        </li>
                        <li className=" "><Link href="#pages" title="Pages" data-toggle="collapse"><em className="far fa-file-alt"></em><span>Pages</span></Link>
                            <ul className="sidebar-nav sidebar-subnav collapse" id="pages">
                                <li className="sidebar-subnav-header">Pages</li>
                                <li className=" ">
                                    <Link href="landing.html" title="Landing">
                                        <span>Landing</span>
                                    </Link>
                                </li>
                                <li className=" ">
                                    <Link href="login.html" title="Login">
                                        <span>Login</span>
                                    </Link>
                                </li>
                                <li className=" ">
                                    <Link href="login-multi.html" title="Login Multi">
                                        <span>Login Multi</span>
                                    </Link>
                                </li>
                                <li className=" ">
                                    <Link href="register.html" title="Sign up">
                                        <span>Sign up</span>
                                    </Link>
                                </li>
                                <li className=" ">
                                    <Link href="lock.html" title="Lock">
                                        <span>Lock</span>
                                    </Link>
                                </li>
                                <li className=" ">
                                    <Link href="recover.html" title="Recover Password">
                                        <span>Recover Password</span>
                                    </Link>
                                </li>
                                <li className=" ">
                                    <Link href="template.html" title="Empty Template">
                                        <span>Empty Template</span>
                                    </Link>
                                </li>
                                <li className=" ">
                                    <Link href="timeline.html" title="Timeline">
                                        <span>Timeline</span>
                                    </Link>
                                </li>
                                <li className=" ">
                                    <Link href="inbox.html" title="Mail Inbox">
                                        <span>Mail Inbox</span>
                                    </Link>
                                </li>
                            </ul>
                        </li> */}
                    </ul>
                    <div className="nav-footer">
                        <div className="nav-footer-divider"></div>
                        <div className="btn-group text-center">
                            <button className="btn btn-link" type="button" data-toggle="tooltip" data-title="Add Contact">
                                <em className="fas fa-user text-muted"><sup className="fa fa-plus"></sup></em>
                            </button>
                            <button className="btn btn-link" type="button" data-toggle="tooltip" data-title="Settings">
                                <em className="fas fa-cog text-muted"></em>
                            </button>
                            <button className="btn btn-link" type="button" data-toggle="tooltip" data-title="Logout">
                                <em className="fas fa-sign-out-alt text-muted"></em>
                            </button>
                        </div>
                    </div>
                    </nav>
                </div>
            </aside>
    );
}


const mapStateToProps = (state) => ({
    
});

export default connect(mapStateToProps, {onSetSidebarTag})(Sidebar);