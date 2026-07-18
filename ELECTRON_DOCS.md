# PyMentor - Electron Desktop Architecture & Publishing Guide

This document explains the architecture, development workflow, and publishing process for the PyMentor desktop application.

## 🏗️ Architecture Overview

PyMentor is built as a hybrid application using **Next.js** for the frontend and **Electron** as a native desktop wrapper. 

Because PyMentor requires a database (SQLite via Prisma) and a server to run offline, it does not use standard static HTML exports. Instead, it leverages the **Next.js Standalone Build** feature. 

1. **Next.js Standalone**: Compiles the entire Next.js server into a minimal `server.js` file with bundled `node_modules`.
2. **Electron Main Process (`electron/main.js`)**: 
   - Spawns a background Node.js process using the packaged `server.js`.
   - Bootstraps the SQLite database (`pymentor.db`) by copying a pre-seeded database into the user's hidden AppData folder.
   - Shows a native loading screen while the server boots up.
   - Replaces the loading screen with the fully functional app once the server is listening on a local port.

---

## 🛠️ Development Workflow

To run the app locally during development:

```bash
npm run dev:electron
```
This command runs `concurrently` to start the Next.js development server (`npm run dev`) and then instantly launches the Electron window connecting to `http://localhost:3000`.

---

## 🚀 Building & Publishing

We use `electron-builder` combined with a custom `prepare-dist.js` script to package the app.

### 1. Preparation & Building
To build and publish a new version of the app, simply run:

```powershell
$env:GH_TOKEN="ghp_your_personal_access_token"
npm run publish:electron
```

**What this command does behind the scenes:**
1. Generates the Prisma Client for production.
2. Builds the Next.js app (`next build`).
3. Runs `node scripts/prepare-dist.js` which organizes the standalone files, copies the bundled `.node` binary files (like Prisma engines), and ensures the pre-seeded SQLite database is included in the package.
4. Runs `electron-builder build --win -p always` to compile the Windows `.exe` installer.
5. Automatically pushes the `.exe` installer and `latest.yml` to the GitHub Releases page using your token.

---

## 🔄 Auto-Updater System

PyMentor includes a seamless, silent auto-updating system powered by `electron-updater`. 

### How it works:
1. Every time the user opens PyMentor, the app reaches out to the `mahesh-atx/Py_Mentor` GitHub repository.
2. It looks for a file named **`latest.yml`** in the newest GitHub Release.
3. If the version in `latest.yml` is higher than the user's current version, the app begins downloading the new `.exe` file in the background.
4. The UI shows download progress and prompts the user to install and restart when ready.

### ⚠️ Common Update Issues & Fixes

#### 1. "EBUSY: resource busy or locked, unlink... app.asar"
- **Cause:** You tried to run `npm run publish:electron`, but an instance of PyMentor is currently running on your computer.
- **Fix:** Close the PyMentor app completely. Check the system tray or Task Manager to ensure the `PyMentor` background process is killed, then run the command again.

#### 2. "Failed to download update... status 404"
- **Cause:** The `latest.yml` file was missing from your GitHub release, or the `.exe` file on GitHub has a different name than what `latest.yml` expects (e.g. dots instead of hyphens).
- **Fix:** 
  1. Go to your GitHub Releases page and click Edit on the latest release.
  2. Ensure **both** `PyMentor-Setup-[version].exe` and `latest.yml` are present in the assets.
  3. Ensure the `.exe` file has **hyphens** (not spaces or dots). *Note: The `package.json` is now configured to generate it with hyphens automatically.*

#### 3. "No published versions on GitHub"
- **Cause:** The release was uploaded as a **Draft** by `electron-builder`, or your repository is set to Private.
- **Fix:** Ensure the GitHub repository is public. If the release has a Draft badge, edit it on GitHub and click the green **Publish release** button.
