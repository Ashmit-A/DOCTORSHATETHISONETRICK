import React from "react";
import "./ListingCard.css";

const ListingCard = ({ image, bhk, rent, title, address, furnished, link }) => {
  return (
    <a href={link} className="listing-card-link">
      <div className="listing-card">
        <img src={image} alt={title} />
        
        <div className="listing-info-top">
          <span className="bhk">{bhk}</span>
          <span className="rent">{rent}</span>
        </div>
        
        <h3>{title}</h3>
        <p className="address">{address}</p>
        <p className="furnishing">{furnished}</p>
      </div>
    </a>
  );
};

export default ListingCard;
