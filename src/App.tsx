import { BrowserRouter, Route, Routes } from "react-router-dom";
import Generate from "./pages/Generate";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Generate />} />
        <Route path="*" element={<h1>Not Found Page</h1>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
