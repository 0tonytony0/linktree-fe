import React from "react";
import { MdDelete } from "react-icons/md";

const LinkItem = ({ item, index, type, openModal, deleteItem }) => {
  return (
    <div key={index} className="list-item">
      <div className="item-details">
        <p className="item-title">
          {item.name}{" "}
          <span className="edit-icon" onClick={() => openModal(true, index)}>
            ✏️
          </span>
        </p>
        <p className="item-url">
          {item.url}{" "}
          <span className="edit-icon" onClick={() => openModal(true, index)}>
            ✏️
          </span>
        </p>
        <p className="click-stats">📊 {item.clicks} clicks</p>
      </div>
      <div className="item-actions">
        <label className="m-switch">
          <input type="checkbox" checked={item.active !== false} readOnly />
          <span className="m-slider"></span>
        </label>
        <MdDelete
          className="delete-icon"
          onClick={() => deleteItem(index, type)}
        />
      </div>
    </div>
  );
};

export default LinkItem;
