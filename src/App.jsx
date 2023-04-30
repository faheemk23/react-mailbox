import { Routes, Route } from "react-router-dom";

import "./styles.css";
import { Error, Inbox, Spam, Trash } from "./pages/Pages";
import { EmailDetail } from "./pages/EmailDetail";

export default function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Inbox />} />
        <Route path="/spam" element={<Spam />} />
        <Route path="/trash" element={<Trash />} />
        <Route path="/emaildetail/:mailId" element={<EmailDetail />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </div>
  );
}
