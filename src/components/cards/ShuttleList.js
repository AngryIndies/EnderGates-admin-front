import React, { useState } from 'react';
import './shuttle.scss';

function ShuttleList({ web3Required, freeToUse, onSelectionChange }) {
    const [selectedItems, setSelectedItems] = useState(freeToUse);
    const [availableItems, setAvailableItems] = useState(web3Required);

    const handleAddItemClick = item => {
        const updatedSelectedItems = [
            ...selectedItems,
            { ...item, count: 1 },
        ].sort((item1, item2) => {
            return item1.properties.id?.value - item2.properties.id?.value;
        });
        setSelectedItems(updatedSelectedItems);
        setAvailableItems(
            availableItems.filter(
                i => i.properties.name.value !== item.properties.name.value,
            ),
        );
        onSelectionChange(updatedSelectedItems);
    };

    const handleRemoveItemClick = (item, count) => {
        const updatedSelectedItems = selectedItems.map(i => {
            if (i.properties.name.value === item.properties.name.value) {
                return { ...i, count };
            }
            return i;
        });
        setSelectedItems(updatedSelectedItems);
        if (count === 0) {
            setAvailableItems(
                [...availableItems, item].sort((item1, item2) => {
                    return item1.properties.id?.value - item2.properties.id?.value;
                }),
            );
        }
        onSelectionChange(updatedSelectedItems.filter(i => i.count > 0));
    };

    const handleCountChange = (event, item) => {
        const updatedSelectedItems = selectedItems.map(i => {
            if (i.properties.name.value === item.properties.name.value) {
                return { ...i, count: parseInt(event.target.value) };
            }
            return i;
        });
        setSelectedItems(updatedSelectedItems);
        onSelectionChange(updatedSelectedItems.filter(i => i.count > 0));
    };

    return (
        <div className="shuttle-list-container">
            <ul className="shuttle-list shuttle-list-available">
                <li className="shuttle-list-header">Web3 Required NFT Cards</li>
                {availableItems.map(item => (
                    <li key={item.properties.name.value} onClick={() => handleAddItemClick(item)}>
                        <div className="shuttle-item-name">
                            {item.properties.id ? item.properties.id.value + ': ' : 'Avatar: '}
                            {item.name}
                        </div>
                    </li>
                ))}
            </ul>
            <ul className="shuttle-list shuttle-list-selected">
                <li className="shuttle-list-header">Free To Use</li>
                {selectedItems.map(item => (
                    <li key={item.properties.name.value}>
                        <div className="shuttle-item-name">
                            {item.properties.id ? item.properties.id.value + ': ' : 'Avatar: '}
                            {item.name}
                        </div>
                        <div className="shuttle-item-count">
                            <span onClick={() => handleRemoveItemClick(item, item.count - 1)}>−</span>
                            <input
                                type="number"
                                min="0"
                                max="3"
                                value={item.count}
                                onChange={event => handleCountChange(event, item)}
                            />
                            <span onClick={() => handleRemoveItemClick(item, item.count + 1)}>+</span>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default ShuttleList;
