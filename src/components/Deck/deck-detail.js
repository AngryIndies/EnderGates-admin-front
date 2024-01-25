import axios from "axios";
import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { HOST_URL } from "../../config/config";
import Header from "../layout/header";
import Sidebar from "../layout/sidebar";
import './deck-detail.css';

const DeckImageDetail = () => {
    let { id } = useParams();
    const [deckDetail, setDeckDetail] = useState([]);

    useEffect(() => {
        axios.get(`${HOST_URL}getDeckInfo?deckId=${id}`).then(res => {
            setDeckDetail(res.data);
        });
    }, [id]);

    return (
        <>
            <Header />
            <Sidebar />
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
                                                    deckDetail && deckDetail.map((deck, index) => {
                                                        return (
                                                            <div key={index}>
                                                                <div style={{ 'margin': '10px 10px' }}>
                                                                    <div className="card-artwork">
                                                                        <img src={`https://ipfs.moralis.io:2053/ipfs/${deck["image"]}`} alt="NFT Card" />
                                                                    </div>

                                                                    <div className="card-info">
                                                                        <div className="card-name">{deck["name"]}</div>
                                                                        <div className="card-rarity">{deck["attributes"][0].value}</div>
                                                                    </div>
                                                                </div>
                                                            </div>
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
        </>
    );
}

export default DeckImageDetail;
