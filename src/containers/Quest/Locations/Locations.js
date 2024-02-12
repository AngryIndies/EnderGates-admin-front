import { useState } from "react";
import { Button } from "react-bootstrap";
import Paginator from "react-hooks-paginator";
import { useDispatch } from "react-redux";
import Header from "../../layout/header";
import Sidebar from "../../layout/sidebar";

export default function Locations() {
  const dispatch = useDispatch();
  const [pageFrom, setPageFrom] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [playerPerPage, setPlayerPerPage] = useState(10);

  const onPageClick = (i) => {
    setCurrentPage(i);
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
                <div className="dataTables-title">Locations</div>
              </div>
              <Button className="dataTable-header-button">Add</Button>
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
                      <th>Location Enabled</th>
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
    </>
  );
}
