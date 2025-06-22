
import React, { useEffect, useState } from 'react';
import {
  collection,
  onSnapshot,
  query,
  orderBy,
  doc,
  updateDoc,
  increment
} from 'firebase/firestore';
import { db } from '../firebase';
import { useAuth } from '../contexts/AuthContext';
import PostCard from '../components/PostCard';
import Loader   from '../components/Loader';

export default function Feed() {
  const { user } = useAuth();
  const [posts, setPosts]     = useState([]);
  const [clapped, setClapped] = useState({});
  const [loading, setLoading] = useState(true);

  // Load posts and read clap state from localStorage
  useEffect(() => {
    const q = query(collection(db, 'posts'), orderBy('createdAt', 'desc'));
    const unsub = onSnapshot(q, snap => {
      setPosts(snap.docs.map(d => ({ id: d.id, ...d.data() })));
      setLoading(false);
    });

    const stored = localStorage.getItem('claps');
    if (stored) setClapped(JSON.parse(stored));

    return unsub;
  }, []);

  // Toggle-clap handler
  const handleClap = async postId => {
    if (!user) return;

    const hasClapped = !!clapped[postId];

    // Optimistic UI update
    setPosts(ps =>
      ps.map(p =>
        p.id === postId
          ? { ...p, claps: p.claps + (hasClapped ? -1 : +1) }
          : p
      )
    );

    // Update localStorage state
    const next = { ...clapped };
    if (hasClapped) {
      delete next[postId];
    } else {
      next[postId] = true;
    }
    setClapped(next);
    localStorage.setItem('claps', JSON.stringify(next));

    // Persist to Firestore
    try {
      await updateDoc(doc(db, 'posts', postId), {
        claps: increment(hasClapped ? -1 : +1)
      });
    } catch (e) {
      console.error('Clap update failed:', e);
      // (Optional) revert UI/localStorage on failure
    }
  };

  if (loading) return <Loader />;

  return (
    <div className="layout">
      {posts.length === 0 && <p>No posts yet.</p>}
      {posts.map(p => (
        <PostCard
          key={p.id}
          post={{ ...p, userClapped: !!clapped[p.id] }}
          onClap={() => handleClap(p.id)}
        />
      ))}
    </div>
  );
}
