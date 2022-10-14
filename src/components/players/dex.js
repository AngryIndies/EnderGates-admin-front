import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Paginator from 'react-hooks-paginator';
import { HOST_URL } from "../../actions/types";

const PlayerDex = () => {
    const { id } = useParams();

    const [decksData, setDecksData] = useState([]);
    const [totalDecks, setTotalDecks] = useState(0);
    const [paginationCnt, setPaginationCnt] = useState(10);
    const [paginationFrom, setPaginationFrom] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        axios.get(HOST_URL + 'getPlayerDecks?userId=' + `${id}`).then(res => {
            setDecksData(res.data);
            setTotalDecks(res.data.length);
        });
    }, []);


    const selectPaginationCnt = (cnt) => {
        setPaginationCnt(cnt);
    }

    const onClick = (i) => {
        setCurrentPage(i);
    };

    const toDecksStringToArray = (str) => {
        const cnt = 3;
        const array = str.split(',');
        const dots = '...';
        var exp = '';

        if (array.length < cnt) {
            for (var i = 0; i < cnt; i++) {
                i != cnt - 1 ? (exp += array[i] + ', ') : (exp += array[i]);
            }
            return exp;

        } else {
            for (var i = 0; i < cnt; i++) {
                i != cnt - 1 ? (exp += array[i] + ', ') : (exp += array[i]);
            }
            exp += ' ' + dots;
            return exp;
        }
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
                                        <th>UserID</th>
                                        <th>Deck Name</th>
                                        <th>Deck Cards</th>
                                        <th>State</th>
                                        {/* <th></th>
                              <th>Sign</th>
                              <th>Last Seen</th> */}
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        decksData.map((deck, index) => {
                                            return (
                                                <tr className="text-center" key={index}>
                                                    <td className="vertical-middle">{deck.userid}</td>
                                                    <td className="vertical-middle">{deck.deck_name}</td>
                                                    <td className="vertical-middle">{toDecksStringToArray(deck.deck_cards)}</td>
                                                    <td className="vertical-middle">
                                                        <Link>
                                                            {deck.selected == 1 ? (<em class="fa-2x mr-2 fas fa-check green-color"></em>) : (<em></em>)}
                                                        </Link>
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
                                            <input className="form-control form-control-sm" type="text" placeholder="Search" />
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
                                                totalRecords={totalDecks}
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

export default PlayerDex;