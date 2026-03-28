import React from "react";
import { MdDelete, MdEdit, MdBarChart } from "react-icons/md";
import { FaToggleOn, FaToggleOff } from "react-icons/fa";

const LinkItem = ({ item, index, type, openModal, deleteItem }) => {
  return (
    <div className="list-item">
      <div className="item-details" onClick={() => openModal(true, index)}>
        <div className="item-info">
          <p className="item-title">{item.name}</p>
          <p className="item-url">{item.url}</p>
        </div>
        <div className="item-meta">
          <span className="click-stats">
            <MdBarChart /> {item.clicks || 0} clicks
          </span>
        </div>
      </div>
      
      <div className="item-actions">
        <button 
          className="action-btn edit-btn" 
          onClick={() => openModal(true, index)}
          title="Edit"
        >
          <MdEdit />
        </button>
        
        <button 
          className="action-btn toggle-btn" 
          title={item.active ? "Deactivate" : "Activate"}
        >
          {item.active !== false ? <FaToggleOn className="active-icon" /> : <FaToggleOff />}
        </button>

        <button 
          className="action-btn delete-btn" 
          onClick={(e) => { e.stopPropagation(); deleteItem(index, type); }}
          title="Delete"
        >
          <MdDelete />
        </button>
      </div>
    </div>
  );
};

export default LinkItem;
