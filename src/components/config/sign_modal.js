import React from "react";

const SignModal = () => {


    return (
        <div className="modal fade" id="setPlayerSetting" tabIndex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                    <h4 className="modal-title" id="myModalLabel">Player Setting Sign</h4>
                    <button className="close" type="button" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                    </div>
                    <div className="modal-body">...</div>
                    <div className="modal-footer">
                        <button className="btn btn-secondary" type="button" data-dismiss="modal">Close</button>
                        <button className="btn btn-primary" type="button">Save changes</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SignModal;