import React from "react";
import { connect } from "react-redux";
import { Link, useLocation } from "react-router-dom";

import { onSetSidebarTag } from "../../actions/sidebarAction";
import {
  SIDEBAR_TAG_CARDS,
  SIDEBAR_TAG_CONFIG,
  SIDEBAR_TAG_DASHBOARD,
  SIDEBAR_TAG_DECKS,
  SIDEBAR_TAG_LEADERBOARD,
  SIDEBAR_TAG_PLAYERS,
} from "../../actions/types";

import GLOBAL from "../../global/variable";

import avatar from "../../assets/img/ProfileImages/0.png";

const Sidebar = ({ onSetSidebarTag }) => {
  const location = useLocation();

  const setSidebarTag = (type, tag) => {
    onSetSidebarTag(type, tag);
  };

  return (
    <aside className="aside-container">
      <div className="aside-inner">
        <nav className="sidebar" data-sidebar-anyclick-close>
          <ul className="sidebar-nav">
            <li className="sidebar-app-logo d-flex align-items-center justify-content-center py-3 d-md-none">
              <img className="img-fluid" src="img/logo.png" alt="App Logo" />
            </li>
            <li className="has-user-block">
              <div
                id="user-block"
                data-toggle="collapse"
                data-target="#user-links"
              >
                <div className="item user-block">
                  <div className="user-block-content justify-center">
                    <div className="user-block-picture">
                      <Link to="/">
                        <img
                          className="img-thumbnail rounded-circle"
                          src={avatar}
                          alt="Avatar"
                          width="60"
                          height="60"
                        />
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
            <li
              className={location.pathname === "/dashboard" ? "active" : ""}
              onClick={() =>
                setSidebarTag(SIDEBAR_TAG_DASHBOARD, GLOBAL.DASHBOARD)
              }
            >
              <Link to="/dashboard" title="Dashboard">
                <em className="fas fa-tachometer-alt"></em>
                <span>Dashboard</span>
              </Link>
            </li>
            <li
              className={location.pathname === "/leaderboard" ? "active" : ""}
              onClick={() =>
                setSidebarTag(SIDEBAR_TAG_LEADERBOARD, GLOBAL.LEADERBOARD)
              }
            >
              <Link to="/leaderboard" title="Leaderboard">
                <em className="fas fa-chart-bar"></em>
                <span>Leaderboard</span>
              </Link>
            </li>
            <li
              className={location.pathname === "/player" ? "active" : ""}
              onClick={() => setSidebarTag(SIDEBAR_TAG_PLAYERS, GLOBAL.PLAYERS)}
            >
              <Link to="/player" title="Players">
                <em className="fa fa-users"></em>
                <span>Players</span>
              </Link>
            </li>
            <li
              className={location.pathname.includes("/deck") ? "active" : ""}
              onClick={() => setSidebarTag(SIDEBAR_TAG_DECKS, GLOBAL.DECKS)}
            >
              <Link to="/deck" title="Decks">
                <em className=" fas fa-window-restore"></em>
                <span>Decks</span>
              </Link>
            </li>
            <li
              className={location.pathname === "/cards" ? "active" : ""}
              onClick={() => setSidebarTag(SIDEBAR_TAG_CARDS, GLOBAL.CARDS)}
            >
              <Link to="/cards" title="news">
                <em className="fas fa-id-card"></em>
                <span>Cards</span>
              </Link>
            </li>
            <li
              className={location.pathname === "/result" ? "active" : ""}
              onClick={() => setSidebarTag(SIDEBAR_TAG_CONFIG, GLOBAL.CONFIG)}
            >
              <Link to="/result" title="news">
                <em className="fas fa-list-ol"></em>
                <span>Game</span>
              </Link>
            </li>
            <li
              className={location.pathname === "/config" ? "active" : ""}
              onClick={() => setSidebarTag(SIDEBAR_TAG_CONFIG, GLOBAL.CONFIG)}
            >
              <Link to="/config" title="Configure">
                <em className="fas fa-cogs"></em>
                <span>Game Setting</span>
              </Link>
            </li>

            <li className=" ">
              <a
                href="#quest"
                title="Quests"
                data-toggle="collapse"
                className="collapsed"
                aria-expanded="false"
              >
                <em className="fas fa-robot"></em>
                <span>Quest Mode</span>
              </a>
              <ul
                className="sidebar-nav sidebar-subnav collapse show"
                id="quest"
              >
                <li className="sidebar-subnav-header">Quest Mode</li>
                <li
                  className={
                    location.pathname === "/quest/locations" ? "active" : ""
                  }
                >
                  <Link to={"/quest/locations"}>
                    <span>Locations</span>
                  </Link>
                </li>
                <li
                  className={
                    location.pathname === "/quest/missions" ? "active" : ""
                  }
                >
                  <Link to={"/quest/missions"}>
                    <span>Missions</span>
                  </Link>
                </li>
              </ul>
            </li>
          </ul>
        </nav>
      </div>
    </aside>
  );
};

const mapStateToProps = (state) => ({
  sidebar_tag: state.sidebar,
});

export default connect(mapStateToProps, { onSetSidebarTag })(Sidebar);
