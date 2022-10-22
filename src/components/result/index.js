import React, { useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import axios from 'axios';
import Paginator from 'react-hooks-paginator';
import { connect } from "react-redux";
import prettyMilliseconds from 'pretty-ms';
import { SpinnerDotted } from "spinners-react";

import { HOST_URL } from '../../actions/types';
import { } from '../../actions/'
import { PLAYER_DEX_ID } from '../../actions/types';
import Signin from "../auth/signin";
import Header from "../layout/header";
import Sidebar from "../layout/sidebar";

const GameResultIndex = ({isAuthenticated}) => {

    const [totalCount, setTotalDataCount] = useState(0);
    const [paginationCnt, setPaginationCnt] = useState(10);
    const [paginationFrom, setPaginationFrom] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [gameResult, setGameResult] = useState([]);
    const [searchKey, setSearchKey] = useState('');

    useEffect(() => {
        axios.get(HOST_URL + `getDashboardInfos`).then(res => {
            setTotalDataCount(res.data.totalGames);
        });
    }, []);

    useEffect(() => { 
        axios.get(HOST_URL + 'getGameHistory?from=' + paginationFrom + '&limit=' + paginationCnt).then(res => {
            setGameResult(res.data);
        });
    }, [paginationFrom, paginationCnt, searchKey]);

    const selectPaginationCnt = (cnt) => {
        setPaginationCnt(cnt);
    }

    const onClick = (i) => {
        setCurrentPage(i);
    };

    const modifyDateFormat = (start, finish) => {
        let s = new Date(start);
        let s_m = s.getTime();
        let f = new Date(finish);
        let f_m = f.getTime();
        let d = f_m - s_m;
        let result = prettyMilliseconds(d);
        return result;
    }

    const searchData = (key) => {
        setSearchKey(key);
    }

    if(!isAuthenticated){
        return <Navigate to="/" />
    }

    return (
        <>
            <Header/>
            <Sidebar/>
            <section className="section-container">
                <div className="content-wrapper" style={{ 'padding': '20px', 'borderTop': '0px' }}>
                    <div className="card card-default">
                        <div className="card-header d-flex">
                            <div className="input-group">
                                <div className="dataTables_length">
                                    <label>
                                        <select name="datatable1_length" className="custom-select custom-select-sm form-control form-control-sm" onChange={(e) => selectPaginationCnt(e.target.value)}>
                                            <option value="10">10</option>
                                            <option value="25">25</option>
                                            <option value="50">50</option>
                                            <option value="100">100</option>
                                        </select> records per page
                                    </label>
                                </div>
                            </div>
                            <div className="card-header d-flex">
                                <div className="ml-auto">
                                    {/* <div className="d-inline-block mr-3" data-perform="card-collapse"><em className="fa fa-minus"></em></div>
                            <div className="d-inline-block mr-0" data-perform="card-dismiss"><em className="fa fa-times"></em></div> */}
                                </div>
                            </div>
                        </div>
                        <div className="content-wrapper">
                            <div className="table-responsive">
                                <table className="table table-bordered table-hover" id="table-ext-1">
                                    <thead>
                                        <tr className="text-center">
                                            <th>GameID</th>
                                            <th>Player1</th>
                                            <th>Player2</th>
                                            <th>Game Data</th>
                                            <th>Game Result</th>
                                            <th>Duration</th>
                                            <th>Turns</th>
                                            <th>Kills</th>
                                            <th>Retires</th>
                                            <th>Total Damage Player1</th>
                                            <th>Total Damage Player2</th>
                                        </tr>
                                    </thead>
                                    {
                                        gameResult.length === 0 ? (
                                            <td colSpan='11' style={{ 'textAlign': 'center' }}>
                                                <SpinnerDotted
                                                    size={90}
                                                    speed={140}
                                                    thickness={120}
                                                />
                                            </td>
                                        ) : (
                                            <></>
                                        )
                                    }
                                    <tbody>
                                        {
                                            gameResult.map((result, index) => {
                                                return (
                                                    <tr className="text-center" key={index}>
                                                        <td className="vertical-middle">{result.id}</td>
                                                        <td className="vertical-middle">{result.player1}</td>
                                                        <td className="vertical-middle">{result.player2}</td>
                                                        <td className="vertical-middle">{result.game_data}</td>
                                                        <td className="vertical-middle">{result.game_result}</td>
                                                        <td className="vertical-middle">{modifyDateFormat(result.start_time, result.finish_time)}</td>
                                                        <td className="vertical-middle">{result.turns}</td>
                                                        <td className="vertical-middle">{result.kills}</td>
                                                        <td className="vertical-middle">{result.retires}</td>
                                                        <td className="vertical-middle">{result.td_player1}</td>
                                                        <td className="vertical-middle">{result.td_player2}</td>
                                                    </tr>
                                                );
                                            })
                                        }
                                    </tbody>
                                </table>
                                <div className="card-footer">
                                    <div className="d-flex">
                                        <div className="d-flex align-center">
                                            <div className="input-group">
                                                <input className="form-control form-control-sm" type="text" placeholder="Search" onChange={(e) => searchData(e.target.value)} />
                                                <div className="input-group-append"><button className="btn btn-secondary btn-sm" type="button">Search</button></div>
                                            </div>
                                        </div>
                                        <div className="d-flex dt-buttons btn-group mgl-15 align-center">
                                            <button className="btn btn-default buttons-copy buttons-html5 btn-info" tabIndex="0" aria-controls="datatable4" type="button"><span>Copy</span></button>
                                            <button className="btn btn-default buttons-csv buttons-html5 btn-info" tabIndex="0" aria-controls="datatable4" type="button"><span>CSV</span></button> <button className="btn btn-default buttons-excel buttons-html5 btn-info" tabIndex="0" aria-controls="datatable4" type="button"><span>Excel</span></button>
                                            <button className="btn btn-default buttons-pdf buttons-html5 btn-info" tabIndex="0" aria-controls="datatable4" type="button"><span>PDF</span></button>
                                            <button className="btn btn-default buttons-print btn-info" tabIndex="0" aria-controls="datatable4" type="button"><span>Print</span></button>
                                        </div>
                                        <div className="ml-auto">
                                            <div className="dataTables_paginate paging_simple_numbers" id="datatable1_paginate">
                                                <Paginator
                                                    totalRecords={totalCount}
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
}

const mapStateToProps = (state) => ({
    isAuthenticated : state.authReducer.isAuthenticated,
});

export default connect(mapStateToProps, {})(GameResultIndex);
