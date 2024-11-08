// src/Hogs.js
import React, { useState } from 'react';
import hogsData from './porker_data'; // Adjust the path as necessary

const Hogs = () => {
  const [hogs, setHogs] = useState(hogsData);
  const [filterGreased, setFilterGreased] = useState(false);
  const [sortBy, setSortBy] = useState('name');
  const [hiddenHogs, setHiddenHogs] = useState(new Set());
  const [newHog, setNewHog] = useState({ name: '', specialty: '', weight: '', greased: false, highestMedal: '' });

  const toggleGreased = () => setFilterGreased((prev) => !prev);

  const handleSortChange = (e) => {
    setSortBy(e.target.value);
  };

  const handleHideHog = (name) => {
    setHiddenHogs((prev) => {
      const newHidden = new Set(prev);
      newHidden.add(name);
      return newHidden;
    });
  };

  const handleAddHog = (e) => {
    e.preventDefault();
    setHogs((prev) => [...prev, { ...newHog, id: prev.length + 1 }]);
    setNewHog({ name: '', specialty: '', weight: '', greased: false, highestMedal: '' });
  };

  const sortedHogs = [...hogs]
    .filter(hog => !hiddenHogs.has(hog.name))
    .filter(hog => !filterGreased || hog.greased)
    .sort((a, b) => (sortBy === 'name' ? a.name.localeCompare(b.name) : a.weight - b.weight));

  return (
    <div>
      <h1>Hogs</h1>
      <button onClick={toggleGreased}>{filterGreased ? 'Show All Hogs' : 'Show Greased Hogs'}</button>
      <select onChange={handleSortChange}>
        <option value="name">Sort by Name</option>
        <option value="weight">Sort by Weight</option>
      </select>
      <div>
        {sortedHogs.map(hog => (
          <div key={hog.id}>
            <h2>{hog.name}</h2>
            <img src={hog.image} alt={hog.name} />
            <button onClick={() => handleHideHog(hog.name)}>Hide</button>
            {/* More details can be shown here on click */}
          </div>
        ))}
      </div>
      <form onSubmit={handleAddHog}>
        <input
          type="text"
          placeholder="Name"
          value={newHog.name}
          onChange={(e) => setNewHog({ ...newHog, name: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Specialty"
          value={newHog.specialty}
          onChange={(e) => setNewHog({ ...newHog, specialty: e.target.value })}
          required
        />
        <input
          type="number"
          placeholder="Weight"
          value={newHog.weight}
          onChange={(e) => setNewHog({ ...newHog, weight: Number(e.target.value) })}
          required
        />
        <label>
          Greased:
          <input
            type="checkbox"
            checked={newHog.greased}
            onChange={(e) => setNewHog({ ...newHog, greased: e.target.checked })}
          />
        </label>
        <input
          type="text"
          placeholder="Highest Medal"
          value={newHog.highestMedal}
          onChange={(e) => setNewHog({ ...newHog, highestMedal: e.target.value })}
          required
        />
        <button type="submit">Add Hog</button>
      </form>
    </div>
  );
};

export default Hogs;
