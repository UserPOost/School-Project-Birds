import './App.css';
import './globals.css';
import { useState, useEffect, useRef } from 'react';

function App() {
  const [selectedGroup, setSelectedGroup] = useState('Songbirds');
  const [selectedBird, setSelectedBird] = useState('Australian Magpie');
  const [availableBirds, setAvailableBirds] = useState([]);
  const [birdGroups, setBirdGroups] = useState({});
  const [birdData, setBirdData] = useState(null);
  const [loading, setLoading] = useState(true);
  
  // Fetch bird groups on component mount
  useEffect(() => {
    const fetchBirdGroups = async () => {
      try {
        const response = await fetch('/api/bird-groups');
        const groups = await response.json();
        
        // Transform the data into the format we need
        const groupsObject = {};
        for (const group of groups) {
          const birdsResponse = await fetch(`/api/birds/group-name/${group.name}`);
          const birds = await birdsResponse.json();
          groupsObject[group.name] = birds;
        }
        
        setBirdGroups(groupsObject);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching bird groups:', error);
        setLoading(false);
      }
    };
    
    fetchBirdGroups();
  }, []);
  
  // Update available birds when group changes
  useEffect(() => {
    if (birdGroups[selectedGroup]) {
      setAvailableBirds(birdGroups[selectedGroup]);
      // Set the first bird from the group as selected
      if (birdGroups[selectedGroup].length > 0) {
        setSelectedBird(birdGroups[selectedGroup][0]);
      }
    }
  }, [selectedGroup, birdGroups]);
  
  // Fetch bird data when selected bird changes
  useEffect(() => {
    const fetchBirdData = async () => {
      if (!selectedBird) return;
      
      try {
        const response = await fetch(`/api/bird/name/${encodeURIComponent(selectedBird)}`);
        const data = await response.json();
        setBirdData(data);
      } catch (error) {
        console.error('Error fetching bird data:', error);
      }
    };
    
    fetchBirdData();
  }, [selectedBird]);

  const handleImageClick = () => {
    if (birdData) {
      window.open(birdData.imagePath, '_blank');
    }
  };

  if (loading) {
    return <div className="App">Loading...</div>;
  }

  return (
    <div className="App">
      <div className="Selection-Container">
        <div className="Selection-Group">
          <select 
            value={selectedGroup} 
            onChange={(e) => setSelectedGroup(e.target.value)}
            className="Bird-Selector Group-Selector"
          >
            {Object.keys(birdGroups).map(group => (
              <option key={group} value={group}>{group}</option>
            ))}
          </select>
        </div>
        
        <div className="Selection-Bird">
          <select 
            value={selectedBird} 
            onChange={(e) => setSelectedBird(e.target.value)}
            className="Bird-Selector"
          >
            {availableBirds.map(bird => (
              <option key={bird} value={bird}>{bird}</option>
            ))}
          </select>
        </div>
      </div>
      
      {birdData && (
        <div className="Base-Rectangle-Container">
          <div className="Base-Rectangle-Styling">
            <div className="Content-Of-Card">
              <div className="Bird-Name">
                <p>{birdData.name}</p>
                <div className="Bird-Scientific-Name">
                  <p>{birdData.sciName}</p>
                </div>
              </div>
              <div className="Image-Container">
                <img
                  src={birdData.imagePath}
                  alt={birdData.name}
                  onClick={handleImageClick}
                  style={{ cursor: 'pointer' }}
                />
              </div>
              <div className="Specific-Information">
                <p style={{ fontSize: '16px' }}>{birdData.name} Facts!</p>
                <p>Scientific Name: {birdData.sciName}</p>
                <p>Family: {birdData.family}</p>
                <p>Order: {birdData.order}</p>
                <p>Habitat: {birdData.habitat}</p>
                <p>Diet: {birdData.diet}</p>
              </div>
              <div className="General-Information">
                <p>{birdData.description}</p>
              </div>
              <SoundButton soundPath={birdData.soundPath} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// SoundButton component with toggle play/stop functionality
function SoundButton({ soundPath }) {
  const audioRef = useRef(null);

  useEffect(() => {
    // Clean up the audio when the component unmounts or when soundPath changes
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, [soundPath]);

  const handleSoundClick = () => {
    if (!audioRef.current) {
      audioRef.current = new Audio(soundPath);
      audioRef.current.play();
    } else if (audioRef.current.paused) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  };

  return (
    <div className="Sound-Circle-1" onClick={handleSoundClick} style={{ cursor: 'pointer' }}>
      <div className="Sound-Circle-2">
        <img src="./src/Logos-Buttons-Sounds/logo.webp" alt="Logo" />
      </div>
    </div>
  );
}

export default App;
