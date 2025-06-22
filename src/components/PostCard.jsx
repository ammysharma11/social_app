
import React from 'react';

export default function PostCard({ post, onClap }) {
  if (!post) return null;

  const {
    content    = '',
    imageURL   = '',
    claps      = 0,
    createdAt,
    author     = {},
    userClapped
  } = post;

  // Avatar fallback
  const avatarSrc = author.photoURL
    ? author.photoURL
    : `https://ui-avatars.com/api/?name=${encodeURIComponent(
        author.name || 'Anonymous'
      )}&background=27272f&color=ffffff&rounded=true`;

  return (
    <div className="card-dark" style={{ marginBottom: 16 }}>
      {/* Author */}
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: 12 }}>
        <img
          src={avatarSrc}
          alt={author.name}
          style={{
            width: 40,
            height: 40,
            borderRadius: '50%',
            objectFit: 'cover',
            marginRight: 12
          }}
        />
        <strong style={{ color: '#fff' }}>
          {author.name || 'Anonymous'}
        </strong>
      </div>

      {/* Content */}
      <p style={{ whiteSpace: 'pre-wrap', fontSize: 17, marginBottom: 12 }}>
        {content}
      </p>

      {/* Image */}
      {imageURL && (
        <img
          src={imageURL}
          alt="post"
          className="post-img"
          style={{ width: '100%', marginBottom: 12 }}
        />
      )}

      {/* Timestamp */}
      <div style={{ fontSize: 12, color: '#888', marginBottom: 12 }}>
        {createdAt && new Date(createdAt.toDate()).toLocaleString()}
      </div>

      {/* Clap Button */}
      <button
        onClick={onClap}
        className="btn btn-clap"
        style={{
          background: userClapped
            ? 'var(--clr-primary)'
            : 'rgba(99,102,241,.12)',
          color: userClapped ? '#fff' : 'var(--clr-primary)'
        }}
      >
        👏 <span>{claps}</span>
      </button>
    </div>
  );
}
