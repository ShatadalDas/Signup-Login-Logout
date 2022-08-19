import React from "react";
import { Home, Login, Navbar, Signup } from "./components";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

export default function Container() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/signup" element={<Signup/>} />
      </Routes>
    </Router>
  );
}
