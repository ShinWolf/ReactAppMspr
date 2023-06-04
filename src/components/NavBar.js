import React from 'react';
import { BrowserRouter as Router, Link, Route, Routes, Outlet } from 'react-router-dom';

import Home from './Home';
import { FormLogin } from './Form';
import Profil from "./Profil";
import PosterForm from './PosterForm'
import '../css/navBar.css';

const Navbar = () => {
  return (
    <Router>
      <div className="navbar">
        <nav>
          <ul>
            <li>
              <Link to="/">Accueil</Link>
            </li>
            <li>
              <Link to="/addPost">Poster</Link>
            </li>
            <li>
              <Link to="/signIn">Connexion</Link>
            </li>
            <li>
              <Link to="/signUp">Inscription</Link>
            </li>
            <li>
              <Link to="/profil">Profil</Link>
            </li>
          </ul>
        </nav>
      </div>

      <Routes>
        <Route path="/" element={<Outlet />}>
          <Route index element={<Home />} />
          <Route path="/" element={<Home />} />
          <Route path="/addPost" element={<PosterForm />} />
          <Route path="/signIn" element={<FormLogin />} />
          <Route path="/profil" element={<Profil />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default Navbar;
