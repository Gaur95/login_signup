import { useState } from "react";
import Dashboard from "./Dashboard";
import Login from "./Login";
import SignUp from "./SignUp";

function App() {
  const [page, setPage] = useState("login");
  const [user, setUser] = useState(null);

  const handleLoginSuccess = (loggedInUser) => {
    setUser(loggedInUser);
    setPage("dashboard");
  };

  const handleLogout = () => {
    setUser(null);
    setPage("login");
  };

  if (user && page === "dashboard") {
    return <Dashboard user={user} onLogout={handleLogout} />;
  }

  if (page === "signup") {
    return <SignUp onLogin={() => setPage("login")} />;
  }

  return (
    <Login
      onSignUp={() => setPage("signup")}
      onLoginSuccess={handleLoginSuccess}
    />
  );
}

export default App;
