// src/App.js
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Signup      from './pages/Signup';
import Login       from './pages/Login';
import Feed        from './pages/Feed';
import Profile     from './pages/Profile';
import CreatePost  from './pages/CreatePost';
import People      from './pages/People';

import ProtectedRoute from './components/ProtectedRoute';
import Header         from './components/Header';

// helper to wrap a page with <Header> inside <ProtectedRoute>
const withLayout = (page) => (
  <ProtectedRoute>
    <>
      <Header />
      {page}
    </>
  </ProtectedRoute>
);

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* public */}
        <Route path="/signup" element={<Signup />} />
        <Route path="/login"  element={<Login  />} />

        {/* protected */}
        <Route path="/"            element={withLayout(<Feed />)} />
        <Route path="/create-post" element={withLayout(<CreatePost />)} />
        <Route path="/people"      element={withLayout(<People />)} />
        <Route path="/profile"     element={withLayout(<Profile />)} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
