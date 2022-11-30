import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Hello from './components/Hello'
import PhotoCrop from './components/PhotoCrop'


export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Hello />} />
        <Route path="/crop" element={<PhotoCrop />} />
      </Routes>
    </Router>
  );
}
