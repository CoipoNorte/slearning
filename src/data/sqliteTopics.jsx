/* ============================================
   sqliteTopics.jsx — TODOS los temas de SQLite (10/10)
   ============================================ */
import CodeBlock from '../components/ui/CodeBlock'
import ArchCard from '../components/ui/ArchCard'
import LiveDemo from '../components/ui/LiveDemo'
import TerminalBlock from '../components/ui/Terminal'

function SqlIntro() {
  return (
    <div className="space-y-5">
      <h2 className="text-base font-bold text-arch-cyan font-mono">📖 ¿Qué es SQLite?</h2>
      <p className="text-sm text-arch-white/70">Base de datos embebida en un solo archivo. Sin servidor.</p>
      <div className="grid lg:grid-cols-2 gap-4">
        <ArchCard title="¿Por qué SQLite?" icon="🤔" variant="cyan">
          <ul className="space-y-1.5 text-xs">
            <li><span className="text-arch-green">✓</span> Sin servidor — es un archivo .db</li>
            <li><span className="text-arch-green">✓</span> Zero config — no hay que instalar nada</li>
            <li><span className="text-arch-green">✓</span> SQL estándar — lo aprendido sirve para PostgreSQL</li>
            <li><span className="text-arch-green">✓</span> Portable — copias el archivo y listo</li>
          </ul>
        </ArchCard>
        <ArchCard title="SQLite vs PostgreSQL vs MongoDB" icon="⚔️" variant="default">
          <ul className="space-y-1 text-xs">
            <li><span className="text-arch-cyan">SQLite</span> — Archivo local, prototipos, apps pequeñas</li>
            <li><span className="text-arch-blue">PostgreSQL</span> — Servidor, producción, escalable</li>
            <li><span className="text-arch-green">MongoDB</span> — NoSQL, documentos JSON</li>
          </ul>
        </ArchCard>
      </div>
    </div>
  )
}

function SqlSetup() {
  return (
    <div className="space-y-5">
      <h2 className="text-base font-bold text-arch-cyan font-mono">🚀 Setup con better-sqlite3</h2>
      <p className="text-sm text-arch-white/70">La librería más rápida para SQLite en Node.js.</p>
      <div className="grid lg:grid-cols-2 gap-4">
        <TerminalBlock user="dev" host="arch" path="~/mi-api" commands={[
          { type: 'input', text: 'npm install better-sqlite3' },
          { type: 'input', text: 'mkdir database' },
        ]} />
        <CodeBlock title="database/db.js" language="js"
          code={`import Database from 'better-sqlite3';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const db = new Database(path.join(__dirname, 'app.db'));

db.pragma('journal_mode = WAL');
db.pragma('foreign_keys = ON');

db.exec(\`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    created_at TEXT DEFAULT (datetime('now'))
  )
\`);

export default db;`} />
      </div>
    </div>
  )
}

function SqlCreate() {
  return (
    <div className="space-y-5">
      <h2 className="text-base font-bold text-arch-cyan font-mono">🏗️ CREATE y Tipos de Datos</h2>
      <p className="text-sm text-arch-white/70">Crear tablas con los tipos de datos correctos.</p>
      <div className="grid lg:grid-cols-2 gap-4">
        <CodeBlock title="CREATE TABLE" language="sql"
          code={`-- Tabla de usuarios
CREATE TABLE IF NOT EXISTS users (
  id          INTEGER PRIMARY KEY AUTOINCREMENT,
  name        TEXT NOT NULL,
  email       TEXT UNIQUE NOT NULL,
  age         INTEGER DEFAULT 0,
  is_active   INTEGER DEFAULT 1,  -- boolean (0/1)
  bio         TEXT,
  salary      REAL,
  avatar      BLOB,
  created_at  TEXT DEFAULT (datetime('now')),
  updated_at  TEXT DEFAULT (datetime('now'))
);

-- Tabla con foreign key
CREATE TABLE IF NOT EXISTS posts (
  id        INTEGER PRIMARY KEY AUTOINCREMENT,
  title     TEXT NOT NULL,
  content   TEXT NOT NULL,
  user_id   INTEGER NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users(id)
    ON DELETE CASCADE
);

-- Índices (acelerar búsquedas)
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_posts_user ON posts(user_id);

-- Eliminar tabla
DROP TABLE IF EXISTS tabla_vieja;

-- Modificar tabla
ALTER TABLE users ADD COLUMN phone TEXT;
ALTER TABLE users RENAME COLUMN phone TO telephone;`} />
        <ArchCard title="Tipos de datos SQLite" icon="📋" variant="cyan">
          <div className="space-y-1.5 text-xs">
            <div className="p-1.5 rounded bg-term-bg border border-term-border">
              <span className="text-arch-cyan font-bold">INTEGER</span>
              <span className="text-arch-gray ml-2">Números enteros: 1, 42, -7</span>
            </div>
            <div className="p-1.5 rounded bg-term-bg border border-term-border">
              <span className="text-arch-green font-bold">TEXT</span>
              <span className="text-arch-gray ml-2">Cadenas de texto: "Hola"</span>
            </div>
            <div className="p-1.5 rounded bg-term-bg border border-term-border">
              <span className="text-arch-yellow font-bold">REAL</span>
              <span className="text-arch-gray ml-2">Decimales: 3.14, 99.99</span>
            </div>
            <div className="p-1.5 rounded bg-term-bg border border-term-border">
              <span className="text-arch-purple font-bold">BLOB</span>
              <span className="text-arch-gray ml-2">Binario: imágenes, archivos</span>
            </div>
            <div className="p-1.5 rounded bg-term-bg border border-term-border">
              <span className="text-arch-gray-light font-bold">NULL</span>
              <span className="text-arch-gray ml-2">Sin valor</span>
            </div>
          </div>
        </ArchCard>
      </div>
    </div>
  )
}

function SqlInsert() {
  return (
    <div className="space-y-5">
      <h2 className="text-base font-bold text-arch-cyan font-mono">✏️ INSERT, UPDATE y DELETE</h2>
      <p className="text-sm text-arch-white/70">Escribir, modificar y borrar datos.</p>
      <div className="grid lg:grid-cols-2 gap-4">
        <CodeBlock title="SQL puro" language="sql"
          code={`-- ── INSERT ──
INSERT INTO users (name, email) VALUES ('Ana', 'ana@mail.com');
INSERT INTO users (name, email, age) VALUES ('Carlos', 'c@mail.com', 30);

-- Insert múltiple
INSERT INTO users (name, email) VALUES
  ('Ada', 'ada@mail.com'),
  ('Bob', 'bob@mail.com'),
  ('Eve', 'eve@mail.com');

-- ── UPDATE ──
UPDATE users SET name = 'Ana García' WHERE id = 1;
UPDATE users SET age = 31, is_active = 1 WHERE email = 'c@mail.com';
UPDATE users SET updated_at = datetime('now') WHERE id = 1;

-- ── DELETE ──
DELETE FROM users WHERE id = 5;
DELETE FROM users WHERE is_active = 0;
DELETE FROM users WHERE created_at < '2024-01-01';`} />
        <CodeBlock title="Con better-sqlite3" language="js"
          code={`// INSERT con parámetros (seguro contra SQL injection)
const insert = db.prepare(
  'INSERT INTO users (name, email) VALUES (?, ?)'
);
const result = insert.run('Ana', 'ana@mail.com');
console.log(result.lastInsertRowid);  // ID del nuevo

// UPDATE
const update = db.prepare(
  'UPDATE users SET name = ?, email = ? WHERE id = ?'
);
const result2 = update.run('Ana García', 'ana@mail.com', 1);
console.log(result2.changes);  // filas afectadas

// DELETE
const del = db.prepare('DELETE FROM users WHERE id = ?');
del.run(5);

// ── TRANSACCIONES (todo o nada) ──
const insertMany = db.transaction((users) => {
  const stmt = db.prepare('INSERT INTO users (name, email) VALUES (?, ?)');
  for (const user of users) {
    stmt.run(user.name, user.email);
  }
});

insertMany([
  { name: 'Ada', email: 'ada@mail.com' },
  { name: 'Bob', email: 'bob@mail.com' },
]);`} />
      </div>
    </div>
  )
}

function SqlSelect() {
  return (
    <div className="space-y-5">
      <h2 className="text-base font-bold text-arch-cyan font-mono">🔍 SELECT y Filtros</h2>
      <p className="text-sm text-arch-white/70">Consultar datos con filtros, orden y agrupación.</p>
      <div className="grid lg:grid-cols-2 gap-4">
        <CodeBlock title="SELECT queries" language="sql"
          code={`-- Todos los campos
SELECT * FROM users;

-- Campos específicos
SELECT name, email FROM users;

-- ── WHERE (filtros) ──
SELECT * FROM users WHERE age > 25;
SELECT * FROM users WHERE name = 'Ana';
SELECT * FROM users WHERE email LIKE '%@gmail.com';
SELECT * FROM users WHERE age BETWEEN 20 AND 30;
SELECT * FROM users WHERE name IN ('Ana', 'Carlos', 'Eve');
SELECT * FROM users WHERE bio IS NOT NULL;

-- ── AND / OR ──
SELECT * FROM users WHERE age > 25 AND is_active = 1;
SELECT * FROM users WHERE name = 'Ana' OR name = 'Bob';

-- ── ORDER BY ──
SELECT * FROM users ORDER BY name ASC;
SELECT * FROM users ORDER BY created_at DESC;

-- ── LIMIT y OFFSET (paginación) ──
SELECT * FROM users LIMIT 10;           -- primeros 10
SELECT * FROM users LIMIT 10 OFFSET 20; -- página 3

-- ── COUNT, SUM, AVG, MIN, MAX ──
SELECT COUNT(*) as total FROM users;
SELECT AVG(age) as promedio FROM users;
SELECT MAX(salary) as maximo FROM users;

-- ── GROUP BY ──
SELECT is_active, COUNT(*) as cantidad
FROM users GROUP BY is_active;

-- ── HAVING (filtro después de GROUP) ──
SELECT user_id, COUNT(*) as posts
FROM posts GROUP BY user_id HAVING posts > 5;

-- ── ALIAS ──
SELECT name AS nombre, email AS correo FROM users;

-- ── DISTINCT (sin duplicados) ──
SELECT DISTINCT city FROM users;`} />
        <CodeBlock title="Con better-sqlite3" language="js"
          code={`// .all() — todos los resultados (array)
const users = db.prepare('SELECT * FROM users').all();

// .get() — un solo resultado (objeto o undefined)
const user = db.prepare('SELECT * FROM users WHERE id = ?').get(1);

// .pluck() — solo un valor
const count = db.prepare('SELECT COUNT(*) FROM users').pluck().get();

// Con parámetros
const active = db.prepare(
  'SELECT * FROM users WHERE is_active = ? AND age > ?'
).all(1, 25);

// Parámetros nombrados
const stmt = db.prepare(
  'SELECT * FROM users WHERE name = @name AND age > @minAge'
);
const results = stmt.all({ name: 'Ana', minAge: 20 });

// Paginación
const page = 2;
const limit = 10;
const offset = (page - 1) * limit;
const users = db.prepare(
  'SELECT * FROM users ORDER BY id DESC LIMIT ? OFFSET ?'
).all(limit, offset);`} />
      </div>
    </div>
  )
}

function SqlJoins() {
  return (
    <div className="space-y-5">
      <h2 className="text-base font-bold text-arch-cyan font-mono">🔗 JOIN y Relaciones</h2>
      <p className="text-sm text-arch-white/70">Combinar datos de múltiples tablas.</p>
      <div className="grid lg:grid-cols-2 gap-4">
        <CodeBlock title="Tipos de JOIN" language="sql"
          code={`-- ── INNER JOIN (solo coincidencias) ──
SELECT users.name, posts.title
FROM users
INNER JOIN posts ON users.id = posts.user_id;

-- ── LEFT JOIN (todos del izquierdo + coincidencias) ──
SELECT users.name, COUNT(posts.id) as total_posts
FROM users
LEFT JOIN posts ON users.id = posts.user_id
GROUP BY users.id;

-- ── Ejemplo: usuarios con sus posts ──
SELECT 
  u.id, u.name, u.email,
  p.id as post_id, p.title, p.content
FROM users u
LEFT JOIN posts p ON u.id = p.user_id
ORDER BY u.name, p.created_at DESC;

-- ── Múltiples JOINs ──
SELECT u.name, p.title, c.text as comment
FROM users u
JOIN posts p ON u.id = p.user_id
JOIN comments c ON p.id = c.post_id
WHERE u.is_active = 1;

-- ── Relación muchos a muchos ──
CREATE TABLE user_roles (
  user_id INTEGER REFERENCES users(id),
  role_id INTEGER REFERENCES roles(id),
  PRIMARY KEY (user_id, role_id)
);

SELECT u.name, r.name as role
FROM users u
JOIN user_roles ur ON u.id = ur.user_id
JOIN roles r ON ur.role_id = r.id;`} />
        <LiveDemo title="Tipos de JOIN visual">
          <div className="grid grid-cols-2 gap-3 text-[10px] font-mono">
            <div className="p-2 rounded bg-arch-green/10 border border-arch-green/30 text-center">
              <p className="text-arch-green font-bold">INNER JOIN</p>
              <p className="text-arch-gray mt-1">Solo filas que coinciden en AMBAS tablas</p>
            </div>
            <div className="p-2 rounded bg-arch-blue/10 border border-arch-blue/30 text-center">
              <p className="text-arch-blue font-bold">LEFT JOIN</p>
              <p className="text-arch-gray mt-1">TODOS del izquierdo + coincidencias del derecho</p>
            </div>
            <div className="p-2 rounded bg-arch-yellow/10 border border-arch-yellow/30 text-center">
              <p className="text-arch-yellow font-bold">RIGHT JOIN</p>
              <p className="text-arch-gray mt-1">TODOS del derecho + coincidencias del izquierdo</p>
            </div>
            <div className="p-2 rounded bg-arch-purple/10 border border-arch-purple/30 text-center">
              <p className="text-arch-purple font-bold">CROSS JOIN</p>
              <p className="text-arch-gray mt-1">Producto cartesiano (todas × todas)</p>
            </div>
          </div>
        </LiveDemo>
      </div>
    </div>
  )
}

function SqlAdvanced() {
  return (
    <div className="space-y-5">
      <h2 className="text-base font-bold text-arch-cyan font-mono">⚡ Queries Avanzados</h2>
      <p className="text-sm text-arch-white/70">Subqueries, vistas, funciones y queries complejos.</p>
      <div className="grid lg:grid-cols-2 gap-4">
        <CodeBlock title="Queries avanzados" language="sql"
          code={`-- ── SUBQUERY ──
SELECT * FROM users WHERE id IN (
  SELECT user_id FROM posts GROUP BY user_id HAVING COUNT(*) > 5
);

-- ── EXISTS ──
SELECT * FROM users u WHERE EXISTS (
  SELECT 1 FROM posts p WHERE p.user_id = u.id
);

-- ── CASE (condicional) ──
SELECT name, age,
  CASE
    WHEN age < 18 THEN 'Menor'
    WHEN age < 65 THEN 'Adulto'
    ELSE 'Senior'
  END as categoria
FROM users;

-- ── COALESCE (primer valor no null) ──
SELECT name, COALESCE(bio, 'Sin biografía') as bio FROM users;

-- ── WINDOW FUNCTIONS ──
SELECT name, salary,
  RANK() OVER (ORDER BY salary DESC) as ranking,
  AVG(salary) OVER () as promedio_global
FROM users;

-- ── VISTAS (query guardado) ──
CREATE VIEW active_users AS
SELECT id, name, email FROM users WHERE is_active = 1;

-- Usar como tabla normal
SELECT * FROM active_users;

-- ── UPSERT (insert o update) ──
INSERT INTO users (email, name) VALUES ('a@b.com', 'Ana')
ON CONFLICT(email) DO UPDATE SET name = excluded.name;

-- ── CTE (Common Table Expressions) ──
WITH top_posters AS (
  SELECT user_id, COUNT(*) as cnt FROM posts GROUP BY user_id
)
SELECT u.name, tp.cnt
FROM users u JOIN top_posters tp ON u.id = tp.user_id
ORDER BY tp.cnt DESC LIMIT 10;`} />
        <ArchCard title="Funciones SQLite útiles" icon="🧮" variant="cyan">
          <ul className="space-y-1 text-xs">
            <li><span className="text-arch-cyan">datetime('now')</span> — Fecha/hora actual</li>
            <li><span className="text-arch-cyan">date('now', '-7 days')</span> — Hace 7 días</li>
            <li><span className="text-arch-cyan">length(texto)</span> — Longitud</li>
            <li><span className="text-arch-cyan">upper(texto)</span> — Mayúsculas</li>
            <li><span className="text-arch-cyan">lower(texto)</span> — Minúsculas</li>
            <li><span className="text-arch-cyan">trim(texto)</span> — Quitar espacios</li>
            <li><span className="text-arch-cyan">substr(texto, inicio, largo)</span> — Subcadena</li>
            <li><span className="text-arch-cyan">replace(texto, viejo, nuevo)</span> — Reemplazar</li>
            <li><span className="text-arch-cyan">typeof(valor)</span> — Tipo de dato</li>
            <li><span className="text-arch-cyan">json_extract(json, '$.key')</span> — Leer JSON</li>
          </ul>
        </ArchCard>
      </div>
    </div>
  )
}

function SqlMigrations() {
  return (
    <div className="space-y-5">
      <h2 className="text-base font-bold text-arch-cyan font-mono">📦 Migraciones</h2>
      <p className="text-sm text-arch-white/70">Versionar los cambios de la base de datos de forma controlada.</p>
      <div className="grid lg:grid-cols-2 gap-4">
        <CodeBlock title="database/migrate.js" language="js"
          code={`import db from './db.js';

// Tabla para trackear migraciones
db.exec(\`
  CREATE TABLE IF NOT EXISTS migrations (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT UNIQUE NOT NULL,
    executed_at TEXT DEFAULT (datetime('now'))
  )
\`);

// Definir migraciones en orden
const migrations = [
  {
    name: '001_create_users',
    sql: \`
      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        email TEXT UNIQUE NOT NULL,
        created_at TEXT DEFAULT (datetime('now'))
      )
    \`
  },
  {
    name: '002_create_posts',
    sql: \`
      CREATE TABLE IF NOT EXISTS posts (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        content TEXT NOT NULL,
        user_id INTEGER NOT NULL REFERENCES users(id),
        created_at TEXT DEFAULT (datetime('now'))
      )
    \`
  },
  {
    name: '003_add_user_avatar',
    sql: \`ALTER TABLE users ADD COLUMN avatar TEXT\`
  },
];

// Ejecutar migraciones pendientes
const executed = db.prepare('SELECT name FROM migrations').all().map(m => m.name);

const runMigration = db.transaction(() => {
  for (const migration of migrations) {
    if (!executed.includes(migration.name)) {
      console.log(\`📦 Running: \${migration.name}\`);
      db.exec(migration.sql);
      db.prepare('INSERT INTO migrations (name) VALUES (?)').run(migration.name);
    }
  }
});

runMigration();
console.log('✅ Migraciones completadas');`} />
        <ArchCard title="¿Por qué migraciones?" icon="🤔" variant="blue">
          <ul className="space-y-1.5 text-xs">
            <li><span className="text-arch-green">✓</span> Versionar cambios de la DB en Git</li>
            <li><span className="text-arch-green">✓</span> Todo el equipo tiene la misma estructura</li>
            <li><span className="text-arch-green">✓</span> Reproducible: reconstruir DB desde cero</li>
            <li><span className="text-arch-green">✓</span> Historial de cambios claro</li>
          </ul>
        </ArchCard>
      </div>
    </div>
  )
}

function SqlSecurity() {
  return (
    <div className="space-y-5">
      <h2 className="text-base font-bold text-arch-cyan font-mono">🛡️ SQL Injection</h2>
      <p className="text-sm text-arch-white/70">El ataque más peligroso y cómo prevenirlo.</p>
      <div className="grid lg:grid-cols-2 gap-4">
        <div className="space-y-4">
          <CodeBlock title="❌ VULNERABLE" language="js"
            code={`// NUNCA concatenar input del usuario en SQL
const email = req.body.email;

// ❌ PELIGROSO — SQL Injection
const user = db.prepare(
  \`SELECT * FROM users WHERE email = '\${email}'\`
).get();

// Si email = "' OR '1'='1"
// Query: SELECT * FROM users WHERE email = '' OR '1'='1'
// → Devuelve TODOS los usuarios!

// Si email = "'; DROP TABLE users; --"
// → BORRA toda la tabla!`} />
          <ArchCard title="¿Qué es SQL Injection?" icon="💀" variant="red">
            <p className="text-xs">
              El atacante mete código SQL en un input para manipular la base de datos: 
              robar datos, borrar tablas o saltarse autenticación.
            </p>
          </ArchCard>
        </div>
        <div className="space-y-4">
          <CodeBlock title="✅ SEGURO — Usar parámetros" language="js"
            code={`// ✅ Parámetros con ? (prepared statements)
const user = db.prepare(
  'SELECT * FROM users WHERE email = ?'
).get(email);

// ✅ Parámetros nombrados
const user = db.prepare(
  'SELECT * FROM users WHERE email = @email'
).get({ email: req.body.email });

// ✅ SIEMPRE usar parámetros para input del usuario
const stmt = db.prepare(
  'INSERT INTO users (name, email) VALUES (?, ?)'
);
stmt.run(req.body.name, req.body.email);
// better-sqlite3 escapa automáticamente los valores`} />
          <ArchCard title="Regla de oro" icon="🏆" variant="green">
            <p className="text-xs text-arch-green font-bold">
              NUNCA concatenar strings en queries SQL. SIEMPRE usar parámetros (?, @nombre).
              Los prepared statements escapan automáticamente los valores peligrosos.
            </p>
          </ArchCard>
        </div>
      </div>
    </div>
  )
}

function SqlTips() {
  return (
    <div className="space-y-5">
      <h2 className="text-base font-bold text-arch-cyan font-mono">💡 Tips y Optimización</h2>
      <p className="text-sm text-arch-white/70">Buenas prácticas para SQLite en producción.</p>
      <div className="grid lg:grid-cols-2 gap-4">
        <CodeBlock title="Optimización" language="js"
          code={`// ── PRAGMAS de rendimiento ──
db.pragma('journal_mode = WAL');     // mejor concurrencia
db.pragma('foreign_keys = ON');      // activar FK
db.pragma('cache_size = -64000');    // 64MB cache
db.pragma('busy_timeout = 5000');    // esperar 5s si locked
db.pragma('synchronous = NORMAL');   // balance seguridad/velocidad

// ── ÍNDICES ──
// Crear índices en columnas que usas en WHERE, JOIN, ORDER BY
db.exec('CREATE INDEX IF NOT EXISTS idx_users_email ON users(email)');
db.exec('CREATE INDEX IF NOT EXISTS idx_posts_user ON posts(user_id)');

// ── TRANSACCIONES para bulk inserts ──
const insertMany = db.transaction((items) => {
  const stmt = db.prepare('INSERT INTO items (name) VALUES (?)');
  for (const item of items) stmt.run(item.name);
});
// 1000 inserts: sin transacción = 25s, con transacción = 0.01s

// ── PREPARED STATEMENTS reutilizables ──
const getUser = db.prepare('SELECT * FROM users WHERE id = ?');
// Reutilizar el statement es más rápido que crear uno nuevo cada vez
getUser.get(1);
getUser.get(2);

// ── EXPLAIN para analizar queries ──
// db.prepare('EXPLAIN QUERY PLAN SELECT * FROM users WHERE email = ?').all('test');

// ── VACUUM para compactar ──
// db.exec('VACUUM');  // reconstruye el archivo, libera espacio`} />
        <div className="space-y-4">
          <ArchCard title="Buenas prácticas" icon="📌" variant="cyan">
            <ul className="space-y-1.5 text-xs">
              <li><span className="text-arch-green">✓</span> WAL mode siempre activado</li>
              <li><span className="text-arch-green">✓</span> Índices en columnas de búsqueda frecuente</li>
              <li><span className="text-arch-green">✓</span> Transacciones para múltiples writes</li>
              <li><span className="text-arch-green">✓</span> Prepared statements reutilizables</li>
              <li><span className="text-arch-green">✓</span> foreign_keys ON</li>
              <li><span className="text-arch-green">✓</span> Backup regular del archivo .db</li>
              <li><span className="text-arch-red">✗</span> No usar SQLite si necesitas escritura concurrente pesada</li>
              <li><span className="text-arch-red">✗</span> No commitear el .db a Git</li>
            </ul>
          </ArchCard>
          <ArchCard title="¿Cuándo pasar a PostgreSQL?" icon="📈" variant="yellow">
            <ul className="space-y-1 text-xs">
              <li>→ Muchos usuarios escribiendo a la vez</li>
              <li>→ Base de datos mayor a 1GB</li>
              <li>→ Necesitas replicación o backups en vivo</li>
              <li>→ Deploy en múltiples servidores</li>
              <li className="text-arch-green mt-2">La buena noticia: tu SQL sigue funcionando igual</li>
            </ul>
          </ArchCard>
        </div>
      </div>
    </div>
  )
}

export const sqliteTopics = {
  'sql-intro':       SqlIntro,
  'sql-setup':       SqlSetup,
  'sql-create':      SqlCreate,
  'sql-insert':      SqlInsert,
  'sql-select':      SqlSelect,
  'sql-joins':       SqlJoins,
  'sql-advanced':    SqlAdvanced,
  'sql-migrations':  SqlMigrations,
  'sql-security':    SqlSecurity,
  'sql-tips':        SqlTips,
}