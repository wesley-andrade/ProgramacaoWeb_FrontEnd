import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useLocation,
} from "react-router-dom";
import "./App.css";

const Home = () => {
  const users = [
    { id: 1, name: "Primeiro Usuario" },
    { id: 2, name: "Segundo Usuario" },
    { id: 3, name: "Terceiro Usuario" },
  ];

  return (
    <div className="container">
      <h1>Home</h1>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.name} (ID: {user.id}) -{" "}
            <Link to={`/user?id=${user.id}`}>View Usuario</Link>
          </li>
        ))}
      </ul>
      <Link to="/about" className="link-button">
        About
      </Link>
    </div>
  );
};

const About = () => (
  <div className="container">
    <h1>About</h1>
    <Link to="/" className="link-button">
      Home
    </Link>
  </div>
);

const User = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const userId = queryParams.get("id");

  return (
    <div className="container">
      <h1>User</h1>
      <p>ID Usuario: {userId}</p>
      <Link to="/" className="link-button">
        Home
      </Link>
    </div>
  );
};

const NotFound = () => (
  <div className="container error-page">
    <h1>404 - Not Found</h1>
    <Link to="/" className="link-button">
      Home
    </Link>
  </div>
);

const App = () => (
  <Router>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/user" element={<User />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  </Router>
);

export default App;
