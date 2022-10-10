import React from "react";


const DashboardHeader = () => {
    return (
        <div className="content-header">
            <div className="content-title">Dashboard<small>Welcome user</small></div>
            <div className="ml-auto">
                <button className="btn btn-labeled btn-primary float-right" type="button">
                    <span className="btn-label"><i className="fa fa-plus-circle"></i></span>Add Item
                </button>
            </div>
        </div>
    );
}

export default DashboardHeader;