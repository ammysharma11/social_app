// import React, { useEffect, useState } from 'react';
// import { collection, onSnapshot } from 'firebase/firestore';
// import { db } from '../firebase';

// export default function People() {
//   const [profiles, setProfiles] = useState([]);

//   useEffect(() => {
//     return onSnapshot(collection(db,'profiles'), snap => {
//       setProfiles(snap.docs.map(d => ({ id:d.id, ...d.data() })));
//     });
//   }, []);

//   return (
//     <div className="layout diag-bg">
//       <h2>All People</h2>

//       {profiles.map(p => (
//         <div key={p.id} className="card dark" style={{ display:'flex',alignItems:'center' }}>
//           {p.photoURL && <img src={p.photoURL} alt="" className="avatar" style={{ marginRight:12 }} />}
//           <div>
//             <strong>{p.name || '(no name)'}</strong><br />
//             {p.bio && <span style={{ fontSize:14,color:'#666' }}>{p.bio}</span>}
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// }
import React, { useEffect, useState } from 'react';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase';
import Loader from '../components/Loader';    // ← import the Loader

export default function People() {
  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsub = onSnapshot(
      collection(db, 'profiles'),
      snapshot => {
        const list = snapshot.docs.map(docSnap => {
          const data = docSnap.data();
          return {
            id: docSnap.id,
            name: data.name || 'Anonymous',
            bio: data.bio || '',
            photoURL: data.photoURL || ''
          };
        });
        setProfiles(list);
        setLoading(false);            // ← stop loading after data arrives
      },
      err => {
        console.error('Error loading profiles:', err);
        setLoading(false);
      }
    );

    return unsub;
  }, []);

  // ← Show loader while fetching
  if (loading) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        padding: '2rem'
      }}>
        <Loader />
      </div>
    );
  }

  return (
    <div className="layout" style={{ padding: '1rem 0' }}>
      <h2 style={{ color: '#fff', marginBottom: '1rem' }}>All People</h2>
      {profiles.map(person => {
        const avatarSrc = person.photoURL
          ? person.photoURL
          : `https://ui-avatars.com/api/?name=${encodeURIComponent(
              person.name
            )}&background=27272f&color=ffffff&rounded=true`;

        return (
          <div
            key={person.id}
            style={{
              display: 'flex',
              alignItems: 'center',
              background: '#1a1a1d',
              padding: '1rem',
              borderRadius: '0.5rem',
              marginBottom: '0.75rem'
            }}
          >
            <img
              src={avatarSrc}
              alt={person.name}
              style={{
                width: 48,
                height: 48,
                borderRadius: '50%',
                objectFit: 'cover',
                marginRight: '1rem'
              }}
            />

            <div>
              <strong
                style={{
                  color: '#fff',
                  display: 'block',
                  textTransform: 'capitalize'
                }}
              >
                {person.name}
              </strong>
              <span style={{ color: '#aaa', fontSize: '0.9rem' }}>
                {person.bio}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
