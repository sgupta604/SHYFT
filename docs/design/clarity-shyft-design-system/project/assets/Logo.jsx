/* ============================================================
   Clarity brand marks — real artwork (referenced live)
   The official bitmaps are hosted on the Clarity portal and
   load fine in the browser, but the host sends no CORS headers
   so they can't be downloaded into the repo. We reference them
   live. To make this self-contained, drop the real files into
   assets/ and point S2_MARK_SRC / LOCKUP_SRC at them.
   ============================================================ */

const S2_MARK_SRC = 'https://portal.internal.shyftsolutions.io/s2-mark.png';        // 1250×1250, square
const LOCKUP_SRC  = 'https://portal.internal.shyftsolutions.io/shyft-solutions-lockup.png'; // 1940×536

// Two-tone S2 monogram. `size` = pixel height (square). App chrome
// at 22–44px, login 40, hero 64.
function S2Mark({ size = 32, style = {}, title = 'Shyft' }) {
  return (
    <img
      src={S2_MARK_SRC}
      alt={title}
      width={size}
      height={size}
      style={{ display: 'block', width: size, height: size, objectFit: 'contain', userSelect: 'none', ...style }}
    />
  );
}

// The two-tone mark is documented to survive on dark unchanged,
// so the dark variant is the same asset.
const S2MarkOnDark = S2Mark;

// Full corporate lockup — login & marketing only; never in chrome.
function ShyftLockup({ height = 44, style = {} }) {
  return (
    <img
      src={LOCKUP_SRC}
      alt="Shyft Solutions — The Science of Software"
      height={height}
      style={{ display: 'block', height, width: 'auto', objectFit: 'contain', userSelect: 'none', ...style }}
    />
  );
}

Object.assign(window, { S2Mark, S2MarkOnDark, ShyftLockup, S2_MARK_SRC, LOCKUP_SRC });
