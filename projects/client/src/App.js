import logo from "./logo.svg";
import "./App.css";

// route
import { Routes, Route } from "react-router-dom";

// pages
import { DummyPage } from "./pages/DummyPage";
import { NotFoundPage } from "./pages/NotFound/NotFound";

import axios from "axios";
import { useEffect, useState } from "react";

function App() {
  const testApi = async () => {
    try {
      const response = await (
        await axios.get(`${process.env.REACT_APP_API_BASE_URL}`)
      ).data;
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    testApi();
    console.log("MOKOMDO HERE");
  }, []);
  return (
    <div>
      <Routes>
        <Route path="/" element={<DummyPage />} />

        {/* not found  */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
  );
}

export default App;
