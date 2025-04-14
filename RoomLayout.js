import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

const Home = () => (
  <div className="p-8">
    <h1 className="text-4xl font-bold mb-4">Interior AI</h1>
    <p className="mb-6">Beginner-friendly interior design made simple. Explore our tools to create your dream space.</p>
    <ul className="space-y-2">
      <li><Link className="text-blue-600 underline" to="/layout">Room Layout Tool</Link></li>
      <li><Link className="text-blue-600 underline" to="/visualization">3D Visualization</Link></li>
      <li><Link className="text-blue-600 underline" to="/ai">AI Recommendations</Link></li>
      <li><Link className="text-blue-600 underline" to="/budget">Budget Planner</Link></li>
      <li><Link className="text-blue-600 underline" to="/catalog">Material Catalog</Link></li>
      <li><Link className="text-blue-600 underline" to="/share">Save & Share</Link></li>
    </ul>
  </div>
);

const LayoutTool = () => {
  const [boxes, setBoxes] = useState([]);

  const addBox = () => {
    const newBox = {
      id: boxes.length + 1,
      x: Math.random() * 300,
      y: Math.random() * 200,
    };
    setBoxes([...boxes, newBox]);
  };

  return (
    <div className="p-8">
      <h2 className="text-2xl font-semibold mb-4">Room Layout Tool</h2>
      <button
        onClick={addBox}
        className="mb-4 px-4 py-2 bg-blue-600 text-white rounded"
      >
        Add Furniture Box
      </button>
      <div
        className="relative w-full h-[400px] border border-gray-400 bg-gray-50"
        style={{ position: "relative" }}
      >
        {boxes.map((box) => (
          <div
            key={box.id}
            className="absolute w-16 h-16 bg-blue-300 border border-black flex items-center justify-center"
            style={{ left: box.x, top: box.y }}
          >
            Box {box.id}
          </div>
        ))}
      </div>
    </div>
  );
};

const Visualization = () => <div className="p-8">[3D Visualization placeholder]</div>;
const AIRecommendations = () => <div className="p-8">[AI Suggestions placeholder]</div>;
const BudgetPlanner = () => <div className="p-8">[Budget Planner placeholder]</div>;
const MaterialCatalog = () => <div className="p-8">[Material Catalog placeholder]</div>;
const SaveShare = () => <div className="p-8">[Save & Share placeholder]</div>;

const App = () => (
  <Router>
    <nav className="bg-gray-800 text-white p-4">
      <div className="flex gap-4">
        <Link to="/">Home</Link>
        <Link to="/layout">Layout</Link>
        <Link to="/visualization">3D View</Link>
        <Link to="/ai">AI</Link>
        <Link to="/budget">Budget</Link>
        <Link to="/catalog">Catalog</Link>
        <Link to="/share">Share</Link>
      </div>
    </nav>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/layout" element={<LayoutTool />} />
      <Route path="/visualization" element={<Visualization />} />
      <Route path="/ai" element={<AIRecommendations />} />
      <Route path="/budget" element={<BudgetPlanner />} />
      <Route path="/catalog" element={<MaterialCatalog />} />
      <Route path="/share" element={<SaveShare />} />
    </Routes>
  </Router>
);

export default App;
