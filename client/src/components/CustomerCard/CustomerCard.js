import React , { useState } from "react";
import Modal from "react-modal";
import { useNavigate } from "react-router-dom";
import { MdOutlineDeleteForever } from "react-icons/md";
import "./CustomerCard.css";

export const CustomerCard = ({ CusDetails,onDelete }) => {
    const navigate = useNavigate();

    const handleClick = () => {
    navigate(`/DetailedPage/${CusDetails.id}`);
    };

    const firstLetter = CusDetails.firstName
    ? CusDetails.firstName[0].toUpperCase()
    : "?";

    return (
    <div className="customer-card"  onClick={handleClick}>
        
        <div className="profile-circle">{firstLetter}</div>
        <div className="customer-info">
        <h3 className="customer-name">
            {CusDetails.firstName} {CusDetails.lastName}
        </h3>
        <p className="customer-phone">{CusDetails.phoneNumber}</p>
        </div>
        
         <MdOutlineDeleteForever
            className="delete-icon"
             onClick={(e) => {
                e.stopPropagation(); 
                onDelete(CusDetails.id);
  }}
            title="Delete Customer"
            />
    </div>
    );
    };


export const AddressBox = (props) => {
  const { addressess, openEditModal, openDeleteModal } = props;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editData, setEditData] = useState({
  id: addressess.id,
  address_details: addressess.address_details,
  city: addressess.city,
  state: addressess.state,
  pin_code: addressess.pin_code,
});

  const handleSave = async () => {
    await openEditModal(editData);
    setIsModalOpen(false);
  };

  return (
    <>
      <li key={addressess.id} className="address-card">
        

        <div className="address-body">
          <p>
            {addressess.address_details},
            
          </p>
          <p>{addressess.city},</p>
          <p>{addressess.state},</p>
          <p>{addressess.pin_code}</p>
        </div>

        <div className="address-header">
          <div className="address-actions">
            <button className="edit-btn" onClick={() => setIsModalOpen(true)}>
              Edit
            </button>
            <button
              className="delete-btn"
              onClick={() => openDeleteModal(addressess.id)}
            >
              Delete
            </button>
          </div>
        </div>
      </li>

      
      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        contentLabel="Edit Address"
        className="modal-content"
        overlayClassName="modal-overlay"
      >
        <h3>Edit Address</h3>
        <input
          type="text"
          value={editData.address_details || ""}
          onChange={(e) =>
            setEditData({ ...editData, address_details: e.target.value })
          }
          placeholder="Address Details"
        />
        <input
          type="text"
          value={editData.city || ""}
          onChange={(e) => setEditData({ ...editData, city: e.target.value })}
          placeholder="City"
        />
        <input
          type="text"
          value={editData.state || ""}
          onChange={(e) => setEditData({ ...editData, state: e.target.value })}
          placeholder="State"
        />
        <input
          type="text"
          value={editData.pin_code || ""}
          onChange={(e) =>
            setEditData({ ...editData, pin_code: e.target.value })
          }
          placeholder="pin Code"
        />

        <div className="modal-actions">
          <button onClick={handleSave}>Save</button>
          <button onClick={() => setIsModalOpen(false)}>Cancel</button>
        </div>
      </Modal>
    </>
  );
};