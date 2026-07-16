# Building & Publishing PyMentor

This guide explains how to build the standalone Windows desktop application (Electron `.exe`), as well as how to publish the core server to the NPM registry.

---

## 📦 Building the Windows Desktop App (.exe)

PyMentor is packaged as a standalone Windows application using Electron and a bundled Node.js runtime. This allows it to run completely offline without requiring end-users to install Node.js, Python, or configure any environments.

### 1. Generate and Populate the Database (`pymentor.db`)
Before packaging the app, you MUST ensure that your local SQLite database is fully up-to-date and seeded with the latest Python curriculum data. The Electron packager directly copies your local `pymentor.db` file into the final installer.

Run the following commands in the root of the project:
```powershell
# 1. Create or update the database tables based on your Prisma schema
npm run db:push

# 2. Seed the database with all Python curriculum content
npm run db:seed
```

### 2. Build the Executable Installer
Once the database is successfully populated, you can generate the `.exe` installer. This single command handles building the Next.js production server, copying the database and static assets, and packaging the Electron application.

```powershell
npm run build:electron
```

When the process finishes, your installer will be located in the `release/` directory (e.g., `release/PyMentor Setup 1.0.10.exe`).

---

## ☁️ Publishing to NPM

If you need to publish the raw Next.js application to NPM (for developers), follow these steps. Note that the default bash scripts might not work automatically on Windows.

## Prerequisites
1. Ensure you have Node.js 18+ installed.
2. Ensure you are logged into your npm account (`mahesh-dev07`):
   ```powershell
   npm login
   ```

## Publishing Steps (Windows Native - PowerShell/CMD)

If you are using Windows Command Prompt or PowerShell, the default `bash` scripts will not work. You must run the build steps manually to package the standalone server.

Run the following commands in the root of the project:

### 1. Generate the SQLite Prisma client
```powershell
npx prisma generate --schema=prisma/schema.sqlite.prisma
```

### 2. Build the Next.js application
```powershell
npm run build
```

### 3. Package the distribution
This step copies the standalone server, static assets, and creates an optimized `package.json` specifically for NPM.
```powershell
npm run prepare-dist
```

### 4. Publish to NPM
Navigate into the newly created `dist/` directory and publish!
```powershell
cd dist
npm publish --access public
```

---

## Publishing Steps (Mac / Linux / Git Bash / WSL)

If you are using a bash-compatible terminal, the process is completely automated by the `scripts/build.sh` file. 

From the root of the project, simply run:

### 1. Run the automated build script
```bash
npm run build:npm
```

### 2. Publish to NPM
Navigate into the newly created `dist/` directory and publish:
```bash
cd dist
npm publish --access public
```

## Troubleshooting

### "404 Not Found" during `npm publish`
If you receive a `404 Not Found - PUT https://registry.npmjs.org/pymentor - Not found` error when running `npm publish`, it almost always means your **NPM authentication token has expired** or lost write permissions.

**Fix:** Run `npm login` again to refresh your session, then try publishing again.
