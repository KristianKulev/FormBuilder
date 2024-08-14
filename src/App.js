import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import FormBuilderPage from "./pages/FormBuilderPage";
import MainHeader from "./components/MainHeader";

const App = () => {
  return (
    <Router>
      <div className="App">
        <MainHeader />
        <Routes>
          <Route path="/" element={<FormBuilderPage />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
