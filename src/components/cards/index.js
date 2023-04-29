import axios from "axios";
import React, { useEffect, useState } from "react";

import { } from '../../actions/';
import { HOST_URL } from '../../actions/types';
import Header from "../layout/header";
import Sidebar from "../layout/sidebar";
import ShuttleList from "./ShuttleList";

const CardsComponent = () => {
    const [availableItems, setAvailableItems] = useState([]);
    const [selectedItems, setSelectedItems] = useState([]);

    useEffect(() => {
        axios.get(HOST_URL + `getMetaData`).then(res => {
            setAvailableItems(Object.values(res.data.metadatas));
            console.log(res.data.metadatas);
        })
    }, []);

    const handleApplyClick = () => {
        console.log(selectedItems);
    };

    return (
        <>
            <Header />
            <Sidebar />
            <section className="section-container">
                <div className="content-wrapper" style={{ 'padding': '20px', 'borderTop': '0px' }}>
                    <div className="card card-default">
                        <div className="content-wrapper">
                            {availableItems.length > 0 ? <ShuttleList items={availableItems} onSelectionChange={setSelectedItems} /> : <div>Loading...</div>}
                        </div>
                        <button className="btn btn-primary m-2" onClick={handleApplyClick}>Apply</button>
                    </div>
                </div>
            </section>
        </>
    );
}
export default CardsComponent;
