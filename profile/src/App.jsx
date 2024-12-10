import Draggable from 'react-draggable'; // Import Draggable component
import Profile from './components/Peofile';
import Favorite from './components/Favorite';
import Posts from './components/Posts';
import './App.css'; // Import the CSS file for styling

import React, { useState, useEffect } from 'react';

function App() {
  const [components, setComponents] = useState([]);
  const [theme, setTheme] = useState('#ffffff'); // Default theme color

  // Fetch settings data from the backend
  useEffect(() => {
    fetch('http://localhost:3000/settings')
      .then((response) => response.json())
      .then((data) => {
        const settings = data[0]; // Assuming only one settings object
        const orderedComponents = [
          { name: 'profile', component: <Profile /> },
          { name: 'favorite', component: <Favorite /> },
          { name: 'posts', component: <Posts /> },
        ];

        // Reorder components based on the positions from backend
        orderedComponents.sort((a, b) => {
          const positionA = settings[`${a.name}position`];
          const positionB = settings[`${b.name}position`];
          return positionA - positionB;
        });

        setComponents(orderedComponents);
        setTheme(settings.theme); // Set the background color from the backend
      })
      .catch((error) => console.error('Error fetching settings:', error));
  }, []);

  // Update settings in the backend
  const updateSettings = () => {
    const settings = {
      theme,
      profileposition: components.findIndex((c) => c.name === 'profile') + 1,
      faveposition: components.findIndex((c) => c.name === 'favorite') + 1,
      postposition: components.findIndex((c) => c.name === 'posts') + 1,
    };

    fetch('http://localhost:3000/settings/675891a21079a69d3f4dc85b', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams(settings),
    })
      .then((response) => response.json())
      .then((data) => console.log('Settings updated:', data))
      .catch((error) => console.error('Error updating settings:', error));
  };

  // Handle the drag and drop functionality
  const handleDragStop = (index, e, data) => {
    const newComponents = [...components];
    const draggedItem = newComponents[index];
    newComponents.splice(index, 1);

    const insertIndex = Math.max(
      0,
      Math.min(components.length - 1, Math.floor((data.y + 100) / 200))
    ); // Ensure vertical sorting

    newComponents.splice(insertIndex, 0, draggedItem);
    setComponents(newComponents);

    // Update the settings in the backend
    updateSettings();
  };

  // Handle theme color change
  const handleThemeChange = (e) => {
    const newColor = e.target.value;
    setTheme(newColor); // Update the theme color dynamically
    updateSettings(); // Update the settings in the backend
  };

  return (
    <div className="container" style={{ backgroundColor: theme }}>
      {/* Theme color picker */}
      <div className="theme-picker">
        <label htmlFor="theme-color">Choose Theme Color:</label>
        <input
          type="color"
          id="theme-color"
          value={theme}
          onChange={handleThemeChange}
        />
      </div>

      {/* Render the draggable components */}
      {components.map((item, index) => (
        <Draggable
          key={index}
          axis="y" // Limit dragging to vertical axis
          handle=".drag-handle" // Allow dragging only via the handle
          onStop={(e, data) => handleDragStop(index, e, data)} // Handle drag stop event
        >
          <div className="card">
            <div className="drag-handle">...</div> {/* Three dots as the drag handle */}
            {item.component}
          </div>
        </Draggable>
      ))}
    </div>
  );
}

export default App;
