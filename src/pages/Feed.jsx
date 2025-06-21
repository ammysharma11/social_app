import React, { useEffect, useState } from 'react';
import {
  collection,
  onSnapshot,
  query,
  orderBy,
  doc,
  getDoc
} from 'firebase/firestore';
import { db } from '../firebase';
import PostCard from '../components/PostCard';
import Loader from '../components/Loader';         // ← import

export default function Feed() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

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
              doc(db, 'profiles', postData.userId)
            );
            if (profSnap.exists()) {
              author = {
                name: profSnap.data().name || 'Anonymous',
                photoURL: profSnap.data().photoURL || ''
              };
            }
          } catch (err) {
            console.error('Failed to load profile for', postData.userId, err);
          }
          return {
            id: postSnap.id,
            ...postData,
            author
          };
        })
      );
      setPosts(enriched);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', padding: '2rem' }}>
        <Loader />
      </div>
    );
  }

  return (
    <div className="layout">
      {posts.map(post => (
        <PostCard key={post.id} post={post} onClap={() => {}} />
      ))}
    </div>
  );
}
