import React, { useEffect, useState } from 'react';
import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase';
import { useAuth } from '../contexts/AuthContext';
import { uploadToCloudinary } from '../lib/cloudinary';
import Loader from '../components/Loader';

export default function ProfileForm() {
  const { user } = useAuth();
  const [name, setName] = useState('');
  const [bio, setBio] = useState('');
  const [photoURL, setPhotoURL] = useState('');
  const [file, setFile] = useState(null);

  const [loading, setLoading] = useState(true);
  const [error,   setError]   = useState('');
  const [status,  setStatus]  = useState('');

  useEffect(() => {
    if (!user) { setLoading(false); return; }
    (async () => {
      try {
        const snap = await getDoc(doc(db, 'profiles', user.uid));
        if (snap.exists()) {
          const d = snap.data();
          setName(d.name || ''); setBio(d.bio || ''); setPhotoURL(d.photoURL || '');
        }
      } catch (e) { setError('Failed to load profile'); }
      finally { setLoading(false); }
    })();
  }, [user]);

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true); setError(''); setStatus('');
    try {
      let url = photoURL;
      if (file) url = await uploadToCloudinary(file);

      await setDoc(
        doc(db, 'profiles', user.uid),
        { name, bio, photoURL: url, updatedAt: serverTimestamp() },
        { merge: true }
      );
      setPhotoURL(url);
      setStatus('✔ Saved!');
    } catch { setError('Save failed'); }
    finally { setLoading(false); }
  };

  if (loading) return <Loader />;

  return (
    <form onSubmit={handleSubmit} className="layout card-dark">
      {error  && <p style={{ color:'red' }}>{error}</p>}
      {status && <p style={{ color:'green' }}>{status}</p>}

      <label>Name:</label><br />
      <input className="input" value={name} onChange={e=>setName(e.target.value)} required /><br /><br />

      <label>Bio:</label><br />
      <textarea className="input" rows={4} value={bio} onChange={e=>setBio(e.target.value)} /><br /><br />

      <label>Avatar:</label><br />
      {photoURL && <img src={photoURL} alt="" className="avatar" style={{ marginBottom:8 }} />}<br />
      <input type="file" accept="image/*" onChange={e=>setFile(e.target.files[0])} /><br /><br />

      <button className="btn" disabled={loading}>{loading ? 'Saving…' : 'Save Profile'}</button>
    </form>
  );
}
