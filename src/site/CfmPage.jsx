import './cfm.css';

/* cFM landing page: project page under chrisalorenzo.com/cfm */

const CRIMSON = '#c1272d';

function Key({ k, label }) {
  return (
    <div className="cfm-key">
      <kbd>{k}</kbd>
      <span>{label}</span>
    </div>
  );
}

export default function CfmPage() {
  return (
    <div className="cfm-page">
      <a className="skip" href="#main">Skip to content</a>

      <nav className="cfm-nav">
        <div className="nav-inner">
          <a className="nav-name" href="/">Christopher Lorenzo</a>
          <div className="nav-links">
            <a href="/">Portfolio</a>
            <a href="/#lab">Lab</a>
            <a href="/#contact">Contact</a>
          </div>
        </div>
      </nav>

      <main id="main" className="cfm-main">
        {/* Hero */}
        <section className="cfm-hero">
          <div className="cfm-badge">FILE MANAGER</div>
          <h1>cFM</h1>
          <p className="cfm-tagline">
            A terminal file manager that treats your files like they matter.
            Every destructive op is journaled. Undo works. Crashes recover.
          </p>
          <div className="ctas">
            <a className="btn btn-solid cfm-btn-accent" href="#install">Install</a>
            <a className="btn btn-ghost" href="#features">Features</a>
          </div>
          <div className="cfm-meta">
            <span>Go</span>
            <span className="dot">·</span>
            <span>Single binary</span>
            <span className="dot">·</span>
            <span>Zero network</span>
            <span className="dot">·</span>
            <span>Linux / macOS / Windows</span>
          </div>
        </section>

        {/* Terminal screenshot placeholder */}
        <section className="cfm-shot">
          <div className="cfm-term">
            <div className="cfm-term-bar">
              <span className="cfm-dot" />
              <span className="cfm-dot" />
              <span className="cfm-dot" />
              <span className="cfm-term-title">cfm — /home/chris/projects</span>
            </div>
            <div className="cfm-term-body">
              <div className="cfm-term-line"><span className="cfm-prompt">❯</span> cfm</div>
              <div className="cfm-term-line cfm-dim">┌ Quick ──────┐┌─ /home/chris/projects ─────────────┐┌─ preview ───┐</div>
              <div className="cfm-term-line">│ <span style={{color: CRIMSON}}></span> Home      ││ <span className="cfm-sel">▸ docs                        </span> ││ <span className="cfm-dim">readme.md</span> │</div>
              <div className="cfm-term-line">│             ││   src                         ││ <span className="cfm-dim"># cFM</span>     │</div>
              <div className="cfm-term-line">│             ││   hello.txt                   ││             │</div>
              <div className="cfm-term-line cfm-dim">└─────────────┘└─────────────────────────────────┘└─────────────┘</div>
              <div className="cfm-term-line"><span className="cfm-prompt">❯</span> <span className="cfm-dim"># Bloodmoon theme, journal active, 3 entries</span></div>
            </div>
          </div>
          <p className="cfm-cap">Single-pane with rich preview, Bloodmoon theme. Terminal mockup of the layout.</p>
        </section>

        {/* Why */}
        <section className="cfm-section" id="features">
          <h2>Why cFM</h2>
          <div className="cfm-grid">
            <div className="cfm-card">
              <h3>Journaled ops</h3>
              <p>Every copy, move, trash, and rename is written to a crash-safe journal. Press <kbd>u</kbd> to undo. If cFM crashes mid-op, the next launch offers resume or rollback.</p>
            </div>
            <div className="cfm-card">
              <h3>Trash first</h3>
              <p>Deletes go to trash, not oblivion. Permanent delete requires typing a confirmation. Protected paths like <code>/etc</code> need the full path typed out.</p>
            </div>
            <div className="cfm-card">
              <h3>Agent-aware</h3>
              <p>Mark files into a basket with <kbd>a</kbd>, hand the context to a Z3ROS agent session with <kbd>X</kbd>. The handoff sends paths only, never file contents.</p>
            </div>
            <div className="cfm-card">
              <h3>Zero network</h3>
              <p>No telemetry, no update checks, no phone-home. Verified by an import gate in CI. Your files never leave the machine.</p>
            </div>
          </div>
        </section>

        {/* Keybindings */}
        <section className="cfm-section">
          <h2>Keyboard-first</h2>
          <p className="cfm-lede">Vim-like navigation. Every binding remappable. Press <kbd>?</kbd> anytime for the full overlay.</p>
          <div className="cfm-keys">
            <Key k="h j k l" label="navigate" />
            <Key k="/" label="filter" />
            <Key k="S" label="recursive search" />
            <Key k="*" label="select by pattern" />
            <Key k="space" label="mark" />
            <Key k="y / x / p" label="yank / cut / paste" />
            <Key k="d" label="trash" />
            <Key k="u" label="undo" />
            <Key k=":" label="command mode" />
            <Key k="o" label="cycle sort" />
            <Key k="z / e" label="archive / extract" />
            <Key k="a / A" label="basket add / view" />
          </div>
        </section>

        {/* Install */}
        <section className="cfm-section" id="install">
          <h2>Install</h2>
          <div className="cfm-install">
            <p className="cfm-note">
              cFM is not released yet. When it ships, it will be a single static binary
              with no dependencies. Config will live in <code>~/.config/cfm/</code>,
              state in <code>~/.local/share/cfm/</code>. The <code>fm</code> shell wrapper
              gives you cd-on-exit.
            </p>
          </div>
        </section>

        {/* Status */}
        <section className="cfm-section">
          <h2>Status</h2>
          <p className="cfm-lede">
            cFM is a first working build. The fundamentals are in, the security audit is closed,
            and it cross-compiles for Linux, macOS, and Windows. It is not v1 yet:
            it needs daily-driver testing, interruption testing, and real hardware validation
            before it ships.
          </p>
          <div className="cfm-status">
            <div className="cfm-status-row"><span>Core file ops</span><span className="cfm-done">Done</span></div>
            <div className="cfm-status-row"><span>Journal + undo + crash recovery</span><span className="cfm-done">Done</span></div>
            <div className="cfm-status-row"><span>Security audit</span><span className="cfm-done">Closed</span></div>
            <div className="cfm-status-row"><span>Cross-platform builds</span><span className="cfm-done">Pass</span></div>
            <div className="cfm-status-row"><span>Daily-driver testing</span><span className="cfm-todo">Pending</span></div>
            <div className="cfm-status-row"><span>Hardware validation</span><span className="cfm-todo">Pending</span></div>
          </div>
        </section>
      </main>

      <footer className="cfm-foot">
        <p>Built by Christopher Lorenzo. Part of the Cheech OS project family.</p>
        <p><a href="/">← Back to portfolio</a></p>
      </footer>
    </div>
  );
}
