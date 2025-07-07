import React from "react";
import { FaSearch, FaComments, FaHome } from "react-icons/fa";
import "./Home.css";  // Import the CSS file
import ListingCard from "../components/ListingCard";

const Home = () => {

  return (
    <div className="landing-container">
      {/* 1. Hero Section */}
      <section className="hero-section">
        <h1>Your hub for housing and essentials</h1>
        <p>
          Find the perfect accommodation, connect with roommates, and get
          everything you need to make your college life comfortable.
        </p>
        <div className="hero-buttons">
          <button className="btn btn-primary" onClick={() => window.location.href = "/find-flats"}>Find your home</button>
          <button className="btn btn-secondary" onClick={() => window.location.href = "/essentials"}>Shop Essentials</button>
        </div>
      </section>

      {/* 2. How It Works */}
      <section className="how-it-works">
        <h2>How NestHub Works</h2>
        <div className="how-cards">
          <div className="how-card">
            <div className="how-card-inner">
              {/* Front Side */}
              <div className="how-card-front">
                <div className="how-card-logo">
                  <FaSearch size={30} />
                </div>
                <h3>Search</h3>
              </div>
              {/* Back Side */}
              <div className="how-card-back">
                <div className="how-card-logo">
                  <FaSearch size={30} />
                </div>
                <div>
                  <h3>Search</h3>
                  <p>Find verified flats, PGs, and roommates easily.</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="how-card">
            <div className="how-card-inner">
              {/* Front Side */}
              <div className="how-card-front">
                <div className="how-card-logo">
                  <FaComments size={30} />
                </div>
                <h3>Connect</h3>
              </div>
              {/* Back Side */}
              <div className="how-card-back">
                <div className="how-card-logo">
                  <FaComments size={30} />
                </div>
                <div>
                  <h3>Connect</h3>
                  <p>Chat directly with owners and roommates.</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="how-card">
            <div className="how-card-inner">
              {/* Front Side */}
              <div className="how-card-front">
                <div className="how-card-logo">
                  <FaHome size={30} />
                </div>
                <h3>Move In</h3>
              </div>
              {/* Back Side */}
              <div className="how-card-back">
                <div className="how-card-logo">
                  <FaHome size={30} />
                </div>
                <div>
                  <h3>Move In</h3>
                  <p>Settle in with trusted support every step.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Key Features */}
      <section className="key-features">
        {/* Feature 1 - Image right */}
        <div className="feature-card feature-row">
          <div className="feature-text">
            <h2>Flat/PG's Listing</h2>
            <p>Browse verified listings of flats and PGs near your campus, with details and photos to help you find your ideal home.</p>
            <button className="btn btn-primary" onClick={() => window.location.href = "/find-flats"}>Explore Flats/PGs</button>
          </div>
          <img
            src="/images/flats-listing.png"
            alt="Flats and PG Listing"
            className="feature-image"
          />
        </div>

        {/* Feature 2 - Image left */}
        <div className="feature-card feature-row reverse">
          <img
            src="/images/roommate-finder.png"
            alt="Roommate Finder"
            className="feature-image"
          />
          <div className="feature-text">
            <h2>Roommate Finder</h2>
            <p>Connect with potential roommates nearby to share your accommodation and make college life more enjoyable.</p>
            <button className="btn btn-primary" onClick={() => window.location.href = "/find-roommate"}>Find a Roommate</button>
          </div>
        </div>

        {/* Feature 3 - Image right */}
        <div className="feature-card feature-row">
          <div className="feature-text">
            <h2>Essentials Marketplace</h2>
            <p>Shop for all your daily essentials, furniture, and appliances, all conveniently available for students.</p>
            <button className="btn btn-primary" onClick={() => window.location.href = "/essentials"}>Shop Essentials</button>
          </div>
          <img
            src="/images/essentials-marketplace.png"
            alt="Essentials Marketplace"
            className="feature-image"
          />
        </div>
      </section>

      {/* 4. Featured Listings */}
      <section className="featured-listings">
        <h2>Featured Listings</h2>
        <div className="listings-container">
          <ListingCard />
          <ListingCard />
        </div>
      </section>

      {/* 5. Got Something You Want to Sell */}
      <section className="sell-section">
        <h2>Got Something You Want to Sell?</h2>
        <p>We help your products reach thousands of students across campus, making it easy for you to get noticed, grow your brand, and sell with confidence.</p>
        <div className="sell-buttons">
          <button className="btn btn-light">Sell</button>
          <button className="btn btn-dark">List Housing</button>
        </div>
      </section>

    </div>
  );
}

export default Home;