import React from 'react';
import clsx from 'clsx';
import Layout from '@theme/Layout';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import styles from './index.module.css';
import HomepageContent from './__index.md';
import blogPosts from '@site/.docusaurus/docusaurus-plugin-content-blog/default/blog-post-list-prop-default.json';
import newsPosts from '@site/.docusaurus/docusaurus-plugin-content-blog/news/blog-post-list-prop-news.json';
import type { BlogPost } from '@site/.docusaurus/docusaurus-plugin-content-blog/default/blog-post-list-prop-default.json';
import HomepageHeader from '../components/HomepageHeader';
import BlogCard from '../components/BlogCard';
import useIsBrowser from '@docusaurus/useIsBrowser';

export default function Home() {
  const { siteConfig } = useDocusaurusContext();
  const recentArticles = blogPosts?.items?.length > 0 ? blogPosts.items.slice(0, 12) : [];
  const recentNews = newsPosts?.items?.length > 0 ? newsPosts.items.slice(0, 6) : [];
  const isBrowser = useIsBrowser();

  // Image mapping for articles
  const articleImageMap = {
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

  // Image mapping for news (updated slugs to match console logs)
  const newsImageMap = {
    'pope-francis-has-died-on-easter-2025-04-21': '/articles-analysis/pope-francis-has-died-on-easter-2025-04-21.png',
    'covid-19-true-origins-2025-04-18': '/articles-analysis/covid-19-true-origins-2025.png',
    'southern-border-mission-2025-04-11': '/articles-analysis/border-security-proudamerica.png',
  };

  // Map articles to include images
  const articlesWithImages = recentArticles.map(post => {
    const slug = post.permalink.split('/').pop();
    const image = articleImageMap[slug] || '/img/proudamerica.webp';
    console.log(`Article: ${post.title}, Slug: ${slug}, Image: ${image}`);
    return {
      ...post,
      frontMatter: {
        image,
      },
    };
  });

  // Map news to include images
  const newsWithImages = recentNews.map(post => {
    const slug = post.permalink.split('/').pop();
    const image = newsImageMap[slug] || '/img/proudamerica.webp';
    console.log(`News: ${post.title}, Slug: ${slug}, Image: ${image}`);
    return {
      ...post,
      frontMatter: {
        ...post.frontMatter,
        image, // Override any existing image in front matter
      },
    };
  });

  return (
    <Layout description={siteConfig.tagline}>
      <HomepageHeader />
      <main className={styles.main}>
        <HomepageContent />
        {/* Latest News Section */}
        <section className={styles.blogSection}>
          <div className="container">
            <h2>Latest News</h2>
            {newsWithImages.length > 0 ? (
              <div className={clsx('row', styles.blogRow)}>
                {newsWithImages.map((post: BlogPost, index: number) => (
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
              <p>No news posts available.</p>
            )}
          </div>
        </section>
        {/* Latest Articles & Analysis Section */}
        <section className={styles.blogSection}>
          <div className="container">
            <h2>Latest Articles & Analysis</h2>
            {articlesWithImages.length > 0 ? (
              <div className={clsx('row', styles.blogRow)}>
                {articlesWithImages.map((post: BlogPost, index: number) => (
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
