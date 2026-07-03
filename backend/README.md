# Mondial 2026 Backend

This is a simple Node.js backend for storing and syncing Mondial 2026 betting results.

## Quick Start on Contabo Server

1. **Upload the `backend` folder** to your server.
2. **Install Node.js** if not already installed:
   ```bash
   curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
   sudo apt-get install -y nodejs
   ```
3. **Navigate to the folder and install dependencies**:
   ```bash
   cd backend
   npm install
   ```
4. **Start the server** (using PM2 is recommended for keeping it running):
   ```bash
   sudo npm install -g pm2
   pm2 start server.js --name mondial-backend
   pm2 save
   pm2 startup
   ```
5. **Open port 3000** in your firewall:
   ```bash
   sudo ufw allow 3000
   ```

## Update Frontend
Don't forget to update the `BACKEND_URL` in `index.html` with your server's IP address.
