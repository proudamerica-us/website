import React from 'react';
import clsx from 'clsx';
import Layout from '@theme/Layout';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import styles from './index.module.css';
import HomepageContent from './__index.md';
import blogPosts from '@site/.docusaurus/docusaurus-plugin-content-blog/default/blog-post-list-prop-default.json';
import type { BlogPost } from '@site/.docusaurus/docusaurus-plugin-content-blog/default/blog-post-list-prop-default.json';
import HomepageHeader from '../components/HomepageHeader';
import BlogCard from '../components/BlogCard';
import useIsBrowser from '@docusaurus/useIsBrowser';

export default function Home() {
  const { siteConfig } = useDocusaurusContext();
  const recentPosts = blogPosts?.items?.length > 0 ? blogPosts.items.slice(0, 12) : [];
  const isBrowser = useIsBrowser();

  // Manual image mapping based on .mdx front matter
  const imageMap = {
    'pope-francis-a-legacy-of-reform': '/articles-analysis/pope-francis-a-legacy-of-reform.png',
    'deepstate-market-stress-test': '/articles-analysis/deepstate-market-stress-test.png',
    'krav-maga': '/articles-analysis/krav-maga.png',
    'fossil-fuel-distribution-problem': '/articles-analysis/fossil-fuel-distribution-problem.jpeg',
    'communism-vs-nazism-vs-semitism': '/articles-analysis/communism-vs-nazism-vs-semitism.png',
    'apple-shadowban': '/articles-analysis/apple-shadowban.jpeg',
    'assaulted-car': '/articles-analysis/assaulted-car.png',
    'democracy-is-bad': '/articles-analysis/democracy-is-bad.jpeg',
    'democratic-eco-terrorism': '/img/democratic-eco-terrorism.jpg',
    'democratic-tyranny': '/articles-analysis/democratic-tyranny.jpeg',
    'musk-interview-trump': '/articles-analysis/musk-interview-trump.jpeg',
    'musk-zuckenberg-cia-agents': '/articles-analysis/musk-zuckenberg-cia-agents.jpeg',
  };

  // Map posts to include images from imageMap
  const postsWithImages = recentPosts.map(post => {
    const slug = post.permalink.split('/').pop();
    const image = imageMap[slug] || '/img/proudamerica.webp';
    console.log(`Post: ${post.title}, Slug: ${slug}, Image: ${image}`);
    return {
      ...post,
      frontMatter: {
        image,
      },
    };
  });

  return (
    <Layout description={siteConfig.tagline}>
      <HomepageHeader />
      <main className={styles.main}>
        <HomepageContent />
        <section className={styles.blogSection}>
          <div className="container">
            <h2>Latest Articles & Analysis</h2>
            {postsWithImages.length > 0 ? (
              <div className={clsx('row', styles.blogRow)}>
                {postsWithImages.map((post: BlogPost, index: number) => (
                  <div key={index} className="col col--4">
                    <BlogCard
                      post={{
                        title: post.title,
                        permalink: post.permalink,
                        date: post.date,
                        frontMatter: {
                          image: post.frontMatter.image,
                        },
                      }}
                    />
                  </div>
                ))}
              </div>
            ) : (
              <p>No blog posts available.</p>
            )}
          </div>
        </section>
      </main>
      {isBrowser && (
        <div id="navbar-realtime-clock" className={styles.clockWrapper}></div>
      )}
    </Layout>
  );
}
