import React, { useEffect, useRef, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  BarChart3,
  BookOpen,
  Bookmark,
  CalendarDays,
  Check,
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  Clock3,
  Cloud,
  Code2,
  Copy,
  Database,
  Download,
  ExternalLink,
  Eye,
  EyeOff,
  FileText,
  Flame,
  FolderOpen,
  GraduationCap,
  LayoutDashboard,
  Layers,
  Lock,
  LogOut,
  Mail,
  Menu,
  Monitor,
  Search,
  Settings,
  ShieldCheck,
  Smartphone,
  Target,
  Terminal,
  User,
  X,
} from "lucide-react";
import catalog from "virtual:learning-content";

const { tracks, resources, lessons } = catalog;
const items = [...lessons, ...resources];
const findItem = (id) => items.find((item) => item.id === id);
const findTrack = (id) => tracks.find((track) => track.id === id);
const categories = [
  "All tracks",
  "Frontend",
  "Backend",
  "Database",
  "Mobile",
  "DevOps",
];
const difficulties = ["Beginner", "Intermediate", "Advanced"];
const dateKey = (date = new Date()) =>
  `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
const defaultProgress = {
  completed: [],
  bookmarks: [],
  recent: [],
  activity: [],
  goal: 3,
};

function readStorage(key, fallback) {
  try {
    return JSON.parse(localStorage.getItem(key)) ?? fallback;
  } catch {
    return fallback;
  }
}

function initialProgress() {
  const saved = readStorage("fullstack.progress", {});
  return {
    ...defaultProgress,
    ...Object.fromEntries(
      ["completed", "bookmarks", "recent"].map((key) => [
        key,
        Array.isArray(saved?.[key])
          ? saved[key].filter((id) => typeof id === "string" && findItem(id))
          : [],
      ]),
    ),
    activity: Array.isArray(saved?.activity)
      ? saved.activity.filter(
          (event) =>
            event &&
            typeof event.id === "string" &&
            typeof event.date === "string",
        )
      : [],
    goal:
      Number.isInteger(saved?.goal) && saved.goal >= 1 && saved.goal <= 20
        ? saved.goal
        : 3,
  };
}

function initialUser() {
  const saved = readStorage("fullstack.user", null);
  return saved &&
    typeof saved.name === "string" &&
    typeof saved.email === "string"
    ? saved
    : null;
}

function navigate(path) {
  window.location.hash = path;
}
function itemRoute(item) {
  return `/${item.kind === "lesson" ? "lesson" : "resource"}/${encodeURIComponent(item.id)}`;
}
function routeItem(route) {
  try {
    return findItem(decodeURIComponent(route.split("/").slice(2).join("/")));
  } catch {
    return undefined;
  }
}
function previewUrl(source) {
  return `/examples/${source.split("/").map(encodeURIComponent).join("/")}`;
}
function readingTime(text) {
  return Math.max(1, Math.ceil(text.split(/\s+/).length / 180));
}

function Brand({ light = false }) {
  return (
    <a
      className={`brand ${light ? "brand-light" : ""}`}
      href="#/dashboard"
      aria-label="Fullstack Learning home"
    >
      <span className="brand-mark">
        <Code2 size={23} strokeWidth={2.5} />
      </span>
      <span>
        fullstack<span className="brand-sub">learning workspace</span>
      </span>
    </a>
  );
}

function TrackIcon({ track, small = false }) {
  return (
    <span
      className={`track-icon ${small ? "small" : ""} track-${track.id}`}
      style={{ "--track-color": track.color }}
      aria-hidden="true"
    >
      {track.id === "react" ? (
        <span className="react-symbol">⚛</span>
      ) : (
        track.symbol
      )}
    </span>
  );
}

function IconButton({ icon: Icon, label, onClick, active = false, ...props }) {
  return (
    <button
      className={`icon-button ${active ? "is-active" : ""}`}
      title={label}
      aria-label={label}
      onClick={onClick}
      {...props}
    >
      <Icon size={18} />
    </button>
  );
}

function Empty({ icon: Icon = Search, title, description, action }) {
  return (
    <div className="empty-state">
      <Icon size={30} />
      <h3>{title}</h3>
      <p>{description}</p>
      {action}
    </div>
  );
}

function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [visible, setVisible] = useState(false);
  const [error, setError] = useState("");
  function submit(event) {
    event.preventDefault();
    if (
      email.trim().toLowerCase() !== "demo@fullstack.dev" ||
      password !== "Learn@123"
    ) {
      setError("Use the demo email and password shown below.");
      return;
    }
    onLogin({ name: "Alex Morgan", email: "demo@fullstack.dev" });
  }
  return (
    <div className="login-page">
      <header className="login-header">
        <Brand />
        <span className="repository-label">
          <FolderOpen size={15} /> fulstack-learning
        </span>
      </header>
      <main className="login-layout">
        <section className="login-intro">
          <span className="eyebrow">
            <span className="status-dot" /> YOUR PERSONAL LEARNING SPACE
          </span>
          <h1>
            Fullstack learning.
            <br />
            <span>One step at a time.</span>
          </h1>
          <p>A place for your notes, your code, and your next breakthrough.</p>
          <div className="login-terminal">
            <div className="terminal-header">
              <span className="terminal-dots">
                <i />
                <i />
                <i />
              </span>
              <span>your-learning-journey.js</span>
              <Terminal size={14} />
            </div>
            <pre>
              <span className="syntax-muted">
                // A little progress, every day.
              </span>
              {"\n"}
              <span className="syntax-purple">const</span>
              {" developer = {\n  curiosity: "}
              <span className="syntax-green">true</span>
              {",\n  stack: ["}
              <span className="syntax-yellow">'frontend'</span>
              {", "}
              <span className="syntax-yellow">'backend'</span>
              {"],\n  nextStep: "}
              <span className="syntax-yellow">'keep learning'</span>
              {"\n};\n\n"}
              <span className="syntax-green">developer</span>
              {".start();"}
              <span className="terminal-cursor" />
            </pre>
          </div>
          <div className="login-tracks">
            {tracks.slice(0, 6).map((track) => (
              <TrackIcon key={track.id} track={track} small />
            ))}
            <span>10 learning tracks</span>
          </div>
        </section>
        <section className="login-form-section">
          <div className="login-form-heading">
            <span className="form-icon">
              <GraduationCap size={25} />
            </span>
            <h2>Good to have you here.</h2>
            <p>Sign in to your learning workspace.</p>
          </div>
          <form onSubmit={submit}>
            <label htmlFor="email">Email address</label>
            <div className="input-with-icon">
              <Mail size={17} />
              <input
                id="email"
                type="email"
                autoComplete="username"
                required
                placeholder="you@example.com"
                value={email}
                onChange={(event) => {
                  setEmail(event.target.value);
                  setError("");
                }}
              />
            </div>
            <label htmlFor="password">Password</label>
            <div className="input-with-icon">
              <Lock size={17} />
              <input
                id="password"
                type={visible ? "text" : "password"}
                autoComplete="current-password"
                required
                placeholder="Enter your password"
                value={password}
                onChange={(event) => {
                  setPassword(event.target.value);
                  setError("");
                }}
              />
              <IconButton
                icon={visible ? EyeOff : Eye}
                label={visible ? "Hide password" : "Show password"}
                onClick={() => setVisible(!visible)}
                type="button"
              />
            </div>
            {error && (
              <p role="alert" className="form-error">
                {error}
              </p>
            )}
            <button className="button primary login-submit" type="submit">
              Sign in <ArrowRight size={17} />
            </button>
          </form>
          <div className="divider">
            <span>or explore the workspace</span>
          </div>
          <button
            className="button secondary demo-button"
            onClick={() =>
              onLogin({ name: "Alex Morgan", email: "demo@fullstack.dev" })
            }
          >
            <User size={17} /> Continue as demo
          </button>
          <div className="demo-credentials">
            <span className="pill">DEMO ACCOUNT</span>
            <p>
              demo@fullstack.dev <span> / </span> <code>Learn@123</code>
            </p>
          </div>
          <p className="local-account">
            <ShieldCheck size={14} /> Demo workspace · Saved on this browser
          </p>
        </section>
      </main>
      <footer className="login-footer">
        <span>Built from your repository. Made for your progress.</span>
        <span>Fullstack Learning © {new Date().getFullYear()}</span>
      </footer>
    </div>
  );
}

function Sidebar({ route, open, onClose, user, progress, onLogout }) {
  const nav = [
    { path: "/dashboard", label: "Overview", icon: LayoutDashboard },
    { path: "/tracks", label: "Learning tracks", icon: Layers },
    { path: "/code", label: "Code library", icon: Code2 },
    { path: "/interviews", label: "Interview prep", icon: GraduationCap },
    { path: "/practice", label: "Practice lab", icon: Terminal },
    { path: "/saved", label: "Saved resources", icon: Bookmark },
    { path: "/progress", label: "My progress", icon: BarChart3 },
  ];
  const activeTrack = route.startsWith("/track/")
    ? route.split("/")[2]
    : routeItem(route)?.trackId;
  return (
    <>
      <button
        className={`sidebar-backdrop ${open ? "visible" : ""}`}
        aria-label="Close navigation"
        onClick={onClose}
      />
      <aside className={`sidebar ${open ? "open" : ""}`}>
        <div className="sidebar-brand">
          <Brand />
          <IconButton
            icon={X}
            label="Close menu"
            onClick={onClose}
            className="icon-button mobile-close"
          />
        </div>
        <div className="workspace-label">
          <span className="workspace-avatar">FL</span>
          <span>
            My workspace<small>Personal learning</small>
          </span>
          <span className="workspace-status" />
        </div>
        <nav aria-label="Main navigation">
          <span className="nav-label">WORKSPACE</span>
          {nav.map(({ path, label, icon: Icon }) => (
            <a
              key={path}
              href={`#${path}`}
              onClick={onClose}
              className={`nav-item ${route === path ? "active" : ""}`}
            >
              <Icon size={18} />
              <span>{label}</span>
              {path === "/saved" && progress.bookmarks.length > 0 && (
                <span className="nav-count">{progress.bookmarks.length}</span>
              )}
            </a>
          ))}
          <div className="nav-label tracks-nav-label">
            YOUR STACK <span>{tracks.length}</span>
          </div>
          {tracks.map((track) => (
            <a
              key={track.id}
              href={`#/track/${track.id}`}
              onClick={onClose}
              className={`nav-item track-nav ${activeTrack === track.id ? "active" : ""}`}
            >
              <TrackIcon track={track} small />
              <span>{track.name}</span>
              <ChevronRight size={13} />
            </a>
          ))}
        </nav>
        <div className="sidebar-bottom">
          <a
            href="#/settings"
            onClick={onClose}
            className={`nav-item ${route === "/settings" ? "active" : ""}`}
          >
            <Settings size={18} />
            <span>Settings</span>
          </a>
          <div className="sidebar-profile">
            <span className="avatar">
              {user.name
                .split(" ")
                .map((word) => word[0])
                .join("")
                .slice(0, 2)}
            </span>
            <span className="profile-text">
              {user.name}
              <small>Personal account</small>
            </span>
            <IconButton icon={LogOut} label="Sign out" onClick={onLogout} />
          </div>
        </div>
      </aside>
    </>
  );
}

function Header({ route, onMenu, user, search, onSearch }) {
  const searchRef = useRef(null);
  const names = {
    dashboard: "Overview",
    tracks: "Learning tracks",
    code: "Code library",
    interviews: "Interview prep",
    practice: "Practice lab",
    saved: "Saved resources",
    progress: "My progress",
    settings: "Settings",
    search: "Search results",
  };
  const item = routeItem(route);
  const title =
    names[route.split("/")[1]] ||
    findTrack(route.split("/")[2])?.name ||
    findTrack(item?.trackId)?.name ||
    "Workspace";
  useEffect(() => {
    const handler = (event) => {
      if ((event.metaKey || event.ctrlKey) && event.key === "k") {
        event.preventDefault();
        searchRef.current?.focus();
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);
  return (
    <header className="topbar">
      <div className="topbar-breadcrumb">
        <IconButton
          icon={Menu}
          label="Open menu"
          onClick={onMenu}
          className="icon-button mobile-menu"
        />
        <span className="breadcrumb-workspace">Workspace</span>
        <ChevronRight size={14} />
        <span>{title}</span>
      </div>
      <div className="topbar-right">
        <form
          className="global-search"
          onSubmit={(event) => {
            event.preventDefault();
            navigate(`/search?q=${encodeURIComponent(search.trim())}`);
          }}
          role="search"
        >
          <Search size={16} />
          <input
            ref={searchRef}
            aria-label="Search all learning resources"
            placeholder="Search anything..."
            value={search}
            onChange={(event) => onSearch(event.target.value)}
          />
          <kbd>⌘ K</kbd>
        </form>
        <span className="topbar-divider" />
        <span className="avatar small-avatar" title={user.name}>
          {user.name
            .split(" ")
            .map((word) => word[0])
            .join("")
            .slice(0, 2)}
        </span>
      </div>
    </header>
  );
}

function ProgressBar({ value, label }) {
  return (
    <div
      className="progress-track"
      role="progressbar"
      aria-label={label}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={value}
    >
      <span style={{ width: `${value}%` }} />
    </div>
  );
}
function trackProgress(track, progress) {
  return Math.round(
    (track.lessons.filter((lesson) => progress.completed.includes(lesson.id))
      .length /
      Math.max(1, track.lessons.length)) *
      100,
  );
}

function TrackCard({ track, progress }) {
  const completed = track.lessons.filter((lesson) =>
    progress.completed.includes(lesson.id),
  ).length;
  return (
    <a className="track-card" href={`#/track/${track.id}`}>
      <div className="track-card-top">
        <TrackIcon track={track} />
        <span className="track-category">{track.category}</span>
      </div>
      <div className="track-card-heading">
        <h3>{track.name}</h3>
        <ArrowUpRight size={18} />
      </div>
      <p>{track.description}</p>
      <div className="track-tags">
        {track.tags.map((tag) => (
          <span key={tag}>{tag}</span>
        ))}
      </div>
      <div className="track-card-footer">
        <span>
          <BookOpen size={14} /> {track.lessons.length} lessons
        </span>
        <span>
          <Code2 size={14} /> {track.code.length} examples
        </span>
      </div>
      <ProgressBar
        value={trackProgress(track, progress)}
        label={`${track.name} progress`}
      />
      <div className="track-progress-label">
        <span>
          {completed
            ? `${completed} of ${track.lessons.length} completed`
            : "Ready when you are"}
        </span>
        <span>{trackProgress(track, progress)}%</span>
      </div>
    </a>
  );
}

function WeeklyActivity({ progress, compact = false }) {
  const days = Array.from({ length: 7 }, (_, index) => {
    const date = new Date();
    date.setDate(date.getDate() - 6 + index);
    return {
      key: dateKey(date),
      label: date.toLocaleDateString("en", { weekday: "narrow" }),
    };
  });
  const counts = days.map(
    (day) => progress.activity.filter((event) => event.date === day.key).length,
  );
  const max = Math.max(progress.goal, ...counts, 1);
  return (
    <div className={`weekly-activity ${compact ? "compact" : ""}`}>
      <div className="activity-chart">
        {days.map((day, i) => (
          <div
            className={`activity-day ${i === 6 ? "today" : ""}`}
            key={day.key}
          >
            <div
              className="activity-column"
              title={`${day.key}: ${counts[i]} completed`}
            >
              <span
                style={{ height: `${Math.max(5, (counts[i] / max) * 100)}%` }}
              />
            </div>
            <span>{day.label}</span>
          </div>
        ))}
      </div>
      <div className="activity-summary">
        <span>
          <span className="legend-dot" /> Lessons completed
        </span>
        <strong>{counts.reduce((a, b) => a + b, 0)} this week</strong>
      </div>
    </div>
  );
}

function Dashboard({ user, progress }) {
  const [category, setCategory] = useState("All tracks");
  const recent = progress.recent.map(findItem).filter(Boolean);
  const javascriptLessons = findTrack("javascript").lessons;
  const lastOpened = recent[0];
  const lastTrackLessons = lastOpened
    ? findTrack(lastOpened.trackId).lessons
    : [];
  const resumeLesson =
    lastOpened?.kind === "lesson" && progress.completed.includes(lastOpened.id)
      ? lastTrackLessons
          .slice(
            lastTrackLessons.findIndex(
              (lesson) => lesson.id === lastOpened.id,
            ) + 1,
          )
          .find((lesson) => !progress.completed.includes(lesson.id)) ||
        lastTrackLessons.find(
          (lesson) => !progress.completed.includes(lesson.id),
        ) ||
        lastOpened
      : lastOpened;
  const next =
    resumeLesson ||
    javascriptLessons.find(
      (lesson) => lesson.title === "What is JavaScript?",
    ) ||
    javascriptLessons[0];
  const nextTrack = findTrack(next.trackId);
  const todayCount = progress.activity.filter(
    (event) => event.date === dateKey(),
  ).length;
  const started = tracks.filter((track) =>
    track.lessons.some((lesson) => progress.completed.includes(lesson.id)),
  ).length;
  const shownTracks =
    category === "All tracks"
      ? tracks
      : tracks.filter((track) => track.category === category);
  return (
    <>
      <div className="page-heading dashboard-heading">
        <div>
          <div className="eyebrow page-eyebrow">YOUR LEARNING WORKSPACE</div>
          <h1>
            Welcome back, {user.name.split(" ")[0]}
            <span className="heading-dot">.</span>
          </h1>
          <p>A little more curious. A little more capable. Let's keep going.</p>
        </div>
        <span className="date-label">
          <CalendarDays size={15} />{" "}
          {new Date().toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
          })}
        </span>
      </div>
      <div className="dashboard-feature-grid">
        <section className="continue-section">
          <div className="section-eyebrow">
            <span className="status-dot" />{" "}
            {recent.length
              ? "PICK UP WHERE YOU LEFT OFF"
              : "A GOOD PLACE TO START"}
          </div>
          <div className="continue-content">
            <TrackIcon track={nextTrack} />
            <div>
              <span className="continue-track">
                {nextTrack.name} ·{" "}
                {next.kind === "lesson" ? "Fundamentals" : "Code example"}
              </span>
              <h2>{next.title}</h2>
              <span className="continue-meta">
                <Clock3 size={14} /> {readingTime(next.body || next.content)}{" "}
                min read <span>·</span> {nextTrack.category}
              </span>
            </div>
          </div>
          <div className="continue-footer">
            <div>
              <ProgressBar
                value={trackProgress(nextTrack, progress)}
                label="Current track progress"
              />
              <span>
                {trackProgress(nextTrack, progress)}% of track completed
              </span>
            </div>
            <a className="button primary" href={`#${itemRoute(next)}`}>
              {recent.length ? "Continue learning" : "Start learning"}
              <ArrowRight size={16} />
            </a>
          </div>
          <Code2 className="continue-watermark" size={145} strokeWidth={1} />
        </section>
        <section className="daily-goal">
          <div className="daily-goal-top">
            <span className="goal-icon">
              <Flame size={20} />
            </span>
            <span>Small steps. Real progress.</span>
          </div>
          <h2>Your daily goal</h2>
          <div className="goal-count">
            <strong>{todayCount}</strong>
            <span>/ {progress.goal} lessons</span>
            <span className="goal-percentage">
              {Math.min(100, Math.round((todayCount / progress.goal) * 100))}%
            </span>
          </div>
          <ProgressBar
            value={Math.min(100, (todayCount / progress.goal) * 100)}
            label="Daily learning goal"
          />
          <p>
            {todayCount >= progress.goal
              ? "Goal reached. Nicely done!"
              : `${Math.max(0, progress.goal - todayCount)} more ${progress.goal - todayCount === 1 ? "lesson" : "lessons"} to reach today's goal.`}
          </p>
        </section>
      </div>
      <div className="stats-strip">
        {[
          {
            icon: Layers,
            label: "Learning tracks",
            value: tracks.length,
            detail: "One connected stack",
          },
          {
            icon: BookOpen,
            label: "Lessons available",
            value: lessons.length,
            detail: "From your own notes",
          },
          {
            icon: Code2,
            label: "Code examples",
            value: resources.filter((resource) => resource.kind === "code")
              .length,
            detail: "Read. Explore. Practice.",
          },
          {
            icon: CheckCircle2,
            label: "Lessons completed",
            value: progress.completed.length,
            detail: `${started} ${started === 1 ? "track" : "tracks"} in progress`,
          },
        ].map(({ icon: Icon, label, value, detail }) => (
          <div className="stat" key={label}>
            <span className="stat-icon">
              <Icon size={18} />
            </span>
            <div>
              <span className="stat-label">{label}</span>
              <div className="stat-value">
                {value}
                <small>{detail}</small>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="dashboard-main-grid">
        <section className="tracks-section">
          <div className="section-heading">
            <div>
              <h2>
                Explore your stack{" "}
                <span className="count-badge">{tracks.length}</span>
              </h2>
              <p>From the first tag to the final deployment.</p>
            </div>
            <a className="text-link" href="#/tracks">
              View all <ArrowRight size={15} />
            </a>
          </div>
          <div
            className="category-tabs"
            role="tablist"
            aria-label="Track category"
          >
            {categories.map((item) => (
              <button
                key={item}
                role="tab"
                aria-selected={category === item}
                className={category === item ? "selected" : ""}
                onClick={() => setCategory(item)}
              >
                {item}
              </button>
            ))}
          </div>
          <div className="track-grid">
            {shownTracks.slice(0, 6).map((track) => (
              <TrackCard key={track.id} track={track} progress={progress} />
            ))}
          </div>
          {shownTracks.length > 6 && (
            <a className="all-tracks-link" href="#/tracks">
              Explore SQL, Dart, AWS & Nginx <ArrowRight size={15} />
            </a>
          )}
        </section>
        <aside className="dashboard-rail">
          <section className="rail-section">
            <div className="section-heading">
              <h2>This week</h2>
              <span className="muted-icon">
                <BarChart3 size={17} />
              </span>
            </div>
            <WeeklyActivity progress={progress} compact />
          </section>
          <section className="rail-section roadmap">
            <div className="section-heading">
              <h2>Your roadmap</h2>
              <span className="muted-icon">
                <Target size={17} />
              </span>
            </div>
            {[
              {
                title: "Lay the foundation",
                description: "HTML & CSS",
                ids: ["html", "css"],
                icon: Monitor,
              },
              {
                title: "Make it interactive",
                description: "JavaScript & TypeScript",
                ids: ["javascript", "typescript"],
                icon: Code2,
              },
              {
                title: "Build the experience",
                description: "React & Node.js",
                ids: ["react", "node"],
                icon: Layers,
              },
              {
                title: "Take it live",
                description: "SQL, AWS & Nginx",
                ids: ["sql", "aws", "nginx"],
                icon: Cloud,
              },
            ].map((step, i) => (
              <a
                href={`#/track/${step.ids[0]}`}
                className="roadmap-step"
                key={step.title}
              >
                <span
                  className={`roadmap-number ${step.ids.every((id) => trackProgress(findTrack(id), progress) === 100) ? "complete" : ""}`}
                >
                  {step.ids.every(
                    (id) => trackProgress(findTrack(id), progress) === 100,
                  ) ? (
                    <Check size={14} />
                  ) : (
                    i + 1
                  )}
                </span>
                <span>
                  <strong>{step.title}</strong>
                  <small>{step.description}</small>
                </span>
                <ChevronRight size={14} />
              </a>
            ))}
          </section>
          <section className="practice-prompt">
            <span className="practice-icon">
              <GraduationCap size={21} />
            </span>
            <h3>Ready for the next question?</h3>
            <p>A fresh perspective starts with a little practice.</p>
            <a className="text-link" href="#/interviews">
              Open interview prep <ArrowRight size={15} />
            </a>
          </section>
          <div className="repo-note">
            <FolderOpen size={16} />
            <span>
              Rooted in your repository<small>fulstack-learning</small>
            </span>
          </div>
        </aside>
      </div>
    </>
  );
}

function Tracks({ progress }) {
  const [category, setCategory] = useState("All tracks");
  const [query, setQuery] = useState("");
  const shown = tracks.filter(
    (track) =>
      (category === "All tracks" || track.category === category) &&
      `${track.name} ${track.description} ${track.tags.join(" ")}`
        .toLowerCase()
        .includes(query.toLowerCase()),
  );
  return (
    <>
      <PageHeading
        eyebrow="YOUR CURRICULUM"
        title="Learning tracks"
        description="Build your skills, one part of the stack at a time."
      />
      <div className="filter-bar">
        <div
          className="category-tabs"
          role="tablist"
          aria-label="Track category"
        >
          {categories.map((item) => (
            <button
              role="tab"
              aria-selected={category === item}
              className={category === item ? "selected" : ""}
              key={item}
              onClick={() => setCategory(item)}
            >
              {item}
            </button>
          ))}
        </div>
        <SearchInput
          value={query}
          onChange={setQuery}
          placeholder="Find a track..."
        />
      </div>
      {shown.length ? (
        <div className="track-grid all-track-grid">
          {shown.map((track) => (
            <TrackCard track={track} progress={progress} key={track.id} />
          ))}
        </div>
      ) : (
        <Empty
          title="No matching tracks"
          description="Try another name or category."
        />
      )}
    </>
  );
}

function PageHeading({ eyebrow, title, description, children }) {
  return (
    <div className="page-heading">
      <div>
        {eyebrow && <div className="eyebrow page-eyebrow">{eyebrow}</div>}
        <h1>{title}</h1>
        {description && <p>{description}</p>}
      </div>
      {children}
    </div>
  );
}
function SearchInput({ value, onChange, placeholder }) {
  return (
    <div className="local-search">
      <Search size={16} />
      <input
        aria-label={placeholder}
        placeholder={placeholder}
        value={value}
        onChange={(event) => onChange(event.target.value)}
      />
      {value && (
        <IconButton
          icon={X}
          label="Clear search"
          onClick={() => onChange("")}
        />
      )}
    </div>
  );
}
function TrackFilter({ value, onChange }) {
  return (
    <select
      aria-label="Filter by track"
      value={value}
      onChange={(event) => onChange(event.target.value)}
    >
      <option value="all">All technologies</option>
      {tracks.map((track) => (
        <option value={track.id} key={track.id}>
          {track.name}
        </option>
      ))}
    </select>
  );
}

function DifficultyFilter({ value, onChange }) {
  return (
    <select
      aria-label="Filter by difficulty"
      value={value}
      onChange={(event) => onChange(event.target.value)}
    >
      <option value="all">All levels</option>
      {difficulties.map((level) => (
        <option key={level} value={level}>
          {level}
        </option>
      ))}
    </select>
  );
}

function ReferenceLinks({ references }) {
  if (!references?.length) return null;
  return (
    <section className="reference-links">
      <h2>Further reading</h2>
      <ul>
        {references.map((reference) => (
          <li key={reference.url}>
            <a href={reference.url} target="_blank" rel="noreferrer">
              {reference.title}
              <ExternalLink size={13} />
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}

function ExerciseBody({ item }) {
  const [showSolution, setShowSolution] = useState(false);
  return (
    <div className="exercise-body">
      <div className="exercise-meta">
        <span
          className={`difficulty-badge level-${item.difficulty.toLowerCase()}`}
        >
          {item.difficulty}
        </span>
        <span>{item.topic}</span>
      </div>
      <section>
        <h2>The challenge</h2>
        <DocumentBody text={item.body} />
      </section>
      <section>
        <h2>Acceptance checks</h2>
        <ul className="acceptance-checks">
          {item.checks.map((check) => (
            <li key={check}>
              <CheckCircle2 size={15} />
              <span>{check}</span>
            </li>
          ))}
        </ul>
      </section>
      <section>
        <h2>Starting point</h2>
        <CodeBlock text={item.starterCode} />
      </section>
      <details className="exercise-hints">
        <summary>
          <BookOpen size={16} />
          Hints<span>{item.hints.length}</span>
          <ChevronDown size={16} />
        </summary>
        <ul>
          {item.hints.map((hint) => (
            <li key={hint}>{hint}</li>
          ))}
        </ul>
      </details>
      <section className="exercise-solution">
        <button
          className="button secondary"
          aria-expanded={showSolution}
          aria-controls="worked-solution"
          onClick={() => setShowSolution(!showSolution)}
        >
          {showSolution ? <EyeOff size={16} /> : <Eye size={16} />}
          {showSolution ? "Hide solution" : "Show solution"}
        </button>
        {showSolution && (
          <div id="worked-solution">
            <h2>Worked solution</h2>
            <DocumentBody text={item.solution} />
            <CodeBlock text={item.solutionCode} />
          </div>
        )}
      </section>
    </div>
  );
}

function Practice({ progress, onBookmark }) {
  const [query, setQuery] = useState("");
  const [trackId, setTrackId] = useState("all");
  const [difficulty, setDifficulty] = useState("all");
  const [topic, setTopic] = useState("all");
  const [onlyUnread, setOnlyUnread] = useState(false);
  const exercises = lessons.filter((item) => item.type === "practice");
  const topics = [
    ...new Set(
      exercises
        .filter((item) => trackId === "all" || item.trackId === trackId)
        .map((item) => item.topic),
    ),
  ].sort();
  const shown = exercises.filter(
    (item) =>
      (trackId === "all" || item.trackId === trackId) &&
      (difficulty === "all" || item.difficulty === difficulty) &&
      (topic === "all" || item.topic === topic) &&
      (!onlyUnread || !progress.completed.includes(item.id)) &&
      `${item.title} ${item.body} ${item.topic} ${findTrack(item.trackId).name}`
        .toLowerCase()
        .includes(query.toLowerCase()),
  );
  return (
    <>
      <PageHeading
        eyebrow="PUT YOUR KNOWLEDGE TO WORK"
        title="Practice lab"
        description="Small challenges. Real problems. A stronger understanding."
      >
        <span className="interview-total">
          <Terminal size={18} />
          {exercises.length} exercises
        </span>
      </PageHeading>
      <div className="library-toolbar practice-toolbar">
        <SearchInput
          value={query}
          onChange={setQuery}
          placeholder="Search exercises..."
        />
        <TrackFilter
          value={trackId}
          onChange={(value) => {
            setTrackId(value);
            setTopic("all");
          }}
        />
        <DifficultyFilter value={difficulty} onChange={setDifficulty} />
        <select
          aria-label="Filter by topic"
          value={topic}
          onChange={(event) => setTopic(event.target.value)}
        >
          <option value="all">All topics</option>
          {topics.map((value) => (
            <option key={value} value={value}>
              {value}
            </option>
          ))}
        </select>
      </div>
      <div className="practice-summary">
        <label className="checkbox-label">
          <input
            type="checkbox"
            checked={onlyUnread}
            onChange={(event) => setOnlyUnread(event.target.checked)}
          />
          Not completed
        </label>
        <span className="result-count">
          {shown.length} exercises<span className="row-meta-dot">·</span>
          {
            exercises.filter((item) => progress.completed.includes(item.id))
              .length
          }{" "}
          completed
        </span>
      </div>
      {shown.length ? (
        <div className="resource-list">
          {shown.map((item) => (
            <ResourceRow
              key={item.id}
              item={item}
              progress={progress}
              onBookmark={onBookmark}
              showTrack
            />
          ))}
        </div>
      ) : (
        <Empty
          icon={Terminal}
          title="No matching exercises"
          description="No exercises match the current filters."
        />
      )}
    </>
  );
}

function ResourceRow({ item, progress, onBookmark, index, showTrack = false }) {
  const track = findTrack(item.trackId);
  const complete = progress.completed.includes(item.id);
  return (
    <div className="resource-row">
      <a className="resource-row-main" href={`#${itemRoute(item)}`}>
        <span className={`resource-row-icon ${complete ? "completed" : ""}`}>
          {complete ? (
            <CheckCircle2 size={20} />
          ) : item.kind === "lesson" ? (
            index !== undefined ? (
              String(index + 1).padStart(2, "0")
            ) : (
              <BookOpen size={19} />
            )
          ) : (
            <Code2 size={19} />
          )}
        </span>
        <span className="resource-row-text">
          <strong>{item.title}</strong>
          <span>
            {showTrack && <b style={{ color: track.color }}>{track.name} · </b>}
            {item.type === "practice"
              ? `${item.difficulty} · ${item.topic}`
              : item.kind === "lesson"
                ? `${readingTime(item.body)} min read`
                : item.extension.toUpperCase()}
            <span className="row-meta-dot">·</span>
            <span className="resource-source">{item.source}</span>
          </span>
        </span>
      </a>
      <span className="row-kind">
        {complete
          ? "Completed"
          : item.type === "practice"
            ? "Exercise"
            : item.kind === "lesson"
              ? "Lesson"
              : "Code"}
      </span>
      <IconButton
        icon={Bookmark}
        label={
          progress.bookmarks.includes(item.id)
            ? "Remove bookmark"
            : "Bookmark resource"
        }
        active={progress.bookmarks.includes(item.id)}
        onClick={() => onBookmark(item.id)}
      />
      <a
        className="row-arrow"
        href={`#${itemRoute(item)}`}
        aria-label={`Open ${item.title}`}
      >
        <ChevronRight size={18} />
      </a>
    </div>
  );
}

function TrackDetail({ track, progress, onBookmark }) {
  const [tab, setTab] = useState("lessons");
  const [query, setQuery] = useState("");
  const trackLessons = track.lessons.filter((item) => item.type !== "practice");
  const exercises = track.lessons.filter((item) => item.type === "practice");
  const tabItems =
    tab === "lessons"
      ? trackLessons
      : tab === "practice"
        ? exercises
        : tab === "code"
          ? track.code
          : track.projects;
  const shown = tabItems.filter((item) =>
    `${item.title} ${item.body || item.content}`
      .toLowerCase()
      .includes(query.toLowerCase()),
  );
  const next =
    track.lessons.find((lesson) => !progress.completed.includes(lesson.id)) ||
    track.lessons[0];
  return (
    <>
      <a className="back-link" href="#/tracks">
        <ArrowLeft size={15} /> All learning tracks
      </a>
      <section className="track-detail-header">
        <TrackIcon track={track} />
        <div className="track-detail-title">
          <div className="eyebrow page-eyebrow">
            {track.category.toUpperCase()} TRACK
          </div>
          <h1>{track.name}</h1>
          <p>{track.description}</p>
          <div className="track-detail-meta">
            <span>
              <BookOpen size={15} />
              {track.lessons.length} lessons
            </span>
            <span>
              <Code2 size={15} />
              {track.code.length} examples
            </span>
            <span>
              <FolderOpen size={15} />
              {track.resources.length} source files
            </span>
          </div>
        </div>
        {next && (
          <a className="button primary" href={`#${itemRoute(next)}`}>
            {trackProgress(track, progress) ? "Continue track" : "Start track"}
            <ArrowRight size={16} />
          </a>
        )}
      </section>
      <div className="track-detail-progress">
        <span>Your progress</span>
        <ProgressBar
          value={trackProgress(track, progress)}
          label="Track completion"
        />
        <strong>{trackProgress(track, progress)}%</strong>
      </div>
      <div className="content-toolbar">
        <div className="view-tabs" role="tablist" aria-label="Track content">
          {[
            {
              id: "lessons",
              label: "Lessons",
              icon: BookOpen,
              count: trackLessons.length,
            },
            {
              id: "practice",
              label: "Practice",
              icon: Terminal,
              count: exercises.length,
            },
            {
              id: "code",
              label: "Code examples",
              icon: Code2,
              count: track.code.length,
            },
            {
              id: "projects",
              label: "Projects",
              icon: FolderOpen,
              count: track.projects.length,
            },
          ].map(({ id, label, icon: Icon, count }) => (
            <button
              key={id}
              role="tab"
              aria-selected={tab === id}
              className={tab === id ? "selected" : ""}
              onClick={() => {
                setTab(id);
                setQuery("");
              }}
            >
              <Icon size={16} />
              {label}
              <span>{count}</span>
            </button>
          ))}
        </div>
        <SearchInput
          value={query}
          onChange={setQuery}
          placeholder="Search this track..."
        />
      </div>
      {tab === "projects" && shown.length ? (
        <div className="project-grid">
          {shown.map((item) => (
            <ProjectCard key={item.id} item={item} />
          ))}
        </div>
      ) : shown.length ? (
        <div className="resource-list">
          {shown.map((item, index) => (
            <ResourceRow
              key={item.id}
              item={item}
              index={tab === "lessons" ? index : undefined}
              progress={progress}
              onBookmark={onBookmark}
            />
          ))}
        </div>
      ) : (
        <Empty
          icon={tab === "projects" ? FolderOpen : Search}
          title={
            query
              ? "No matching resources"
              : `No ${tab === "projects" ? "projects" : tab === "practice" ? "exercises" : "code examples"} in this track yet`
          }
          description={
            query
              ? "Try a different search term."
              : "The available notes are in the Lessons tab."
          }
        />
      )}
    </>
  );
}

function ProjectCard({ item }) {
  return (
    <a href={`#${itemRoute(item)}`} className="project-card">
      <div className="project-preview">
        <iframe
          src={previewUrl(item.source)}
          title={`${item.title} preview`}
          sandbox=""
          loading="lazy"
          tabIndex={-1}
        />
        <span className="project-open">
          <ArrowUpRight size={20} />
        </span>
      </div>
      <div className="project-card-caption">
        <span>
          <strong>{item.title}</strong>
          <small>{item.source}</small>
        </span>
        <Code2 size={18} />
      </div>
    </a>
  );
}

function CodeBlock({ text }) {
  return (
    <div className="code-block">
      <div className="code-lines" aria-hidden="true">
        {text.split("\n").map((_, index) => (
          <span key={index}>{index + 1}</span>
        ))}
      </div>
      <pre>
        <code>{text}</code>
      </pre>
    </div>
  );
}

function DocumentBody({ text }) {
  // The original notes are plain text, so preserve their formatting and never interpret HTML.
  const blocks = text.split(/\n\s*\n/).filter((block) => block.trim());
  return (
    <div className="document-body">
      {blocks.map((block, index) => {
        const isCode =
          /(^|\n)\s*(?:import |export |const |let |var |function |async function |class |void main|SELECT |CREATE |INSERT |UPDATE |server\s*\{|<\/?[a-zA-Z]|[a-z.#][\w.# -]*\s*\{)|=>|console\.(log|warn)|print\(/.test(
            block,
          );
        return isCode ? (
          <CodeBlock key={index} text={block} />
        ) : (
          <p key={index}>{block}</p>
        );
      })}
    </div>
  );
}

function Reader({ item, progress, onBookmark, onComplete, onVisit, notify }) {
  const track = findTrack(item.trackId);
  const [tab, setTab] = useState("content");
  const [copied, setCopied] = useState(false);
  const isCode = item.kind !== "lesson" || (track.id === "nginx" && !item.type);
  const canPreview =
    item.extension === "html" && /^(html|css)\//.test(item.source);
  const source = resources.find((resource) => resource.source === item.source);
  const index = track.lessons.findIndex((lesson) => lesson.id === item.id);
  const previous = track.lessons[index - 1];
  const next = track.lessons[index + 1];
  useEffect(() => {
    onVisit(item.id);
  }, [item.id]);
  async function copy() {
    try {
      await navigator.clipboard.writeText(
        tab === "source" ? source.content : item.body || item.content,
      );
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      notify("Clipboard unavailable. Use Download source instead.");
    }
  }
  function download() {
    const url = URL.createObjectURL(
      new Blob([source.content], { type: "text/plain;charset=utf-8" }),
    );
    const link = document.createElement("a");
    link.href = url;
    link.download = item.source.split("/").at(-1);
    link.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }
  return (
    <>
      <a className="back-link" href={`#/track/${track.id}`}>
        <ArrowLeft size={15} />
        {track.name} track
      </a>
      <div className="reader-layout">
        <article className="reader">
          <div className="reader-heading">
            <div className="reader-label">
              <TrackIcon track={track} small />
              <span>{track.name}</span>
              <ChevronRight size={13} />
              <span>
                {item.type === "practice"
                  ? "Practical exercise"
                  : isCode
                    ? "Code example"
                    : "Lesson"}
              </span>
            </div>
            <h1>{item.title}</h1>
            <div className="reader-meta">
              <span>
                <Clock3 size={14} />
                {readingTime(item.body || item.content)} min read
              </span>
              <span>
                <FileText size={14} />
                {item.source}
                {item.line ? `:${item.line}` : ""}
              </span>
            </div>
          </div>
          <div className="reader-toolbar">
            <div className="view-tabs" role="tablist" aria-label="Reader view">
              <button
                role="tab"
                aria-selected={tab === "content"}
                className={tab === "content" ? "selected" : ""}
                onClick={() => setTab("content")}
              >
                {isCode ? <Code2 size={16} /> : <BookOpen size={16} />}
                {item.type === "practice"
                  ? "Exercise"
                  : isCode
                    ? "Code"
                    : "Lesson"}
              </button>
              <button
                role="tab"
                aria-selected={tab === "source"}
                className={tab === "source" ? "selected" : ""}
                onClick={() => setTab("source")}
              >
                <FileText size={16} />
                Source file
              </button>
              {canPreview && (
                <button
                  role="tab"
                  aria-selected={tab === "preview"}
                  className={tab === "preview" ? "selected" : ""}
                  onClick={() => setTab("preview")}
                >
                  <Monitor size={16} />
                  Preview
                </button>
              )}
            </div>
            <div className="reader-actions">
              <IconButton
                icon={copied ? Check : Copy}
                label={copied ? "Copied" : "Copy content"}
                onClick={copy}
              />
              <IconButton
                icon={Download}
                label="Download source"
                onClick={download}
              />
              <IconButton
                icon={Bookmark}
                label={
                  progress.bookmarks.includes(item.id)
                    ? "Remove bookmark"
                    : "Bookmark resource"
                }
                active={progress.bookmarks.includes(item.id)}
                onClick={() => onBookmark(item.id)}
              />
            </div>
          </div>
          {tab === "preview" ? (
            <div className="full-preview">
              <div className="preview-address">
                <Monitor size={14} />
                <span>{item.source}</span>
                <a
                  href={previewUrl(item.source)}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Open preview in new tab"
                >
                  <ExternalLink size={15} />
                </a>
              </div>
              <iframe
                src={previewUrl(item.source)}
                title="Project live preview"
                sandbox=""
              />
            </div>
          ) : tab === "source" ? (
            <CodeBlock text={source.content} />
          ) : item.type === "practice" ? (
            <ExerciseBody item={item} />
          ) : isCode ? (
            <CodeBlock text={item.body || item.content} />
          ) : (
            <>
              <DocumentBody text={item.body} />
              {item.code && <CodeBlock text={item.code} />}
            </>
          )}
          {tab === "content" && <ReferenceLinks references={item.references} />}
          {item.kind === "lesson" && (
            <div className="lesson-completion">
              <span>
                <CheckCircle2 size={20} />
                <span>
                  {progress.completed.includes(item.id)
                    ? "Another step forward."
                    : "Finished this lesson?"}
                </span>
              </span>
              <button
                className={`button ${progress.completed.includes(item.id) ? "secondary completed-button" : "primary"}`}
                onClick={() => onComplete(item.id)}
              >
                <Check size={16} />
                {progress.completed.includes(item.id)
                  ? "Completed"
                  : "Mark as complete"}
              </button>
            </div>
          )}
          {(previous || next) && (
            <div className="lesson-navigation">
              {previous ? (
                <a href={`#${itemRoute(previous)}`}>
                  <ArrowLeft size={17} />
                  <span>
                    <small>PREVIOUS LESSON</small>
                    {previous.title}
                  </span>
                </a>
              ) : (
                <span />
              )}
              {next && (
                <a href={`#${itemRoute(next)}`}>
                  <span>
                    <small>NEXT LESSON</small>
                    {next.title}
                  </span>
                  <ArrowRight size={17} />
                </a>
              )}
            </div>
          )}
        </article>
        <aside className="reader-sidebar">
          <div className="reader-sidebar-heading">
            <TrackIcon track={track} small />
            <strong>{track.name} track</strong>
            <span>{trackProgress(track, progress)}%</span>
          </div>
          <ProgressBar
            value={trackProgress(track, progress)}
            label="Current track completion"
          />
          <div className="reader-outline">
            {track.lessons.map((lesson, i) => (
              <a
                className={lesson.id === item.id ? "current" : ""}
                href={`#${itemRoute(lesson)}`}
                key={lesson.id}
              >
                <span
                  className={
                    progress.completed.includes(lesson.id)
                      ? "outline-complete"
                      : ""
                  }
                >
                  {progress.completed.includes(lesson.id) ? (
                    <CheckCircle2 size={15} />
                  ) : (
                    String(i + 1).padStart(2, "0")
                  )}
                </span>
                <span>{lesson.title}</span>
              </a>
            ))}
          </div>
          <a href={`#/track/${track.id}`} className="text-link">
            All track resources <ArrowRight size={14} />
          </a>
        </aside>
      </div>
    </>
  );
}

function ResourceLibrary({
  kind,
  progress,
  onBookmark,
  query: initialQuery = "",
}) {
  const [query, setQuery] = useState(initialQuery);
  const [trackId, setTrackId] = useState("all");
  useEffect(() => {
    setQuery(initialQuery);
  }, [initialQuery]);
  const sourceItems =
    kind === "saved"
      ? progress.bookmarks.map(findItem).filter(Boolean)
      : kind === "search"
        ? items
        : resources.filter((resource) => resource.kind === "code");
  const shown = sourceItems.filter(
    (item) =>
      (trackId === "all" || item.trackId === trackId) &&
      `${item.title} ${item.source} ${item.body || item.content} ${findTrack(item.trackId).name}`
        .toLowerCase()
        .includes(query.toLowerCase()),
  );
  const title =
    kind === "saved"
      ? "Saved resources"
      : kind === "search"
        ? "Search your workspace"
        : "Code library";
  return (
    <>
      <PageHeading
        eyebrow={
          kind === "saved"
            ? "YOUR PERSONAL COLLECTION"
            : "STRAIGHT FROM THE REPOSITORY"
        }
        title={title}
        description={
          kind === "saved"
            ? "The notes and examples you want to come back to."
            : kind === "search"
              ? "Notes, questions, and code across your whole stack."
              : "Real examples. Original source. Something to learn from every file."
        }
      />
      <div className="library-toolbar">
        <SearchInput
          value={query}
          onChange={setQuery}
          placeholder={
            kind === "code" ? "Search code examples..." : "Search resources..."
          }
        />
        <TrackFilter value={trackId} onChange={setTrackId} />
        <span className="result-count">
          {shown.length} {shown.length === 1 ? "resource" : "resources"}
        </span>
      </div>
      {shown.length ? (
        <div className="resource-list">
          {shown.map((item) => (
            <ResourceRow
              item={item}
              key={item.id}
              progress={progress}
              onBookmark={onBookmark}
              showTrack
            />
          ))}
        </div>
      ) : (
        <Empty
          icon={kind === "saved" ? Bookmark : Search}
          title={
            kind === "saved" && !sourceItems.length
              ? "Your collection starts here"
              : "No matching resources"
          }
          description={
            kind === "saved" && !sourceItems.length
              ? "Bookmark a lesson or code example to keep it here."
              : "Try a different search or technology."
          }
          action={
            kind === "saved" && !sourceItems.length ? (
              <a className="button primary" href="#/tracks">
                Explore tracks
                <ArrowRight size={16} />
              </a>
            ) : null
          }
        />
      )}
    </>
  );
}

function Interviews({ progress, onBookmark, onComplete }) {
  const [query, setQuery] = useState("");
  const [trackId, setTrackId] = useState("all");
  const [difficulty, setDifficulty] = useState("all");
  const [open, setOpen] = useState(null);
  const [onlyUnread, setOnlyUnread] = useState(false);
  const questions = lessons.filter(
    (lesson) =>
      lesson.type !== "practice" &&
      (lesson.type === "question" ||
        /interview|qus|ques|quz|ccss|sql\.txt|aws\.txt/.test(lesson.source)),
  );
  const shown = questions.filter(
    (item) =>
      (trackId === "all" || item.trackId === trackId) &&
      (difficulty === "all" || item.difficulty === difficulty) &&
      (!onlyUnread || !progress.completed.includes(item.id)) &&
      `${item.title} ${item.body} ${item.topic || ""}`
        .toLowerCase()
        .includes(query.toLowerCase()),
  );
  return (
    <>
      <PageHeading
        eyebrow="A LITTLE PRACTICE GOES A LONG WAY"
        title="Interview prep"
        description="Revisit the fundamentals. Find your words. Build your confidence."
      >
        <span className="interview-total">
          <GraduationCap size={18} />
          {questions.length} questions
        </span>
      </PageHeading>
      <div className="library-toolbar">
        <SearchInput
          value={query}
          onChange={setQuery}
          placeholder="Search questions..."
        />
        <TrackFilter value={trackId} onChange={setTrackId} />
        <DifficultyFilter value={difficulty} onChange={setDifficulty} />
        <label className="checkbox-label">
          <input
            type="checkbox"
            checked={onlyUnread}
            onChange={(event) => setOnlyUnread(event.target.checked)}
          />
          Not completed
        </label>
        <span className="result-count">{shown.length} questions</span>
      </div>
      <div className="interview-list">
        {shown.map((item, index) => (
          <section
            className={`interview-question ${open === item.id ? "expanded" : ""}`}
            key={item.id}
          >
            <div className="question-top">
              <button
                className="question-toggle"
                onClick={() => setOpen(open === item.id ? null : item.id)}
                aria-expanded={open === item.id}
              >
                <span className="question-number">
                  {progress.completed.includes(item.id) ? (
                    <CheckCircle2 size={19} />
                  ) : (
                    String(index + 1).padStart(2, "0")
                  )}
                </span>
                <span>
                  <span
                    className="question-track"
                    style={{ color: findTrack(item.trackId).color }}
                  >
                    {findTrack(item.trackId).name}
                    {item.difficulty && ` · ${item.difficulty} · ${item.topic}`}
                  </span>
                  <strong>{item.title}</strong>
                </span>
                <ChevronDown size={18} />
              </button>
              <IconButton
                icon={Bookmark}
                label={
                  progress.bookmarks.includes(item.id)
                    ? "Remove bookmark"
                    : "Bookmark question"
                }
                active={progress.bookmarks.includes(item.id)}
                onClick={() => onBookmark(item.id)}
              />
            </div>
            {open === item.id && (
              <div className="question-answer">
                <DocumentBody text={item.body} />
                {item.code && <CodeBlock text={item.code} />}
                <ReferenceLinks references={item.references} />
                <div className="question-footer">
                  <a className="text-link" href={`#${itemRoute(item)}`}>
                    Open lesson
                    <ArrowRight size={14} />
                  </a>
                  <button
                    className="button secondary"
                    onClick={() => onComplete(item.id)}
                  >
                    <Check size={15} />
                    {progress.completed.includes(item.id)
                      ? "Completed"
                      : "Mark as complete"}
                  </button>
                </div>
              </div>
            )}
          </section>
        ))}
      </div>
      {!shown.length && (
        <Empty
          title="No matching questions"
          description="Try another search or turn off the completion filter."
        />
      )}
    </>
  );
}

function Progress({ progress, onBookmark }) {
  const total = lessons.length;
  const percent = Math.round((progress.completed.length / total) * 100);
  const recent = progress.recent.map(findItem).filter(Boolean).slice(0, 5);
  return (
    <>
      <PageHeading
        eyebrow="EVERY STEP COUNTS"
        title="My progress"
        description="A clear view of how far you've come."
      />
      <div className="progress-overview">
        <section>
          <span className="section-eyebrow">OVERALL COMPLETION</span>
          <div className="overall-count">
            {percent}
            <span>%</span>
          </div>
          <ProgressBar value={percent} label="Overall learning progress" />
          <p>
            {progress.completed.length} of {total} lessons completed
          </p>
        </section>
        <section>
          <div className="section-heading">
            <h2>Your learning activity</h2>
            <span className="pill">LAST 7 DAYS</span>
          </div>
          <WeeklyActivity progress={progress} />
        </section>
      </div>
      <div className="section-heading progress-section-heading">
        <h2>Across your stack</h2>
        <span className="result-count">{tracks.length} tracks</span>
      </div>
      <div className="progress-table">
        <div className="progress-table-header">
          <span>LEARNING TRACK</span>
          <span>COMPLETED</span>
          <span>PROGRESS</span>
          <span>STATUS</span>
        </div>
        {tracks.map((track) => {
          const count = track.lessons.filter((lesson) =>
            progress.completed.includes(lesson.id),
          ).length;
          const percent = trackProgress(track, progress);
          return (
            <a
              className="progress-table-row"
              href={`#/track/${track.id}`}
              key={track.id}
            >
              <span>
                <TrackIcon track={track} small />
                <strong>{track.name}</strong>
              </span>
              <span>
                {count} / {track.lessons.length}
              </span>
              <span>
                <ProgressBar
                  value={percent}
                  label={`${track.name} completion`}
                />
                <small>{percent}%</small>
              </span>
              <span
                className={`status-label ${percent === 100 ? "done" : count ? "started" : ""}`}
              >
                {percent === 100
                  ? "Completed"
                  : count
                    ? "In progress"
                    : "Not started"}
              </span>
            </a>
          );
        })}
      </div>
      <div className="section-heading progress-section-heading">
        <h2>Recently opened</h2>
      </div>
      {recent.length ? (
        <div className="resource-list">
          {recent.map((item) => (
            <ResourceRow
              key={item.id}
              item={item}
              progress={progress}
              onBookmark={onBookmark}
              showTrack
            />
          ))}
        </div>
      ) : (
        <Empty
          icon={BookOpen}
          title="Your next chapter awaits"
          description="Open a lesson to begin your learning history."
        />
      )}
    </>
  );
}

function SettingsPage({ user, progress, onUser, onGoal, onReset, notify }) {
  const [name, setName] = useState(user.name);
  const [goal, setGoal] = useState(progress.goal);
  const [confirm, setConfirm] = useState(false);
  return (
    <>
      <PageHeading
        eyebrow="MAKE IT YOURS"
        title="Workspace settings"
        description="Your profile and your learning rhythm."
      />
      <div className="settings-layout">
        <section className="settings-section">
          <div>
            <h2>Profile</h2>
            <p>The name you'll see around your workspace.</p>
          </div>
          <form
            onSubmit={(event) => {
              event.preventDefault();
              if (!name.trim()) return;
              onUser({ ...user, name: name.trim() });
              notify("Profile updated.");
            }}
          >
            <label htmlFor="profile-name">Display name</label>
            <input
              id="profile-name"
              value={name}
              onChange={(event) => setName(event.target.value)}
              required
              maxLength={50}
            />
            <label htmlFor="profile-email">Email address</label>
            <input id="profile-email" value={user.email} disabled />
            <button className="button primary" type="submit">
              <Check size={16} />
              Save profile
            </button>
          </form>
        </section>
        <section className="settings-section">
          <div>
            <h2>Daily learning goal</h2>
            <p>A pace that works for you.</p>
          </div>
          <form
            onSubmit={(event) => {
              event.preventDefault();
              onGoal(Number(goal));
              notify("Daily goal updated.");
            }}
          >
            <label htmlFor="daily-goal">Lessons per day</label>
            <input
              id="daily-goal"
              type="number"
              min="1"
              max="20"
              value={goal}
              onChange={(event) => setGoal(event.target.value)}
              required
            />
            <button className="button primary" type="submit">
              <Target size={16} />
              Update goal
            </button>
          </form>
        </section>
        <section className="settings-section reset-section">
          <div>
            <h2>Learning data</h2>
            <p>Progress, saved resources, and history on this browser.</p>
          </div>
          <button
            className="button danger-outline"
            onClick={() => setConfirm(true)}
          >
            Reset learning data
          </button>
        </section>
      </div>
      {confirm && (
        <div className="modal-backdrop" onClick={() => setConfirm(false)}>
          <section
            className="modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="reset-title"
            onClick={(event) => event.stopPropagation()}
          >
            <span className="modal-icon">
              <BarChart3 size={24} />
            </span>
            <h2 id="reset-title">Start fresh?</h2>
            <p>
              This clears your completed lessons, bookmarks, and reading history
              from this browser.
            </p>
            <div className="modal-actions">
              <button
                className="button secondary"
                autoFocus
                onClick={() => setConfirm(false)}
              >
                Keep my progress
              </button>
              <button
                className="button danger"
                onClick={() => {
                  onReset();
                  setConfirm(false);
                  notify("Learning data reset.");
                }}
              >
                Reset learning data
              </button>
            </div>
          </section>
        </div>
      )}
    </>
  );
}

export default function App() {
  const [user, setUser] = useState(initialUser);
  const [progress, setProgress] = useState(initialProgress);
  const [hash, setHash] = useState(
    window.location.hash.slice(1) || "/dashboard",
  );
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [toast, setToast] = useState("");
  const toastTimer = useRef(null);
  const [route, queryString = ""] = hash.split("?");
  useEffect(() => {
    const handler = () => {
      setHash(window.location.hash.slice(1) || "/dashboard");
      setSidebarOpen(false);
      window.scrollTo(0, 0);
    };
    window.addEventListener("hashchange", handler);
    return () => window.removeEventListener("hashchange", handler);
  }, []);
  useEffect(() => {
    try {
      localStorage.setItem("fullstack.progress", JSON.stringify(progress));
    } catch {
      notify(
        "Browser storage is unavailable. Progress is saved for this session only.",
      );
    }
  }, [progress]);
  useEffect(() => {
    try {
      if (user) localStorage.setItem("fullstack.user", JSON.stringify(user));
      else localStorage.removeItem("fullstack.user");
    } catch {}
  }, [user]);
  useEffect(() => {
    const handler = (event) => {
      if (event.key === "Escape") {
        setSidebarOpen(false);
        document.querySelector(".modal-backdrop")?.click();
      }
    };
    window.addEventListener("keydown", handler);
    return () => {
      window.removeEventListener("keydown", handler);
      clearTimeout(toastTimer.current);
    };
  }, []);
  function notify(message) {
    setToast(message);
    clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToast(""), 3500);
  }
  function bookmark(id) {
    setProgress((current) => ({
      ...current,
      bookmarks: current.bookmarks.includes(id)
        ? current.bookmarks.filter((value) => value !== id)
        : [...current.bookmarks, id],
    }));
  }
  function complete(id) {
    setProgress((current) => {
      const exists = current.completed.includes(id);
      return {
        ...current,
        completed: exists
          ? current.completed.filter((value) => value !== id)
          : [...current.completed, id],
        activity: exists
          ? current.activity.filter((event) => event.id !== id)
          : [...current.activity, { id, date: dateKey() }],
      };
    });
  }
  function visit(id) {
    setProgress((current) =>
      current.recent[0] === id
        ? current
        : {
            ...current,
            recent: [
              id,
              ...current.recent.filter((value) => value !== id),
            ].slice(0, 20),
          },
    );
  }
  if (!user)
    return (
      <Login
        onLogin={(value) => {
          setUser(value);
          if (!window.location.hash || route === "/login")
            navigate("/dashboard");
        }}
      />
    );
  let content;
  const shared = { progress, onBookmark: bookmark };
  if (route === "/dashboard" || route === "/")
    content = <Dashboard user={user} progress={progress} />;
  else if (route === "/tracks") content = <Tracks progress={progress} />;
  else if (route.startsWith("/track/") && findTrack(route.split("/")[2]))
    content = (
      <TrackDetail
        key={route}
        track={findTrack(route.split("/")[2])}
        {...shared}
      />
    );
  else if (["/code", "/saved", "/search"].includes(route))
    content = (
      <ResourceLibrary
        key={route}
        kind={route.slice(1)}
        query={new URLSearchParams(queryString).get("q") || ""}
        {...shared}
      />
    );
  else if (route === "/interviews")
    content = <Interviews {...shared} onComplete={complete} />;
  else if (route === "/practice") content = <Practice {...shared} />;
  else if (route === "/progress") content = <Progress {...shared} />;
  else if (route === "/settings")
    content = (
      <SettingsPage
        user={user}
        progress={progress}
        onUser={setUser}
        onGoal={(goal) => setProgress((current) => ({ ...current, goal }))}
        onReset={() => setProgress({ ...defaultProgress, goal: progress.goal })}
        notify={notify}
      />
    );
  else {
    let item;
    try {
      item = findItem(decodeURIComponent(route.split("/").slice(2).join("/")));
    } catch {}
    content = item ? (
      <Reader
        key={item.id}
        item={item}
        {...shared}
        onComplete={complete}
        onVisit={visit}
        notify={notify}
      />
    ) : (
      <Empty
        icon={FolderOpen}
        title="This page isn't in your workspace"
        description="Head back to your overview to find your next lesson."
        action={
          <a className="button primary" href="#/dashboard">
            Back to overview
            <ArrowRight size={16} />
          </a>
        }
      />
    );
  }
  return (
    <div className="app">
      <Sidebar
        route={route}
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        user={user}
        progress={progress}
        onLogout={() => {
          setUser(null);
          navigate("/dashboard");
        }}
      />
      <div className="app-body">
        <Header
          route={route}
          onMenu={() => setSidebarOpen(true)}
          user={user}
          search={search}
          onSearch={setSearch}
        />
        <main className="main-content" key={route.split("/")[1]}>
          {content}
        </main>
        <footer className="app-footer">
          <span>Keep your curiosity. Build your stack.</span>
          <span>
            Fullstack Learning <span className="footer-dot">·</span> Personal
            workspace
          </span>
        </footer>
      </div>
      {toast && (
        <div className="toast" role="status">
          <CheckCircle2 size={18} />
          {toast}
          <IconButton
            icon={X}
            label="Dismiss notification"
            onClick={() => setToast("")}
          />
        </div>
      )}
    </div>
  );
}
