import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";

import { ThemeProvider } from "@reusejs/react";
import newTheme from "./Components/variants";

import Home from "./Components/Home";
import AddFavoritePackage from "./Components/AddFavoritePackage";
import EditPackage from "./Components/EditPackage";

function App() {
  return (
    <div>
      <ThemeProvider value={newTheme}>
        <Router>
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route
              path="/addFavoritePackage"
              element={<AddFavoritePackage />}
            ></Route>
            <Route path="editPackage/:id" element={<EditPackage />}></Route>
          </Routes>
        </Router>
      </ThemeProvider>
    </div>
  );
}

export default App;
