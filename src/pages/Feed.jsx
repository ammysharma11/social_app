// src/pages/Feed.jsx
import React, { useEffect, useState } from 'react';
import {
  collection,
  onSnapshot,
  query,
  orderBy,
  doc,
  updateDoc,
  increment,
  getDoc
} from 'firebase/firestore';
import { db } from '../firebase';
import PostCard from '../components/PostCard';
import Loader from '../components/Loader';

export default function Feed() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Real‑time listener with author enrichment
  useEffect(() => {
    const q = query(
      collection(db, 'posts'),
      orderBy('createdAt', 'desc')
    );

    const unsubscribe = onSnapshot(q, async snapshot => {
      const enriched = await Promise.all(
        snapshot.docs.map(async postSnap => {
          const postData = postSnap.data();
          let author = { name: 'Anonymous', photoURL: '' };

          try {
            const profSnap = await getDoc(
              doc(db, 'profiles', postData.authorId)
            );
            if (profSnap.exists()) {
              const pd = profSnap.data();
              author = {
                name: pd.name || 'Anonymous',
                photoURL: pd.photoURL || ''
              };
            }
          } catch (err) {
            console.error('Profile load error:', err);
          }

          return { id: postSnap.id, ...postData, author };
        })
      );

      setPosts(enriched);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // Clap handler: optimistic UI + Firestore update
  const handleClap = async id => {
    // Optimistically update
    setPosts(prev => prev.map(p => 
      p.id === id ? { ...p, claps: (p.claps || 0) + 1 } : p
    ));

    try {
      await updateDoc(doc(db, 'posts', id), { claps: increment(1) });
    } catch (e) {
      console.error('Clap update failed:', e);
      // Optionally revert on failure
    }
  };

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', padding: '2rem' }}>
        <Loader />
      </div>
    );
  }

  return (
    <div className="layout">
      {posts.length === 0 && <p>No posts yet.</p>}
      {posts.map(post => (
        <PostCard key={post.id} post={post} onClap={handleClap} />
      ))}
    </div>
  );
}
