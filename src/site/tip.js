/* Tooltip helper shared by the hero mesh and the lab figure. */

let tipEl = null;
function el() {
  if (!tipEl) tipEl = document.getElementById('node-tip');
  return tipEl;
}

export function showTip(n, anchorEl) {
  const tip = el();
  if (!tip || !anchorEl) return;
  const r = anchorEl.getBoundingClientRect();
  tip.innerHTML =
    '<div>' + n.id + '</div><div class="t-sub">' + (n.tip || n.sub) + '</div>';
  tip.style.left = r.left + r.width / 2 + 'px';
  tip.style.top = r.top - 6 + 'px';
  tip.classList.add('show');
}

export function hideTip() {
  const tip = el();
  if (!tip) return;
  delete tip.dataset.pinned;
  tip.classList.remove('show');
}
