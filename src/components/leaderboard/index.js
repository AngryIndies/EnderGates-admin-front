import React, { useEffect, useState } from "react";
import axios from 'axios';
import Paginator from 'react-hooks-paginator';
import { HOST_URL } from '../../actions/types';
import { connect } from "react-redux";
import Ranking from './ranking';


// Ranking Change Images
import up from "../../assets/img/ranking_change/Main_change_up.png";
import equal from "../../assets/img/ranking_change/Main_change_same.png";
import down from "../../assets/img/ranking_change/Main_change_down.png"
import { SpinnerDotted } from "spinners-react";
import Header from "../layout/header";
import Sidebar from "../layout/sidebar";
import Signin from "../auth/signin";
import { Navigate } from "react-router-dom";

const LeaderboardIndex = ({isAuthenticated}) => {

   const [totalUsers, setTotalUsers] = useState(0);
   const [paginationCnt, setPaginationCnt] = useState(10);
   const [paginationFrom, setPaginationFrom] = useState(0);
   const [currentPage, setCurrentPage] = useState(1);
   const [rankData, setRankData] = useState([]);
   const [searchKey, setSearchKey] = useState('');
   const [fiveRankData, setFiveRankData] = useState([]);

   useEffect(() => {
      axios.get(HOST_URL + 'getPlayerCount').then(res => {
         setTotalUsers(res.data.count);
      });

      axios.get(HOST_URL + 'getPlayersRank?from=0&limit=5').then(res => {
         setFiveRankData(res.data);
      });
   }, []);

   useEffect(() => {
      axios.get(HOST_URL + 'getPlayersRank?from=' + paginationFrom + '&limit=' + paginationCnt + '&key=' + searchKey).then(res => {
         setRankData(res.data);
      })
   }, [paginationFrom, paginationCnt, searchKey]);

   const selectPaginationCnt = (cnt) => {
      setPaginationCnt(cnt);
   }

   const onClick = (i) => {
      setCurrentPage(i);
   };

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
            <Ranking
               RankingData={fiveRankData}
            />
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
                                 <th>Rank</th>
                                 <th>PFP</th>
                                 <th>Username</th>
                                 <th>Duel Points</th>
                                 <th>level</th>
                                 <th>Wins</th>
                                 <th>Losses</th>
                                 <th>Ratio</th>
                                 <th>Change 24h</th>
                              </tr>
                           </thead>
                           {
                              rankData.length === 0 ? (
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
                                 rankData.map((rank, index) => {
                                    let bar = Math.floor(rank.wins / (rank.wins + rank.losses) * 100);
                                    let r = bar % 10;
                                    let d = bar - r;
                                    return (
                                       <tr className="text-center" key={index}>
                                          <td className="vertical-middle">{rank.rank}</td>
                                          <td className="vertical-middle">
                                             <img className="img-fluid rounded-circle thumb50" src={'../assets/img/ProfileImages/' + rank.pfp + '.png'} alt="Image" />
                                          </td>
                                          <td className="vertical-middle">{rank.username}</td>
                                          <td className="vertical-middle">{rank.point}</td>
                                          <td className="vertical-middle">{rank.level}</td>
                                          <td className="vertical-middle">{rank.wins}</td>
                                          <td className="vertical-middle">{rank.losses}</td>
                                          <td className="vertical-middle">
                                             <div className={"radial-bar" + " radial-bar-" + `${d}` + " radial-bar-xs mb-0"} data-label={Math.floor(rank.wins / (rank.wins + rank.losses) * 100)}></div>
                                          </td>
                                          <td className="vertical-middle">
                                             {rank.change >= 0 ? (
                                                rank.change === 0 ? (
                                                   <img className="img-fluid rounded-circle thumb30" src={equal} alt="Image" />
                                                ) : (
                                                   <img className="img-fluid rounded-circle thumb30" src={up} alt="Image" />
                                                )) : (
                                                <img className="img-fluid rounded-circle thumb30" src={down} alt="Image" />
                                             )
                                             }

                                             &nbsp;&nbsp;&nbsp;
                                             {rank.change}
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
                                       totalRecords={totalUsers}
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
   isAuthenticated             : state.authReducer.isAuthenticated,
});

export default connect(mapStateToProps, {
   
})(LeaderboardIndex);