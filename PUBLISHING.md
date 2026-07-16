# Publishing PyMentor to NPM

This guide explains how to build and publish PyMentor to the NPM registry, specifically addressing Windows environments where the default bash script (`build:npm`) might not run automatically.

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
