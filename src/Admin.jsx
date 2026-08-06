import { useState, useEffect } from 'react';
import './App.css';

function Admin() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState('admin');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  
  // Active section (groups or birds)
  const [activeSection, setActiveSection] = useState('groups');
  
  // Bird groups state
  const [birdGroups, setBirdGroups] = useState([]);
  const [newGroupName, setNewGroupName] = useState('');
  const [editingGroup, setEditingGroup] = useState(null);
  
  // Birds state
  const [birds, setBirds] = useState([]);
  const [editingBird, setEditingBird] = useState(null);
  const [newBird, setNewBird] = useState({
    name: '',
    scientific_name: '',
    family: '',
    order_name: '',
    group_id: '',
    image_path: './src/Birds/Images/',
    sound_path: './src/Logos-Buttons-Sounds/',
    habitat: '',
    diet: '',
    description: ''
  });
  
  // Handle login
  const handleLogin = async (e) => {
    e.preventDefault();
    
    try {
      const response = await fetch('/api/admin/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
      });
      
      const data = await response.json();
      
      if (response.ok) {
        setIsAuthenticated(true);
        setLoginError('');
        // Fetch data after login
        fetchBirdGroups();
        fetchBirds();
      } else {
        setLoginError(data.error || 'Invalid credentials');
      }
    } catch (error) {
      console.error('Login error:', error);
      setLoginError('Login failed. Please try again.');
    }
  };
  
  // Fetch bird groups
  const fetchBirdGroups = async () => {
    try {
      const response = await fetch('/api/admin/bird-groups');
      const data = await response.json();
      setBirdGroups(data);
    } catch (error) {
      console.error('Error fetching bird groups:', error);
    }
  };
  
  // Fetch birds
  const fetchBirds = async () => {
    try {
      const response = await fetch('/api/admin/birds');
      const data = await response.json();
      setBirds(data);
    } catch (error) {
      console.error('Error fetching birds:', error);
    }
  };
  
  // Create a new bird group
  const handleCreateGroup = async (e) => {
    e.preventDefault();
    
    if (!newGroupName.trim()) return;
    
    try {
      const response = await fetch('/api/admin/bird-groups', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name: newGroupName })
      });
      
      if (response.ok) {
        setNewGroupName('');
        fetchBirdGroups();
      } else {
        const data = await response.json();
        alert(`Failed to create group: ${data.error}`);
      }
    } catch (error) {
      console.error('Error creating bird group:', error);
      alert('Failed to create group');
    }
  };
  
  // Update a bird group
  const handleUpdateGroup = async (e) => {
    e.preventDefault();
    
    if (!editingGroup || !editingGroup.name.trim()) return;
    
    try {
      const response = await fetch(`/api/admin/bird-groups/${editingGroup.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name: editingGroup.name })
      });
      
      if (response.ok) {
        setEditingGroup(null);
        fetchBirdGroups();
      } else {
        const data = await response.json();
        alert(`Failed to update group: ${data.error}`);
      }
    } catch (error) {
      console.error('Error updating bird group:', error);
      alert('Failed to update group');
    }
  };
  
  // Delete a bird group
  const handleDeleteGroup = async (id) => {
    if (!confirm('Are you sure you want to delete this group? This cannot be undone.')) {
      return;
    }
    
    try {
      const response = await fetch(`/api/admin/bird-groups/${id}`, {
        method: 'DELETE'
      });
      
      if (response.ok) {
        fetchBirdGroups();
      } else {
        const data = await response.json();
        alert(`Failed to delete group: ${data.error}`);
      }
    } catch (error) {
      console.error('Error deleting bird group:', error);
      alert('Failed to delete group');
    }
  };
  
  // Create a new bird
  const handleCreateBird = async (e) => {
    e.preventDefault();
    
    if (!newBird.name.trim() || !newBird.scientific_name.trim() || !newBird.group_id) {
      alert('Name, scientific name, and group are required!');
      return;
    }
    
    try {
      const response = await fetch('/api/admin/birds', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newBird)
      });
      
      if (response.ok) {
        setNewBird({
          name: '',
          scientific_name: '',
          family: '',
          order_name: '',
          group_id: '',
          image_path: './src/Birds/Images/',
          sound_path: './src/Logos-Buttons-Sounds/',
          habitat: '',
          diet: '',
          description: ''
        });
        fetchBirds();
      } else {
        const data = await response.json();
        alert(`Failed to create bird: ${data.error}`);
      }
    } catch (error) {
      console.error('Error creating bird:', error);
      alert('Failed to create bird');
    }
  };
  
  // Update a bird
  const handleUpdateBird = async (e) => {
    e.preventDefault();
    
    if (!editingBird) return;
    
    // Format the data to ensure all required fields are present with correct names
    const formattedBirdData = {
      name: editingBird.name,
      scientific_name: editingBird.scientific_name || editingBird.sciName,
      family: editingBird.family,
      order_name: editingBird.order_name || editingBird.order,
      group_id: editingBird.group_id || editingBird.groupId,
      image_path: editingBird.image_path || editingBird.imagePath,
      sound_path: editingBird.sound_path || editingBird.soundPath,
      habitat: editingBird.habitat,
      diet: editingBird.diet,
      description: editingBird.description
    };
    
    try {
      const response = await fetch(`/api/admin/birds/${editingBird.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formattedBirdData)
      });
      
      if (response.ok) {
        setEditingBird(null);
        fetchBirds();
      } else {
        const data = await response.json();
        alert(`Failed to update bird: ${data.error}`);
      }
    } catch (error) {
      console.error('Error updating bird:', error);
      alert('Failed to update bird');
    }
  };
  
  // Delete a bird
  const handleDeleteBird = async (id) => {
    if (!confirm('Are you sure you want to delete this bird? This cannot be undone.')) {
      return;
    }
    
    try {
      const response = await fetch(`/api/admin/birds/${id}`, {
        method: 'DELETE'
      });
      
      if (response.ok) {
        fetchBirds();
      } else {
        const data = await response.json();
        alert(`Failed to delete bird: ${data.error}`);
      }
    } catch (error) {
      console.error('Error deleting bird:', error);
      alert('Failed to delete bird');
    }
  };
  
  if (!isAuthenticated) {
    return (
      <div className="admin-login">
        <div className="login-container">
          <h2>Admin Login</h2>
          {loginError && <p className="error">{loginError}</p>}
          <form onSubmit={handleLogin}>
            <div className="form-group">
              <label>Username:</label>
              <input 
                type="text" 
                value={username} 
                onChange={(e) => setUsername(e.target.value)} 
                required 
              />
            </div>
            <div className="form-group">
              <label>Password:</label>
              <input 
                type="password" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                required 
              />
            </div>
            <button type="submit" className="login-button">Login</button>
          </form>
        </div>
      </div>
    );
  }
  
  return (
    <div className="admin-panel">
      <header className="admin-header">
        <h1>Bird Database Admin Panel</h1>
        <div className="admin-nav">
          <button 
            className={activeSection === 'groups' ? 'active' : ''} 
            onClick={() => setActiveSection('groups')}
          >
            Manage Groups
          </button>
          <button 
            className={activeSection === 'birds' ? 'active' : ''} 
            onClick={() => setActiveSection('birds')}
          >
            Manage Birds
          </button>
          <button 
            className="logout-button" 
            onClick={() => setIsAuthenticated(false)}
          >
            Logout
          </button>
        </div>
      </header>
      
      <div className="admin-content">
        {activeSection === 'groups' ? (
          <div className="groups-management">
            <h2>Bird Groups</h2>
            
            <div className="admin-form-container">
              <h3>Add New Group</h3>
              <form onSubmit={handleCreateGroup} className="admin-form">
                <div className="form-group">
                  <label>Group Name:</label>
                  <input 
                    type="text" 
                    value={newGroupName} 
                    onChange={(e) => setNewGroupName(e.target.value)} 
                    required 
                  />
                </div>
                <button type="submit" className="submit-button">Add Group</button>
              </form>
            </div>
            
            {editingGroup && (
              <div className="admin-form-container">
                <h3>Edit Group</h3>
                <form onSubmit={handleUpdateGroup} className="admin-form">
                  <div className="form-group">
                    <label>Group Name:</label>
                    <input 
                      type="text" 
                      value={editingGroup.name} 
                      onChange={(e) => setEditingGroup({...editingGroup, name: e.target.value})} 
                      required 
                    />
                  </div>
                  <div className="form-buttons">
                    <button type="submit" className="submit-button">Update</button>
                    <button 
                      type="button" 
                      className="cancel-button" 
                      onClick={() => setEditingGroup(null)}
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            )}
            
            <div className="data-table">
              <table>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {birdGroups.map(group => (
                    <tr key={group.id}>
                      <td>{group.id}</td>
                      <td>{group.name}</td>
                      <td className="actions">
                        <button 
                          className="edit-button" 
                          onClick={() => setEditingGroup(group)}
                        >
                          Edit
                        </button>
                        <button 
                          className="delete-button" 
                          onClick={() => handleDeleteGroup(group.id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div className="birds-management">
            <h2>Birds</h2>
            
            <div className="admin-form-container">
              <h3>Add New Bird</h3>
              <form onSubmit={handleCreateBird} className="admin-form">
                <div className="form-row">
                  <div className="form-group">
                    <label>Name:</label>
                    <input 
                      type="text" 
                      value={newBird.name} 
                      onChange={(e) => setNewBird({...newBird, name: e.target.value})} 
                      required 
                    />
                  </div>
                  <div className="form-group">
                    <label>Scientific Name:</label>
                    <input 
                      type="text" 
                      value={newBird.scientific_name} 
                      onChange={(e) => setNewBird({...newBird, scientific_name: e.target.value})} 
                      required 
                    />
                  </div>
                </div>
                
                <div className="form-row">
                  <div className="form-group">
                    <label>Family:</label>
                    <input 
                      type="text" 
                      value={newBird.family} 
                      onChange={(e) => setNewBird({...newBird, family: e.target.value})} 
                      required 
                    />
                  </div>
                  <div className="form-group">
                    <label>Order:</label>
                    <input 
                      type="text" 
                      value={newBird.order_name} 
                      onChange={(e) => setNewBird({...newBird, order_name: e.target.value})} 
                      required 
                    />
                  </div>
                </div>
                
                <div className="form-group">
                  <label>Group:</label>
                  <select 
                    value={newBird.group_id} 
                    onChange={(e) => setNewBird({...newBird, group_id: e.target.value})} 
                    required
                  >
                    <option value="">Select a Group</option>
                    {birdGroups.map(group => (
                      <option key={group.id} value={group.id}>{group.name}</option>
                    ))}
                  </select>
                </div>
                
                <div className="form-group">
                  <label>Image Path:</label>
                  <input 
                    type="text" 
                    value={newBird.image_path} 
                    onChange={(e) => setNewBird({...newBird, image_path: e.target.value})} 
                    required 
                  />
                </div>
                
                <div className="form-group">
                  <label>Sound Path:</label>
                  <input 
                    type="text" 
                    value={newBird.sound_path} 
                    onChange={(e) => setNewBird({...newBird, sound_path: e.target.value})} 
                    required 
                  />
                </div>
                
                <div className="form-group">
                  <label>Habitat:</label>
                  <input 
                    type="text" 
                    value={newBird.habitat} 
                    onChange={(e) => setNewBird({...newBird, habitat: e.target.value})} 
                    required 
                  />
                </div>
                
                <div className="form-group">
                  <label>Diet:</label>
                  <input 
                    type="text" 
                    value={newBird.diet} 
                    onChange={(e) => setNewBird({...newBird, diet: e.target.value})} 
                    required 
                  />
                </div>
                
                <div className="form-group">
                  <label>Description:</label>
                  <textarea 
                    value={newBird.description} 
                    onChange={(e) => setNewBird({...newBird, description: e.target.value})} 
                    required 
                    rows="4"
                  ></textarea>
                </div>
                
                <button type="submit" className="submit-button">Add Bird</button>
              </form>
            </div>
            
            {editingBird && (
              <div className="admin-form-container">
                <h3>Edit Bird</h3>
                <form onSubmit={handleUpdateBird} className="admin-form">
                  <div className="form-row">
                    <div className="form-group">
                      <label>Name:</label>
                      <input 
                        type="text" 
                        value={editingBird.name} 
                        onChange={(e) => setEditingBird({...editingBird, name: e.target.value})} 
                        required 
                      />
                    </div>
                    <div className="form-group">
                      <label>Scientific Name:</label>
                      <input 
                        type="text" 
                        value={editingBird.scientific_name || editingBird.sciName} 
                        onChange={(e) => setEditingBird({
                          ...editingBird, 
                          scientific_name: e.target.value,
                          sciName: e.target.value
                        })} 
                        required 
                      />
                    </div>
                  </div>
                  
                  <div className="form-row">
                    <div className="form-group">
                      <label>Family:</label>
                      <input 
                        type="text" 
                        value={editingBird.family} 
                        onChange={(e) => setEditingBird({...editingBird, family: e.target.value})} 
                        required 
                      />
                    </div>
                    <div className="form-group">
                      <label>Order:</label>
                      <input 
                        type="text" 
                        value={editingBird.order_name || editingBird.order} 
                        onChange={(e) => setEditingBird({
                          ...editingBird, 
                          order_name: e.target.value,
                          order: e.target.value
                        })} 
                        required 
                      />
                    </div>
                  </div>
                  
                  <div className="form-group">
                    <label>Group:</label>
                    <select 
                      value={editingBird.group_id || editingBird.groupId} 
                      onChange={(e) => setEditingBird({
                        ...editingBird, 
                        group_id: e.target.value,
                        groupId: e.target.value
                      })} 
                      required
                    >
                      <option value="">Select a Group</option>
                      {birdGroups.map(group => (
                        <option key={group.id} value={group.id}>{group.name}</option>
                      ))}
                    </select>
                  </div>
                  
                  <div className="form-group">
                    <label>Image Path:</label>
                    <input 
                      type="text" 
                      value={editingBird.image_path || editingBird.imagePath} 
                      onChange={(e) => setEditingBird({
                        ...editingBird, 
                        image_path: e.target.value,
                        imagePath: e.target.value
                      })} 
                      required 
                    />
                  </div>
                  
                  <div className="form-group">
                    <label>Sound Path:</label>
                    <input 
                      type="text" 
                      value={editingBird.sound_path || editingBird.soundPath} 
                      onChange={(e) => setEditingBird({
                        ...editingBird, 
                        sound_path: e.target.value,
                        soundPath: e.target.value
                      })} 
                      required 
                    />
                  </div>
                  
                  <div className="form-group">
                    <label>Habitat:</label>
                    <input 
                      type="text" 
                      value={editingBird.habitat} 
                      onChange={(e) => setEditingBird({...editingBird, habitat: e.target.value})} 
                      required 
                    />
                  </div>
                  
                  <div className="form-group">
                    <label>Diet:</label>
                    <input 
                      type="text" 
                      value={editingBird.diet} 
                      onChange={(e) => setEditingBird({...editingBird, diet: e.target.value})} 
                      required 
                    />
                  </div>
                  
                  <div className="form-group">
                    <label>Description:</label>
                    <textarea 
                      value={editingBird.description} 
                      onChange={(e) => setEditingBird({...editingBird, description: e.target.value})} 
                      required 
                      rows="4"
                    ></textarea>
                  </div>
                  
                  <div className="form-buttons">
                    <button type="submit" className="submit-button">Update Bird</button>
                    <button 
                      type="button" 
                      className="cancel-button" 
                      onClick={() => setEditingBird(null)}
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            )}
            
            <div className="data-table birds-table">
              <table>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Scientific Name</th>
                    <th>Group</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {birds.map(bird => (
                    <tr key={bird.id}>
                      <td>{bird.id}</td>
                      <td>{bird.name}</td>
                      <td>{bird.sciName || bird.scientific_name}</td>
                      <td>{bird.groupName}</td>
                      <td className="actions">
                        <button 
                          className="edit-button" 
                          onClick={() => setEditingBird(bird)}
                        >
                          Edit
                        </button>
                        <button 
                          className="delete-button" 
                          onClick={() => handleDeleteBird(bird.id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Admin; 