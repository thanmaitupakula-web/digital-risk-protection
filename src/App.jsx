import { useMemo, useState } from 'react';

const officialProfile = {
  brand: 'Astera Bank',
  market: 'Global fintech',
  logo: 'AB',
  type: 'Banking & Payments',
  officialAccounts: [
    '@AsteraBank',
    '@AsteraSupport',
    '@AsteraPayments',
  ],
  officialApps: ['Astera Mobile', 'Astera Pay', 'Astera Business'],
  sectors: ['Fintech', 'Payments', 'Consumer Banking'],
};

const socialThreats = [
  {
    id: 'SOC-101',
    source: 'Social',
    channel: 'Instagram',
    entity: '@AsteraBankSupport',
    risk: 'Critical',
    score: 96,
    signal: 'Profile mimics official support branding with a blue logo and similar username.',
    reason: ['look-alike handle', 'brand logo similarity', 'scam messaging'],
    status: 'Investigating',
    lastSeen: '2 mins ago',
  },
  {
    id: 'SOC-205',
    source: 'Social',
    channel: 'TikTok',
    entity: 'AsteraBankOfficial',
    risk: 'High',
    score: 89,
    signal: 'Profile uses official colors and similar bio copy to impersonate a customer service account.',
    reason: ['name similarity', 'color match', 'customer service clone'],
    status: 'Escalated',
    lastSeen: '14 mins ago',
  },
  {
    id: 'SOC-317',
    source: 'Social',
    channel: 'Facebook',
    entity: 'Astera Credit Services',
    risk: 'Medium',
    score: 72,
    signal: 'Page creates urgency around account recovery and fake reward programs.',
    reason: ['added word', 'fake offers', 'reputation abuse'],
    status: 'Monitoring',
    lastSeen: '31 mins ago',
  },
  {
    id: 'SOC-402',
    source: 'Social',
    channel: 'X',
    entity: '@AsteraHelpDesk',
    risk: 'High',
    score: 83,
    signal: 'Handle is a small variation of official handle and is posting phishing prompts.',
    reason: ['character swap', 'phishing CTA', 'logo mimicry'],
    status: 'Blocked',
    lastSeen: '48 mins ago',
  },
];

const appThreats = [
  {
    id: 'APP-110',
    source: 'App',
    channel: 'Google Play',
    entity: 'Astera Mobile Plus',
    risk: 'Critical',
    score: 94,
    signal: 'App replicates the official logo, publisher identity, and login flow with a fake onboarding screen.',
    reason: ['logo match', 'developer mismatch', 'credential harvesting'],
    status: 'Removed',
    lastSeen: '6 mins ago',
  },
  {
    id: 'APP-220',
    source: 'App',
    channel: 'Apple App Store',
    entity: 'AsteraPay Secure',
    risk: 'High',
    score: 86,
    signal: 'Application description mirrors official marketing language and uses a near-identical package name.',
    reason: ['app name close match', 'publisher mismatch', 'marketing copy similarity'],
    status: 'Review',
    lastSeen: '26 mins ago',
  },
  {
    id: 'APP-335',
    source: 'App',
    channel: 'Google Play',
    entity: 'Astera Business Portal',
    risk: 'Medium',
    score: 68,
    signal: 'Suspicious app targets SMB clients using a branded dashboard and fake account recovery CTA.',
    reason: ['brand resemblance', 'targeted scam', 'mismatched publisher'],
    status: 'Monitoring',
    lastSeen: '1 hour ago',
  },
];

const architectureSteps = [
  { title: 'Data sources', items: ['Social platforms', 'App stores', 'Public threat feeds', 'Brand watchlists'] },
  { title: 'Detection logic', items: ['Similarity scoring', 'Name normalization', 'Logo / text matching', 'Official asset exclusion'] },
  { title: 'Storage', items: ['Brand profile', 'Known assets', 'Alerts queue', 'Evidence archive'] },
  { title: 'Actions', items: ['Escalation', 'Takedown workflows', 'Watchlist updates', 'Priority triage'] },
];

const demoSlides = [
  'Brand profile captures official handles and apps to create an allow-list.',
  'Risk engine scores social identities for name, logo, and behavior similarity.',
  'App store monitor flags apps with publishers, description, and UI mismatches.',
  'Analysts review prioritized threats and track takedown progress.',
];

function normalizeName(input) {
  return input
    .toLowerCase()
    .replace(/[^a-z0-9]/g, '')
    .replace(/\s+/g, '');
}

function similarityScore(a, b) {
  const left = normalizeName(a);
  const right = normalizeName(b);
  if (!left || !right) return 0;
  if (left === right) return 100;

  const maxLength = Math.max(left.length, right.length);
  let same = 0;
  for (let i = 0; i < Math.min(left.length, right.length); i += 1) {
    if (left[i] === right[i]) same += 1;
  }
  return Math.round((same / maxLength) * 100);
}

function App() {
  const [view, setView] = useState('social');
  const [scanCount, setScanCount] = useState(0);

  const allThreats = useMemo(() => [...socialThreats, ...appThreats], []);

  const filteredThreats = useMemo(() => {
    if (view === 'all') return allThreats;
    return allThreats.filter((item) => item.source.toLowerCase() === view.toLowerCase());
  }, [allThreats, view]);

  const summary = useMemo(() => {
    const counts = {
      critical: filteredThreats.filter((t) => t.risk === 'Critical').length,
      high: filteredThreats.filter((t) => t.risk === 'High').length,
      medium: filteredThreats.filter((t) => t.risk === 'Medium').length,
      total: filteredThreats.length,
    };
    return counts;
  }, [filteredThreats]);

  const lookalikeChecks = useMemo(
    () => [
      { name: '@AsteraBankSupport', score: similarityScore('@AsteraBankSupport', '@AsteraBank') },
      { name: 'Astera Mobile Plus', score: similarityScore('Astera Mobile Plus', 'Astera Mobile') },
      { name: 'AsteraPay Secure', score: similarityScore('AsteraPay Secure', 'Astera Pay') },
      { name: 'Astera Bank Support', score: similarityScore('Astera Bank Support', 'AsteraSupport') },
    ],
    [],
  );

  const activeOfficialAssets = useMemo(
    () => [...officialProfile.officialAccounts, ...officialProfile.officialApps],
    [],
  );

  return (
    <div className="app-shell">
      <header className="topbar">
        <div className="brand-block">
          <div className="brand-mark">AB</div>
          <div>
            <div className="eyebrow">Threat Intelligence</div>
            <h2>Digital Risk Protection</h2>
          </div>
        </div>
        <nav className="nav">
          <span className="active">Overview</span>
          <span>Monitoring</span>
          <span>Threats</span>
          <span>Reports</span>
        </nav>
        <button className="primary-button" onClick={() => setScanCount((n) => n + 1)}>
          {scanCount > 0 ? 'Rescan assets' : 'Run brand scan'}
        </button>
      </header>

      <main className="layout">
        <section className="hero card">
          <div className="hero-copy">
            <p className="eyebrow accent">Social & app monitoring</p>
            <h1>Protect the brand from impersonation before it impacts customers.</h1>
            <p className="muted">
              Detect fake profiles, scam pages, and malicious apps using similar names, branding, and customer-facing content.
            </p>
            <div className="cta-row">
              <button className="primary-button">Review active threats</button>
              <button className="ghost-button">Export report</button>
            </div>
          </div>

          <div className="hero-stats">
            <div className="stat-box">
              <span className="stat-label">Threats detected</span>
              <strong>{allThreats.length}</strong>
              <small>Across social and app ecosystems</small>
            </div>
            <div className="stat-box soft">
              <span className="stat-label">Critical</span>
              <strong>2</strong>
              <small>Likely phishing or impersonation</small>
            </div>
          </div>
        </section>

        <section className="content-grid">
          <aside className="card panel">
            <div className="section-header">
              <div>
                <p className="eyebrow accent">Brand profile</p>
                <h3>{officialProfile.brand}</h3>
              </div>
              <span className="pill">Verified</span>
            </div>

            <div className="profile-row">
              <div className="logo">AB</div>
              <div>
                <h4>{officialProfile.market}</h4>
                <p>{officialProfile.type}</p>
              </div>
            </div>

            <div className="info-stack">
              <div>
                <label>Official accounts</label>
                <ul>
                  {officialProfile.officialAccounts.map((acc) => (
                    <li key={acc}>{acc}</li>
                  ))}
                </ul>
              </div>

              <div>
                <label>Official apps</label>
                <ul>
                  {officialProfile.officialApps.map((app) => (
                    <li key={app}>{app}</li>
                  ))}
                </ul>
              </div>

              <div>
                <label>Brand sectors</label>
                <div className="tag-list">
                  {officialProfile.sectors.map((sector) => (
                    <span key={sector} className="tag">{sector}</span>
                  ))}
                </div>
              </div>
            </div>
          </aside>

          <div className="card panel">
            <div className="section-header">
              <div>
                <p className="eyebrow accent">Live monitoring</p>
                <h3>Threat feed</h3>
              </div>
              <div className="segmented-control">
                {['all', 'social', 'app'].map((tab) => (
                  <button
                    key={tab}
                    className={tab === view ? 'chip active' : 'chip'}
                    onClick={() => setView(tab)}
                  >
                    {tab === 'all' ? 'All' : tab === 'social' ? 'Social' : 'Apps'}
                  </button>
                ))}
              </div>
            </div>

            <div className="summary-grid">
              <div>
                <span>Total</span>
                <strong>{summary.total}</strong>
              </div>
              <div>
                <span>Critical</span>
                <strong>{summary.critical}</strong>
              </div>
              <div>
                <span>High</span>
                <strong>{summary.high}</strong>
              </div>
              <div>
                <span>Medium</span>
                <strong>{summary.medium}</strong>
              </div>
            </div>

            <div className="threat-list">
              {filteredThreats.map((item) => (
                <article key={item.id} className="threat-item">
                  <div className="threat-topline">
                    <div>
                      <span className="mini-label">{item.source}</span>
                      <h4>{item.entity}</h4>
                    </div>
                    <span className={`risk badge ${item.risk.toLowerCase()}`}>{item.risk}</span>
                  </div>
                  <div className="meta-row">
                    <span>{item.channel}</span>
                    <span>{item.lastSeen}</span>
                    <span>Score {item.score}</span>
                  </div>
                  <p>{item.signal}</p>
                  <div className="reason-list">
                    {item.reason.map((reason) => (
                      <span key={reason} className="reason-tag">{reason}</span>
                    ))}
                  </div>
                  <div className="threat-footer">
                    <span className="status">{item.status}</span>
                    <button className="tiny-button">Review</button>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="lower-grid">
          <div className="card panel">
            <div className="section-header">
              <div>
                <p className="eyebrow accent">Look-alike detection</p>
                <h3>Name similarity</h3>
              </div>
            </div>
            <div className="score-list">
              {lookalikeChecks.map((check) => (
                <div key={check.name} className="score-row">
                  <div>
                    <span>{check.name}</span>
                  </div>
                  <div className="score-bar-wrap">
                    <div className="score-bar" style={{ width: `${check.score}%` }} />
                  </div>
                  <strong>{check.score}%</strong>
                </div>
              ))}
            </div>
          </div>

          <div className="card panel">
            <div className="section-header">
              <div>
                <p className="eyebrow accent">Architecture</p>
                <h3>Detection pipeline</h3>
              </div>
            </div>
            <div className="architecture-grid">
              {architectureSteps.map((step) => (
                <div key={step.title} className="arch-card">
                  <h4>{step.title}</h4>
                  <ul>
                    {step.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="card demo-panel">
          <div className="section-header">
            <div>
              <p className="eyebrow accent">Demo</p>
              <h3>Short walkthrough</h3>
            </div>
          </div>
          <div className="demo-grid">
            {demoSlides.map((slide, index) => (
              <div key={slide} className="demo-slide">
                <span className="demo-index">0{index + 1}</span>
                <p>{slide}</p>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;
