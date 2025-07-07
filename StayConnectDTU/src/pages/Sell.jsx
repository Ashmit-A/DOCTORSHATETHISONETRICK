import React, { useState } from "react";
import axios from "axios";
import "./Sell.css"; // Import the CSS file - Ensure this file exists in the same directory!

const Sell = () => {
  // State to manage form input data for the listing
  const [formData, setFormData] = useState({
    title: "",
    bhk: "",
    rent: "", // This will store the clean numeric value
    address: "",
    furnished: "",
    image: ""
  });

  // New state to manage the displayed value for the rent input (only numbers)
  const [displayRent, setDisplayRent] = useState("");

  // State for showing a loading indicator during form submission
  const [isLoading, setIsLoading] = useState(false);
  // State for controlling the custom message modal (e.g., "Listing submitted successfully!")
  const [message, setMessage] = useState("");
  // State for determining the style/type of the message modal ('success' or 'error')
  const [messageType, setMessageType] = useState("");

  // Handler for all input changes
  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "rent") {
      // 1. Clean the input: keep only digits
      const numericValue = value.replace(/[^0-9]/g, '');

      // 2. Update formData with the clean numeric value
      setFormData(prevFormData => ({
        ...prevFormData,
        [name]: numericValue // Store only the number (as a string) in formData
      }));

      // 3. Update displayRent for the input field (showing only numbers)
      setDisplayRent(numericValue);
    } else {
      // For other fields, update formData directly
      setFormData(prevFormData => ({
        ...prevFormData,
        [name]: value
      }));
    }
  };

  // Handler for form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the default browser form submission (which would reload the page)
    setIsLoading(true); // Show loading indicator
    setMessage(""); // Clear any old messages
    setMessageType(""); // Clear message type

    try {
      // Create a payload for the API call, appending "/month" to rent here
      const payload = {
        ...formData,
        rent: formData.rent ? `${formData.rent}/month` : "" // Append "/month" only if rent has a value
      };

      // Send the formatted payload to the backend
      await axios.post("http://localhost:5000/api/listings", payload);

      // If the request is successful:
      setMessage("Listing submitted successfully!"); // Set success message
      setMessageType("success"); // Set message type for green border
      // Reset all form fields to their initial empty state
      setFormData({
        title: "",
        bhk: "",
        rent: "",
        address: "",
        furnished: "",
        image: ""
      });
      // Also reset the display state for rent
      setDisplayRent("");
    } catch (error) {
      // If an error occurs during the request:
      console.error("Error submitting listing:", error); // Log the full error for debugging
      setMessage("Failed to submit listing. Please try again."); // Set user-friendly error message
      setMessageType("error"); // Set message type for red border
    } finally {
      setIsLoading(false); // Hide loading indicator regardless of success or failure
    }
  };

  // Function to close the custom message modal
  const closeMessageModal = () => {
    setMessage(""); // Clear the message, which hides the modal
    setMessageType("");
  };

  return (
    <div className="sell-page">
      <h2>Submit Your Listing</h2>
      <form onSubmit={handleSubmit} className="sell-form">
        {/* Text Input Fields */}
        <input
          type="text"
          name="title"
          placeholder="Listing Title (e.g., Spacious Apartment)"
          value={formData.title}
          onChange={handleChange}
          required
          aria-label="Listing Title"
        />
        <input
          type="text"
          name="bhk"
          placeholder="BHK (e.g., 2 BHK or 1 Room)"
          value={formData.bhk}
          onChange={handleChange}
          required
          aria-label="Number of BHK or Rooms"
        />
        {/* Rent Input Field - now using displayRent for value (only numbers) */}
        <input
          type="text" // Keep as type="text" to allow preventing non-numeric chars
          name="rent"
          placeholder="Rent (e.g., 12000)"
          value={displayRent} // Bind to the displayRent state (only numbers)
          onChange={handleChange}
          required
          aria-label="Rent Amount"
          // Optional: onKeyDown to prevent non-numeric characters from being typed
          onKeyDown={(e) => {
            // Allow numbers (0-9), Backspace, Delete, Arrow keys, Tab
            if (!((e.key >= '0' && e.key <= '9') ||
                  e.key === 'Backspace' ||
                  e.key === 'Delete' ||
                  e.key === 'ArrowLeft' ||
                  e.key === 'ArrowRight' ||
                  e.key === 'Tab')) {
              e.preventDefault(); // Prevent default action for disallowed keys
            }
          }}
        />
        <input
          type="text"
          name="address"
          placeholder="Address (e.g., Sector 17, Rohini, Delhi)"
          value={formData.address}
          onChange={handleChange}
          required
          aria-label="Property Address"
        />
        <input
          type="text"
          name="furnished"
          placeholder="Furnishing Status (e.g., Fully Furnished, Semi Furnished, Unfurnished)"
          value={formData.furnished}
          onChange={handleChange}
          required
          aria-label="Furnishing Status"
        />

        {/* Simple text input for Image URL */}
        <input
          type="url" /* Using type="url" for semantic validation */
          name="image"
          placeholder="Image URL (e.g., https://example.com/image.jpg or /images/listing-1.png)"
          value={formData.image}
          onChange={handleChange}
          aria-label="Image URL"
        />

        {/* Submit Button */}
        <button type="submit" disabled={isLoading}>
          {isLoading ? "Submitting..." : "Submit Listing"}
        </button>
      </form>

      {/* Custom Message Modal */}
      {message && (
        <div className={`message-modal-overlay ${messageType}`}>
          <div className="message-modal-content">
            <p>{message}</p>
            <button onClick={closeMessageModal} className="message-modal-button">OK</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Sell;
