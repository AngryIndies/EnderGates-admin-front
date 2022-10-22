import React, { useEffect, useState } from "react";
import { Col, Row, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { SpinnerDiamond, SpinnerDotted  } from 'spinners-react';
import { connect } from "react-redux";


import Chart from "./chart";

const DashboardMainContent = ({ data, chartData }) => {
    return (
        <div className="col-lg-9">
            <div className="row">
                <Col xl={3}>
                    <Card className="text-white bg-primary">
                        <Card.Header>
                            <Card.Title className="text-white font-13rem">Total Users</Card.Title>
                            <Card.Text className="d-flex align-items-center">
                                <div className="ml-auto"><em className="fa fa-users fa-2x"></em></div>
                            </Card.Text>
                        </Card.Header>
                        <Card.Body>
                            <Card.Text className="font-25 font-bold">
                                {!data.totalCards ? 0 : data.totalPlayers}
                            </Card.Text>
                        </Card.Body>
                        {/* <Card.Footer className=" bg-transparent border-0 text-white">
                        </Card.Footer> */}
                    </Card>
                </Col>
                <Col xl={3}>
                    <Card className="text-white bg-success">
                        <Card.Header>
                            <Card.Title className="text-white font-13rem">Total Cards</Card.Title>
                            <Card.Text className="d-flex align-items-center">
                                <div className="ml-auto"><em className="fa-2x mr-2 fas fa-ticket-alt"></em></div>
                            </Card.Text>
                        </Card.Header>
                        <Card.Body>
                            <Card.Text className="font-25 font-bold">
                                { !data.totalCards ? 0 : data.totalCards.actionCards + data.totalCards.guardianCards + data.totalCards.reactionCards}
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                <Col xl={3}>
                    <Card className="text-white bg-warning">
                        <Card.Header>
                            <Card.Title className="text-white font-13rem">Total Games</Card.Title>
                            <Card.Text className="d-flex align-items-center">
                                <div className="ml-auto"><em className="fa-2x mr-2 fas fa-gamepad"></em></div>
                            </Card.Text>
                        </Card.Header>
                        <Card.Body>
                            <Card.Text className="font-25 font-bold">
                                {!data.totalCards ? 0 : data.totalGames}
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                <Col xl={3}>
                    <Card className="text-white bg-info">
                        <Card.Header>
                            <Card.Title className="text-white font-13rem">Total Decks</Card.Title>
                            <Card.Text className="d-flex align-items-center">
                                <div className="ml-auto"><em className="fa-2x mr-2 fas fa-bars"></em></div>
                            </Card.Text>
                        </Card.Header>
                        <Card.Body>
                            <Card.Text className="font-25 font-bold">
                                {!data.totalCards ? 0 : data.totalDecks}
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
            </div>
            {
                Object.keys(chartData).length ? (
                    <Chart chartData= {chartData}/>
                ) : (
                    <Row className="text-center justify-center" style={{'height' : '150px'}}>
                        <SpinnerDotted
                            size={90}
                            speed={100}
                            thickness={120}
                        />
                    </Row>
                    
                )
            }
            

            <div className="row">
                <div className="col-md-4">
                    <div className="card animated fadeInLeftShort animate-delay-1400">
                        <div className="card-body">
                            <div className="text-right text-muted"><em className="fa fa-users fa-2x"></em></div>
                            <h3 className="mt0">20</h3>
                            {/* <p className="text-muted">New followers this month</p> */}
                            <div className="progress progress-striped progress-xs">
                                <div className="progress-bar bg-success" role="progressbar" aria-valuenow="80" aria-valuemin="0" aria-valuemax="100" style={{ "width": "80%" }}><span className="sr-only">80% Complete</span></div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="card animated fadeInLeftShort animate-delay-1400">
                        <div className="card-body">
                            <div className="text-right text-muted"><em className="fas fa-chart-bar fa-2x"></em></div>
                            <h3 className="mt0">$ 1250</h3>
                            {/* <p className="text-muted">Average Monthly Income</p> */}
                            <div className="progress progress-striped progress-xs">
                                <div className="progress-bar bg-info" role="progressbar" aria-valuenow="40" aria-valuemin="0" aria-valuemax="100" style={{ "width": "40%" }}><span className="sr-only">40% Complete</span></div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="card animated fadeInLeftShort animate-delay-1400">
                        <div className="card-body">
                            <div className="text-right text-muted"><em className="fa fa-trophy fa-2x"></em></div>
                            <h3 className="mt0">$ 13865</h3>
                            {/* <p className="text-muted">Yearly Income Goal</p> */}
                            <div className="progress progress-striped progress-xs">
                                <div className="progress-bar bg-warning" role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100" style={{ "width": "60%" }}><span className="sr-only">60% Complete</span></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-lg-12">
                    <div className="card card-default">
                        <div className="card-header d-flex">
                            <div className="card-title">Pending tasks</div>
                            <div className="ml-auto text-muted-light">
                                <div className="d-inline-block mr-3" data-perform="card-collapse"><em className="fa fa-minus"></em></div>
                                <div className="d-inline-block mr-0" data-perform="card-dismiss"><em className="fa fa-times"></em></div>
                            </div>
                        </div>
                        <div className="card-wrapper">
                            <div className="table-responsive">
                                <table className="table table-striped table-bordered table-hover">
                                    <thead>
                                        <tr>
                                            <th>Task name</th>
                                            <th>Progress</th>
                                            <th>Deadline</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>Nunc luctus, quam non condimentum ornare</td>
                                            <td>
                                                <div className="progress progress-striped progress-xs">
                                                    <div className="progress-bar bg-success" role="progressbar" aria-valuenow="80" aria-valuemin="0" aria-valuemax="100" style={{ "width": "80%" }}><span className="sr-only">80% Complete</span></div>
                                                </div>
                                            </td>
                                            <td><em className="fa fa-calendar fa-fw text-muted"></em> 05/05/2014</td>
                                            <td className="text-center">
                                                <div className="btn-group"><Link className="dropdown-toggle" to="#" data-toggle="dropdown"><i className="fa fa-cog"></i></Link>
                                                    <ul className="dropdown-menu float-right text-left">
                                                        <li><Link to="#">Action</Link></li>
                                                        <li><Link to="#">Another action</Link></li>
                                                        <li><Link to="#">Something else here</Link></li>
                                                        <li className="divider"></li>
                                                        <li><Link to="#">Separated link</Link></li>
                                                    </ul>
                                                </div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>Integer in convallis felis.</td>
                                            <td>
                                                <div className="progress progress-striped progress-xs">
                                                    <div className="progress-bar bg-danger" role="progressbar" aria-valuenow="20" aria-valuemin="0" aria-valuemax="100" style={{ "width": "20%" }}><span className="sr-only">20% Complete</span></div>
                                                </div>
                                            </td>
                                            <td><em className="fa fa-calendar fa-fw text-muted"></em> 15/05/2014</td>
                                            <td className="text-center">
                                                <div className="btn-group"><Link className="dropdown-toggle" to="#" data-toggle="dropdown"><i className="fa fa-cog"></i></Link>
                                                    <ul className="dropdown-menu float-right text-left">
                                                        <li><Link to="#">Action</Link></li>
                                                        <li><Link to="#">Another action</Link></li>
                                                        <li><Link to="#">Something else here</Link></li>
                                                        <li className="divider"></li>
                                                        <li><Link to="#">Separated link</Link></li>
                                                    </ul>
                                                </div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>Nullam sit amet magna vestibulum libero dapibus iaculis.</td>
                                            <td>
                                                <div className="progress progress-striped progress-xs">
                                                    <div className="progress-bar bg-info" role="progressbar" aria-valuenow="50" aria-valuemin="0" aria-valuemax="100" style={{ "width": "50%" }}><span className="sr-only">50% Complete</span></div>
                                                </div>
                                            </td>
                                            <td><em className="fa fa-calendar fa-fw text-muted"></em> 05/10/2014</td>
                                            <td className="text-center">
                                                <div className="btn-group"><Link className="dropdown-toggle" to="#" data-toggle="dropdown"><i className="fa fa-cog"></i></Link>
                                                    <ul className="dropdown-menu float-right text-left">
                                                        <li><Link to="#">Action</Link></li>
                                                        <li><Link to="#">Another action</Link></li>
                                                        <li><Link to="#">Something else here</Link></li>
                                                        <li className="divider"></li>
                                                        <li><Link to="#">Separated link</Link></li>
                                                    </ul>
                                                </div>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div className="card-footer text-right"><Link to="#"><small>View all</small></Link></div>
                    </div>
                </div>
            </div>
        </div>

    );
}

const mapStateToProps = (state) => ({
    dashboardReducer_main    : state.dashboardReducer.main_data,
});

export default connect(mapStateToProps, {
})(DashboardMainContent);
