import React from 'react';

export default function PostCard({ post, onClap }) {
  if (!post) return null;

  const { id, content = '', imageURL = '', claps = 0, createdAt } = post;

  return (
    <div className="card-dark">
      <p style={{ whiteSpace: 'pre-wrap', fontSize: 17 }}>{content}</p>

      {imageURL && (
        <img
          src={imageURL}
          alt="post"
          className="post-img"        /* new class */
          style={{ margin: '12px 0' }}
        />
      )}

      <div style={{ fontSize: 12, color: '#888', marginBottom: 10 }}>
        {createdAt && new Date(createdAt.toDate()).toLocaleString()}
      </div>

      <button className="btn btn-clap" onClick={() => onClap(id)}>
        👏 <span>{claps}</span>
      </button>
    </div>
  );
}

