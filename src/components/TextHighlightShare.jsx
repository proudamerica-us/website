import React, { useState, useEffect } from 'react';
import styles from './TextHighlightShare.module.css';

const TextHighlightShare = ({ children }) => {
  const [selection, setSelection] = useState(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [visible, setVisible] = useState(false);

  const handleSelection = () => {
    const sel = window.getSelection();
    if (sel && sel.toString().trim() && sel.rangeCount > 0) {
      const range = sel.getRangeAt(0);
      const rect = range.getBoundingClientRect();
      setSelection(sel.toString());
      setPosition({ x: rect.left + rect.width / 2, y: rect.top - 40 });
      setVisible(true);
    } else {
      setVisible(false);
    }
  };

  const shareToX = () => {
    if (!selection) return;
    const pageUrl = window.location.href;
    const shareText = `"${selection}" — from ${pageUrl}`;
    const xUrl = `https://x.com/intent/tweet?text=${encodeURIComponent(shareText)}`;
    window.open(xUrl, '_blank');
    setVisible(false);
    window.getSelection().removeAllRanges();
  };

  useEffect(() => {
    document.addEventListener('mouseup', handleSelection);
    document.addEventListener('touchend', handleSelection);
    return () => {
      document.removeEventListener('mouseup', handleSelection);
      document.removeEventListener('touchend', handleSelection);
    };
  }, []);

  return (
    <div className="text-highlight-wrapper">
      {children}
      {visible && (
        <button
          className={styles.shareButton}
          style={{ top: position.y, left: position.x }}
          onClick={shareToX}
        >
          Share to X
        </button>
      )}
    </div>
  );
};

export default TextHighlightShare;
