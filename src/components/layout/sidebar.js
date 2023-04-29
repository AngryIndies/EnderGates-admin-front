import React from "react";
import { connect } from "react-redux";
import { Link, useLocation } from "react-router-dom";

import { onSetSidebarTag } from '../../actions/sidebarAction';
import {
    SIDEBAR_TAG_CARDS,
    SIDEBAR_TAG_CONFIG,
    SIDEBAR_TAG_DASHBOARD,
    SIDEBAR_TAG_DECKS,
    SIDEBAR_TAG_LEADERBOARD,
    SIDEBAR_TAG_PLAYERS
} from "../../actions/types";

import GLOBAL from '../../global/variable';

import avatar from '../../assets/img/ProfileImages/0.png';
// import avatar1 from '../../assets/img/ProfileImages/1.png';
// import avatar2 from '../../assets/img/ProfileImages/2.png';
// import avatar3 from '../../assets/img/ProfileImages/3.png';
// import avatar4 from '../../assets/img/ProfileImages/4.png';
// import avatar5 from '../../assets/img/ProfileImages/5.png';
// import avatar6 from '../../assets/img/ProfileImages/6.png';
// import avatar7 from '../../assets/img/ProfileImages/7.png';


const Sidebar = ({ onSetSidebarTag }) => {

    const location = useLocation();

    const setSidebarTag = (type, tag) => {
        onSetSidebarTag(type, tag);
    }

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
                                    <div className="user-block-content justify-center">
                                        <div className="user-block-picture">
                                            <Link to="/">
                                                <img className="img-thumbnail rounded-circle" src={avatar} alt="Avatar" width="60" height="60" />
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </li>
                        <li className="nav collapse" id="user-links">
                            <ul className="sidebar-nav sidebar-subnav">
                                <li>
                                    <Link to="#">Profile</Link>
                                </li>
                                <li>
                                    <Link to="#">Settings</Link>
                                </li>
                                <li>
                                    <Link to="#">
                                        <span>Notifications</span>
                                        <span className="badge badge-danger float-right">120</span>
                                    </Link>
                                </li>
                                <li>
                                    <Link to="#">
                                        <span>Messages</span>
                                        <span className="badge badge-success float-right">300</span>
                                    </Link>
                                </li>
                                <li>
                                    <Link to="#">Logout</Link>
                                </li>
                            </ul>
                        </li>
                        <li className={location.pathname === '/dashboard' ? 'active' : ''} onClick={() => setSidebarTag(SIDEBAR_TAG_DASHBOARD, GLOBAL.DASHBOARD)}>
                            <Link to="/dashboard" title="Dashboard" >
                                <em className="fas fa-tachometer-alt"></em>
                                <span>Dashboard</span>
                            </Link>
                        </li>
                        <li className={location.pathname === '/leaderboard' ? 'active' : ''} onClick={() => setSidebarTag(SIDEBAR_TAG_LEADERBOARD, GLOBAL.LEADERBOARD)}>
                            <Link to="/leaderboard" title="Leaderboard">
                                <em className="fas fa-chart-bar"></em>
                                <span>Leaderboard</span>
                            </Link>
                        </li>
                        <li className={location.pathname === '/players' ? 'active' : ''} onClick={() => setSidebarTag(SIDEBAR_TAG_PLAYERS, GLOBAL.PLAYERS)}>
                            <Link to="/players" title="Players">
                                <em className="fa fa-users"></em>
                                <span>Players</span>
                            </Link>
                        </li>
                        <li className={location.pathname === '/decks' ? 'active' : ''} onClick={() => setSidebarTag(SIDEBAR_TAG_DECKS, GLOBAL.DECKS)}>
                            <Link to="/decks" title="Decks">
                                <em className=" fas fa-window-restore"></em>
                                <span>Decks</span>
                            </Link>
                        </li>
                        <li className={location.pathname === '/cards' ? 'active' : ''} onClick={() => setSidebarTag(SIDEBAR_TAG_CARDS, GLOBAL.CARDS)}>
                            <Link to="/cards" title="news">
                                <em className="fas fa-id-card"></em>
                                <span>Cards</span>
                            </Link>
                        </li>
                        <li className={location.pathname === '/game-result' ? 'active' : ''} onClick={() => setSidebarTag(SIDEBAR_TAG_CONFIG, GLOBAL.CONFIG)}>
                            <Link to="/game-result" title="news">
                                <em className="fas fa-list-ol"></em>
                                <span>Game</span>
                            </Link>
                        </li>
                        <li className={location.pathname === '/game-config' ? 'active' : ''} onClick={() => setSidebarTag(SIDEBAR_TAG_CONFIG, GLOBAL.CONFIG)}>
                            <Link to="/game-config" title="Configure">
                                <em className="fas fa-cogs"></em>
                                <span>Game Configure</span>
                            </Link>
                        </li>
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
    sidebar_tag: state.sidebar
});

export default connect(mapStateToProps, { onSetSidebarTag })(Sidebar);