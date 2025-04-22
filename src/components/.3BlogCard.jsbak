import React from 'react';
import Link from '@docusaurus/Link';
import styles from './BlogCard.module.css';

export default function BlogCard({ post }) {
  const { title, permalink, date, frontMatter } = post;

  // Use the provided image or fallback to proudamerica.webp
  const image = frontMatter?.image || '/img/proudamerica.webp';

  // Log for debugging
  console.log(`BlogCard - Title: ${title}, Image: ${image}`);

  return (
    <div className={styles.card}>
      <Link to={permalink} className={styles.cardLink}>
        {image && (
          <div className={styles.cardImage}>
            <img
              src={image}
              alt={title}
              onError={(e) => console.error(`Failed to load image: ${image} for ${title}`)}
            />
          </div>
        )}
        <div className={styles.cardContent}>
          <h3 className={styles.cardTitle}>{title}</h3>
          <p className={styles.cardDate}>
            {new Date(date).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </p>
        </div>
      </Link>
    </div>
  );
}
