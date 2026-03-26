import React from "react";
import { FaShareAlt } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

const ProfileModal = ({
  activeTab,
  newItemName,
  setNewItemName,
  newItemURL,
  handleItemUrl,
  isChecked,
  addItem,
  itemError,
  closeModal,
  shareItem,
  deleteItem,
  editingIndex,
  links,
  shops
}) => {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header-toggle">
          <button className={`modal-tab ${activeTab === "link" ? "active" : ""}`}>
            <i className="fas fa-link"></i> Add Link
          </button>
          <button className={`modal-tab ${activeTab === "shop" ? "active" : ""}`}>
            <i className="fas fa-store"></i> Add Shop
          </button>
        </div>

        {/* Input Fields */}
        <div className="input-group-1">
          <input
            type="text"
            value={newItemName}
            onChange={(e) => setNewItemName(e.target.value)}
            className="m-input-field"
            placeholder={`${activeTab === "link" ? "Link" : "Shop"} Title`}
          />

          <div className="add-to-container">
            <label className="m-switch">
              <input
                type="checkbox"
                checked={isChecked}
                onChange={addItem}
                disabled={isChecked}
              />
              <span className="m-slider"></span>
            </label>
          </div>
        </div>

        <div className="input-group-2">
          <input
            type="text"
            value={newItemURL}
            onChange={(e) => handleItemUrl(e.target.value)}
            className="m-input-field"
            placeholder={`${activeTab === "link" ? "Link" : "Shop"} URL`}
          />

          <div className="action-icons">
            <FaShareAlt className="icon-share" onClick={() => shareItem(newItemURL)} />
            <MdDelete
              className="icon-delete"
              onClick={() => {
                if (editingIndex === null) {
                  const currentItems = activeTab === "link" ? links : shops;
                  const itemIndex = currentItems.findIndex(
                    (item) => item.name === newItemName && item.url === newItemURL
                  );
                  if (itemIndex !== -1) {
                    deleteItem(itemIndex, activeTab);
                    closeModal();
                  } else {
                    alert("Item not found or not in edit mode.");
                  }
                } else {
                  deleteItem(editingIndex, activeTab);
                  closeModal();
                }
              }}
            />
          </div>
        </div>
        {itemError && <p className="error-text"> {itemError} </p>}

        <div className="modal-buttons">
          <button className="m-ok-btn" onClick={itemError.length === 0 ? closeModal : null}>
            OK
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileModal;
