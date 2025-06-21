import React, { useEffect, useState } from 'react';
import {
  collection, query, orderBy, onSnapshot,
  doc, updateDoc, increment
} from 'firebase/firestore';
import { db } from '../firebase';
import PostCard from '../components/PostCard';
import Loader   from '../components/Loader';

export default function Feed() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoad] = useState(true);

  useEffect(() => {
    const q = query(collection(db,'posts'), orderBy('createdAt','desc'));
    const unsub = onSnapshot(q, snap => {
      setPosts(snap.docs.map(d => ({ id:d.id, ...d.data() })));
      setLoad(false);
    }, err => { console.error(err); setLoad(false); });
    return unsub;
  }, []);

  const handleClap = async id => {
    try { await updateDoc(doc(db,'posts',id), { claps: increment(1) }); }
    catch (e) { console.error('clap failed', e); }
  };

  if (loading) return <Loader />;

  return (
    <div className="layout diag-bg">
      <h2>Global Feed</h2>
      {posts.length === 0 && <p>No posts yet.</p>}
      {posts.map(p => <PostCard key={p.id} post={p} onClap={handleClap} />)}
    </div>
  );
}
