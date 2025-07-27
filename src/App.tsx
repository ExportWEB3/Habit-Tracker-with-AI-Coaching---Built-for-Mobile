
import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/homePage";
import GetStartedPage from "./pages/getStarted";
import SignUpPage from "./pages/signUp";



function App() {
  const [count, setCount] = useState(0);

  return (
    <BrowserRouter>
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<HomePage />} />
        <Route path="/getstarted" element={
    <>
      <HomePage /> {/* This renders the background */}
      <GetStartedPage /> {/* This overlays the modal */}
    </>
  } />
        <Route path="/signup" element={<SignUpPage/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
