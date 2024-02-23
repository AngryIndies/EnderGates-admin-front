import { useEffect, useState } from "react";
import { Button, ButtonGroup, Modal } from "react-bootstrap";

import Form from "react-bootstrap/Form";

import Paginator from "react-hooks-paginator";
import { useDispatch, useSelector } from "react-redux";
import {
  addAiPlayer,
  editAiPlayer,
  getAiPlayerList,
  getLocations,
  removeAiPlayer,
} from "../../../reducers/quest.slice";
import { getCardsInfo, getMetadata } from "../../../reducers/card.slice";

import Header from "../../layout/header";
import Sidebar from "../../layout/sidebar";

import ConfirmModal from "../../../components/ConfirmModal/ConfirmModal";
import ShuttleList from "../../../components/ShuttleList/ShuttleList";

import "./missions.scss";

export default function Missions() {
  const dispatch = useDispatch();

  const { totalAIPlayerCount, aiPlayersList, locations } = useSelector(
    (state) => state.quest
  );
  const { cardsInfo, cardsMetadata } = useSelector((state) => state.card);

  const [playerPerPage, setPlayerPerPage] = useState(10);
  const [pageFrom, setPageFrom] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [addModalShow, setAddModalShow] = useState(false);

  const [confirmModalShow, setConfirmModalShow] = useState(false);
  const [aiPlayerToRemove, setAiPlayerToRemove] = useState(null);

  const [level, setLevel] = useState(-1);
  const [sublevel, setSublevel] = useState("");
  const [aiPlayerName, setAiPlayerName] = useState("");

  // State for validation messages
  const [levelError, setLevelError] = useState("");
  const [sublevelError, setSublevelError] = useState("");
  const [aiPlayerNameError, setAiPlayerNameError] = useState("");
  const [aiDeck, setAiDeck] = useState([]);

  const [availableCards, setAvailableCards] = useState([]);
  const [selectedCards, setSelectedCards] = useState([]);

  const [isEditing, setIsEditing] = useState(false);
  const [editingPlayerId, setEditingPlayerId] = useState(-1);

  const handleAddModalShow = () => {
    setLevel("");
    setSublevel("");
    setAiPlayerName("");

    setLevelError("");
    setSublevelError("");
    setAiPlayerNameError("");

    setSelectedCards([]);
    setAddModalShow(true);
  };
  const handleAddClose = () => {
    setAddModalShow(false);
    setIsEditing(false);
  };

  const onPageClick = (i) => {
    setCurrentPage(i);
  };

  // Validation functions
  const validateLevel = () => {
    if (!level || level < 0) {
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

  const handleAddMission = async () => {
    const isLevelValid = validateLevel();
    const isSublevelValid = validateSublevel();
    const isAiPlayerNameValid = validateAiPlayerName();

    if (!isLevelValid || !isSublevelValid || !isAiPlayerNameValid) {
      return; // Stop submission if validation fails
    }

    if (isEditing) {
      const editingPlayerInfo = {
        aiPlayerName,
        playerId: editingPlayerId,
        selectedCards: aiDeck,
      };

      await dispatch(editAiPlayer({ aiPlayer: editingPlayerInfo }));
      dispatch(getAiPlayerList({ from: pageFrom, limit: playerPerPage }));
      setAddModalShow(false);

      return;
    }

    const newAiPlayer = {
      level,
      sublevel,
      aiPlayerName,
      selectedCards: aiDeck,
    };

    await dispatch(addAiPlayer({ newAiPlayer }));
    dispatch(getAiPlayerList({ from: pageFrom, limit: playerPerPage }));
    setAddModalShow(false);
  };

  const handleShowEditModal = (aiPlayer) => {
    setAddModalShow(true);

    setLevel(aiPlayer.quest_level);
    setSublevel(aiPlayer.quest_sublevel);
    setAiPlayerName(aiPlayer.ai_name);

    const deckCards = aiPlayer.ai_deck.split(",");
    const selectedCards = [];
    const metadatas = Object.values(cardsMetadata);
    deckCards.forEach((card) => {
      const cardId = parseInt(card);
      const cardData = metadatas.find(
        (md) => cardId === md.properties.id?.value
      );
      if (cardData != null) {
        // Check if the card is already in selectedCards
        const existingCard = selectedCards.find(
          (sc) => sc.properties.id?.value === cardId
        );
        if (existingCard) {
          // If exists, increment the count
          existingCard.count += 1;
        } else {
          // If not, add the card with a count of 1
          selectedCards.push({ ...cardData, count: 1 });
        }
      }
    });

    setIsEditing(true);
    setEditingPlayerId(aiPlayer.id);
    setSelectedCards(selectedCards);
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
    dispatch(getLocations());
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
    setAvailableCards(availableCardDetails);
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
              <Button
                className="dataTable-header-button"
                onClick={handleAddModalShow}
              >
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
                      <th>Location</th>
                      <th>Mission</th>
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
                          <td>
                            {
                              locations.find((location, index) => {
                                return location.id == aiPlayer.quest_level;
                              }).location_name
                            }
                          </td>
                          <td>{aiPlayer.quest_sublevel}</td>
                          <td>{aiPlayer.ai_name}</td>
                          <td>
                            <div className="ellipsis-text">
                              {aiPlayer.ai_deck}
                            </div>
                          </td>
                          <td>
                            <ButtonGroup className="mb-2">
                              <Button>
                                <em
                                  className="fas fa-edit"
                                  onClick={() => handleShowEditModal(aiPlayer)}
                                ></em>
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

      <Modal show={addModalShow} onHide={handleAddClose}>
        <Modal.Header>
          <Modal.Title>
            {isEditing ? "Edit Quest Mission" : "Add Quest Mission"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form className="form">
            <Form.Group controlId="formLevel">
              <Form.Label>Location</Form.Label>
              <Form.Select
                value={level}
                onChange={(e) => {
                  setLevel(e.target.value);
                }}
                isInvalid={!!levelError}
                disabled={isEditing}
                className="form-control"
              >
                <option value={-1}>Please Select Location</option>

                {locations.map((location, index) => (
                  <option key={index} value={parseInt(location.id)}>
                    {location.location_name}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>

            <Form.Group controlId="formSublevel">
              <Form.Label>Quest Level</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter Quest Level"
                value={sublevel}
                onChange={(e) => {
                  setSublevel(e.target.value);
                  setSublevelError("");
                }}
                isInvalid={!!sublevelError}
                disabled={isEditing}
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
                available={availableCards}
                selected={selectedCards}
                availableTitle="Available"
                selectedTitle="Selected"
                onSelectionChange={setAiDeck}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleAddClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleAddMission}>
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
