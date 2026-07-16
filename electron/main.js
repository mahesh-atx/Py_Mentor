const { app, BrowserWindow, dialog, ipcMain } = require('electron');
const path = require('path');
const { spawn, spawnSync } = require('child_process');
const fs = require('fs');
const net = require('net');
const { autoUpdater } = require('electron-updater');

const isDev = !app.isPackaged;

let mainWindow;
let nextProcess;

function isPortInUse(port) {
  return new Promise((resolve) => {
    const socket = new net.Socket();
    socket.once('connect', () => {
      socket.destroy();
      resolve(true); // Port is in use (Server is ready!)
    });
    socket.once('error', () => {
      socket.destroy();
      resolve(false); // Port not in use yet
    });
    socket.connect(port, '127.0.0.1');
  });
}

function waitForServer(port) {
  return new Promise((resolve) => {
    const interval = setInterval(async () => {
      const ready = await isPortInUse(port);
      if (ready) {
        clearInterval(interval);
        resolve();
      }
    }, 250);
  });
}

async function findAvailablePort(startPort, maxAttempts = 10) {
  for (let port = startPort; port < startPort + maxAttempts; port++) {
    // If it's NOT in use, it is available
    if (!(await isPortInUse(port))) {
      return port;
    }
  }
  return startPort;
}

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1280,
    height: 800,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.js'),
    },
    autoHideMenuBar: true,
    show: false, // Don't show until ready to prevent flashing
    backgroundColor: '#09090b' // Zinc 950
  });

  // Load the loading screen first!
  mainWindow.loadFile(path.join(__dirname, 'loading.html'));
  
  mainWindow.once('ready-to-show', () => {
    mainWindow.show();
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

async function startNextServer() {
  const port = await findAvailablePort(3000);
  
  const userDataPath = app.getPath('userData');
  const dbPath = path.join(userDataPath, 'pymentor.db');
  
  // Format path for Prisma (replace backslashes with forward slashes on Windows)
  const prismaDbPath = dbPath.replace(/\\/g, '/');

  // Set the environment variables for the Next.js server
  const env = {
    ...process.env,
    PORT: String(port),
    HOSTNAME: '127.0.0.1',
    DATABASE_URL: `file:${prismaDbPath}`,
    NODE_ENV: 'production'
  };

  // Find the server.js script in the packaged app
  // It is packaged in extraResources, so it will be at process.resourcesPath/dist/server/server.js
  const packagedServer = path.join(process.resourcesPath, 'dist', 'server', 'server.js');
  const devServer = path.join(__dirname, '..', 'dist', 'server', 'server.js');
  
  let finalServerPath = devServer;
  if (fs.existsSync(packagedServer)) {
    finalServerPath = packagedServer;
  } else if (!fs.existsSync(finalServerPath)) {
    console.error(`Next.js server not found at ${finalServerPath} or ${packagedServer}`);
    dialog.showErrorBox(
      'Server Not Found',
      `The production server was not found. Please ensure the app was built correctly.`
    );
    app.quit();
    return;
  }

  // Use the standalone node.exe bundled with the app to avoid Electron ABI issues
  const nodeExecutable = path.join(path.dirname(finalServerPath), 'node.exe');

  if (!fs.existsSync(dbPath)) {
    try {
      console.log('Database not found. Copying pre-populated database...');
      // In production, the DB is at process.resourcesPath/dist/pymentor.db
      // In development, it's at __dirname/../dist/pymentor.db
      const packagedDb = path.join(process.resourcesPath, 'dist', 'pymentor.db');
      const devDb = path.join(__dirname, '..', 'dist', 'pymentor.db');
      const sourceDb = fs.existsSync(packagedDb) ? packagedDb : devDb;
      
      if (fs.existsSync(sourceDb)) {
        fs.copyFileSync(sourceDb, dbPath);
        console.log('Successfully copied pymentor.db to', dbPath);
      } else {
        console.error('Source database not found at', sourceDb);
      }
    } catch (e) {
      console.error('Database copy error', e);
    }
  }

  console.log(`Starting Next.js server from ${finalServerPath} on port ${port}...`);
  console.log(`Using Database at ${dbPath}`);

  const logPath = path.join(userDataPath, 'server-log.txt');
  const logStream = fs.createWriteStream(logPath, { flags: 'a' });

  nextProcess = spawn(nodeExecutable, [finalServerPath], {
    env,
    cwd: path.dirname(finalServerPath),
    stdio: ['ignore', 'pipe', 'pipe'], // capture output instead of ignore
    windowsHide: true // Prevents black terminal window from appearing!
  });

  nextProcess.stdout.pipe(logStream);
  nextProcess.stderr.pipe(logStream);

  nextProcess.on('error', (err) => {
    console.error('Failed to start Next.js process', err);
  });

  nextProcess.on('exit', (code) => {
    console.log(`Next.js process exited with code ${code}`);
  });

  // Auto Updater Setup
  if (!isDev) {
    autoUpdater.autoDownload = false;
    autoUpdater.autoInstallOnAppQuit = true;
    
    autoUpdater.on('update-available', (info) => {
      if (mainWindow) mainWindow.webContents.send('update-available', info);
    });
    
    autoUpdater.on('update-not-available', (info) => {
      if (mainWindow) mainWindow.webContents.send('update-not-available', info);
    });
    
    autoUpdater.on('download-progress', (progressObj) => {
      if (mainWindow) mainWindow.webContents.send('download-progress', progressObj);
    });
    
    autoUpdater.on('update-downloaded', (info) => {
      if (mainWindow) mainWindow.webContents.send('update-downloaded', info);
    });
    
    autoUpdater.on('error', (err) => {
      if (mainWindow) mainWindow.webContents.send('updater-error', err.message);
    });
    
    ipcMain.on('check-for-updates', () => {
      autoUpdater.checkForUpdates();
    });
    
    ipcMain.on('download-update', () => {
      autoUpdater.downloadUpdate();
    });
    
    ipcMain.on('install-update', () => {
      autoUpdater.quitAndInstall();
    });
    
    ipcMain.handle('get-version', () => {
      return app.getVersion();
    });
    
    autoUpdater.checkForUpdates();
  }

  // Wait until the server actually binds the port
  await waitForServer(port);
  
  // Now load the real URL
  if (mainWindow) {
    mainWindow.loadURL(`http://localhost:${port}`);
  }
}

app.whenReady().then(() => {
  if (isDev) {
    createWindow();
    mainWindow.loadURL(`http://localhost:3000`);
  } else {
    createWindow();
    startNextServer();
  }

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
      if (isDev) mainWindow.loadURL(`http://localhost:3000`);
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('quit', () => {
  if (nextProcess) {
    nextProcess.kill('SIGTERM');
  }
});
