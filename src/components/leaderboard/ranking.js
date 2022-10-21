import React, { useEffect, useState } from 'react';
import { Col, Row } from 'react-bootstrap';

import gold_ring from '../../assets/img/ranking_bound/mainmenu_rankframe_gold.png';
import silver_ring from '../../assets/img/ranking_bound/mainmenu_rankframe_silver.png';
import copper_ring from '../../assets/img/ranking_bound/mainmenu_rankframe_copper.png';
import stone_ring from '../../assets/img/ranking_bound/mainmenu_rankframe_stone.png';

const Ranking = ({ RankingData }) => {

    const ring = [gold_ring, silver_ring, copper_ring, stone_ring, stone_ring];
    const playerInfos = [];

    const [playerInfosData, setPlayerInfos] = useState([]);

    useEffect(() => {
        // for (let i = 0; i < RankingData.length; i++) {
        //     playerInfos.push(RankingData[i]);
        // }
        setPlayerInfos(RankingData);
    }, [ RankingData ]);

    var dot = '...';
    const modString = (str) => {
        if (str.indexOf('0x') !== -1) {
            let first = '';
            let last = '';

            first = str.slice(0, 4);
            last = str.slice(str.length - 4, str.length);
            return first + dot + last;
        } else {
            return str;
        }
    }

    return (
        <div className="content-wrapper">
            <div className="row">
                <div className="col-lg-12">
                    <div className="card card-default">
                        <div className="card-header d-flex">
                            <div className="card-title">Top Ranking Order</div>
                            <div className="ml-auto">
                                <div className="d-inline-block mr-3" data-perform="card-collapse"><em className="fa fa-minus"></em></div>
                                {/* <div className="d-inline-block mr-0" data-perform="card-dismiss"><em className="fa fa-times"></em></div> */}
                            </div>
                        </div>
                        <div className="card-wrapper">
                            <div className="card-body">
                                <Row className="bg-white mgl-5 mgr-5">
                                    <Col xl={9} lg={9} className='pt-20 d-flex margin-center justify-center top-player-list'>
                                        <div className='d-flex ml-10 mr-10 align-item-center width_20 ranking-item' style={{ 'marginTop': '100px' }}>
                                            <div className='pfp pfp-small'>
                                                <img className='top-ranking-pfp position-absolute' src={'../assets/img/ProfileImages/' + (playerInfosData.length !== 0 ? playerInfosData[3].pfp : '0') + '.png'} />
                                                <img className='ranking-frame' src={ring[3]} />
                                            </div>
                                            <div className='player-detail text-align'>
                                                <div className='top-ranking-username'>
                                                    <b>{modString(playerInfosData.length !== 0 ? playerInfosData[3].username : '1')}</b>
                                                </div>
                                                <div className='top-ranking-rank'>
                                                    Rank : <b>{playerInfosData.length !== 0 ? playerInfosData[3].rank : '1'}</b>
                                                </div>
                                                <div className='top-ranking-wins'>
                                                    Wins : <b>{playerInfosData.length !== 0 ? playerInfosData[3].wins : '1'}</b>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='d-flex ml-10 mr-10 align-item-center width_20 ranking-item z-index-50' style={{ 'marginTop': '50px' }}>
                                            <div className='pfp pfp-normal'>
                                                <img className='top-ranking-pfp position-absolute ' src={'../assets/img/ProfileImages/' + (playerInfosData.length !== 0 ? playerInfosData[1].pfp : '0') + '.png'} />
                                                <img className='ranking-frame ' src={ring[1]} />
                                            </div>
                                            <div className='player-detail text-align normal-ranking-font'>
                                                <div className='top-ranking-username'>
                                                    <b>{modString(playerInfosData.length !== 0 ? playerInfosData[1].username : '1')}</b>
                                                </div>
                                                <div className='top-ranking-rank'>
                                                    Rank : <b>{playerInfosData.length !== 0 ? playerInfosData[1].rank : '1'}</b>
                                                </div>
                                                <div className='top-ranking-wins'>
                                                    Wins : <b>{playerInfosData.length !== 0 ? playerInfosData[1].wins : '1'}</b>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='d-flex ml-10 mr-10 align-item-center width_20 ranking-item z-index-100'>
                                            <div className='pfp pfp-big'>
                                                <img className='top-ranking-pfp position-absolute' src={'../assets/img/ProfileImages/' + (playerInfosData.length !== 0 ? playerInfosData[0].pfp : '0') + '.png'} />
                                                <img className='ranking-frame' src={ring[0]} />
                                            </div>
                                            <div className='player-detail text-align top-ranking-font'>
                                                <div className='top-ranking-username'>
                                                    <b>{modString(playerInfosData.length !== 0 ? playerInfosData[0].username : '1')}</b>
                                                </div>
                                                <div className='top-ranking-rank'>
                                                    Rank : <b>{playerInfosData.length !== 0 ? playerInfosData[0].rank : '1'}</b>
                                                </div>
                                                <div className='top-ranking-wins'>
                                                    Wins : <b>{playerInfosData.length !== 0 ? playerInfosData[0].wins : '1'}</b>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='d-flex ml-10 mr-10 align-item-center width_20 ranking-item z-index-50' style={{ 'marginTop': '50px' }}>
                                            <div className='pfp pfp-normal'>
                                                <img className='top-ranking-pfp position-absolute ' src={'../assets/img/ProfileImages/' + (playerInfosData.length !== 0 ? playerInfosData[2].pfp : '0') + '.png'} />
                                                <img className='ranking-frame ' src={ring[2]} />
                                            </div>
                                            <div className='player-detail text-align  normal-ranking-font'>
                                                <div className='top-ranking-username'>
                                                    <b>{modString(playerInfosData.length !== 0 ? playerInfosData[2].username : '1')}</b>
                                                </div>
                                                <div className='top-ranking-rank'>
                                                    Rank : <b>{playerInfosData.length !== 0 ? playerInfosData[2].rank : '1'}</b>
                                                </div>
                                                <div className='top-ranking-wins'>
                                                    Wins : <b>{playerInfosData.length !== 0 ? playerInfosData[2].wins : '1'}</b>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='d-flex ml-10 mr-10 align-item-center width_20 ranking-item' style={{ 'marginTop': '100px' }}>
                                            <div className='pfp pfp-small'>
                                                <img className='top-ranking-pfp position-absolute' src={'../assets/img/ProfileImages/' + (playerInfosData.length !== 0 ? playerInfosData[4].pfp : '0') + '.png'} />
                                                <img className='ranking-frame' src={ring[4]} />
                                            </div>
                                            <div className='player-detail text-align'>
                                                <div className='top-ranking-username'>
                                                    <b>{modString(playerInfosData.length !== 0 ? playerInfosData[4].username : '1')}</b>
                                                </div>
                                                <div className='top-ranking-rank'>
                                                    Rank : <b>{playerInfosData.length !== 0 ? playerInfosData[4].rank : '1'}</b>
                                                </div>
                                                <div className='top-ranking-wins'>
                                                    Wins : <b>{playerInfosData.length !== 0 ? playerInfosData[4].wins : '1'}</b>
                                                </div>
                                            </div>
                                        </div>
                                    </Col>
                                </Row>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Ranking;