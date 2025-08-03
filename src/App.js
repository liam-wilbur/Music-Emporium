import "./App.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import PostBoard from "./pages/PostBoard";
import Home from "./pages/Home";
import CreatePost from "./pages/CreatePost";
import { useState } from "react";
import {Helmet} from "react-helmet";
import { signOut } from "firebase/auth";
import { auth } from "./firebase-config";


function App() {
  const [isAuth, setIsAuth] = useState(true);
  return (  
    <Router>
      <Helmet>
                <meta charSet="utf-8" />
                <title>community emporium</title>
                <link rel="canonical" href="http://muemporium.com" />
            </Helmet>
      <nav>
        <Link to="/"> Home </Link>
        <Link to="/music"> Music </Link>
        <Link to="/createpost"> Create Post </Link>
      </nav>
      <Routes>
        <Route path="/music" element={<PostBoard isAuth={isAuth} />} />
        <Route path="/" element={<Home isAuth={isAuth} />} />
        <Route path="/createpost" element={<CreatePost isAuth={isAuth} />} style={{backgroundColor: 'white'}} />
      </Routes>
    </Router>
  );
}

export default App;
