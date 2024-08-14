import { useRef, useState, useEffect } from "react";
import "./Modal.css";

const Modals = () => {
  const [ismodal, setIsmodal] = useState(false);
  const modalRef = useRef(null);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    phone: "",
    dob: "",
  });
  useEffect(() => {
    const handleoutsideclick = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target))
        setIsmodal(false);
    };
    if (modalRef) {
      document.body.classList.add("modalOpen");
      document.addEventListener("mousedown", handleoutsideclick);
    } else {
      document.body.classList.remove("modalOpen");
      document.removeEventListener("mousedown", handleoutsideclick);
    }

    return () => {
      document.body.classList.remove("modalOpen");
      document.removeEventListener("mousedown", handleoutsideclick);
    };
  }, [ismodal]);

  const handleopenform = () => {
    setIsmodal(true);
  };
  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const validateEmail = (email) => {
    const emailID = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailID.test(email);
  };
  const validatePhone = (phone) => {
    const phoneNo = /^\d{10}$/;

    return phoneNo.test(phone);
  };

  const formValidation = (e) => {
    e.preventDefault();
    const { email, phone, dob } = formData;
    if (!validateEmail(email)) {
      alert("Invalid email. Please check your email address.");
      return;
    }
    if (!validatePhone(phone)) {
      alert("Invalid phone number. Please enter a 10-digit phone number.");
      return;
    }
    const selectedDOB = new Date();
    const currentDOB = new Date(dob);
    if (selectedDOB < currentDOB) {
      alert("Invalid date of birth. Date cannot be in the future date");
      return;
    }
    alert("form submitted successfully");
  };

  return (
    <div className="modal-top">
      <h1>User Details Modal</h1>
      <button onClick={handleopenform}>Open Form</button>

      {ismodal && (
        <div className="modal" ref={modalRef}>
          <div className="modal-content">
            <form onSubmit={formValidation}>
              <h1>Fill Details</h1>
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
                  className="dob"
                  type="Date"
                  id="dob"
                  value={formData.dob}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <button type="submit">Submit</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Modals;
