import { useState } from "react";
import "./App.css";
export default function App() {
  const [username, setUsername] = useState("");
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const u = username.trim();

    if (!u) {
      setUser(null);
      setError("Please enter a GitHub username.");
      return;
    }

    setError("");

    try {
      const res = await fetch(`https://api.github.com/users/${u}`);
      if (!res.ok) {
        setUser(null);
        setError("User not found.");
        return;
      }
      const data = await res.json();
      setUser(data);
    } catch (err) {
      setUser(null);
      setError("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="page">
      <div className="card">
        <h1>GitHub User Finder</h1>
        <p className="subtitle">Search a GitHub username to see profile details.</p>

        <form onSubmit={handleSubmit}>
          <input
            name="username"
            type="text"
            placeholder="e.g. torvalds, gaearon, octocat"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <button type="submit">Search</button>
        </form>

        {error ? (
          <div className="error">{error}</div>
        ) : user ? (
          <div className="profile">
            <img className="avatar" src={user.avatar_url} alt={user.login} />
            <div className="info">
              <h2>
                {user.name || user.login} <span className="login">@{user.login}</span>
              </h2>
              <div className="stats">
                <span>{user.public_repos} Repos</span>
                <span>{user.followers} Followers</span>
                <span>{user.following} Following</span>
              </div>
              <div className="meta">
                {user.location && <span>{user.location}</span>}
                {user.company && <span>{user.company}</span>}
                {user.blog && (
                  <a href={user.blog} target="_blank" rel="noreferrer">
                    {user.blog}
                  </a>
                )}
                <a href={user.html_url} target="_blank" rel="noreferrer">
                  View on GitHub
                </a>
              </div>
            </div>
          </div>
        ) : (
          <p className="hint">No user yet. Try searching for "octocat".</p>
        )}
      </div>
    </div>
  );
}