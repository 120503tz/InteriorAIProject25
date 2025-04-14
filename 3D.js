import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Draggable from "react-draggable";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";

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

const furnitureOptions = ["Bed", "Sofa", "Desk", "Chair", "Table"];

const LayoutTool = () => {
  const [boxes, setBoxes] = useState([]);
  const [selectedFurniture, setSelectedFurniture] = useState("Bed");

  const addBox = () => {
    const newBox = {
      id: boxes.length + 1,
      type: selectedFurniture,
      x: 50,
      y: 50,
    };
    setBoxes([...boxes, newBox]);
  };

  return (
    <div className="p-8">
      <h2 className="text-2xl font-semibold mb-4">Room Layout Tool</h2>

      <div className="mb-4 flex gap-4 items-center">
        <select
          className="border px-3 py-2 rounded"
          value={selectedFurniture}
          onChange={(e) => setSelectedFurniture(e.target.value)}
        >
          {furnitureOptions.map((item) => (
            <option key={item} value={item}>{item}</option>
          ))}
        </select>
        <button
          onClick={addBox}
          className="px-4 py-2 bg-blue-600 text-white rounded"
        >
          Add to Room
        </button>
      </div>

      <div className="relative w-full h-[500px] border border-gray-400 bg-gray-50">
        {boxes.map((box) => (
          <Draggable key={box.id} defaultPosition={{ x: box.x, y: box.y }}>
            <div
              className="w-20 h-20 bg-blue-200 border border-black rounded-md text-sm flex items-center justify-center cursor-move"
              title="Drag to move"
            >
              {box.type}
            </div>
          </Draggable>
        ))}
      </div>
    </div>
  );
};

const AIRecommendations = () => {
  const [roomType, setRoomType] = useState("");
  const [stylePreference, setStylePreference] = useState("");
  const [recommendation, setRecommendation] = useState("");

  const generateRecommendation = () => {
    const output = `For a ${roomType.toLowerCase()} with a ${stylePreference.toLowerCase()} style, we suggest minimal furniture, soft lighting, and neutral colors with pops of accent decor.`;
    setRecommendation(output);
  };

  return (
    <div className="p-8">
      <h2 className="text-2xl font-semibold mb-4">AI Recommendations</h2>
      <div className="mb-4">
        <label className="block mb-1">Room Type</label>
        <select
          className="border border-gray-400 rounded w-full px-3 py-2"
          value={roomType}
          onChange={(e) => setRoomType(e.target.value)}
        >
          <option value="">Select a room</option>
          <option value="Bedroom">Bedroom</option>
          <option value="Living Room">Living Room</option>
          <option value="Kitchen">Kitchen</option>
        </select>
      </div>
      <div className="mb-4">
        <label className="block mb-1">Style Preference</label>
        <select
          className="border border-gray-400 rounded w-full px-3 py-2"
          value={stylePreference}
          onChange={(e) => setStylePreference(e.target.value)}
        >
          <option value="">Select a style</option>
          <option value="Modern">Modern</option>
          <option value="Bohemian">Bohemian</option>
          <option value="Minimalist">Minimalist</option>
        </select>
      </div>
      <button
        onClick={generateRecommendation}
        className="px-4 py-2 bg-green-600 text-white rounded"
      >
        Generate Suggestion
      </button>
      {recommendation && (
        <div className="mt-6 p-4 bg-green-100 border border-green-400 rounded">
          <strong>Suggestion:</strong> {recommendation}
        </div>
      )}
    </div>
  );
};

const Visualization = () => (
  <div className="p-8">
    <h2 className="text-2xl font-semibold mb-4">3D Visualization</h2>
    <div className="h-[500px] border rounded">
      <Canvas>
        <ambientLight intensity={0.5} />
        <directionalLight position={[2, 2, 5]} intensity={1} />
        <mesh rotation={[0.4, 0.4, 0]}>
          <boxGeometry args={[2, 2, 2]} />
          <meshStandardMaterial color="skyblue" />
        </mesh>
        <OrbitControls />
      </Canvas>
    </div>
  </div>
);

const BudgetPlanner = () => {
  const items = [
    { name: "Sofa", price: 500 },
    { name: "Coffee Table", price: 120 },
    { name: "Bed Frame", price: 700 },
    { name: "Dining Set", price: 850 },
    { name: "Rug", price: 150 },
  ];

  const [selectedItems, setSelectedItems] = useState([]);

  const toggleItem = (item) => {
    if (selectedItems.includes(item)) {
      setSelectedItems(selectedItems.filter(i => i !== item));
    } else {
      setSelectedItems([...selectedItems, item]);
    }
  };

  const total = selectedItems.reduce((acc, item) => acc + item.price, 0);

  return (
    <div className="p-8">
      <h2 className="text-2xl font-semibold mb-4">Budget Planner</h2>
      <ul className="mb-4">
        {items.map((item, idx) => (
          <li key={idx} className="mb-2">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={selectedItems.includes(item)}
                onChange={() => toggleItem(item)}
              />
              <span>{item.name} - ${item.price}</span>
            </label>
          </li>
        ))}
      </ul>
      <div className="text-xl font-medium">Total: ${total}</div>
    </div>
  );
};

const MaterialCatalog = () => {
  const materials = [
    { name: "Oak Wood", category: "Wood", price: 120 },
    { name: "Polished Marble", category: "Stone", price: 200 },
    { name: "Stainless Steel", category: "Metal", price: 180 },
    { name: "Velvet Fabric", category: "Textile", price: 90 },
    { name: "Bamboo Panels", category: "Wood", price: 100 },
  ];

  return (
    <div className="p-8">
      <h2 className="text-2xl font-semibold mb-4">Material Catalog</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {materials.map((material, idx) => (
          <div key={idx} className="p-4 border rounded shadow">
            <h3 className="text-lg font-semibold">{material.name}</h3>
            <p>Category: {material.category}</p>
            <p>Price: ${material.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

const SaveShare = () => {
  const [downloaded, setDownloaded] = useState(false);

  const handleExport = () => {
    const text = "Thank you for using Interior AI!\nThis is a placeholder export of your current design summary.";
    const blob = new Blob([text], { type: "text/plain" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "InteriorAI_Design.txt";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setDownloaded(true);
  };

  return (
    <div className="p-8">
      <h2 className="text-2xl font-semibold mb-4">Save & Share</h2>
      <button
        onClick={handleExport}
        className="mb-4 px-4 py-2 bg-purple-600 text-white rounded"
      >
        Export Design Summary
      </button>
      {downloaded && (
        <p className="text-green-600">Export complete! File saved as InteriorAI_Design.txt</p>
      )}
      <div className="mt-6">
        <p className="mb-2">Want to share your design?</p>
        <input
          type="text"
          className="border px-3 py-2 rounded w-full"
          placeholder="Copy link: https://interiorai.app/design123"
          readOnly
        />
      </div>
    </div>
  );
};

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
