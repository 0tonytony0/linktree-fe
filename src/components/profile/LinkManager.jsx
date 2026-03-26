import React from "react";
import { FaLink, FaStore } from "react-icons/fa";
import LinkItem from "./LinkItem";

const LinkManager = ({ activeTab, setActiveTab, links, shops, openModal, deleteItem }) => {
  const currentItems = activeTab === "link" ? links : shops;

  return (
    <div className="links-section">
      <div className="toggle-slider-container">
        <button
          className={`slider-btn ${activeTab === "link" ? "active" : ""}`}
          onClick={() => setActiveTab("link")}
        >
          <FaLink /> Add Link
        </button>
        <button
          className={`slider-btn ${activeTab === "shop" ? "active" : ""}`}
          onClick={() => setActiveTab("shop")}
        >
          <FaStore /> Add Shop
        </button>
      </div>

      <button className="add-btn" onClick={() => openModal(false)}>
        + Add
      </button>

      <div className="list-container">
        {currentItems.map((item, index) => (
          <LinkItem
            key={index}
            item={item}
            index={index}
            type={activeTab}
            openModal={openModal}
            deleteItem={deleteItem}
          />
        ))}
      </div>
    </div>
  );
};

export default LinkManager;
