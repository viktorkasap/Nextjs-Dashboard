- Prisma v 5.21.1
- [Prisma Models](https://www.prisma.io/docs/orm/prisma-schema/data-model/models)

```bash 
#1
pnpm add prisma @prisma/client@latest @prisma/extension-accelerate
```
```bash
#2
npx prisma init
```
```bash
#3
npx prisma generate --no-engine
```
```bash
#4 Migration init
npx prisma migrate dev --name init  
```
```bash
#5
npx prisma studio
```

### Utils
```bash
# Update migration
npx prisma migrate dev --name add-updatedAt-field
```
```bash
#  
npx prisma generate
```
- Prisma v 5.21.1
- [Prisma Models](https://www.prisma.io/docs/orm/prisma-schema/data-model/models)

```bash 
#1
pnpm add prisma @prisma/client@latest @prisma/extension-accelerate
```
```bash
#2
npx prisma init
```
```bash
#3
npx prisma generate --no-engine
```
```bash
#4 Migration init
npx prisma migrate dev --name init  
```
```bash
#5
npx prisma studio
```

### Utils
```bash
# Update migration
npx prisma migrate dev --name <updated name>
```
```bash
# After the schema change, example is @@unique([country, city])
# This will create new types for your project so Prisma can understand how to work with composite keys.
npx prisma generate
````

### Status migration
```bash
npx prisma migrate status
```

