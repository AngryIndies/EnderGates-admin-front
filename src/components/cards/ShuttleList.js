import React, { useState } from 'react';
import "./shuttle.scss"

function ShuttleList({ items }) {
    const [selectedItems, setSelectedItems] = useState([]);
    const [availableItems, setAvailableItems] = useState(items);

    const handleAddItemClick = (item) => {
        setSelectedItems([...selectedItems, item]);
        setAvailableItems(availableItems.filter((i) => i.properties.name.value !== item.properties.name.value));
    };

    const handleRemoveItemClick = (item) => {
        setSelectedItems(selectedItems.filter((i) => i.properties.name.value !== item.properties.name.value));
        setAvailableItems([...availableItems, item]);
    };

    return (
        <div className="shuttle-list-container">
            <ul className="shuttle-list shuttle-list-available">
                <li className="shuttle-list-header">Web3 Required NFT Cards</li>
                {availableItems.map((item) => (
                    <li key={item.properties.name.value} onClick={() => handleAddItemClick(item)}>
                        {(item.properties.id ? item.properties.id.value + ": " : "Avatar:") + item.name}
                    </li>
                ))}
            </ul>
            <ul className="shuttle-list shuttle-list-selected">
                <li className="shuttle-list-header">Free To Use</li>
                {selectedItems.map((item) => (
                     <li key={item.properties.name.value} onClick={() => handleRemoveItemClick(item)}>
                     {(item.properties.id ? item.properties.id.value + ": " : "Avatar:") + item.name}
                 </li>
                ))}
            </ul>
        </div >
    );
}

export default ShuttleList;