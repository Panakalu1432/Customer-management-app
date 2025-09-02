import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Modal from "react-modal";
import axios from "axios";
import {AddressBox} from "../../components/CustomerCard/CustomerCard";
import "./CustomerDetailPage.css";

const CustomerDetailePage = () => {
  const { id } = useParams();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [customer, setCustomer] = useState(null);
  const [addresses, setAddresses] = useState([]);
  const [newAddress, setNewAddress] = useState({ address_details: "", city: "", state: "", pin_code: "" });

  useEffect(() => {
    fetchCustomer();
    fetchAddresses();
  }, [id]);

  const fetchCustomer = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/customers/${id}`);
      setCustomer(res.data);
    } catch (err) {
      console.error("Error fetching customer:", err);
    }
  };

  const fetchAddresses = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/customers/${id}/addresses`);
      setAddresses(res.data);
    } catch (err) {
      console.error("Error fetching addresses:", err);
    }
  };

  const handleAddAddress = async () => {
    try {
      await axios.post(`http://localhost:5000/api/customers/${id}/addresses`, newAddress);
      setNewAddress({ address_details: "", city: "", state: "", pin_code: "" });
      fetchAddresses();
    } catch (err) {
      console.error("Error adding address:", err);
    }
  };

const handleUpdateAddress = async (updatedAddress) => {
  try {
    await axios.put(
      `http://localhost:5000/api/addresses/${updatedAddress.id}`,
      updatedAddress
    )
    
    await fetchAddresses()

   
  } catch (error) {
    console.error("Error updating address:", error);
  }
};

  const handleDeleteAddress = async (addressId) => {
    try {
      await axios.delete(`http://localhost:5000/api/addresses/${addressId}`);
      fetchAddresses();
    } catch (err) {
      console.error("Error deleting address:", err);
    }
  };

  if (!customer) return <p>Loading...</p>;

  return (
   
    <div className="customer-detail-container">
    <div className="customer-header">
        <div>
            <h2>{customer.first_name} {customer.last_name}</h2>
            <p><strong>Phone:</strong> {customer.phone_number}</p>
        </div>
        <button onClick={() => setIsAddModalOpen(true)} className="create-btn" >
             Add New Address
        </button>

    </div>
      
      <h3>Addresses ({addresses.length})</h3>
      <ul className="address-list">
        {addresses.map((addr) => (
          <AddressBox addressess = {addr} openEditModal = {handleUpdateAddress} openDeleteModal = {handleDeleteAddress}  key={addr.addressId}/>
        ))}
      </ul>

      <Modal
        isOpen={isAddModalOpen}
        onRequestClose={() => setIsAddModalOpen(false)}
        contentLabel="Add New Address"
        className="modal-content"
        overlayClassName="modal-overlay"
        >
      <h3>Add New Address</h3>
      <label htmlFor = "addressDetail">Address Details</label>
      <input id = "addressDetail"
        type="text"
        value={newAddress.address_details}
        onChange={(e) =>
          setNewAddress({ ...newAddress, address_details: e.target.value })
        }
        placeholder="Address Details"
      />
      <label htmlFor = "cityId">City</label>
      <input id = "cityId"
        type="text"
        value={newAddress.city}
        onChange={(e) => setNewAddress({ ...newAddress, city: e.target.value })}
        placeholder="City"
      />
      <label htmlFor = "StateId">State</label>
      <input id="StateId"
        type="text"
        value={newAddress.state}
        onChange={(e) => setNewAddress({ ...newAddress, state: e.target.value })}
        placeholder="State"
      />
      <label htmlFor = "PinCodeId">Pin Code</label>
      <input id = 'PinCodeId'
        type="text"
        value={newAddress.pin_code}
        onChange={(e) => setNewAddress({ ...newAddress, pin_code: e.target.value })}
        placeholder="Pin Code"
      />

      <div className="modal-actions">
        <button onClick={() => handleAddAddress(newAddress)}>Save</button>
        <button onClick={() => setIsAddModalOpen(false)}>Cancel</button>
      </div>
</Modal>


        


    </div>


    
  );
};

export default CustomerDetailePage;
