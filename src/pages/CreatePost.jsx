// src/pages/CreatePost.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase';
import { uploadToCloudinary } from '../lib/cloudinary';

export default function CreatePost() {
  const { user }        = useAuth();
  const navigate        = useNavigate();
  const [text, setText] = useState('');
  const [file, setFile] = useState(null);
  const [busy, setBusy] = useState(false);
  const [err,  setErr]  = useState('');

  /* ----------  HANDLE SUBMIT FUNCTION  ---------- */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setBusy(true);
    setErr('');

    try {
      let imageURL = '';

      // 1) Upload image to Cloudinary (optional)
      if (file) {
        imageURL = await uploadToCloudinary(file);
      }

      // 2) Save the post document to Firestore
      await addDoc(collection(db, 'posts'), {
        authorId:  user.uid,
        content:   text,
        imageURL,              // may be empty string
        claps:     0,
        createdAt: serverTimestamp()   // <— THIS is the time-stamp Feed sorts on
      });

      // 3) Navigate back to the feed
      navigate('/');
    } catch (e) {
      console.error(e);
      setErr('Post failed');
    } finally {
      setBusy(false);
    }
  };
  /* ----------  END handleSubmit ---------- */

  return (
    <div className="layout">
  <h2>Create New Post</h2>
  {err && <p style={{color:'red'}}>{err}</p>}

  <form onSubmit={handleSubmit}>
    <textarea
      className="input"
      rows={4}
      placeholder="What's on your mind?"
      value={text}
      onChange={e=>setText(e.target.value)}
      required
    /><br/><br/>

    <input type="file" accept="image/*" onChange={e=>setFile(e.target.files[0])}/><br/><br/>

    <button className="btn" disabled={busy}>{busy?'Posting…':'Post'}</button>
  </form>
</div>
  );
}
