import express from 'express';
import cors from 'cors';
import { 
  getBirdGroups, 
  getBirdsByGroup, 
  getBirdData, 
  getBirdByName,
  getGroupNameById,
  getBirdsByGroupName,
  validateAdminCredentials,
  createBirdGroup,
  updateBirdGroup,
  deleteBirdGroup,
  createBird,
  updateBird,
  deleteBird,
  getAllBirds
} from './database.js';

const app = express();
const PORT = 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.get('/api/bird-groups', (req, res) => {
  try {
    const groups = getBirdGroups();
    res.json(groups);
  } catch (error) {
    console.error('Error fetching bird groups:', error);
    res.status(500).json({ error: 'Failed to fetch bird groups' });
  }
});

app.get('/api/birds/group/:groupId', (req, res) => {
  try {
    const { groupId } = req.params;
    const birds = getBirdsByGroup(groupId);
    res.json(birds);
  } catch (error) {
    console.error('Error fetching birds by group:', error);
    res.status(500).json({ error: 'Failed to fetch birds by group' });
  }
});

app.get('/api/birds/group-name/:groupName', (req, res) => {
  try {
    const { groupName } = req.params;
    const birds = getBirdsByGroupName(groupName);
    res.json(birds);
  } catch (error) {
    console.error('Error fetching birds by group name:', error);
    res.status(500).json({ error: 'Failed to fetch birds by group name' });
  }
});

app.get('/api/bird/:id', (req, res) => {
  try {
    const { id } = req.params;
    const birdData = getBirdData(id);
    res.json(birdData);
  } catch (error) {
    console.error('Error fetching bird data:', error);
    res.status(500).json({ error: 'Failed to fetch bird data' });
  }
});

app.get('/api/bird/name/:name', (req, res) => {
  try {
    const { name } = req.params;
    const birdData = getBirdByName(name);
    
    if (!birdData) {
      return res.status(404).json({ error: 'Bird not found' });
    }
    
    res.json(birdData);
  } catch (error) {
    console.error('Error fetching bird data by name:', error);
    res.status(500).json({ error: 'Failed to fetch bird data by name' });
  }
});

app.get('/api/group/:id/name', (req, res) => {
  try {
    const { id } = req.params;
    const groupName = getGroupNameById(id);
    
    if (!groupName) {
      return res.status(404).json({ error: 'Group not found' });
    }
    
    res.json({ name: groupName });
  } catch (error) {
    console.error('Error fetching group name:', error);
    res.status(500).json({ error: 'Failed to fetch group name' });
  }
});

// Admin Authentication
app.post('/api/admin/login', (req, res) => {
  try {
    const { username, password } = req.body;
    const isValid = validateAdminCredentials(username, password);
    
    if (isValid) {
      res.json({ success: true });
    } else {
      res.status(401).json({ error: 'Invalid credentials' });
    }
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ error: 'Login failed' });
  }
});

// Admin CRUD operations - Bird Groups
app.get('/api/admin/bird-groups', (req, res) => {
  try {
    const groups = getBirdGroups();
    res.json(groups);
  } catch (error) {
    console.error('Error fetching bird groups:', error);
    res.status(500).json({ error: 'Failed to fetch bird groups' });
  }
});

app.post('/api/admin/bird-groups', (req, res) => {
  try {
    const { name } = req.body;
    const result = createBirdGroup(name);
    
    if (result.success) {
      res.status(201).json({ id: result.id, name });
    } else {
      res.status(400).json({ error: result.error });
    }
  } catch (error) {
    console.error('Error creating bird group:', error);
    res.status(500).json({ error: 'Failed to create bird group' });
  }
});

app.put('/api/admin/bird-groups/:id', (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    const result = updateBirdGroup(id, name);
    
    if (result.success) {
      res.json({ id, name });
    } else {
      res.status(400).json({ error: result.error });
    }
  } catch (error) {
    console.error('Error updating bird group:', error);
    res.status(500).json({ error: 'Failed to update bird group' });
  }
});

app.delete('/api/admin/bird-groups/:id', (req, res) => {
  try {
    const { id } = req.params;
    const result = deleteBirdGroup(id);
    
    if (result.success) {
      res.json({ success: true });
    } else {
      res.status(400).json({ error: result.error });
    }
  } catch (error) {
    console.error('Error deleting bird group:', error);
    res.status(500).json({ error: 'Failed to delete bird group' });
  }
});

// Admin CRUD operations - Birds
app.get('/api/admin/birds', (req, res) => {
  try {
    const birds = getAllBirds();
    res.json(birds);
  } catch (error) {
    console.error('Error fetching all birds:', error);
    res.status(500).json({ error: 'Failed to fetch all birds' });
  }
});

app.post('/api/admin/birds', (req, res) => {
  try {
    const birdData = req.body;
    const result = createBird(birdData);
    
    if (result.success) {
      res.status(201).json({ id: result.id, ...birdData });
    } else {
      res.status(400).json({ error: result.error });
    }
  } catch (error) {
    console.error('Error creating bird:', error);
    res.status(500).json({ error: 'Failed to create bird' });
  }
});

app.put('/api/admin/birds/:id', (req, res) => {
  try {
    const { id } = req.params;
    const birdData = req.body;
    const result = updateBird(id, birdData);
    
    if (result.success) {
      res.json({ id, ...birdData });
    } else {
      res.status(400).json({ error: result.error });
    }
  } catch (error) {
    console.error('Error updating bird:', error);
    res.status(500).json({ error: 'Failed to update bird' });
  }
});

app.delete('/api/admin/birds/:id', (req, res) => {
  try {
    const { id } = req.params;
    const result = deleteBird(id);
    
    if (result.success) {
      res.json({ success: true });
    } else {
      res.status(400).json({ error: result.error });
    }
  } catch (error) {
    console.error('Error deleting bird:', error);
    res.status(500).json({ error: 'Failed to delete bird' });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export default app; 