import { useEffect, useState } from "react";
import { Button, ButtonGroup, Form, Modal } from "react-bootstrap";
import Paginator from "react-hooks-paginator";
import { useDispatch, useSelector } from "react-redux";
import ConfirmModal from "../../../components/ConfirmModal/ConfirmModal";
import {
  addNewLocation,
  getLocations,
  removeLocation,
} from "../../../reducers/quest.slice";
import Header from "../../layout/header";
import Sidebar from "../../layout/sidebar";

export default function Locations() {
  const dispatch = useDispatch();

  const { locations } = useSelector((state) => state.quest);

  const [pageFrom, setPageFrom] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [playerPerPage, setPlayerPerPage] = useState(10);
  const [addModalShow, setAddModalShow] = useState(false);

  const [locationName, setLocationName] = useState("");
  const [locationNameError, setLocationNameError] = useState("");

  const [locationDescription, setLocationDescription] = useState("");
  const [locationDescriptionError, setLocationDescriptionError] = useState("");

  const [confirmModalShow, setConfirmModalShow] = useState(false);
  const [locationToRemove, setLocationToRemove] = useState(null);

  const handleAddClose = () => {
    setAddModalShow(false);
  };

  const handleAddModalShow = () => {
    setAddModalShow(true);
  };

  const onPageClick = (i) => {
    setCurrentPage(i);
  };

  const handleAddLocation = async () => {
    const newLocation = {
      locationName,
      locationDescription,
    };

    await dispatch(addNewLocation({ newLocation }));
    dispatch(getLocations());
    handleAddClose();
  };

  const handleShowConfirmModal = (location) => {
    setLocationToRemove(location); // Set the current AI player ID to remove
    setConfirmModalShow(true); // Show the confirmation modal
  };

  const handleRemoveLocation = async () => {
    if (locationToRemove) {
      setConfirmModalShow(false); // Hide the modal after removal
      setLocationToRemove(null); // Reset the removal ID
      await dispatch(removeLocation({ locationId: locationToRemove.id }));
      dispatch(getLocations());
    }
  };

  useEffect(() => {
    dispatch(getLocations());
  }, []);

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
                <div className="dataTables-title">Locations</div>
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
                      <th>Location Name</th>
                      <th>Location Description</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {locations.map((location, index) => {
                      return (
                        <tr key={index}>
                          <td>{location.id}</td>
                          <td>{location.location_name}</td>
                          <td>{location.location_description}</td>

                          <td>
                            <Button
                              className="btn-danger"
                              onClick={() => handleShowConfirmModal(location)}
                            >
                              <em className="fas fa-trash"></em>
                            </Button>
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
                          totalRecords={0}
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
          <Modal.Title>{"Add Location"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form className="form">
            <Form.Group controlId="formLocationName">
              <Form.Label>Location Name</Form.Label>
              <Form.Control
                placeholder="Enter Location Name"
                value={locationName}
                onChange={(e) => {
                  setLocationName(e.target.value);
                  setLocationNameError("");
                }}
              />
            </Form.Group>

            <Form.Group controlId="formLocationDescription">
              <Form.Label>Location Description</Form.Label>
              <Form.Control
                placeholder="Enter Location Description"
                value={locationDescription}
                onChange={(e) => {
                  setLocationDescription(e.target.value);
                  setLocationDescriptionError("");
                }}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleAddClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleAddLocation}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>

      <ConfirmModal
        heading="Confirm remove location"
        text={`Do you want to remove location ${locationToRemove?.location_name}`}
        show={confirmModalShow}
        onHide={() => setConfirmModalShow(false)}
        onConfirm={handleRemoveLocation}
      ></ConfirmModal>
    </>
  );
}
