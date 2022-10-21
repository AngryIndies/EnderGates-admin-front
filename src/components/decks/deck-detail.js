import axios from "axios";
import React, { useEffect, useState } from "react";
import { Row, Col } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import { HOST_URL } from "../../actions/types";

const DeckImageDetail = () => {
    let { id } = useParams();
    const [dexDetail, setDexDetail] = useState([]);

    useEffect(() => {
        axios.get(HOST_URL + 'getDeckInfo?deckId=' + `${id}`).then(res => {
            setDexDetail(res.data);
        });
    }, [id]);

    return (
        <section className="section-container">
            <div className="content-wrapper" style={{ 'padding': '20px', 'borderTop': '0px' }}>
                <div className="container-fluid">
                    <Row>
                        <Col xl={12}>
                            <div className="card card-default card-demo" id="cardDemo3">
                                <div className="card-header d-flex">
                                    <div className="card-title">Decks Detail</div>
                                    <div className="ml-auto text-muted-light">
                                        {/* <div className="d-inline-block mr-3" data-perform="card-collapse"><em className="fa fa-minus"></em></div>
                                        <div className="d-inline-block mr-0" data-perform="card-dismiss"><em className="fa fa-times"></em></div> */}
                                    </div>
                                </div>
                                <div className="card-wrapper">
                                    <div className="card-body">
                                        <Row>
                                        {
                                            dexDetail && dexDetail.map((dex, index) => {
                                                return (
                                                    <Col xl="2" key={index}>
                                                        <div style={{'margin' : '10px 10px'}}>
                                                            <img className="width-70P" src={'../assets/img/cards/' + `${dex}` + '.png'} />
                                                        </div>
                                                    </Col>
                                                );
                                            })
                                        }
                                        </Row>
                                    </div>
                                    <div className="card-footer"></div>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </div>
            </div>
        </section>
    );
}

export default DeckImageDetail;
