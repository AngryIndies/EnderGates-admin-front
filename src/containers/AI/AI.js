import { useEffect, useState } from "react";
import { Button, ButtonGroup, Form, Modal } from "react-bootstrap";
import Paginator from "react-hooks-paginator";
import { useDispatch, useSelector } from "react-redux";
import {
  addAiPlayer,
  getAiPlayerList,
  removeAiPlayer
} from "../../reducers/ai.slice";
import { getCardsInfo, getMetadata } from "../../reducers/card.slice";

import Header from "../layout/header";
import Sidebar from "../layout/sidebar";

import ConfirmModal from "../../components/ConfirmModal/ConfirmModal";
import ShuttleList from "../../components/ShuttleList/ShuttleList";

import "./ai.scss";

export default function AI() {
  const dispatch = useDispatch();

  const { totalAIPlayerCount, aiPlayersList } = useSelector(
    (state) => state.ai
  );
  const { cardsInfo, cardsMetadata } = useSelector((state) => state.card);

  const [playerPerPage, setPlayerPerPage] = useState(10);
  const [pageFrom, setPageFrom] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [modalShow, setModalShow] = useState(false);

  const [confirmModalShow, setConfirmModalShow] = useState(false);
  const [aiPlayerToRemove, setAiPlayerToRemove] = useState(null);

  const [level, setLevel] = useState("");
  const [sublevel, setSublevel] = useState("");
  const [aiPlayerName, setAiPlayerName] = useState("");

  // State for validation messages
  const [levelError, setLevelError] = useState("");
  const [sublevelError, setSublevelError] = useState("");
  const [aiPlayerNameError, setAiPlayerNameError] = useState("");

  const [availableItems, setAvailableItems] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);

  const handleShow = () => setModalShow(true);
  const handleClose = () => setModalShow(false);

  const onPageClick = (i) => {
    setCurrentPage(i);
  };

  // Validation functions
  const validateLevel = () => {
    if (!level) {
      setLevelError("Level is required");
      return false;
    }
    setLevelError("");
    return true;
  };

  const validateSublevel = () => {
    if (!sublevel) {
      setSublevelError("Sublevel is required");
      return false;
    }
    setSublevelError("");
    return true;
  };

  const validateAiPlayerName = () => {
    if (!aiPlayerName) {
      setAiPlayerNameError("AI Player Name is required");
      return false;
    }
    setAiPlayerNameError("");
    return true;
  };

  const handleAddAiPlayer = async () => {
    const isLevelValid = validateLevel();
    const isSublevelValid = validateSublevel();
    const isAiPlayerNameValid = validateAiPlayerName();

    if (!isLevelValid || !isSublevelValid || !isAiPlayerNameValid) {
      return; // Stop submission if validation fails
    }

    const newAiPlayer = {
      level,
      sublevel,
      aiPlayerName,
      selectedCards: selectedItems,
    };

    await dispatch(addAiPlayer({ newAiPlayer }));
    dispatch(getAiPlayerList({ from: pageFrom, limit: playerPerPage }));
    setModalShow(false);
  };

  const handleShowConfirmModal = (aiPlayer) => {
    setAiPlayerToRemove(aiPlayer); // Set the current AI player ID to remove
    setConfirmModalShow(true); // Show the confirmation modal
  };

  const handleRemoveAiPlayer = async () => {
    if (aiPlayerToRemove) {
      // Replace this with your actual HTTP request logic
      await dispatch(removeAiPlayer({ id: aiPlayerToRemove.id }));
      setConfirmModalShow(false); // Hide the modal after removal
      setAiPlayerToRemove(null); // Reset the removal ID
      dispatch(getAiPlayerList({ from: pageFrom, limit: playerPerPage }));
    }
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
                  <tbody>
                    {aiPlayersList.map((aiPlayer, index) => {
                      return (
                        <tr key={index}>
                          <td>{aiPlayer.id}</td>
                          <td>{aiPlayer.quest_level}</td>
                          <td>{aiPlayer.quest_sublevel}</td>
                          <td>{aiPlayer.ai_name}</td>
                          <td>{aiPlayer.ai_deck}</td>
                          <td>
                            <ButtonGroup className="mb-2">
                              <Button>
                                <em className="fas fa-edit"></em>
                              </Button>
                              <Button
                                className="btn-danger"
                                onClick={() => handleShowConfirmModal(aiPlayer)}
                              >
                                <em className="fas fa-trash"></em>
                              </Button>
                            </ButtonGroup>
                          </td>
                        </tr>
                      );
                    })}
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
                onChange={(e) => {
                  setLevel(e.target.value);
                  setLevelError("");
                }}
                isInvalid={!!levelError}
              />
            </Form.Group>

            <Form.Group controlId="formSublevel">
              <Form.Label>Sublevel</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter Sublevel"
                value={sublevel}
                onChange={(e) => {
                  setSublevel(e.target.value);
                  setSublevelError("");
                }}
                isInvalid={!!sublevelError}
              />
            </Form.Group>

            <Form.Group controlId="formAIPlayerName">
              <Form.Label>AIPlayerName</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter AIPlayerName"
                value={aiPlayerName}
                onChange={(e) => {
                  setAiPlayerName(e.target.value);
                  setAiPlayerNameError("");
                }}
                isInvalid={!!aiPlayerNameError}
              />
            </Form.Group>

            <Form.Group controlId="formMultiSelect">
              <Form.Label>Select Options</Form.Label>
              <ShuttleList
                className="small"
                available={availableItems}
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
          <Button variant="primary" onClick={handleAddAiPlayer}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>

      <ConfirmModal
        heading="Confirm delete AI Player"
        text={`Do you want to remove AI player ${aiPlayerToRemove?.ai_name}`}
        show={confirmModalShow}
        onHide={() => setConfirmModalShow(false)}
        onConfirm={handleRemoveAiPlayer}
      ></ConfirmModal>
    </>
  );
}
