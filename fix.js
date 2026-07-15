const fs = require('fs');
let c = fs.readFileSync('prisma/schema.sqlite.prisma', 'utf8');
c = c.replace(/@default\("lower\(hex\(randomblob[\s\S]*?"\)/g, '@default(uuid())');
fs.writeFileSync('prisma/schema.sqlite.prisma', c);
