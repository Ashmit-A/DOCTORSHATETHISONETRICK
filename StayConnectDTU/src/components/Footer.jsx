import "./Footer.css";
import { Link } from "react-router-dom";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaEnvelope, FaPhone } from "react-icons/fa";
import { menuLinks } from "../assets/assets";

export default function Footer() {
    return (
        <footer className="footer">
            <div className="footer-container">
                <div className="footer-column logo">
                    <div className="logo-header">
                        <img src="/images/Logo.png" alt="NestHub Logo" className="footer-logo-image" />
                        <span className="footer-brand">NestHub</span>
                    </div>
                    <p className="footer-tagline">Helping students find homes.</p>
                </div>

                <div className="footer-column links">
                    <h3>Quick Links</h3>
                    <ul className="footer-quick-links">
                        {menuLinks.map((link) => (
                            <li key={link.path}>
                                <Link to={link.path}>{link.name}</Link>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="footer-column contact">
                    <h3>Contact</h3>
                    <div className="footer-contact-item">
                        <FaEnvelope className="footer-contact-icon" />
                        <span>nesthub@gmail.com</span>
                    </div>
                    <div className="footer-contact-item">
                        <FaPhone className="footer-contact-icon" />
                        <span>1234567890</span>
                    </div>
                    <div className="social-icons">
                        <a href="https://facebook.com/nesthub" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                            <FaFacebookF />
                        </a>
                        <a href="https://twitter.com/nesthub" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                            <FaTwitter />
                        </a>
                        <a href="https://instagram.com/nesthub" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                            <FaInstagram />
                        </a>
                        <a href="https://linkedin.com/company/nesthub" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                            <FaLinkedinIn />
                        </a>
                    </div>
                </div>
            </div>
            <div className="footer-bottom">
                <span>© {new Date().getFullYear()} NestHub. All rights reserved.</span>
            </div>
        </footer>
    );
}
