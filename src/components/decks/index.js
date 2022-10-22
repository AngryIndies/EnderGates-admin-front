import React, { useEffect, useState } from "react";
import axios from 'axios';
import Paginator from 'react-hooks-paginator';
import { json, Link, Navigate } from "react-router-dom";
import { Row, Col, Card } from "react-bootstrap";
import { connect } from "react-redux";
import { SpinnerRoundFilled, SpinnerDotted } from 'spinners-react';


import DecksChart from './decks_chart';

import { onGetDashboardMainData } from "../../actions/dashboardAction";
import { onGetDecks, onGetAllDecks } from "../../actions/decksAction";
import Header from "../layout/header";
import Sidebar from "../layout/sidebar";
import Signin from "../auth/signin";

const DeckIndex = ({
    onGetAllDecks,
    onGetDecks,
    isAuthenticated,
    totalDecksCount,
    decksData,
    allDecks
}) => {

    const [paginationCnt, setPaginationCnt] = useState(10);
    const [paginationFrom, setPaginationFrom] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);

    const [actionCard, setActionCard] = useState(0);
    const [reactionCard, setReactionCard] = useState(0);
    const [guardianCard, setGuardianCard] = useState(0);

    const [totalCardsInDecks, setTotalCardsinDecks] = useState(0);

    useEffect(() => {
        onGetAllDecks();
    }, [])

    useEffect(() => {
        onGetDecks(paginationFrom, paginationCnt);
    }, [paginationFrom, paginationCnt]);


    const stringToArray = (str) => {
        let array = str.split(',');
        return array;
    }

    useEffect(() => {
        var array = [];
        var arr = [];
        for (let i = 0; i < allDecks.length; i++) {
            arr[i] = stringToArray(allDecks[i].deck_cards)
            array = array.concat(arr[i]);
        }

        setTotalCardsinDecks(array.length);

        array.sort();
        var result = [];
        var current = null;
        var cnt = 0;
        for (var i = 0; i < array.length; i++) {
            if (array[i] !== current) {
                if (cnt > 0) {
                    var str = '{"index":' + current + ', "cnt" :' + cnt +'}';
                    result.push(JSON.parse(str));
                }
                current = array[i];
                cnt = 1;
            } else {
                cnt++;
            }
        }

        var action = 0;
        var reaction = 0;
        var guardian = 0;

        for(var i = 0; i < result.length; i++){
            if(result[i]['index'] <= 45){
                action += result[i]['cnt'];
            } else if(result[i]['index'] > 45 && result[i]['index'] <= 86){
                reaction += result[i]['cnt'];
            } else {
                guardian += result[i]['cnt'];
            }
        }

        setActionCard(action);
        setReactionCard(reaction);
        setGuardianCard(guardian);

    }, [allDecks]);

    const selectPaginationCnt = (cnt) => {
        setPaginationCnt(cnt);
    }

    const onClick = (i) => {
        setCurrentPage(i);
    };

    const toDecksStringtoShort = (str) => {
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

    if(!isAuthenticated){
        return <Navigate to="/" />
    }

    return (
        <>
            <Header/>
            <Sidebar/>
            <section className="section-container">
                <div className="content-wrapper" style={{ 'padding': '20px', 'borderTop': '0px' }}>
                    <Row>
                        <Col xl={4}>
                            <Card className="text-white bg-info">
                                <Card.Header>
                                    <Card.Title className="text-white font-13rem">Total Decks</Card.Title>
                                    <Card.Text className="d-flex align-items-center">
                                        <div className="ml-auto"><em className="fa-2x mr-2 fas fa-bars"></em></div>
                                    </Card.Text>
                                </Card.Header>
                                <Card.Body>
                                    <Card.Text className="font-25 font-bold">
                                        { totalDecksCount }
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                            <Card className="text-white bg-primary">
                                <Card.Header>
                                    <Card.Title className="text-white font-13rem">Average Rate</Card.Title>
                                    <Card.Text className="d-flex align-items-center">
                                        <div className="ml-auto"><em className="fa fa-users fa-2x"></em></div>
                                    </Card.Text>
                                </Card.Header>
                                <Card.Body>
                                    <Card.Text className="font-25 font-bold">
                                        { Math.ceil( totalCardsInDecks / totalDecksCount )}
                                    </Card.Text>
                                </Card.Body>
                                {/* <Card.Footer className=" bg-transparent border-0 text-white">
                            </Card.Footer> */}
                            </Card>
                        </Col>
                        <Col xl={4}>
                            {/* <Card className="text-white bg-success">
                                <Card.Header>
                                    <Card.Title className="text-white font-13rem">Total Cards</Card.Title>
                                    <Card.Text className="d-flex align-items-center">
                                        <div className="ml-auto"><em className="fa-2x mr-2 fas fa-ticket-alt"></em></div>
                                    </Card.Text>
                                </Card.Header>
                                <Card.Body>
                                    <Card.Text className="font-25 font-bold">
                                        { }
                                    </Card.Text>
                                </Card.Body>
                            </Card> */}
                        </Col>
                        <Col xl={4} style={{ 'textAlign': 'center'}}>
                            <DecksChart 
                                action = {actionCard}
                                reaction = {reactionCard}
                                guardian = {guardianCard}
                            />
                        </Col>
                        <Col xl={3}>
                            
                        </Col>
                    </Row>

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
                                            <th>UserId</th>
                                            <th>Username</th>
                                            <th>Deck Name</th>
                                            <th>Deck Cards</th>
                                            <th>State</th>
                                        </tr>
                                    </thead>
                                    {
                                        decksData.length === 0? (
                                            <td colSpan='5' style={{'textAlign':'center'}}>
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
                                            decksData ? (
                                                decksData.map((deck, index) => {
                                                    return (
                                                        <tr className="text-center" key={index}>
                                                            <td className="vertical-middle">{deck.userid}</td>
                                                            <td className="vertical-middle">{deck.username}</td>
                                                            <td className="vertical-middle">{deck.deck_name}</td>
                                                            <td className="vertical-middle">
                                                                <Link to={"/deck-detail/" + `${deck.id}`}>{toDecksStringtoShort(deck.deck_cards)}</Link>
                                                            </td>
                                                            <td className="vertical-middle">
                                                                {deck.selected === 1 ? (<em className="fa fa-check green-color"></em>) : (<></>)}
                                                            </td>
                                                        </tr>
                                                    );
                                                })
                                            ) : (
                                                <></>
                                            )
                                            
                                        }
                                    </tbody>
                                </table>
                                <div className="card-footer">
                                    <div className="d-flex">
                                        <div className="d-flex dt-buttons btn-group mgl-15 align-center">
                                            <button className="btn btn-default buttons-copy buttons-html5 btn-info" tabIndex="0" aria-controls="datatable4" type="button"><span>Copy</span></button>
                                            <button className="btn btn-default buttons-csv buttons-html5 btn-info" tabIndex="0" aria-controls="datatable4" type="button"><span>CSV</span></button> <button className="btn btn-default buttons-excel buttons-html5 btn-info" tabIndex="0" aria-controls="datatable4" type="button"><span>Excel</span></button>
                                            <button className="btn btn-default buttons-pdf buttons-html5 btn-info" tabIndex="0" aria-controls="datatable4" type="button"><span>PDF</span></button>
                                            <button className="btn btn-default buttons-print btn-info" tabIndex="0" aria-controls="datatable4" type="button"><span>Print</span></button>
                                        </div>
                                        <div className="ml-auto">
                                            <div className="dataTables_paginate paging_simple_numbers" id="datatable1_paginate">
                                                
                                                <Paginator
                                                    totalRecords={totalDecksCount}
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
    totalDecksCount: state.dashboardReducer.main_data.totalDecks,
    allDecks: state.decksReducer.decks_all_data,
    decksData: state.decksReducer.decks_data,
});

export default connect(mapStateToProps, {
    onGetDashboardMainData,
    onGetAllDecks,
    onGetDecks,
})(DeckIndex);