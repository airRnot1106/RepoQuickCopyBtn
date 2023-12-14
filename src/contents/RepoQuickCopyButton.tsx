import { Copy } from 'lucide-react';
import type { PlasmoCSConfig, PlasmoGetInlineAnchor } from 'plasmo';
import styleText from 'data-text:../style.css';

export const config: PlasmoCSConfig = {
  matches: ['https://github.com/*/**'],
};

export const getInlineAnchor: PlasmoGetInlineAnchor = () =>
  document.querySelector(
    'nav[aria-label="Page context"] > ul > li:last-child',
  ) as HTMLElement;

export const getStyle = () => {
  const style = document.createElement('style');
  style.textContent = styleText;
  return style;
};

const RepoQuickCopyButton = () => {
  const handleClickCopy = () => {
    const list = document.querySelectorAll(
      'nav[aria-label="Page context"] > ul > li > a',
    );
    const [author, repo] = Array.from(list).map((elm) =>
      elm.textContent?.trim(),
    );

    if (author == null || repo == null) {
      console.error('author or repo is null');
      return;
    }

    navigator.clipboard.writeText(`${author}/${repo}`);
  };
  return (
    <button
      type="button"
      className="btn btn-neutral btn-square btn-sm"
      onClick={handleClickCopy}
    >
      <Copy size={16} />
    </button>
  );
};

export default RepoQuickCopyButton;

window.addEventListener('load', () => {
  const repoNameElm = document.querySelector(
    'nav[aria-label="Page context"] li:nth-child(2)',
  );
  if (repoNameElm instanceof HTMLElement) {
    repoNameElm.style.fontWeight = '600';
  }
});
