import React, { useEffect, useState } from 'react';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase';

export default function People() {
  const [profiles, setProfiles] = useState([]);

  useEffect(() => {
    return onSnapshot(collection(db,'profiles'), snap => {
      setProfiles(snap.docs.map(d => ({ id:d.id, ...d.data() })));
    });
  }, []);

  return (
    <div className="layout diag-bg">
      <h2>All People</h2>

      {profiles.map(p => (
        <div key={p.id} className="card dark" style={{ display:'flex',alignItems:'center' }}>
          {p.photoURL && <img src={p.photoURL} alt="" className="avatar" style={{ marginRight:12 }} />}
          <div>
            <strong>{p.name || '(no name)'}</strong><br />
            {p.bio && <span style={{ fontSize:14,color:'#666' }}>{p.bio}</span>}
          </div>
        </div>
      ))}
    </div>
  );
}
