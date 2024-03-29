import axios from "axios";
import React, { useEffect, useState } from "react";
import Paginator from "react-hooks-paginator";
import { Link } from "react-router-dom";
import { SpinnerDotted } from "spinners-react";

import { PLAYER_DEX_ID } from "../../actions/types";
import { HOST_URL } from "../../config/config";
import Header from "../layout/header";
import Sidebar from "../layout/sidebar";

import "./Player.css";

const Player = ({ onSetPlayerDexID }) => {
  const [totalUsers, setTotalUsers] = useState(0);
  const [paginationCnt, setPaginationCnt] = useState(10);
  const [paginationFrom, setPaginationFrom] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [playerInfo, setPlayerInfo] = useState([]);
  const [searchKey, setSearchKey] = useState("");

  const chain = {
    137: "Polygon",
    1: "Ethereum",
    97: "Binance",
    1666600000: "Harmony",
  };

  useEffect(() => {
    axios.get(HOST_URL + "getPlayerCount").then((res) => {
      setTotalUsers(res.data.count);
    });
  }, []);

  useEffect(() => {
    axios
      .get(
        `${HOST_URL}getPlayerInfos?from=${paginationFrom}&limit=${paginationCnt}&key=${searchKey}`
      )
      .then((res) => {
        setPlayerInfo(res.data);
      });
  }, [paginationFrom, paginationCnt, searchKey]);

  const selectPaginationCnt = (cnt) => {
    setPaginationCnt(cnt);
  };

  const onClick = (i) => {
    setCurrentPage(i);
  };

  const modString = (str) =>
    str.indexOf("0x") !== -1 ? `${str.slice(0, 4)}...${str.slice(-4)}` : str;

  const searchData = (key) => {
    setSearchKey(key);
  };

  const setPlayerDex = (id) => {
    onSetPlayerDexID(PLAYER_DEX_ID, id);
  };

  return (
    <>
      <Header />
      <Sidebar />
      <section className="section-container">
        <div
          className="content-wrapper"
          style={{ padding: "20px", borderTop: "0px" }}
        >
          <div className="card card-default">
            <div className="card-header d-flex">
              <div className="input-group">
                <div className="dataTables_length">
                  <label>
                    <select
                      name="datatable1_length"
                      className="custom-select custom-select-sm form-control form-control-sm"
                      onChange={(e) => selectPaginationCnt(e.target.value)}
                    >
                      <option value="10">10</option>
                      <option value="25">25</option>
                      <option value="50">50</option>
                      <option value="100">100</option>
                    </select>{" "}
                    records per page
                  </label>
                </div>
              </div>
              <div className="card-header d-flex">
                <div className="ml-auto"></div>
              </div>
            </div>
            <div className="content-wrapper">
              <div className="table-responsive">
                {playerInfo.length == 0 ? (
                  <div className="player-loading-spinner">
                    <SpinnerDotted
                      size={90}
                      speed={140}
                      thickness={120}
                      style
                    />
                  </div>
                ) : (
                  <table
                    className="table table-bordered table-hover"
                    id="table-ext-1"
                  >
                    <thead>
                      <tr className="text-center">
                        <th>UserID</th>
                        <th>PFP</th>
                        <th>Username</th>
                        <th>Address</th>
                        <th>Chain</th>
                        <th>level</th>
                        <th>Point</th>
                        <th>Experience</th>
                        <th>Wins</th>
                        <th>Losses</th>
                        <th>Decks</th>
                      </tr>
                    </thead>

                    <tbody>
                      {playerInfo.map((player, index) => {
                        return (
                          <tr className="text-center" key={index}>
                            <td className="vertical-middle">{player.id}</td>
                            <td className="vertical-middle">
                              <img
                                className="img-fluid rounded-circle thumb50"
                                src={
                                  "../assets/img/ProfileImages/" +
                                  player.pfp +
                                  ".png"
                                }
                                alt="Player PFP"
                              />
                            </td>
                            <td className="vertical-middle">
                              {modString(player.username)}
                            </td>
                            <td className="vertical-middle">
                              {modString(player.address)}
                            </td>
                            <td className="vertical-middle">
                              {chain[player.chainId]}
                            </td>
                            <td className="vertical-middle">{player.level}</td>
                            <td className="vertical-middle">{player.point}</td>
                            <td className="vertical-middle">{player.exp}</td>
                            <td className="vertical-middle">{player.wins}</td>
                            <td className="vertical-middle">{player.losses}</td>
                            <td
                              className="vertical-middle"
                              onClick={() => setPlayerDex(`${player.id}`)}
                            >
                              <Link to={`/decks/${player.id}`}>
                                {player.deck_count}
                              </Link>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                )}
                <div className="card-footer">
                  <div className="d-flex">
                    <div className="d-flex align-center">
                      <div className="input-group">
                        <input
                          className="form-control form-control-sm"
                          type="text"
                          placeholder="Search"
                          onChange={(e) => searchData(e.target.value)}
                        />
                        <div className="input-group-append">
                          <button
                            className="btn btn-secondary btn-sm"
                            type="button"
                          >
                            Search
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="d-flex dt-buttons btn-group mgl-15 align-center">
                      <button
                        className="btn btn-default buttons-copy buttons-html5 btn-info"
                        tabIndex="0"
                        aria-controls="datatable4"
                        type="button"
                      >
                        <span>Copy</span>
                      </button>
                      <button
                        className="btn btn-default buttons-csv buttons-html5 btn-info"
                        tabIndex="0"
                        aria-controls="datatable4"
                        type="button"
                      >
                        <span>CSV</span>
                      </button>{" "}
                      <button
                        className="btn btn-default buttons-excel buttons-html5 btn-info"
                        tabIndex="0"
                        aria-controls="datatable4"
                        type="button"
                      >
                        <span>Excel</span>
                      </button>
                      <button
                        className="btn btn-default buttons-pdf buttons-html5 btn-info"
                        tabIndex="0"
                        aria-controls="datatable4"
                        type="button"
                      >
                        <span>PDF</span>
                      </button>
                      <button
                        className="btn btn-default buttons-print btn-info"
                        tabIndex="0"
                        aria-controls="datatable4"
                        type="button"
                      >
                        <span>Print</span>
                      </button>
                    </div>
                    <div className="ml-auto">
                      <div
                        className="dataTables_paginate paging_simple_numbers"
                        id="datatable1_paginate"
                      >
                        <Paginator
                          totalRecords={totalUsers}
                          pageLimit={paginationCnt}
                          pageNeighbours={2}
                          setOffset={setPaginationFrom}
                          currentPage={currentPage}
                          setCurrentPage={onClick}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Player;
