import React, { useEffect, useState } from "react";
import { Card, Col, Row } from "react-bootstrap";
import Paginator from "react-hooks-paginator";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { SpinnerDotted } from "spinners-react";

import DecksChart from "./DeckChart";

import { getDashboardMainData } from "../../reducers/dashboard.slice";
import { fetchDecks } from "../../reducers/deck.slice";
import Header from "../layout/header";
import Sidebar from "../layout/sidebar";

const Deck = () => {
  const dispatch = useDispatch();

  const { allDecks, decksData } = useSelector((state) => ({
    allDecks: state.deck.decksAllData,
    decksData: state.deck.decksData,
  }));

  const { basicData } = useSelector((state) => state.dashboard);

  const [paginationCnt, setPaginationCnt] = useState(10);
  const [paginationFrom, setPaginationFrom] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  const [actionCard, setActionCard] = useState(-1);
  const [reactionCard, setReactionCard] = useState(-1);
  const [guardianCard, setGuardianCard] = useState(-1);

  const [totalCardsInDecks, setTotalCardsInDecks] = useState(0);

  useEffect(() => {
    if (!basicData.totalCards) return;
    setActionCard(basicData.totalCards.actionCards);
    setGuardianCard(basicData.totalCards.guardianCards);
    setReactionCard(basicData.totalCards.reactionCards);
  }, [basicData.totalCards]);

  useEffect(() => {
    dispatch(getDashboardMainData());
    dispatch(fetchDecks({ from: paginationFrom, cnt: paginationCnt }));
  }, [paginationFrom, paginationCnt]);

  const stringToArray = (str) => {
    let array = str.split(",");
    return array;
  };

  useEffect(() => {
    let array = [];
    let arr = [];
    for (let i = 0; i < allDecks.length; i++) {
      arr[i] = stringToArray(allDecks[i].deck_cards);
      array = array.concat(arr[i]);
    }

    setTotalCardsInDecks(array.length);

    array.sort();
    let result = [];
    let current = null;
    let cnt = 0;
    for (let i = 0; i < array.length; i++) {
      if (array[i] !== current) {
        if (cnt > 0) {
          result.push({
            index: current,
            cnt: cnt,
          });
        }
        current = array[i];
        cnt = 1;
      } else {
        cnt++;
      }
    }

    let action = 0;
    let reaction = 0;
    let guardian = 0;

    for (let i = 0; i < result.length; i++) {
      if (result[i]["index"] <= 45) {
        action += result[i]["cnt"];
      } else if (result[i]["index"] > 45 && result[i]["index"] <= 86) {
        reaction += result[i]["cnt"];
      } else {
        guardian += result[i]["cnt"];
      }
    }

    setActionCard(action);
    setReactionCard(reaction);
    setGuardianCard(guardian);
  }, [allDecks]);

  const selectPaginationCnt = (cnt) => {
    setPaginationCnt(cnt);
  };

  const onClick = (i) => {
    setCurrentPage(i);
  };

  const shortDeckCardStr = (str) => {
    const cnt = 3;
    const array = str.split(",");
    const dots = "...";
    let exp = "";

    if (array.length < cnt) {
      for (let i = 0; i < cnt; i++) {
        i !== cnt - 1 ? (exp += array[i] + ", ") : (exp += array[i]);
      }
      return exp;
    } else {
      for (let i = 0; i < cnt; i++) {
        i !== cnt - 1 ? (exp += array[i] + ", ") : (exp += array[i]);
      }
      exp += " " + dots;
      return exp;
    }
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
          <Row>
            <Col xl={4}>
              <Card className="text-white bg-info">
                <Card.Header>
                  <Card.Title className="text-white font-13rem">
                    Total Decks
                  </Card.Title>
                  <Card.Text className="d-flex align-items-center">
                    <div className="ml-auto">
                      <em className="fa-2x mr-2 fas fa-bars"></em>
                    </div>
                  </Card.Text>
                </Card.Header>
                <Card.Body>
                  <Card.Text className="font-25 font-bold">
                    {basicData.totalDecks}
                  </Card.Text>
                </Card.Body>
              </Card>
              <Card className="text-white bg-primary">
                <Card.Header>
                  <Card.Title className="text-white font-13rem">
                    Average Rate
                  </Card.Title>
                  <Card.Text className="d-flex align-items-center">
                    <div className="ml-auto">
                      <em className="fa fa-users fa-2x"></em>
                    </div>
                  </Card.Text>
                </Card.Header>
                <Card.Body>
                  <Card.Text className="font-25 font-bold">
                    {basicData.totalDecks === 0
                      ? 0
                      : Math.ceil(totalCardsInDecks / basicData.totalDecks)}
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col xl={4}>
              <Card className="text-white bg-success">
                <Card.Header>
                  <Card.Title className="text-white font-13rem">
                    Total Cards
                  </Card.Title>
                  <Card.Text className="d-flex align-items-center">
                    <div className="ml-auto">
                      <em className="fa-2x mr-2 fas fa-ticket-alt"></em>
                    </div>
                  </Card.Text>
                </Card.Header>
                <Card.Body>
                  <Card.Text className="font-25 font-bold">{}</Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col xl={4} style={{ textAlign: "center" }}>
              <DecksChart
                action={actionCard}
                reaction={reactionCard}
                guardian={guardianCard}
              />
            </Col>
            <Col xl={3}></Col>
          </Row>

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
                <div className="ml-auto">
                  {/* <div className="d-inline-block mr-3" data-perform="card-collapse"><em className="fa fa-minus"></em></div>
                            <div className="d-inline-block mr-0" data-perform="card-dismiss"><em className="fa fa-times"></em></div> */}
                </div>
              </div>
            </div>
            <div className="content-wrapper">
              <div className="table-responsive">
                <table
                  className="table table-bordered table-hover"
                  id="table-ext-1"
                >
                  <thead>
                    <tr className="text-center">
                      <th>UserId</th>
                      <th>Username</th>
                      <th>Deck Name</th>
                      <th>Deck Cards</th>
                      <th>State</th>
                    </tr>
                  </thead>
                  {!decksData ? (
                    <td colSpan="5" style={{ textAlign: "center" }}>
                      <SpinnerDotted size={90} speed={140} thickness={120} />
                    </td>
                  ) : (
                    <></>
                  )}
                  <tbody>
                    {decksData ? (
                      decksData.map((deck, index) => {
                        return (
                          <tr className="text-center" key={index}>
                            <td className="vertical-middle">{deck.userId}</td>
                            <td className="vertical-middle">{deck.username}</td>
                            <td className="vertical-middle">
                              {deck.deck_name}
                            </td>
                            <td className="vertical-middle">
                              <Link to={`/deck/${deck.id}`}>
                                {shortDeckCardStr(deck.deck_cards)}
                              </Link>
                            </td>
                            <td className="vertical-middle">
                              {deck.selected === 1 ? (
                                <em className="fa fa-check green-color"></em>
                              ) : (
                                <></>
                              )}
                            </td>
                          </tr>
                        );
                      })
                    ) : (
                      <></>
                    )}
                  </tbody>
                </table>
                <div className="card-footer">
                  <div className="d-flex">
                    <div className="ml-auto">
                      <div
                        className="dataTables_paginate paging_simple_numbers"
                        id="datatable1_paginate"
                      >
                        <Paginator
                          totalRecords={basicData.totalDecks}
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

export default Deck;
