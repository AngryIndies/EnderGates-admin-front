import React from "react";

const DashboardSidebar = () => {
    return (
        <div className="col-lg-3">
            {/* <div className="card card-default">
                <div className="card-header">
                    <div className="float-right badge badge-info">33</div>
                    <div className="card-title">Unread Messages</div>
                </div>
                <div className="list-group">
                    <div className="list-group-item">
                        <div className="media">
                            <img className="mr-3 rounded" style={{"width": "48px", "height": "48px"}} src="img/user/01.jpg" alt="Image" />
                            <div className="media-body clearfix">
                                <small className="float-right">2h</small>
                                <strong className="media-heading text-primary">
                                    <div className="point bg-success point-lg text-left"></div>Sheila Carter
                                </strong>
                                <p className="mb-sm"><small>Cras sit amet nibh libero, in gravida nulla. Nulla...</small></p>
                            </div>
                        </div>
                    </div>
                    <div className="list-group-item">
                        <div className="media">
                            <img className="mr-3 rounded" style={{"width": "48px", "height": "48px"}} src="img/user/04.jpg" alt="Image" />
                            <div className="media-body clearfix">
                                <small className="float-right">3h</small>
                                <strong className="media-heading text-primary">
                                    <div className="point bg-success point-lg text-left"></div>Rich Reynolds
                                </strong>
                                <p className="mb-sm"><small>Cras sit amet nibh libero, in gravida nulla. Nulla...</small></p>
                            </div>
                        </div>
                    </div>
                    <div className="list-group-item">
                        <div className="media">
                            <img className="mr-3 rounded" style={{"width": "48px", "height": "48px"}} src="img/user/03.jpg" alt="Image" />
                            <div className="media-body clearfix">
                                <small className="float-right">4h</small>
                                <strong className="media-heading text-primary">
                                    <div className="point bg-danger point-lg text-left"></div>Beverley Pierce
                                </strong>
                                <p className="mb-sm"><small>Cras sit amet nibh libero, in gravida nulla. Nulla...</small></p>
                            </div>
                        </div>
                    </div>
                    <div className="list-group-item">
                        <div className="media">
                            <img className="mr-3 rounded" style={{"width": "48px", "height": "48px"}} src="img/user/06.jpg" alt="Image" />
                            <div className="media-body clearfix">
                                <small className="float-right">4h</small>
                                <strong className="media-heading text-primary">
                                    <div className="point bg-danger point-lg text-left"></div>Alex Somar
                                </strong>
                                <p className="mb-sm"><small>Vestibulum pretium aliquam scelerisque.</small></p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="card-footer clearfix">
                    <a className="pull-left" href="#"><small>Read All</small></a>
                    <a className="float-right" href="#"><small>Dismiss All</small></a>
                </div>
            </div> */}
            <div className="card card-default">
                <div className="card-header">
                    <div className="card-title">Activity feed</div>
                </div>
                <div className="list-group">
                    <div className="list-group-item">
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
                    </div>
                </div>
                <div className="card-footer clearfix"><a className="pull-left" href="#"><small>Load more</small></a></div>
            </div>
        </div>
    );
}

export default DashboardSidebar;