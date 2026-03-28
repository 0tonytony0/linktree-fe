import React from "react";
import { FaShareAlt, FaGlobe, FaImage } from "react-icons/fa";
import { MdDelete, MdClose } from "react-icons/md";
import { uploadImage } from "../../services/uploadServices";
import { toast } from "react-toastify";

const ProfileModal = ({
  activeTab,
  newItemName,
  setNewItemName,
  newItemURL,
  handleItemUrl,
  newItemImage,
  setNewItemImage,
  addItem,
  itemError,
  closeModal,
  shareItem,
  deleteItem,
  editingIndex,
}) => {
  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      const toastId = toast.loading("Uploading thumbnail...");
      const imageData = await uploadImage(file);
      setNewItemImage(imageData.imageUrl);
      toast.update(toastId, { render: "Thumbnail uploaded! 🖼️", type: "success", isLoading: false, autoClose: 2000 });
    } catch (err) {
      toast.error("Upload failed");
    }
  };
  return (
    <div className="modal-overlay" onClick={(e) => e.target.className === 'modal-overlay' && closeModal()}>
      <div className="modal-content">
        <div className="modal-header">
          <h3>{editingIndex !== null ? "Edit" : "Add"} {activeTab === "link" ? "Link" : "Shop"}</h3>
          <button className="close-btn" onClick={closeModal}><MdClose /></button>
        </div>

        <div className="modal-body">
          <div className="m-input-group">
            <label>{activeTab === "link" ? "Link" : "Shop"} Title</label>
            <input
              type="text"
              value={newItemName}
              onChange={(e) => setNewItemName(e.target.value)}
              className="m-input-field"
              placeholder="e.g. My Website"
            />
          </div>

          <div className="m-input-group">
            <label>{activeTab === "link" ? "Link" : "Shop"} URL</label>
            <div className="m-input-with-icon">
              <FaGlobe className="m-field-icon" />
              <input
                type="text"
                value={newItemURL}
                onChange={(e) => handleItemUrl(e.target.value)}
                className="m-input-field"
                placeholder="https://example.com"
              />
            </div>
            {itemError && <p className="error-text">{itemError}</p>}
          </div>

          <div className="m-input-group">
            <label>Thumbnail (Optional)</label>
            <div className="thumbnail-manager">
              {newItemImage ? (
                <div className="thumbnail-preview-box">
                  <img src={newItemImage} alt="Preview" />
                  <button className="remove-thumb" onClick={() => setNewItemImage("")}>
                    <MdClose />
                  </button>
                </div>
              ) : (
                <div className="thumbnail-upload-options">
                  <label className="m-upload-label">
                    <FaImage /> Upload Image
                    <input type="file" onChange={handleFileChange} hidden accept="image/*" />
                  </label>
                  <span className="or-text">or</span>
                  <input
                    type="text"
                    placeholder="Paste image URL"
                    value={newItemImage}
                    onChange={(e) => setNewItemImage(e.target.value)}
                    className="m-input-field small"
                  />
                </div>
              )}
            </div>
            <p className="hint-text">Image cards appear premium in mobile view.</p>
          </div>
        </div>

        <div className="modal-footer">
          {editingIndex !== null && (
            <button 
              className="m-delete-btn" 
              onClick={() => { deleteItem(editingIndex, activeTab); closeModal(); }}
            >
              <MdDelete /> Delete
            </button>
          )}
          
          <div className="footer-actions">
            {newItemURL && !itemError && (
              <button className="m-share-btn" onClick={() => shareItem(newItemURL)} title="Share Link">
                <FaShareAlt />
              </button>
            )}
            <button 
              className="m-ok-btn" 
              onClick={addItem}
              disabled={!!itemError || !newItemName || !newItemURL}
            >
              {editingIndex !== null ? "Update" : "Add"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileModal;
