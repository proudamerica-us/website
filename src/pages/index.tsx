import React, { useState, useEffect, useRef } from 'react';
import clsx from 'clsx';
import Layout from '@theme/Layout';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import styles from './index.module.css';
import HomepageContent from './__index.md';
import blogPosts from '@site/.docusaurus/docusaurus-plugin-content-blog/default/blog-post-list-prop-default.json';
import newsPosts from '@site/.docusaurus/docusaurus-plugin-content-blog/news/blog-post-list-prop-news.json';
import type { BlogPost } from '@site/.docusaurus/docusaurus-plugin-content-blog/default/blog-post-list-prop-default.json';
import BlogCard from '../components/BlogCard';
import useIsBrowser from '@docusaurus/useIsBrowser';
import Link from '@docusaurus/Link';

const SafeLink = ({ to, children, className }: { to: string; children: React.ReactNode; className?: string }) => {
  try {
    return <Link to={to} className={className}>{children}</Link>;
  } catch (error) {
    console.error('Link Error:', error);
    return <span>{children}</span>;
  }
};

export default function Home() {
  const { siteConfig } = useDocusaurusContext();
  const isBrowser = useIsBrowser();
  const [animateCurtain, setAnimateCurtain] = useState(false);
  const [currentTheme, setCurrentTheme] = useState('light');
  const [isHydrated, setIsHydrated] = useState(false);
  const newsRowRef = useRef<HTMLDivElement>(null); // Ref for news blog row
  const articlesRowRef = useRef<HTMLDivElement>(null); // Ref for articles blog row

  // Trigger animation manually for debugging
  const triggerAnimation = () => {
    console.log('Manually triggering curtain animation for theme:', currentTheme);
    setAnimateCurtain(true);
    setTimeout(() => {
      setAnimateCurtain(false);
      console.log('Curtain animation reset');
    }, 1000); // Matches 1s animation duration
  };

  // Detect theme changes
  useEffect(() => {
    if (!isBrowser) return;

    console.log('useEffect running, isBrowser:', isBrowser);

    const setupToggleListener = () => {
      const toggleButton = document.querySelector(
        '.colorModeToggle_DEke, .toggle_vylO, button[aria-label*="theme"], button[title*="theme"]'
      );
      if (!toggleButton) {
        console.warn('Theme toggle button not found');
        return null;
      }

      const handleToggle = () => {
        const newTheme = document.documentElement.getAttribute('data-theme') || 'light';
        console.log('Toggle button clicked, newTheme:', newTheme, 'currentTheme:', currentTheme);
        if (newTheme !== currentTheme) {
          setCurrentTheme(newTheme);
          setAnimateCurtain(true);
          console.log('Triggering curtain animation for theme:', newTheme);
          setTimeout(() => {
            setAnimateCurtain(false);
            console.log('Curtain animation reset');
          }, 1000); // Matches 1s animation duration
        } else {
          console.log('Theme unchanged, skipping animation');
        }
      };

      toggleButton.addEventListener('click', handleToggle);
      console.log('Added event listener to theme toggle:', toggleButton.className, toggleButton.getAttribute('aria-label'));
      return () => {
        toggleButton.removeEventListener('click', handleToggle);
        console.log('Removed event listener from theme toggle');
      };
    };

    const observeThemeChanges = () => {
      const observer = new MutationObserver(() => {
        const newTheme = document.documentElement.getAttribute('data-theme') || 'light';
        console.log('MutationObserver detected theme change:', newTheme);
        if (newTheme !== currentTheme) {
          setCurrentTheme(newTheme);
          setAnimateCurtain(true);
          console.log('Triggering curtain animation via MutationObserver');
          setTimeout(() => {
            setAnimateCurtain(false);
            console.log('Curtain animation reset via MutationObserver');
          }, 1000);
        }
      });
      observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
      return () => observer.disconnect();
    };

    const timeout = setTimeout(() => {
      const toggleCleanup = setupToggleListener();
      const observerCleanup = observeThemeChanges();
      const initialTheme = document.documentElement.getAttribute('data-theme') || 'light';
      console.log('Initial theme:', initialTheme);
      setCurrentTheme(initialTheme);
      setIsHydrated(true);
      return () => {
        if (toggleCleanup) toggleCleanup();
        observerCleanup();
        console.log('Cleaned up toggle and observer');
      };
    }, 100);

    return () => clearTimeout(timeout);
  }, [isBrowser, currentTheme]);

  const lastWeekTrends = {
    keywords: 'Trump, Musk, Migration',
    events: 'Election Rally, Tech Summit',
    quotes: 'Freedom Quote',
  };
  const nextWeekTrends = {
    keywords: 'AI, Border, Economy',
    events: 'Policy Debate, Space Launch',
    quotes: 'Innovation Quote',
  };

  const [tooltip, setTooltip] = useState<{
    visible: boolean;
    content: string;
    x: number;
    y: number;
    position: 'top' | 'bottom';
  }>({ visible: false, content: '', x: 0, y: 0, position: 'bottom' });

  const toggleTooltip = (content: string, event: React.MouseEvent) => {
    event.preventDefault();
    const rect = event.currentTarget.getBoundingClientRect();
    const tooltipWidth = 200;
    const tooltipHeight = 100;
    const padding = 10;

    const isNextWeekCell =
      content.includes('AI, Border, Economy') ||
      content.includes('Policy Debate, Space Launch') ||
      content.includes('Innovation Quote');

    let position: 'top' | 'bottom' = 'bottom';
    let x = isNextWeekCell ? rect.right : rect.left + rect.width / 2;
    let y = rect.bottom + 10;

    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    if (isNextWeekCell) {
      if (x + tooltipWidth > viewportWidth - padding) {
        x = viewportWidth - tooltipWidth - padding;
      }
    } else {
      if (x + tooltipWidth / 2 > viewportWidth - padding) {
        x = viewportWidth - tooltipWidth / 2 - padding;
      } else if (x - tooltipWidth / 2 < padding) {
        x = tooltipWidth / 2 + padding;
      }
    }

    if (y + tooltipHeight > viewportHeight - padding) {
      y = rect.top - tooltipHeight - 10;
      position = 'top';
    }

    console.log('Toggle Tooltip:', { content, x, y, position, visible: !tooltip.visible });

    if (tooltip.visible && tooltip.content === content) {
      setTooltip({ visible: false, content: '', x: 0, y: 0, position: 'bottom' });
    } else {
      setTooltip({
        visible: true,
        content,
        x,
        y,
        position,
      });
    }
  };

  const closeTooltip = () => {
    console.log('Close Tooltip');
    setTooltip({ visible: false, content: '', x: 0, y: 0, position: 'bottom' });
  };

  const tooltipContent = {
    lastKeywords: `<span class="${styles.tooltipText}">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</span> <a href="#" class="${styles.tooltipSubscribe}" onClick="event.preventDefault()">Subscribe $5/month</a>`,
    lastEvents: `<span class="${styles.tooltipText}">Sed do eiusmod tempor incididunt ut labore et dolore.</span> <a href="#" class="${styles.tooltipSubscribe}" onClick="event.preventDefault()">Subscribe $5/month</a>`,
    lastQuotes: `<span class="${styles.tooltipText}">Ut enim ad minim veniam, quis nostrud exercitation.</span> <a href="#" class="${styles.tooltipSubscribe}" onClick="event.preventDefault()">Subscribe $5/month</a>`,
    nextKeywords: `<span class="${styles.tooltipText}">Dwekkis aute irure dolor in reprehenderit in voluptate.</span> <a href="#" class="${styles.tooltipSubscribe}" onClick="event.preventDefault()">Subscribe $5/month</a>`,
    nextEvents: `<span class="${styles.tooltipText}">Excepteur sint occaecat cupidatat non proident.</span> <a href="#" class="${styles.tooltipSubscribe}" onClick="event.preventDefault()">Subscribe $5/month</a>`,
    nextQuotes: `<span class="${styles.tooltipText}">Sunt in culpa qui officia deserunt mollit anim.</span> <a href="#" class="${styles.tooltipSubscribe}" onClick="event.preventDefault()">Subscribe $5/month</a>`,
  };

  const fallbackNews = [
    {
      title: 'FALLBACK NEWS 1',
      permalink: '#',
      frontMatter: { description: 'THIS IS A FALLBACK NEWS DESCRIPTION.' },
    },
    {
      title: 'FALLBACK NEWS 2',
      permalink: '#',
      frontMatter: { description: 'ANOTHER FALLBACK NEWS DESCRIPTION.' },
    },
  ];

  const fallbackArticles = [
    {
      title: 'FALLBACK ARTICLE 1',
      permalink: '#',
      frontMatter: { description: 'THIS IS A FALLBACK ARTICLE DESCRIPTION.' },
    },
    {
      title: 'FALLBACK ARTICLE 2',
      permalink: '#',
      frontMatter: { description: 'ANOTHER FALLBACK ARTICLE DESCRIPTION.' },
    },
  ];

  const recentArticles = Array.isArray(blogPosts?.items) && blogPosts.items.length > 0
    ? blogPosts.items
    : fallbackArticles;
  const recentNews = Array.isArray(newsPosts?.items) && newsPosts.items.length > 0
    ? newsPosts.items
    : fallbackNews;

  const [isPaused, setIsPaused] = useState(false);
  const [isSecondPaused, setIsSecondPaused] = useState(false);
  const [isThirdPaused, setIsThirdPaused] = useState(false);

  const handleMouseOver = () => setIsPaused(true);
  const handleMouseOut = () => setIsPaused(false);
  const handleSecondMouseOver = () => setIsSecondPaused(true);
  const handleSecondMouseOut = () => setIsSecondPaused(false);
  const handleThirdMouseOver = () => setIsThirdPaused(true);
  const handleThirdMouseOut = () => setIsThirdPaused(false);

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

  const articleDescriptionMap = {
    'pope-francis-a-legacy-of-reform': 'Exploring Pope Francis’s legacy of reform and compassion.',
    'deepstate-market-stress-test': 'Analysis of market stress tests and deep state influence.',
    'krav-maga': 'Krav Maga: Self-defense and its cultural implications.',
    'fossil-fuel-distribution-problem': 'Challenges in fossil fuel distribution and solutions.',
    'communism-vs-nazism-vs-semitism': 'Comparative analysis of ideologies and their impacts.',
    'apple-shadowban': 'Proof That Far-Left Monopoly Companies Are Tools of The Deep State.',
    'assaulted-car': 'Incidents of car assaults and their societal implications.',
    'democracy-is-bad': 'Critique of democratic systems and their flaws.',
    'democratic-eco-terrorism': 'Examining eco-terrorism linked to democratic policies.',
    'democratic-tyranny': 'How democratic systems can lead to tyranny.',
    'musk-interview-trump': 'Elon Musk interviews Donald Trump on key issues.',
    'musk-zuckenberg-cia-agents': 'Allegations of tech moguls as CIA operatives.',
  };

  const newsImageMap = {
    'pope-francis-has-died-on-easter-2025-04-21': '/articles-analysis/pope-francis-has-died-on-easter-2025-04-21.png',
    'covid-19-true-origins-2025-04-18': '/articles-analysis/covid-19-true-origins-2025.png',
    'southern-border-mission-2025-04-11': '/articles-analysis/border-security-proudamerica.png',
  };

  const articlesWithImages = recentArticles.map(post => {
    const slug = post.permalink?.split('/').pop() || '';
    const image = articleImageMap[slug] || '/img/proudamerica.webp';
    const description = (articleDescriptionMap[slug] || post.frontMatter?.description || 'NO DESCRIPTION AVAILABLE.').toUpperCase();
    const title = (post.title || 'NO TITLE AVAILABLE').toUpperCase();
    return {
      ...post,
      title,
      frontMatter: {
        image,
        description,
      },
    };
  }).filter(post => post.title && post.permalink);

  const newsWithImages = recentNews.map(post => {
    const slug = post.permalink?.split('/').pop() || '';
    const image = newsImageMap[slug] || '/img/proudamerica.webp';
    let description =
      post.frontMatter?.description ||
      post.description ||
      post.metadata?.description ||
      'NO DESCRIPTION AVAILABLE.';
    if (slug === 'southern-border-mission-2025-04-11') {
      description = 'Enhanced security measures implemented at the southern border in 2025.';
    } else if (slug === 'pope-francis-has-died-on-easter-2025-04-21') {
      description = 'Pope Francis died on Easter Monday, April 21, 2025, at the age of 88.';
    } else if (slug === 'covid-19-true-origins-2025-04-18') {
      description = 'New evidence reveals the true origins of Covid-19 in 2025.';
    }
    description = description.toUpperCase();
    const title = (post.title || 'NO TITLE AVAILABLE').toUpperCase();
    return {
      ...post,
      title,
      frontMatter: {
        ...post.frontMatter,
        image,
        description,
      },
    };
  }).filter(post => post.title && post.permalink);

  // Handle "Discover More" / "Scroll Right" button click
  const handleNextNews = () => {
    if (newsRowRef.current) {
      const cardWidth = newsRowRef.current.querySelector('.col')?.offsetWidth || 0;
      newsRowRef.current.scrollBy({ left: cardWidth * 3, behavior: 'smooth' });
      console.log('Next News clicked, scrolling right by:', cardWidth * 3);
    }
  };

  const handleNextArticles = () => {
    if (articlesRowRef.current) {
      const cardWidth = articlesRowRef.current.querySelector('.col')?.offsetWidth || 0;
      articlesRowRef.current.scrollBy({ left: cardWidth * 3, behavior: 'smooth' });
      console.log('Next Articles clicked, scrolling right by:', cardWidth * 3);
    }
  };

  const hardcodedItems = [
    {
      title: 'Lorem Ipsum Dolor',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      url: '#',
    },
    {
      title: 'Sit Amet Consectetur',
      description: 'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      url: '#',
    },
    {
      title: 'Adipiscing Elit Sed',
      description: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco.',
      url: '#',
    },
  ].slice(0, 5).map(item => ({
    ...item,
    title: item.title.toUpperCase(),
    description: item.description.toUpperCase(),
  }));

  const tickerClass = isBrowser ? clsx(styles.ticker, { [styles.paused]: isPaused }) : styles.ticker;
  const secondTickerClass = isBrowser ? clsx(styles.secondNewsTicker, { [styles.paused]: isSecondPaused }) : styles.secondNewsTicker;
  const thirdTickerClass = isBrowser ? clsx(styles.thirdNewsTicker, { [styles.paused]: isThirdPaused }) : styles.thirdNewsTicker;

  const staticMode = false;

  const alertContent = {
    danger: 'FIRES IN',
    region: 'LA',
  };

  return (
    <Layout description={siteConfig.tagline}>
      <header className={clsx('hero', 'hero--primary', styles.heroBanner, { [styles.animateCurtain]: animateCurtain })}>
        <video
          className={styles.heroVideo}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
        >
          <source src="/articles-analysis/hero-animation.mp4" type="video/mp4" />
        </video>
        <div className={styles.heroContainer}>
          <table className={styles.topTrendsTable}>
            <thead>
              <tr>
                <th></th>
                <th>Last week's most popular</th>
                <th>Next week's most popular</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className={styles.verticalLabel}>Keywords</td>
                <td className={styles.lastWeekCell}>
                  <span
                    className={styles.cellText}
                    onClick={(e) => toggleTooltip(tooltipContent.lastKeywords, e)}
                  >
                    {lastWeekTrends.keywords}
                  </span>
                </td>
                <td>
                  <span
                    className={styles.cellText}
                    onClick={(e) => toggleTooltip(tooltipContent.nextKeywords, e)}
                  >
                    {nextWeekTrends.keywords}
                  </span>
                </td>
              </tr>
              <tr>
                <td className={styles.verticalLabel}>Events</td>
                <td className={styles.lastWeekCell}>
                  <span
                    className={styles.cellText}
                    onClick={(e) => toggleTooltip(tooltipContent.lastEvents, e)}
                  >
                    {lastWeekTrends.events}
                  </span>
                </td>
                <td>
                  <span
                    className={styles.cellText}
                    onClick={(e) => toggleTooltip(tooltipContent.nextEvents, e)}
                  >
                    {nextWeekTrends.events}
                  </span>
                </td>
              </tr>
              <tr>
                <td className={styles.verticalLabel}>Quotes</td>
                <td className={styles.lastWeekCell}>
                  <span
                    className={styles.cellText}
                    onClick={(e) => toggleTooltip(tooltipContent.lastQuotes, e)}
                  >
                    {lastWeekTrends.quotes}
                  </span>
                </td>
                <td>
                  <span
                    className={styles.cellText}
                    onClick={(e) => toggleTooltip(tooltipContent.nextQuotes, e)}
                  >
                    {nextWeekTrends.quotes}
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
          {tooltip.visible && (
            <div
              className={styles.tooltip}
              style={{ left: tooltip.x, top: tooltip.y }}
              data-position={tooltip.position}
            >
              <button
                className={styles.tooltipClose}
                onClick={closeTooltip}
              >
                X
              </button>
              <div dangerouslySetInnerHTML={{ __html: tooltip.content }} />
            </div>
          )}
          <div className="container">
            <h1 className={styles.heroTitle}>Uncovering the Truth</h1>
            <p className="hero__subtitle">The Most Valuable Information</p>
          </div>
          <div className={styles.tickerContainer}>
            <div className={styles.sponsorAlertContainer}>
              <a href="https://www.iana.io/" target="_blank" rel="noopener noreferrer">
                <img
                  src="/sponsors/ianaio-logo.webp"
                  alt="IANA Logo"
                  className={styles.sponsorLogo}
                />
              </a>
              <div>
                <div className={styles.weeklySponsor}>Weekly Sponsor</div>
                <div className={styles.alertBox}>
                  ALERT! {alertContent.danger} {alertContent.region}
                </div>
              </div>
            </div>
            <div className={styles.tickerLabel}>MAGA NEWS</div>
            <div className={styles.tickerWrapper}>
              <div className={staticMode ? styles.tickerStatic : tickerClass}>
                <span className={styles.tickerItem} data-ticker="today-news">TODAY NEWS:</span>
                {newsWithImages.map((post, index) => (
                  <span
                    key={`news-${index}`}
                    className={styles.tickerItem}
                    onMouseOver={handleMouseOver}
                    onMouseOut={handleMouseOut}
                    data-ticker={`news-${index}`}
                  >
                    <img src="/img/proudamericaus.png" alt="Logo" className={styles.tickerLogo} />
                    <SafeLink to={post.permalink} className={styles.tickerTitle}>
                      {post.title}
                    </SafeLink>
                    <span className={styles.tickerDescription}>: {post.frontMatter.description}</span>
                  </span>
                ))}
              </div>
            </div>
            <div className={styles.tickerLabel}>BETWEEN THE LINES</div>
            <div className={styles.secondNewsBar}>
              <div className={staticMode ? styles.tickerStatic : secondTickerClass}>
                {articlesWithImages.length > 0 ? (
                  <>
                    <span className={styles.secondNewsItem} data-ticker="latest-articles">LATEST ARTICLES & ANALYSIS:</span>
                    {articlesWithImages.map((post, index) => (
                      <span
                        key={`article-${index}`}
                        className={styles.secondNewsItem}
                        onMouseOver={handleSecondMouseOver}
                        onMouseOut={handleSecondMouseOut}
                        data-ticker={`article-${index}`}
                      >
                        <img src="/img/proudamericaus.png" alt="Logo" className={styles.tickerLogo} />
                        <SafeLink to={post.permalink} className={styles.secondNewsTitle}>
                          {post.title}
                        </SafeLink>
                        <span className={styles.secondNewsDescription}>: {post.frontMatter.description}</span>
                      </span>
                    ))}
                  </>
                ) : (
                  <span className={styles.secondNewsItem} data-ticker="no-articles">
                    <img src="/img/proudamericaus.png" alt="Logo" className={styles.tickerLogo} />
                    DEBUG: NO ARTICLES AVAILABLE. CHECK /ARTICLES/TEMP/ AND BLOG-POST-LIST-PROP-DEFAULT.JSON.
                  </span>
                )}
              </div>
            </div>
            <div className={styles.tickerLabel}>DEEP STATE NEWS</div>
            <div className={styles.thirdNewsBar}>
              <div className={staticMode ? styles.tickerStatic : thirdTickerClass}>
                <span className={styles.thirdNewsItem} data-ticker="featured-updates">FEATURED UPDATES:</span>
                {hardcodedItems.map((item, index) => (
                  <span
                    key={`third-${index}`}
                    className={styles.thirdNewsItem}
                    onMouseOver={handleThirdMouseOver}
                    onMouseOut={handleThirdMouseOut}
                    data-ticker={`third-${index}`}
                  >
                    <img src="/img/proudamericaus.png" alt="Logo" className={styles.tickerLogo} />
                    <SafeLink to={item.url} className={styles.thirdNewsTitle}>
                      {item.title}
                    </SafeLink>
                    <span className={styles.thirdNewsDescription}>: {item.description}</span>
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </header>
      <main className={styles.main}>
        <HomepageContent />
        <section className={styles.blogSection}>
          <div className="container">
            <h2>Latest News</h2>
            {isHydrated && newsWithImages.length > 0 ? (
              <div className={clsx('row', styles.blogRow)} ref={newsRowRef}>
                {newsWithImages.map((post, index) => (
                  <div key={`news-card-${index}`} className="col col--4">
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
                <button className={styles.nextButton} onClick={handleNextNews}>
                  Discover More
                </button>
              </div>
            ) : (
              <p>Loading news posts...</p>
            )}
          </div>
        </section>
        <section className={styles.blogSection}>
          <div className="container">
            <h2>Latest Articles & Analysis</h2>
            {isHydrated && articlesWithImages.length > 0 ? (
              <div className={clsx('row', styles.blogRow)} ref={articlesRowRef}>
                {articlesWithImages.map((post, index) => (
                  <div key={`article-card-${index}`} className="col col--4">
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
                <button className={styles.nextButton} onClick={handleNextArticles}>
                  Discover More
                </button>
              </div>
            ) : (
              <p>Loading blog posts...</p>
            )}
          </div>
        </section>
      </main>
      {isBrowser && (
        <div id="footer-realtime-clock" className={styles.clockWrapper}></div>
      )}
    </Layout>
  );
}
