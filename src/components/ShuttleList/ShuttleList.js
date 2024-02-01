import React, { useState } from "react";
import "./shuttleList.scss";

function ShuttleList({
  available,
  selected,
  onSelectionChange,
  availableTitle,
  selectedTitle,
  className,
}) {
  const [selectedItems, setSelectedItems] = useState(selected);
  const [availableItems, setAvailableItems] = useState(available);

  const handleAddItemClick = (item) => {
    const updatedSelectedItems = [...selectedItems, { ...item, count: 1 }].sort(
      (item1, item2) => {
        return item1.properties.id?.value - item2.properties.id?.value;
      }
    );
    setSelectedItems(updatedSelectedItems);
    setAvailableItems(
      availableItems.filter(
        (i) => i.properties.name.value !== item.properties.name.value
      )
    );
    onSelectionChange(updatedSelectedItems);
  };

  const handleRemoveItemClick = (item, count) => {
    const updatedSelectedItems = selectedItems
      .map((i) => {
        if (i.properties.name.value === item.properties.name.value) {
          return { ...i, count };
        }
        return i;
      })
      .filter((i) => i.count > 0);
    setSelectedItems(updatedSelectedItems);
    if (count === 0) {
      setAvailableItems(
        [...availableItems, item].sort((item1, item2) => {
          return item1.properties.id?.value - item2.properties.id?.value;
        })
      );
    }
    onSelectionChange(updatedSelectedItems);
  };

  const handleCountChange = (event, item) => {
    const updatedSelectedItems = selectedItems.map((i) => {
      if (i.properties.name.value === item.properties.name.value) {
        return { ...i, count: parseInt(event.target.value) };
      }
      return i;
    });
    setSelectedItems(updatedSelectedItems);
    onSelectionChange(updatedSelectedItems.filter((i) => i.count > 0));
  };

  return (
    <div className={"shuttle-list-container " + className}>
      <ul className="shuttle-list shuttle-list-available">
        <li className="shuttle-list-header">{availableTitle}</li>
        {availableItems.map((item) =>
          selectedItems.findIndex(
            (selectedItem, index) =>
              selectedItem.properties.id.value == item.properties.id.value
          ) == -1 ? (
            <li
              key={item.properties.name.value}
              onClick={() => handleAddItemClick(item)}
            >
              <div className="shuttle-item-name">
                {item.properties.id
                  ? item.properties.id.value + ": "
                  : "Avatar: "}
                {item.name}
              </div>
            </li>
          ) : (
            ""
          )
        )}
      </ul>
      <ul className="shuttle-list shuttle-list-selected">
        <li className="shuttle-list-header">{selectedTitle}</li>
        {selectedItems.map((item) => (
          <li key={item.properties.name.value}>
            <div className="shuttle-item-name">
              {item.properties.id
                ? item.properties.id.value + ": "
                : "Avatar: "}
              {item.name}
            </div>
            <div className="shuttle-item-count">
              <span onClick={() => handleRemoveItemClick(item, item.count - 1)}>
                −
              </span>
              <input
                type="number"
                min="0"
                max="3"
                value={item.count}
                onChange={(event) => handleCountChange(event, item)}
              />
              <span onClick={() => handleRemoveItemClick(item, item.count + 1)}>
                +
              </span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ShuttleList;
