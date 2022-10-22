import React, { useState, useEffect } from "react";
import { SpinnerDiamond, SpinnerDotted } from 'spinners-react';

import { Link } from "react-router-dom";

const timestampToDate = (timestamp) => {
    const date = Date.now();
}

const LastActivities = ({onLoadMore, onLoadLess, data, clickTime}) => {
    return (
        <div className="col-lg-3">
            <div className="card card-default">
                <div className="card-header">
                    <div className="card-title">Last Activities</div>
                </div>
                <div className="list-group">
                    {
                        data.length === 0 ? (
                            <div className="text-center">
                                <SpinnerDotted
                                    size={40}
                                    speed={140}
                                    thickness={120}
                                />
                            </div>
                        ) : (
                            data.map((activity, item) => {
                                return (
                                    <div className="list-group-item" key={item}>
                                        <div className="media">
                                            <div className="mr-3">
                                                <span className="fa-stack fa-lg">
                                                    <em className="fas fa-circle fa-stack-2x text-green"></em>
                                                    <em className="fa fa-clock fa-stack-1x fa-inverse text-white"></em>
                                                </span>
                                            </div>
                                            <div className="media-body clearfix">
                                                <div className="media-heading text-green m0"></div>
                                                <b>{activity.event}</b>
                                                <p className="m0">
                                                    <small>{activity.event_data}</small>
                                                </p>
                                                <small>{activity.event_timestamp}</small>
                                                
                                            </div>
                                        </div>
                                    </div>
                                );
                            })
                        )
                    }
                    
                </div>
                <div className="card-footer clearfix">
                    <Link className="pull-left" onClick={() => onLoadMore()}>Load more</Link>
                    {
                        clickTime > 1 ? (
                            <Link className="mgl-15" onClick={() => onLoadLess()}>Load less</Link>
                        ) : (
                            <></>
                        )
                    }
                </div>
            </div>
        </div>
    );
}

export default LastActivities;