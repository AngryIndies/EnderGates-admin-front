import React, { useState, useEffect } from "react";
import Spinner from 'react-bootstrap/Spinner'

import { Link } from "react-router-dom";

const timestampToDate = (timestamp) => {
    const date = Date.now();
    console.log(date);
}

const LastActivities = ({data}) => {

    useEffect(() => {
        timestampToDate();

    }, []);

    return (
        <div className="col-lg-3">
            <div className="card card-default">
                <div className="card-header">
                    <div className="card-title">Last Activities</div>
                </div>
                <div className="list-group">
                    {
                        data == null ? (
                            <Spinner></Spinner>
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
                                                {/* <p className="m0"><small>New file<Link to="#">entities.xls</Link>uploaded to the cloud</small></p><small>5 minutes ago</small> */}
                                                <p>{activity.event}</p>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })
                        )
                    }
                    {/* <div className="list-group-item">
                        <div className="media">
                            <div className="mr-3">
                                <span className="fa-stack fa-lg">
                                    <em className="fas fa-circle fa-stack-2x text-green"></em>
                                    <em className="fas fa-cloud-upload-alt fa-stack-1x fa-inverse text-white"></em>
                                </span>
                            </div>
                            <div className="media-body clearfix">
                                <div className="media-heading text-green m0">NEW UPLOAD</div>
                                <p className="m0"><small>New file<a href="#">entities.xls</a>uploaded to the cloud</small></p><small>5 minutes ago</small>
                            </div>
                        </div>
                    </div>
                    <div className="list-group-item">
                        <div className="media">
                            <div className="mr-3">
                                <span className="fa-stack fa-lg">
                                    <em className="fas fa-circle fa-stack-2x text-info"></em>
                                    <em className="fa fa-file fa-stack-1x fa-inverse text-white"></em>
                                </span>
                            </div>
                            <div className="media-body clearfix">
                                <div className="media-heading text-info m0">NEW DOCUMENT</div>
                                <p className="m0"><small>New document<a href="#">Lorem ipsum</a>created</small></p><small>1 hour ago</small>
                            </div>
                        </div>
                    </div>
                    <div className="list-group-item">
                        <div className="media">
                            <div className="mr-3"><span className="fa-stack fa-lg"><em className="fas fa-circle fa-stack-2x text-danger"></em><em className="fa fa-exclamation fa-stack-1x fa-inverse text-white"></em></span></div>
                            <div className="media-body clearfix">
                                <div className="media-heading text-danger m0">IMPORTANT MESSAGE</div>
                                <p className="m0"><small>Sammy Sam sent you an important messsage.<a href="#">Read now</a></small></p><small>3 hours ago</small>
                            </div>
                        </div>
                    </div>
                    <div className="list-group-item">
                        <div className="media">
                            <div className="mr-3"><span className="fa-stack fa-lg"><em className="fas fa-circle fa-stack-2x text-warning"></em><em className="fa fa-clock fa-stack-1x fa-inverse text-white"></em></span></div>
                            <div className="media-body clearfix">
                                <div className="media-heading text-warning m0">MEETING</div>
                                <p className="m0"><small>Rich Reynods added a new meeting.<a className="label label-info" href="#">JOIN</a></small></p><small>yesterday</small>
                            </div>
                        </div>
                    </div> */}
                </div>
                <div className="card-footer clearfix">
                    {/* <a className="pull-left" href="#">
                        <small>Load more</small>
                    </a> */}
                </div>
            </div>
        </div>
    );
}

export default LastActivities;