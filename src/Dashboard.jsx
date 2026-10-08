import "./Dashboard.css";

const Dashboard = ({ user, onLogout }) => {
  return (
    <div className="dashboard-page">
      <header className="dashboard-header">
        <div className="dashboard-brand">
          <div className="brand-logo" aria-hidden="true" />
          <span>devops</span>
        </div>
        <button type="button" className="logout-btn" onClick={onLogout}>
          Logout
        </button>
      </header>

      <main className="dashboard-main">
        <section className="welcome-card">
          <p className="welcome-label">Welcome back</p>
          <h1>{user.name}</h1>
          <p className="welcome-subtitle">You are logged in successfully.</p>
        </section>

        <section className="stats-grid">
          <article className="stat-card">
            <span className="stat-label">Email</span>
            <strong>{user.email}</strong>
          </article>
          <article className="stat-card">
            <span className="stat-label">City</span>
            <strong>{user.city}</strong>
          </article>
          <article className="stat-card">
            <span className="stat-label">User ID</span>
            <strong>#{user.id}</strong>
          </article>
        </section>

        <section className="dashboard-panel">
          <h2>Sample Dashboard</h2>
          <p>
            This is a demo dashboard shown after login. You can add projects, analytics,
            and user settings here later.
          </p>
          <div className="panel-actions">
            <button type="button" className="panel-btn primary">
              Create Project
            </button>
            <button type="button" className="panel-btn">
              View Reports
            </button>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Dashboard;
