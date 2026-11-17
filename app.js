'use strict';

// Membership spans the four eras. Multiple active filters are combined with OR.
const rows = [...document.querySelectorAll('.person')];
const filters = [...document.querySelectorAll('[data-faction]')];
const groups = [...document.querySelectorAll('.group')];
const count = document.getElementById('result-count');
for (const button of filters) {
  button.addEventListener('click', () => {
    button.setAttribute('aria-pressed', String(button.getAttribute('aria-pressed') !== 'true'));
    const selected = filters.filter(b => b.getAttribute('aria-pressed') === 'true').map(b => b.dataset.faction);
    for (const row of rows) row.hidden = selected.length > 0 && !selected.some(f => row.dataset.factions.split(' ').includes(f));
    for (const group of groups) {
      let next = group.nextElementSibling;
      let hasVisibleRow = false;
      while (next && !next.classList.contains('group')) {
        if (!next.hidden) hasVisibleRow = true;
        next = next.nextElementSibling;
      }
      group.hidden = !hasVisibleRow;
    }
    count.textContent = `${rows.filter(r => !r.hidden).length} of ${rows.length} characters`;
    hidePortrait();
    updateHeader();
  });
}

// A viewport-fixed copy avoids the overflow container trapping CSS sticky headers.
// It is presentation-only; the original semantic table header remains accessible.
const scroller = document.querySelector('.scroll');
const table = scroller.querySelector('table');
const header = table.querySelector('thead');
const floating = document.getElementById('floating-header');
const copy = document.createElement('table');
copy.append(table.querySelector('colgroup').cloneNode(true), header.cloneNode(true));
floating.append(copy);
function updateHeader() {
  const bounds = scroller.getBoundingClientRect();
  const head = header.getBoundingClientRect();
  floating.hidden = head.top >= 0 || bounds.bottom <= 0;
  if (floating.hidden) return;
  const left = Math.max(0, bounds.left);
  floating.style.left = `${left}px`;
  floating.style.width = `${Math.min(bounds.right, window.innerWidth) - left}px`;
  floating.style.transform = `translateY(${Math.min(0, bounds.bottom - head.height)}px)`;
  copy.style.width = `${table.getBoundingClientRect().width}px`;
  copy.style.transform = `translateX(${bounds.left - left - scroller.scrollLeft}px)`;
}
let scheduled = false;
function scheduleHeader() {
  if (scheduled) return;
  scheduled = true;
  requestAnimationFrame(() => { scheduled = false; updateHeader(); });
}
window.addEventListener('scroll', scheduleHeader, { passive: true });
window.addEventListener('resize', () => { hidePortrait(); scheduleHeader(); });
scroller.addEventListener('scroll', () => { hidePortrait(); scheduleHeader(); }, { passive: true });
new ResizeObserver(scheduleHeader).observe(table);
updateHeader();

// Hover and keyboard focus preview the full artwork. Tap/click toggles it on touch.
const popup = document.getElementById('portrait-popup');
const popupImage = popup.querySelector('img');
let activePortrait = null;
function hidePortrait() { popup.hidden = true; activePortrait = null; }
function showPortrait(button) {
  activePortrait = button;
  popupImage.src = button.dataset.full;
  popupImage.alt = `Artwork of ${button.dataset.name}`;
  popup.setAttribute('aria-label', `Enlarged portrait of ${button.dataset.name}`);
  popup.querySelector('span').textContent = button.dataset.name;
  popup.hidden = false;
  const anchor = button.getBoundingClientRect();
  const width = popup.offsetWidth, height = popup.offsetHeight;
  let left = anchor.right + 16;
  if (left + width > innerWidth - 12) left = anchor.left - width - 16;
  popup.style.left = `${Math.max(12, Math.min(left, innerWidth - width - 12))}px`;
  popup.style.top = `${Math.max(12, Math.min(anchor.top, innerHeight - height - 12))}px`;
}
for (const button of document.querySelectorAll('.portrait-trigger')) {
  button.addEventListener('pointerenter', e => { if (e.pointerType === 'mouse') showPortrait(button); });
  button.addEventListener('pointerleave', e => { if (e.pointerType === 'mouse') hidePortrait(); });
  button.addEventListener('focus', () => { if (button.matches(':focus-visible')) showPortrait(button); });
  button.addEventListener('blur', hidePortrait);
  button.addEventListener('click', () => {
    if (activePortrait === button && matchMedia('(hover: none)').matches) hidePortrait();
    else showPortrait(button);
  });
}
document.addEventListener('keydown', e => { if (e.key === 'Escape') hidePortrait(); });
document.addEventListener('pointerdown', e => { if (!e.target.closest('.portrait-trigger')) hidePortrait(); });
window.addEventListener('scroll', hidePortrait, { passive: true });
