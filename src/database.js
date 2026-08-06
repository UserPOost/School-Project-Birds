import Database from 'better-sqlite3';

// Initialize the database
const db = new Database('birds.db');

// Create tables if they don't exist
function initializeDatabase() {
  // Create BirdGroups table
  db.exec(`
    CREATE TABLE IF NOT EXISTS bird_groups (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL UNIQUE
    )
  `);

  // Create Birds table
  db.exec(`
    CREATE TABLE IF NOT EXISTS birds (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      scientific_name TEXT NOT NULL,
      family TEXT NOT NULL,
      order_name TEXT NOT NULL,
      group_id INTEGER NOT NULL,
      image_path TEXT NOT NULL,
      sound_path TEXT NOT NULL,
      FOREIGN KEY (group_id) REFERENCES bird_groups(id)
    )
  `);

  // Create SpecificInfo table
  db.exec(`
    CREATE TABLE IF NOT EXISTS specific_info (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      bird_id INTEGER NOT NULL,
      habitat TEXT NOT NULL,
      diet TEXT NOT NULL,
      FOREIGN KEY (bird_id) REFERENCES birds(id)
    )
  `);

  // Create GeneralInfo table
  db.exec(`
    CREATE TABLE IF NOT EXISTS general_info (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      bird_id INTEGER NOT NULL,
      description TEXT NOT NULL,
      FOREIGN KEY (bird_id) REFERENCES birds(id)
    )
  `);

  // Create Admin table for authentication
  db.exec(`
    CREATE TABLE IF NOT EXISTS admin (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT NOT NULL UNIQUE,
      password TEXT NOT NULL
    )
  `);

  // Insert default admin with password 'root'
  const adminCount = db.prepare('SELECT COUNT(*) as count FROM admin').get();
  if (adminCount.count === 0) {
    db.prepare('INSERT INTO admin (username, password) VALUES (?, ?)').run('admin', 'root');
  }
}

// Insert initial data
function seedDatabase() {
  // Check if data already exists
  const groupCount = db.prepare('SELECT COUNT(*) as count FROM bird_groups').get();
  
  if (groupCount.count === 0) {
    // Insert bird groups
    const insertGroup = db.prepare('INSERT INTO bird_groups (name) VALUES (?)');
    const songbirdsId = insertGroup.run('Songbirds').lastInsertRowid;

    // Insert birds
    const insertBird = db.prepare(`
      INSERT INTO birds (name, scientific_name, family, order_name, group_id, image_path, sound_path)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `);

    // Insert specific info
    const insertSpecificInfo = db.prepare(`
      INSERT INTO specific_info (bird_id, habitat, diet)
      VALUES (?, ?, ?)
    `);

    // Insert general info
    const insertGeneralInfo = db.prepare(`
      INSERT INTO general_info (bird_id, description)
      VALUES (?, ?)
    `);

    // Australian Magpie
    const magpieId = insertBird.run(
      'Australian Magpie',
      'Gymnorhina tibicen',
      'Artamidae',
      'Passeriformes',
      songbirdsId,
      './src/Birds/Images/songbirds/Australian_Magpie.webp',
      './src/Logos-Buttons-Sounds/Australian-Magpie.mp3'
    ).lastInsertRowid;

    insertSpecificInfo.run(
      magpieId,
      'Open grasslands, parks, and urban areas',
      'Omnivorous, including insects, fruits, and small animals'
    );

    insertGeneralInfo.run(
      magpieId,
      'The Australian magpie is a highly intelligent bird with striking black-and-white plumage and a melodious song. Found across urban and rural landscapes, it\'s known for its vocal abilities and playful nature. However, during nesting season, it can become protective, swooping at perceived threats to defend its territory.'
    );

    // Pied Butcherbird
    const butcherbirdId = insertBird.run(
      'Pied Butcherbird',
      'Cracticus nigrogularis',
      'Artamidae',
      'Passeriformes',
      songbirdsId,
      './src/Birds/Images/songbirds/Pied_Butcherbird.webp',
      './src/Logos-Buttons-Sounds/Pied_Butcherbird.mp3'
    ).lastInsertRowid;

    insertSpecificInfo.run(
      butcherbirdId,
      'Open forests, woodlands, urban areas',
      'Carnivorous – insects, small vertebrates, and occasionally fruit'
    );

    insertGeneralInfo.run(
      butcherbirdId,
      'The Pied Butcherbird is known for its beautiful, flute-like song and is an aggressive feeder. It has distinct black-and-white plumage and is known for its habit of impaling prey for storage, giving it its name.'
    );

    // Eastern Whipbird
    const whipbirdId = insertBird.run(
      'Eastern Whipbird',
      'Psophodes olivaceus',
      'Psophodidae',
      'Passeriformes',
      songbirdsId,
      './src/Birds/Images/songbirds/Eastern_Whipbird.webp',
      './src/Logos-Buttons-Sounds/Eastern_Whipbird.mp3'
    ).lastInsertRowid;

    insertSpecificInfo.run(
      whipbirdId,
      'Dense rainforest and wet sclerophyll forest',
      'Insects, spiders, and other invertebrates'
    );

    insertGeneralInfo.run(
      whipbirdId,
      'The Eastern Whipbird is named for its distinctive call that ends with a sharp crack like a whip. It\'s a secretive bird with olive-green plumage and a black head with white cheek patches, typically found in dense undergrowth where it forages on the ground.'
    );
  }
}

// Database queries
function getBirdGroups() {
  return db.prepare('SELECT * FROM bird_groups').all();
}

function getBirdsByGroup(groupId) {
  return db.prepare('SELECT * FROM birds WHERE group_id = ?').all(groupId);
}

function getBirdData(birdId) {
  const bird = db.prepare('SELECT * FROM birds WHERE id = ?').get(birdId);
  const specificInfo = db.prepare('SELECT * FROM specific_info WHERE bird_id = ?').get(birdId);
  const generalInfo = db.prepare('SELECT * FROM general_info WHERE bird_id = ?').get(birdId);

  return {
    ...bird,
    habitat: specificInfo.habitat,
    diet: specificInfo.diet,
    description: generalInfo.description
  };
}

function getBirdByName(name) {
  const bird = db.prepare('SELECT * FROM birds WHERE name = ?').get(name);
  if (!bird) return null;
  
  const specificInfo = db.prepare('SELECT * FROM specific_info WHERE bird_id = ?').get(bird.id);
  const generalInfo = db.prepare('SELECT * FROM general_info WHERE bird_id = ?').get(bird.id);

  return {
    id: bird.id,
    name: bird.name,
    sciName: bird.scientific_name,
    family: bird.family,
    order: bird.order_name,
    habitat: specificInfo.habitat,
    diet: specificInfo.diet,
    description: generalInfo.description,
    imagePath: bird.image_path,
    soundPath: bird.sound_path
  };
}

function getGroupNameById(groupId) {
  const group = db.prepare('SELECT name FROM bird_groups WHERE id = ?').get(groupId);
  return group ? group.name : null;
}

function getBirdsByGroupName(groupName) {
  const group = db.prepare('SELECT id FROM bird_groups WHERE name = ?').get(groupName);
  if (!group) return [];
  
  return db.prepare('SELECT name FROM birds WHERE group_id = ?').all(group.id).map(bird => bird.name);
}

// CRUD operations for admin

// Admin Authentication
function validateAdminCredentials(username, password) {
  const admin = db.prepare('SELECT * FROM admin WHERE username = ? AND password = ?').get(username, password);
  return admin !== undefined;
}

// Bird Groups CRUD
function createBirdGroup(name) {
  try {
    const insertGroup = db.prepare('INSERT INTO bird_groups (name) VALUES (?)');
    const result = insertGroup.run(name);
    return { success: true, id: result.lastInsertRowid };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

function updateBirdGroup(id, name) {
  try {
    const updateGroup = db.prepare('UPDATE bird_groups SET name = ? WHERE id = ?');
    const result = updateGroup.run(name, id);
    return { success: result.changes > 0, changes: result.changes };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

function deleteBirdGroup(id) {
  try {
    // First check if there are birds in this group
    const birdCount = db.prepare('SELECT COUNT(*) as count FROM birds WHERE group_id = ?').get(id);
    if (birdCount.count > 0) {
      return { success: false, error: 'Cannot delete group with birds. Delete birds first.' };
    }
    
    const deleteGroup = db.prepare('DELETE FROM bird_groups WHERE id = ?');
    const result = deleteGroup.run(id);
    return { success: result.changes > 0, changes: result.changes };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

// Birds CRUD
function createBird(birdData) {
  const { 
    name, 
    scientific_name, 
    family, 
    order_name, 
    group_id, 
    image_path, 
    sound_path, 
    habitat, 
    diet, 
    description 
  } = birdData;

  // Begin transaction
  const trx = db.transaction(() => {
    // Insert bird
    const insertBird = db.prepare(`
      INSERT INTO birds (name, scientific_name, family, order_name, group_id, image_path, sound_path)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `);
    
    const birdResult = insertBird.run(
      name, 
      scientific_name, 
      family, 
      order_name, 
      group_id, 
      image_path, 
      sound_path
    );
    
    const birdId = birdResult.lastInsertRowid;
    
    // Insert specific info
    const insertSpecificInfo = db.prepare(`
      INSERT INTO specific_info (bird_id, habitat, diet)
      VALUES (?, ?, ?)
    `);
    
    insertSpecificInfo.run(birdId, habitat, diet);
    
    // Insert general info
    const insertGeneralInfo = db.prepare(`
      INSERT INTO general_info (bird_id, description)
      VALUES (?, ?)
    `);
    
    insertGeneralInfo.run(birdId, description);
    
    return birdId;
  });

  try {
    const birdId = trx();
    return { success: true, id: birdId };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

function updateBird(birdId, birdData) {
  const { 
    name, 
    scientific_name,
    sciName,
    family, 
    order_name,
    order,
    group_id,
    groupId,
    image_path, 
    sound_path, 
    habitat, 
    diet, 
    description 
  } = birdData;

  // Use scientific_name if available, otherwise use sciName
  const finalScientificName = scientific_name || sciName;
  // Use order_name if available, otherwise use order
  const finalOrderName = order_name || order;
  // Use group_id if available, otherwise use groupId
  const finalGroupId = group_id || groupId;

  // Begin transaction
  const trx = db.transaction(() => {
    // Update bird
    const updateBird = db.prepare(`
      UPDATE birds 
      SET name = ?, scientific_name = ?, family = ?, order_name = ?, 
          group_id = ?, image_path = ?, sound_path = ?
      WHERE id = ?
    `);
    
    updateBird.run(
      name, 
      finalScientificName,
      family, 
      finalOrderName,
      finalGroupId,
      image_path, 
      sound_path,
      birdId
    );
    
    // Update specific info
    const updateSpecificInfo = db.prepare(`
      UPDATE specific_info 
      SET habitat = ?, diet = ?
      WHERE bird_id = ?
    `);
    
    updateSpecificInfo.run(habitat, diet, birdId);
    
    // Update general info
    const updateGeneralInfo = db.prepare(`
      UPDATE general_info 
      SET description = ?
      WHERE bird_id = ?
    `);
    
    updateGeneralInfo.run(description, birdId);
    
    return true;
  });

  try {
    trx();
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

function deleteBird(birdId) {
  // Begin transaction
  const trx = db.transaction(() => {
    // Delete general info
    db.prepare('DELETE FROM general_info WHERE bird_id = ?').run(birdId);
    
    // Delete specific info
    db.prepare('DELETE FROM specific_info WHERE bird_id = ?').run(birdId);
    
    // Delete bird
    db.prepare('DELETE FROM birds WHERE id = ?').run(birdId);
    
    return true;
  });

  try {
    trx();
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

// Get all birds with complete info
function getAllBirds() {
  const birds = db.prepare('SELECT * FROM birds').all();
  
  return birds.map(bird => {
    const specificInfo = db.prepare('SELECT * FROM specific_info WHERE bird_id = ?').get(bird.id);
    const generalInfo = db.prepare('SELECT * FROM general_info WHERE bird_id = ?').get(bird.id);
    const groupName = getGroupNameById(bird.group_id);
    
    return {
      id: bird.id,
      name: bird.name,
      sciName: bird.scientific_name,
      family: bird.family,
      order: bird.order_name,
      groupId: bird.group_id,
      groupName,
      habitat: specificInfo.habitat,
      diet: specificInfo.diet,
      description: generalInfo.description,
      imagePath: bird.image_path,
      soundPath: bird.sound_path
    };
  });
}

// Initialize the database
initializeDatabase();
seedDatabase();

export {
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
}; 