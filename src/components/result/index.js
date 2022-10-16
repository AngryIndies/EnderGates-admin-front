import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';
import Paginator from 'react-hooks-paginator';
import { connect } from "react-redux";


import { HOST_URL } from '../../actions/types';
import { } from '../../actions/'
import { onSetPlayerDexID } from "../../actions/playersAction";
import { PLAYER_DEX_ID } from '../../actions/types';

const GameResultIndex = ({ onSetPlayerDexID }) => {

    const [totalCount, setTotalDataCount] = useState(0);
    const [paginationCnt, setPaginationCnt] = useState(10);
    const [paginationFrom, setPaginationFrom] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [gameResult, setGameResult] = useState([]);
    const [searchKey, setSearchKey] = useState('');

    useEffect(() => {
        
    }, []);

    useEffect(() => {
        axios.get( HOST_URL + 'getGameHistory').then( res => {
            console.log(res);
        });
    }, [paginationFrom, paginationCnt, searchKey]);

    const selectPaginationCnt = (cnt) => {
        setPaginationCnt(cnt);
    }

    const onClick = (i) => {
        setCurrentPage(i);
    };

    var dot = '...';
    const modString = (str) => {
        if (str.indexOf('0x') !== -1) {
            let first = '';
            let last = '';

            first = str.slice(0, 4);
            last = str.slice(str.length - 4, str.length);
            return first + dot + last;
        } else {
            return str;
        }
    }

    const searchData = (key) => {
        setSearchKey(key);
    }

    return (
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
                                <tbody>
                                    {
                                        gameResult.map((result, index) => {

                                            return (
                                                <tr className="text-center" key={index}>
                                                    <td className="vertical-middle">{result.id}</td>
                                                    <td className="vertical-middle">
                                                        <img className="img-fluid rounded-circle thumb50" src={process.env.PUBLIC_URL + 'img/ProfileImages/' + result.pfp + '.png'} alt="Image" />
                                                    </td>
                                                    <td className="vertical-middle">{modString(result.username)}</td>
                                                    <td className="vertical-middle">{modString(result.address)}</td>
                                                    <td className="vertical-middle">{result.level}</td>
                                                    <td className="vertical-middle">{result.point}</td>
                                                    <td className="vertical-middle">{result.exp}</td>
                                                    <td className="vertical-middle">{result.wins}</td>
                                                    <td className="vertical-middle">{result.losses}</td>
                                                    <td className="vertical-middle">
                                                        <Link to={"/decks/" + `${result.id}`}>{result.deck_count}</Link>
                                                    </td>
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
    );
}

const mapStateToProps = (state) => ({

});

export default connect(mapStateToProps, { onSetPlayerDexID })(GameResultIndex);
