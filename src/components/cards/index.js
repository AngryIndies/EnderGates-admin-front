import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { } from '../../actions/';
import { HOST_URL } from '../../actions/types';
import Header from "../layout/header";
import Sidebar from "../layout/sidebar";
import ShuttleList from "./ShuttleList";

const CardsComponent = () => {
    const [availableItems, setAvailableItems] = useState([]);
    const [selectedItems, setSelectedItems] = useState([]);

    useEffect(() => {
        axios.get(HOST_URL + `cardsInfo`).then(res => {
            let cardInfos = res.data.cards;
            cardInfos = cardInfos.filter((card) => card.is_free === 1);

            axios.get(HOST_URL + `getMetaData`).then(res => {
                const metadatas = Object.values(res.data.metadatas);
                let web3Requried = [], freeToUse = [];

                metadatas.forEach((metadata) => {
                    let card = cardInfos.find((card) => card.id === metadata.properties.id?.value);
                    if (!!card) {
                        freeToUse.push({
                            ...metadata,
                            count: card.free_cards_count
                        });
                    } else {
                        web3Requried.push(metadata);
                    }
                })

                setAvailableItems(web3Requried);
                setSelectedItems(freeToUse);

            });
        });
    }, []);

    const handleApplyClick = () => {
        const cardIds = selectedItems.map((item) => {
            return {
                id: item.properties.id?.value,
                count: item.count,
            }
        });

        axios.put(HOST_URL + 'cardsInfo', {
            cardIds: cardIds
        }).then(res => {
            toast.success("Successfully updated free to use cards info");
        }).catch(err => {
            toast.error(err);
        });
    };

    return (
        <>
            <Header />
            <Sidebar />
            <section className="section-container">
                <div className="content-wrapper" style={{ 'padding': '20px', 'borderTop': '0px' }}>
                    <div className="card card-default">
                        <div className="content-wrapper">
                            {availableItems.length > 0 ? <ShuttleList web3Required={availableItems} freeToUse={selectedItems} onSelectionChange={setSelectedItems} /> : <div>Loading...</div>}
                        </div>
                        <button className="btn btn-primary m-2" onClick={handleApplyClick}>Apply</button>
                    </div>
                </div>
            </section>
            <ToastContainer
                autoClose={3000}
                hideProgressBar={true}
                theme="colored"
                position="bottom-right"
            />
        </>
    );
}
export default CardsComponent;
