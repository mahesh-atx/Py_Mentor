const fs = require('fs');

const migrationPath = 'prisma/migrations.sqlite/00000000000000_init/migration.sql';
let c = fs.readFileSync(migrationPath, 'utf8');

// The string to replace
const badDefault = ` DEFAULT (lower(hex(randomblob(4)) || '-' || hex(randomblob(2)) || '-4' || substr(hex(randomblob(2)),2) || '-' || substr('89ab',abs(random()) % 4 + 1, 1) || substr(hex(randomblob(2)),2) || '-' || hex(randomblob(6))))`;

// Remove the default entirely for UUIDs
c = c.split(badDefault).join('');

fs.writeFileSync(migrationPath, c);
console.log('Fixed migration.sql');
