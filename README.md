# Bird App

A React application that displays information about different bird species, now with a SQLite database backend.

## Project Structure

- `src/App.jsx`: The main React component that displays bird information
- `src/database.js`: Database setup and queries using better-sqlite3
- `src/server.js`: Express server that provides API endpoints for the frontend

## Database Schema

The application uses a SQLite database with the following tables:

1. **bird_groups**: Stores different categories of birds
   - `id`: Primary key
   - `name`: Group name (e.g., "Songbirds")

2. **birds**: Stores basic bird information
   - `id`: Primary key
   - `name`: Bird name
   - `scientific_name`: Scientific name
   - `family`: Bird family
   - `order_name`: Taxonomic order
   - `group_id`: Foreign key to bird_groups
   - `image_path`: Path to bird image
   - `sound_path`: Path to bird sound

3. **specific_info**: Stores specific information about birds
   - `id`: Primary key
   - `bird_id`: Foreign key to birds
   - `habitat`: Habitat description
   - `diet`: Diet description

4. **general_info**: Stores general descriptions about birds
   - `id`: Primary key
   - `bird_id`: Foreign key to birds
   - `description`: General description

## Installation

1. Clone the repository
2. Install dependencies:
   ```
   npm install
   ```

## Running the Application

To start both the React frontend and Express backend concurrently:

```
npm run start
```

This will start:
- The React development server on port 5173 (default Vite port)
- The Express API server on port 3001

## API Endpoints

- `GET /api/bird-groups`: Get all bird groups
- `GET /api/birds/group/:groupId`: Get birds by group ID
- `GET /api/birds/group-name/:groupName`: Get birds by group name
- `GET /api/bird/:id`: Get bird data by ID
- `GET /api/bird/name/:name`: Get bird data by name
- `GET /api/group/:id/name`: Get group name by ID

## File Handling and Security

### Media Files
The application uses file paths instead of storing actual media files in the database. This approach was chosen for several reasons:

1. **Security:**
   - Prevents potential security risks from malicious file uploads
   - Protects against buffer overflow attacks through media files
   - Reduces the risk of server compromise through file processing vulnerabilities
   - Maintains better control over content integrity

2. **Performance:**
   - Reduces database size and improves query performance
   - Faster database operations and backups
   - Better memory management
   - Improved application loading times

3. **Maintenance and Scalability:**
   - Easier to update or replace files without changing database records
   - Simpler backup and restore procedures
   - More flexible file organization and structure
   - Better separation of concerns between data and media

4. **File Structure:**
   - Images should be placed in the `public/images` directory
   - Audio files should be placed in the `public/sounds` directory
   - File paths in the database should be relative to these directories
   - Example paths:
     - Images: `/images/bird-name.webp`
     - Sounds: `/sounds/bird-name.mp3`

5. **File Requirements:**
   - Images: WebP format recommended for optimal performance
   - Audio: MP3 format for broad compatibility
   - All files should be pre-verified before being added to the project
   - File names should be lowercase and use hyphens for spaces

### Setting Up on a New Machine

When setting up the project on a new machine:

1. Ensure all media files are properly placed in their respective directories
2. Verify file paths in the database match the actual file locations
3. Check file permissions to ensure the application can access the media files
4. Do not modify the file structure without updating the database accordingly

### Best Practices

1. **File Management:**
   - Keep file sizes optimized for web delivery
   - Use consistent naming conventions
   - Regularly audit and clean up unused files
   - Maintain a backup of all media files

2. **Database Management:**
   - Keep file paths consistent and well-documented
   - Regularly validate that all referenced files exist
   - Implement proper error handling for missing files
   - Consider implementing a file validation system

3. **Version Control:**
   - Media files should be tracked in version control
   - Use .gitignore appropriately for temporary files
   - Consider using Git LFS for large files
   - Maintain a clear history of file changes
