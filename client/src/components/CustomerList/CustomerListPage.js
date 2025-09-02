import React, { useEffect, useState} from "react";
import axios from "axios";
import Modal from "react-modal";
import {CustomerCard} from "../../components/CustomerCard/CustomerCard";
import "./CustomerListPage.css";

function CustomerListPage() {
    const [customers, setCustomers] = useState([]);
    const [search, setSearch] = useState("");
    const [sortOption, setSortOption] = useState("");
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [newCustomer, setNewCustomer] = useState({first_name: "",last_name: "",phone_number: "",});

        
    useEffect(() => {
        fetchCustomers();
    }, []);

        const fetchCustomers = async () => {
        try {
            const response = await axios.get("http://localhost:5000/api/customers");
           
            const data = response.data.map((each) => ({
                id: each.id || each._id,
                firstName: each.first_name,
                lastName: each.last_name,
                phoneNumber: each.phone_number,
        }));
        setCustomers(data);
        } catch (error) {
        console.error("Error fetching customers:", error);
        }
    };


    const handleCreateCustomer = async () => {
    
        try {
            await axios.post("http://localhost:5000/api/customers/", newCustomer);
            fetchCustomers(); 
            setIsCreateModalOpen(false);
            setNewCustomer({ first_name: "", last_name: "", phone_number: "" });
        } catch (error) {
            console.error("Error creating customer:", error);
        }
    };

    const handleDeleteCustomer = async (id) => {
         console.log("Deleting customer with id:", id);
        if (!window.confirm("Are you sure you want to delete this customer?")) return;
        try {
            
            await axios.delete(`http://localhost:5000/api/customers/${id}`);
             setCustomers((prev) => prev.filter((c) => c.id !== id));
             
            
        } catch (error) {
            console.error("Error deleting customer:", error);
        }
        };


    

  
  const filteredCustomers = customers.filter(
    (c) =>
      c.firstName.toLowerCase().includes(search.toLowerCase()) ||
      c.lastName.toLowerCase().includes(search.toLowerCase())
  );

  const sortedCustomers = [...filteredCustomers].sort((a, b) => {
    if (sortOption === "name") {
      return a.firstName.localeCompare(b.firstName);
    } else if (sortOption === "phone") {
      return a.phoneNumber.localeCompare(b.phoneNumber);
    }
    return 0;
  });


  const [errors, setErrors] = useState({});

const handleBlur = (field, value) => {
  if (!value.trim()) {
    setErrors((prev) => ({ ...prev, [field]: `${field.replace("_", " ")} cannot be empty` }));
  } else {
    setErrors((prev) => {
      const newErrors = { ...prev };
      delete newErrors[field];
      return newErrors;
    });
  }
};



  return (
     <div className="customer-list-container">
   
   
      <h2>Customer List</h2>

      <input
        type="text"
        placeholder="Search by first or last name"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="search-input"
      />

      <div>
        <button
        className="create-btn"
        onClick={() => setIsCreateModalOpen(true)}
        >
        Create Customer
        </button>

      </div>

      <div className="filter-controls">
        <label>Sort by: </label>
        <select
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
        >
          <option value="">None</option>
          <option value="name">Name</option>
          <option value="phone">Phone</option>
        </select>
      </div>

      {console.log("Customers:", customers)}
      {sortedCustomers.length === 0 ? (
        <p>No customers found.</p>
      ) : (
        sortedCustomers.map((customer) => (
          <CustomerCard CusDetails={customer} key={customer.id} onDelete={handleDeleteCustomer}/>
        ))
      )}
      <Modal
            isOpen={isCreateModalOpen}
            onRequestClose={() => setIsCreateModalOpen(false)}
            contentLabel="Create Customer"
            className="modal-content"
            overlayClassName="modal-overlay"
            >
        <h3>Create New Customer</h3>
        
        <div className="form-column">
          <label htmlFor = "FirstName">First Name</label>
          <input id = "FirstName"
            type="text"
            placeholder="First Name"
            value={newCustomer.first_name}
            onChange={(e) =>
              setNewCustomer({ ...newCustomer, first_name: e.target.value })
            }
            onBlur={(e) => handleBlur("first_name", e.target.value)}
          />
           {errors.first_name && <span className="error">* {errors.first_name}</span>}


          <label htmlFor = "LastName">Last Name</label>
          <input id ="LastName"
            type="text"
            placeholder="Last Name"
            value={newCustomer.last_name}
            onChange={(e) =>
              setNewCustomer({ ...newCustomer, last_name: e.target.value })
            }onBlur={(e) => handleBlur("last_name", e.target.value)}
            />
            {errors.last_name && <span className="error">* {errors.last_name}</span>}


          <label htmlFor = "PhoneNumber">Phone Number</label>
          <input id = "PhoneNumber"
            type="text"
            placeholder="Phone Number"
            value={newCustomer.phone_number}
            onChange={(e) =>
              setNewCustomer({ ...newCustomer, phone_number: e.target.value })
            }
           onBlur={(e) => handleBlur("phone_number", e.target.value)}
            />
            {errors.phone_number && (
              <span className="error">* {errors.phone_number}</span>
            )}
        </div>
        <div className="modal-actions">
          <button onClick={handleCreateCustomer}>Save</button>
          <button onClick={() => setIsCreateModalOpen(false)}>Cancel</button>
        </div>
</Modal>


    </div>
   
  );
}

export default CustomerListPage;
