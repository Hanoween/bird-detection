import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Upload from "./pages/Upload";
import Display from "./components/Display";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/upload" element={<Upload />} />
          <Route path="/display" element={<Display />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
