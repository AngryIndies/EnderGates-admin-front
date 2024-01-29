import { useEffect, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import Paginator from "react-hooks-paginator";
import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";
import { getAiPlayerList } from "../../reducers/ai.slice";
import Header from "../layout/header";
import Sidebar from "../layout/sidebar";
import uniqueId from "lodash.uniqueid";
import "./ai.scss";

import ShuttleList from "../../components/ShuttleList/ShuttleList";
import { getCardsInfo, getMetadata } from "../../reducers/card.slice";

export default function AI() {
  const dispatch = useDispatch();

  const { totalAIPlayerCount } = useSelector((state) => state.ai);
  const { cardsInfo, cardsMetadata } = useSelector((state) => state.card);

  const [playerPerPage, setPlayerPerPage] = useState(10);
  const [pageFrom, setPageFrom] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [modalShow, setModalShow] = useState(false);
  const [level, setLevel] = useState("");
  const [sublevel, setSublevel] = useState("");
  const [aiPlayerName, setAiPlayerName] = useState("");
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [availableItems, setAvailableItems] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);

  const handleShow = () => setModalShow(true);
  const handleClose = () => setModalShow(false);

  const onPageClick = (i) => {
    setCurrentPage(i);
  };

  useEffect(() => {
    dispatch(getAiPlayerList({ from: pageFrom, limit: playerPerPage }));
    const getCardsDetail = async () => {
      await dispatch(getMetadata());
      dispatch(getCardsInfo());
    };

    getCardsDetail();
  }, []);

  useEffect(() => {
    if (Object.keys(cardsInfo) == 0) return;
    const availableCardIds = [
      ...cardsInfo.guardianCards,
      ...cardsInfo.actionCards,
      ...cardsInfo.reactionCards,
    ];
    const availableCardDetails = [];
    const metadatas = Object.values(cardsMetadata);
    availableCardIds.forEach((card) => {
      const cardData = metadatas.find((md, index) => {
        return card === md.properties.id?.value;
      });
      if (cardData != null) {
        availableCardDetails.push(cardData);
      }
    });
    setAvailableItems(availableCardDetails);
  }, [cardsInfo]);

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
                <div className="dataTables-title">AI Players</div>
              </div>
              <Button className="dataTable-header-button" onClick={handleShow}>
                Add
              </Button>
            </div>
            <div className="content-wrapper">
              <div className="table-responsive">
                <table
                  className="table table-bordered table-hover"
                  id="table-ext-1"
                >
                  <thead>
                    <tr className="text-center">
                      <th>ID</th>
                      <th>Level</th>
                      <th>Sublevel</th>
                      <th>AI Player name</th>
                      <th>AI Player Deck</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody></tbody>
                </table>
                <div className="card-footer">
                  <div className="d-flex">
                    <div className="ml-auto">
                      <div
                        className="dataTables_paginate paging_simple_numbers"
                        id="datatable1_paginate"
                      >
                        <Paginator
                          totalRecords={totalAIPlayerCount}
                          pageLimit={playerPerPage}
                          pageNeighbours={2}
                          setOffset={setPageFrom}
                          currentPage={currentPage}
                          setCurrentPage={onPageClick}
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

      <Modal show={modalShow} onHide={handleClose}>
        <Modal.Header>
          <Modal.Title>Add AI Player</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form className="form">
            <Form.Group controlId="formLevel">
              <Form.Label>Level</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter Level"
                value={level}
                onChange={(e) => setLevel(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="formSublevel">
              <Form.Label>Sublevel</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter Sublevel"
                value={sublevel}
                onChange={(e) => setSublevel(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="formAIPlayerName">
              <Form.Label>AIPlayerName</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter AIPlayerName"
                value={aiPlayerName}
                onChange={(e) => setAiPlayerName(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="formMultiSelect">
              <Form.Label>Select Options</Form.Label>
              <ShuttleList
                className="small"
                available={availableItems}
                selected={selectedItems}
                availableTitle="Available"
                selectedTitle="Selected"
                onSelectionChange={setSelectedItems}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
