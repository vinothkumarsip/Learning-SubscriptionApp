import React from "react";
import { FaFacebookF, FaYoutube, FaInstagram, FaTwitter } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="text-center text-lg-start mt-5" style={{ backgroundColor: "#212529" }}>
      <div className="container d-flex justify-content-center py-5">
        <a href="https://www.facebook.com/Nike" target="_blank" rel="noopener noreferrer" className="mx-2">
          <button type="button" className="btn btn-primary btn-lg btn-floating" style={{ backgroundColor: "#808284" }}>
            <FaFacebookF />
          </button>
        </a>
        <a href="https://www.youtube.com/user/Apple" target="_blank" rel="noopener noreferrer" className="mx-2">
          <button type="button" className="btn btn-primary btn-lg btn-floating" style={{ backgroundColor: "#808284" }}>
            <FaYoutube />
          </button>
        </a>
        <a href="https://www.instagram.com/starbucks/" target="_blank" rel="noopener noreferrer" className="mx-2">
          <button type="button" className="btn btn-primary btn-lg btn-floating" style={{ backgroundColor: "#808284" }}>
            <FaInstagram />
          </button>
        </a>
        <a href="https://twitter.com/McDonalds" target="_blank" rel="noopener noreferrer" className="mx-2">
          <button type="button" className="btn btn-primary btn-lg btn-floating" style={{ backgroundColor: "#808284" }}>
            <FaTwitter />
          </button>
        </a>
      </div>

      <div className="text-center text-white p-3">
        © {new Date().getFullYear()} Bangalore Bites
      </div>
    </footer>
  );
}