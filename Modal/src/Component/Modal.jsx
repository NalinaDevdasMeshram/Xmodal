import { useState } from "react";
import styles from "./modals.module.css";
const Modal = () => {
  const [ismodel, setIsModal] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    phone: "",
    dob: "",
  });

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };
  const validateEmail = (email) => {
    const emailAddress = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailAddress.test(email);
  };
  const validatephone = (phone) => {
    const phoneNumber = /^\d{10}$/;
    return phoneNumber.test(phone);
  };
  const formValidation = (e) => {
    const { email, phone, dob } = formData;
    if (!validateEmail(email)) {
      alert("Invalid email. Please check your email address.");
      return;
    }
    if (!validatephone(phone)) {
      alert("Invalid phone number. Please enter a 10-digit phone number.");
      return;
    }
    const selectdate = new Date(dob);
    const currentdate = new Date();
    if (selectdate > currentdate) {
      alert("Invalid date of birth. Date cannot be in the future date");
      e.preventDefault();
      return;
    }
  };
  return (
    <div>
      <button className={styles.btnopen} onClick={() => setIsModal(true)}>
        Open Form
      </button>
      {ismodel && (
        <div className={styles.modal}>
          <div className={styles.modalcontent}>
            <form onSubmit={formValidation}>
              <h1>Fill Form</h1>
              <div>
                <h4>Username:</h4>
                <input
                  type="text"
                  id="username"
                  value={formData.username}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div>
                <h4>Email Address:</h4>
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div>
                <h4>Phone Number:</h4>
                <input
                  type="phone"
                  id="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div>
                <h4>Date Of Birth:</h4>
                <input
                  type="Date"
                  id="dob"
                  value={formData.dob}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <button type="submit" className={styles.btn}>
                Submit
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Modal;
