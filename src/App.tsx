
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Search from './pages/Search';
import Settings from './pages/Settings';
import './App.css';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <nav className="bg-white shadow-sm py-4">
          <div className="container mx-auto px-4 flex justify-between items-center">
            <h1 className="text-xl font-bold">Company Search</h1>
            <div className="space-x-4">
              <Link to="/" className="text-blue-600 hover:text-blue-800">Search</Link>
              <Link to="/settings" className="text-blue-600 hover:text-blue-800">Settings</Link>
            </div>
          </div>
        </nav>
        
        <main>
          <Routes>
            <Route path="/" element={<Search />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
