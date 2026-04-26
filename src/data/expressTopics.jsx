/* ============================================
   expressTopics.jsx — TODOS los temas de Express (10/10)
   ============================================ */
import CodeBlock from '../components/ui/CodeBlock'
import LiveDemo from '../components/ui/LiveDemo'
import ArchCard from '../components/ui/ArchCard'
import TerminalBlock from '../components/ui/Terminal'

/* ══════════════════════════════════════════
   01: Qué es Express
   ══════════════════════════════════════════ */
function ExpIntro() {
  return (
    <div className="space-y-5">
      <h2 className="text-base font-bold text-arch-blue font-mono">📖 ¿Qué es Express.js?</h2>
      <p className="text-sm text-arch-white/70">
        Express es el framework web <span className="text-arch-blue">más popular de Node.js</span>. Crea servidores HTTP, APIs REST y apps web backend.
      </p>
      <div className="grid lg:grid-cols-2 gap-4">
        <div className="space-y-4">
          <ArchCard title="¿Por qué Express?" icon="🤔" variant="blue">
            <ul className="space-y-1.5 text-xs">
              <li><span className="text-arch-green">✓</span> Minimalista — tú agregas lo que necesites</li>
              <li><span className="text-arch-green">✓</span> Rápido — performance de Node.js</li>
              <li><span className="text-arch-green">✓</span> Middleware — sistema de plugins flexible</li>
              <li><span className="text-arch-green">✓</span> Enorme ecosistema npm</li>
              <li><span className="text-arch-green">✓</span> Estándar de la industria</li>
            </ul>
          </ArchCard>
          <ArchCard title="Flujo de una petición" icon="🔄" variant="cyan">
            <ul className="space-y-1 text-xs">
              <li><span className="text-arch-cyan">→</span> Cliente envía petición HTTP</li>
              <li><span className="text-arch-cyan">→</span> Express la recibe en una ruta</li>
              <li><span className="text-arch-cyan">→</span> Pasa por middlewares</li>
              <li><span className="text-arch-cyan">→</span> Ejecuta la lógica (DB, cálculos)</li>
              <li><span className="text-arch-cyan">→</span> Envía respuesta JSON/HTML</li>
            </ul>
          </ArchCard>
        </div>
        <div className="space-y-4">
          <ArchCard title="Backend vs Frontend" icon="🔄" variant="default">
            <ul className="space-y-1 text-xs">
              <li><span className="text-arch-blue">Frontend</span> — Lo que ve el usuario (React)</li>
              <li><span className="text-arch-green">Backend</span> — Servidor, datos, auth (Express)</li>
              <li><span className="text-arch-yellow">API</span> — El puente entre ambos (JSON)</li>
            </ul>
          </ArchCard>
          <ArchCard title="Stack del curso" icon="📚" variant="green">
            <ul className="space-y-1 text-xs">
              <li>1. <span className="text-arch-blue">Express.js</span> — Servidor y rutas</li>
              <li>2. <span className="text-arch-cyan">SQLite</span> — Base de datos</li>
              <li>3. <span className="text-arch-green">API REST</span> — Endpoints</li>
              <li>4. <span className="text-arch-yellow">JWT</span> — Autenticación</li>
              <li>5. <span className="text-arch-purple">MVC</span> — Arquitectura</li>
            </ul>
          </ArchCard>
        </div>
      </div>
    </div>
  )
}

/* ══════════════════════════════════════════
   02: Setup
   ══════════════════════════════════════════ */
function ExpSetup() {
  return (
    <div className="space-y-5">
      <h2 className="text-base font-bold text-arch-blue font-mono">🚀 Setup e Instalación</h2>
      <p className="text-sm text-arch-white/70">Crear tu primer servidor Express desde cero.</p>
      <div className="grid lg:grid-cols-2 gap-4">
        <div className="space-y-4">
          <TerminalBlock user="dev" host="arch" path="~" commands={[
            { type: 'input', text: 'mkdir mi-api && cd mi-api' },
            { type: 'input', text: 'npm init -y' },
            { type: 'input', text: 'npm install express' },
            { type: 'input', text: 'npm install -D nodemon' },
          ]} />
          <CodeBlock title="package.json (scripts)" language="json"
            code={`{
  "type": "module",
  "scripts": {
    "dev": "nodemon server.js",
    "start": "node server.js"
  }
}`} />
        </div>
        <CodeBlock title="server.js — Primer servidor" language="js"
          code={`import express from 'express';

const app = express();
const PORT = 3000;

// Parsear JSON en el body
app.use(express.json());

// Ruta raíz
app.get('/', (req, res) => {
  res.json({ message: '¡Hola desde Express!' });
});

// Ruta con parámetro
app.get('/api/saludo/:nombre', (req, res) => {
  res.json({ saludo: \`¡Hola, \${req.params.nombre}!\` });
});

app.listen(PORT, () => {
  console.log(\`🚀 http://localhost:\${PORT}\`);
});`} />
      </div>
    </div>
  )
}

/* ══════════════════════════════════════════
   03: Rutas y métodos
   ══════════════════════════════════════════ */
function ExpRoutes() {
  return (
    <div className="space-y-5">
      <h2 className="text-base font-bold text-arch-blue font-mono">🛤️ Rutas y Métodos HTTP</h2>
      <p className="text-sm text-arch-white/70">
        Cada ruta es un <span className="text-arch-blue">método + URL</span> que ejecuta una función cuando coincide.
      </p>
      <div className="grid lg:grid-cols-2 gap-4">
        <CodeBlock title="Rutas básicas" language="js"
          code={`// ── MÉTODOS HTTP ──
app.get('/api/users', (req, res) => {
  // Obtener datos
});

app.post('/api/users', (req, res) => {
  // Crear dato nuevo
});

app.put('/api/users/:id', (req, res) => {
  // Actualizar todo el recurso
});

app.patch('/api/users/:id', (req, res) => {
  // Actualizar parcial
});

app.delete('/api/users/:id', (req, res) => {
  // Eliminar
});

// ── PARÁMETROS DE RUTA ──
// :id es un parámetro dinámico
app.get('/api/users/:id', (req, res) => {
  const { id } = req.params;  // "123"
  res.json({ id });
});

// Múltiples parámetros
app.get('/api/users/:userId/posts/:postId', (req, res) => {
  const { userId, postId } = req.params;
});

// ── QUERY STRINGS ── (?key=value)
// GET /api/users?page=2&limit=10
app.get('/api/users', (req, res) => {
  const { page = 1, limit = 10 } = req.query;
});

// ── RUTA CATCH-ALL ── (404)
app.use('*', (req, res) => {
  res.status(404).json({ error: 'Ruta no encontrada' });
});`} />
        <div className="space-y-4">
          <CodeBlock title="Router modular (recomendado)" language="js"
            code={`// routes/users.js
import { Router } from 'express';
const router = Router();

router.get('/', getAllUsers);
router.get('/:id', getUserById);
router.post('/', createUser);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);

export default router;

// server.js
import usersRouter from './routes/users.js';
import productsRouter from './routes/products.js';

app.use('/api/users', usersRouter);
app.use('/api/products', productsRouter);`} />
          <ArchCard title="Estructura con Router" icon="📁" variant="blue">
            <pre className="text-[10px] font-mono text-arch-gray-light">{`mi-api/
├── routes/
│   ├── users.js       # /api/users
│   ├── products.js    # /api/products
│   └── auth.js        # /api/auth
├── server.js          # montar rutas
└── package.json`}</pre>
          </ArchCard>
        </div>
      </div>
    </div>
  )
}

/* ══════════════════════════════════════════
   04: Middleware
   ══════════════════════════════════════════ */
function ExpMiddleware() {
  return (
    <div className="space-y-5">
      <h2 className="text-base font-bold text-arch-blue font-mono">🔗 Middleware</h2>
      <p className="text-sm text-arch-white/70">
        Middleware = funciones que se ejecutan <span className="text-arch-blue">ENTRE</span> la petición y la respuesta. 
        Son el corazón de Express.
      </p>
      <div className="grid lg:grid-cols-2 gap-4">
        <div className="space-y-4">
          <CodeBlock title="Middleware explicado" language="js"
            code={`// Un middleware recibe (req, res, next)
// next() pasa al siguiente middleware/ruta

// ── MIDDLEWARE GLOBAL (todas las rutas) ──
app.use((req, res, next) => {
  console.log(\`\${req.method} \${req.url}\`);
  next();  // IMPORTANTE: si no llamas next(), se queda colgado
});

// ── MIDDLEWARE BUILT-IN ──
app.use(express.json());           // parsear JSON body
app.use(express.urlencoded({       // parsear form data
  extended: true
}));
app.use(express.static('public')); // archivos estáticos

// ── MIDDLEWARE DE TERCEROS ──
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';

app.use(cors());          // permitir requests cross-origin
app.use(morgan('dev'));   // logs bonitos de requests
app.use(helmet());        // headers de seguridad

// ── MIDDLEWARE DE RUTA (solo una ruta) ──
const requireAuth = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ error: 'No autorizado' });
  }
  // verificar token...
  next();
};

// Solo /api/admin necesita auth
app.get('/api/admin', requireAuth, (req, res) => {
  res.json({ secret: 'datos privados' });
});

// ── MIDDLEWARE EN ROUTER ──
router.use(requireAuth);  // todas las rutas del router`} />
        </div>
        <div className="space-y-4">
          <LiveDemo title="Flujo de middleware">
            <div className="space-y-1.5 text-xs font-mono">
              <div className="p-2 rounded bg-arch-blue/10 border border-arch-blue/30 text-arch-blue">
                📥 Request llega: GET /api/users
              </div>
              <div className="ml-4 text-arch-gray">↓ next()</div>
              <div className="p-2 rounded bg-arch-purple/10 border border-arch-purple/30 text-arch-purple">
                🔗 morgan: log "GET /api/users 200 5ms"
              </div>
              <div className="ml-4 text-arch-gray">↓ next()</div>
              <div className="p-2 rounded bg-arch-yellow/10 border border-arch-yellow/30 text-arch-yellow">
                🛡️ cors: agregar headers CORS
              </div>
              <div className="ml-4 text-arch-gray">↓ next()</div>
              <div className="p-2 rounded bg-arch-cyan/10 border border-arch-cyan/30 text-arch-cyan">
                📋 express.json(): parsear body
              </div>
              <div className="ml-4 text-arch-gray">↓ next()</div>
              <div className="p-2 rounded bg-arch-green/10 border border-arch-green/30 text-arch-green">
                ✅ Route handler: res.json(datos)
              </div>
              <div className="p-2 rounded bg-arch-green/10 border border-arch-green/30 text-arch-green mt-2">
                📤 Response: 200 OK
              </div>
            </div>
          </LiveDemo>
          <ArchCard title="Orden importa" icon="⚠️" variant="yellow">
            <ul className="space-y-1 text-xs">
              <li><span className="text-arch-red">✗</span> Middleware DESPUÉS de las rutas = no se ejecuta</li>
              <li><span className="text-arch-green">✓</span> Middleware ANTES de las rutas = se ejecuta</li>
              <li><span className="text-arch-green">✓</span> Error handler siempre AL FINAL</li>
            </ul>
          </ArchCard>
        </div>
      </div>
    </div>
  )
}

/* ══════════════════════════════════════════
   05: Request y params
   ══════════════════════════════════════════ */
function ExpRequest() {
  return (
    <div className="space-y-5">
      <h2 className="text-base font-bold text-arch-blue font-mono">📥 Request (req)</h2>
      <p className="text-sm text-arch-white/70">Todo lo que el cliente envía al servidor.</p>
      <div className="grid lg:grid-cols-2 gap-4">
        <CodeBlock title="Propiedades del request" language="js"
          code={`// ── req.params — Parámetros de ruta ──
// GET /api/users/42
app.get('/api/users/:id', (req, res) => {
  req.params.id;  // "42" (siempre string)
});

// ── req.query — Query strings ──
// GET /api/users?page=2&sort=name&active=true
app.get('/api/users', (req, res) => {
  req.query.page;    // "2" (siempre string)
  req.query.sort;    // "name"
  req.query.active;  // "true"
});

// ── req.body — Cuerpo de la petición ──
// POST /api/users  body: {"name":"Ana","email":"a@b.com"}
app.post('/api/users', (req, res) => {
  req.body.name;   // "Ana"
  req.body.email;  // "a@b.com"
  // Requiere: app.use(express.json())
});

// ── req.headers — Headers HTTP ──
app.get('/api/me', (req, res) => {
  req.headers.authorization;   // "Bearer abc123"
  req.headers['content-type']; // "application/json"
  req.headers.host;            // "localhost:3000"
});

// ── Otros útiles ──
req.method;      // "GET", "POST", etc
req.url;         // "/api/users?page=2"
req.path;        // "/api/users"
req.ip;          // IP del cliente
req.hostname;    // "localhost"
req.protocol;    // "http" o "https"
req.get('Host'); // obtener header específico`} />
        <ArchCard title="Resumen de datos entrantes" icon="📋" variant="blue">
          <div className="space-y-2 text-xs">
            <div className="p-2 rounded bg-term-bg border border-term-border">
              <p className="text-arch-blue font-bold">req.params</p>
              <p className="text-arch-gray">Datos de la URL: /users/<span className="text-arch-green">:id</span></p>
              <p className="text-arch-white/60">Uso: identificar UN recurso</p>
            </div>
            <div className="p-2 rounded bg-term-bg border border-term-border">
              <p className="text-arch-yellow font-bold">req.query</p>
              <p className="text-arch-gray">Después del ?: /users<span className="text-arch-green">?page=2</span></p>
              <p className="text-arch-white/60">Uso: filtros, paginación, búsqueda</p>
            </div>
            <div className="p-2 rounded bg-term-bg border border-term-border">
              <p className="text-arch-green font-bold">req.body</p>
              <p className="text-arch-gray">Cuerpo JSON del POST/PUT</p>
              <p className="text-arch-white/60">Uso: crear o actualizar datos</p>
            </div>
            <div className="p-2 rounded bg-term-bg border border-term-border">
              <p className="text-arch-purple font-bold">req.headers</p>
              <p className="text-arch-gray">Metadatos de la petición</p>
              <p className="text-arch-white/60">Uso: auth tokens, content-type</p>
            </div>
          </div>
        </ArchCard>
      </div>
    </div>
  )
}

/* ══════════════════════════════════════════
   06: Response y status
   ══════════════════════════════════════════ */
function ExpResponse() {
  return (
    <div className="space-y-5">
      <h2 className="text-base font-bold text-arch-blue font-mono">📤 Response (res)</h2>
      <p className="text-sm text-arch-white/70">Todo lo que el servidor envía de vuelta al cliente.</p>
      <div className="grid lg:grid-cols-2 gap-4">
        <CodeBlock title="Métodos del response" language="js"
          code={`// ── ENVIAR JSON (lo más común en APIs) ──
res.json({ name: 'Ana', age: 30 });

// ── STATUS CODE + JSON ──
res.status(200).json({ data: users });    // OK
res.status(201).json({ created: user });  // Created
res.status(400).json({ error: 'Datos inválidos' });
res.status(401).json({ error: 'No autorizado' });
res.status(404).json({ error: 'No encontrado' });
res.status(500).json({ error: 'Error del servidor' });

// ── ENVIAR TEXTO ──
res.send('Hola mundo');

// ── ENVIAR ARCHIVO ──
res.sendFile('/ruta/al/archivo.pdf');
res.download('/ruta/al/archivo.pdf', 'nombre.pdf');

// ── REDIRECCIONAR ──
res.redirect('/nueva-url');
res.redirect(301, '/nueva-url');  // permanente

// ── SIN CONTENIDO ──
res.status(204).send();  // No Content (para DELETE)

// ── HEADERS CUSTOM ──
res.set('X-Custom-Header', 'valor');
res.set('Cache-Control', 'no-cache');

// ── PATRÓN CONSISTENTE DE RESPUESTA ──
// Éxito
res.json({
  success: true,
  data: users,
  count: users.length
});

// Error
res.status(404).json({
  success: false,
  error: 'Usuario no encontrado'
});`} />
        <ArchCard title="Status codes comunes" icon="📊" variant="cyan">
          <div className="space-y-1 text-xs">
            <p className="text-arch-green font-bold mb-1">2xx — Éxito</p>
            <div className="pl-2 space-y-0.5 mb-2">
              <p><span className="text-arch-green">200</span> OK</p>
              <p><span className="text-arch-green">201</span> Created</p>
              <p><span className="text-arch-green">204</span> No Content (DELETE exitoso)</p>
            </div>
            <p className="text-arch-yellow font-bold mb-1">4xx — Error del cliente</p>
            <div className="pl-2 space-y-0.5 mb-2">
              <p><span className="text-arch-yellow">400</span> Bad Request (datos inválidos)</p>
              <p><span className="text-arch-yellow">401</span> Unauthorized (sin auth)</p>
              <p><span className="text-arch-yellow">403</span> Forbidden (sin permiso)</p>
              <p><span className="text-arch-yellow">404</span> Not Found</p>
              <p><span className="text-arch-yellow">409</span> Conflict (duplicado)</p>
              <p><span className="text-arch-yellow">422</span> Unprocessable (validación)</p>
            </div>
            <p className="text-arch-red font-bold mb-1">5xx — Error del servidor</p>
            <div className="pl-2 space-y-0.5">
              <p><span className="text-arch-red">500</span> Internal Server Error</p>
              <p><span className="text-arch-red">503</span> Service Unavailable</p>
            </div>
          </div>
        </ArchCard>
      </div>
    </div>
  )
}

/* ══════════════════════════════════════════
   07: Archivos estáticos
   ══════════════════════════════════════════ */
function ExpStatic() {
  return (
    <div className="space-y-5">
      <h2 className="text-base font-bold text-arch-blue font-mono">📁 Archivos Estáticos</h2>
      <p className="text-sm text-arch-white/70">Servir imágenes, CSS, JS y otros archivos directamente.</p>
      <div className="grid lg:grid-cols-2 gap-4">
        <CodeBlock title="Servir archivos estáticos" language="js"
          code={`// Servir carpeta "public" como raíz
app.use(express.static('public'));
// public/imagen.jpg → http://localhost:3000/imagen.jpg
// public/css/style.css → http://localhost:3000/css/style.css

// Con prefijo de ruta
app.use('/assets', express.static('public'));
// public/imagen.jpg → http://localhost:3000/assets/imagen.jpg

// Múltiples carpetas
app.use(express.static('public'));
app.use(express.static('uploads'));

// Ruta absoluta (recomendado)
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
app.use(express.static(path.join(__dirname, 'public')));

// ── SERVIR SPA (React build) ──
app.use(express.static(path.join(__dirname, 'dist')));

// Cualquier ruta que no sea API → index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});`} />
        <ArchCard title="Estructura con archivos estáticos" icon="📁" variant="default">
          <pre className="text-[10px] font-mono text-arch-gray-light">{`mi-api/
├── public/              ← archivos estáticos
│   ├── images/
│   │   └── logo.png
│   ├── css/
│   │   └── style.css
│   └── favicon.ico
├── uploads/             ← archivos subidos
├── server.js
└── package.json`}</pre>
        </ArchCard>
      </div>
    </div>
  )
}

/* ══════════════════════════════════════════
   08: Manejo de errores
   ══════════════════════════════════════════ */
function ExpErrors() {
  return (
    <div className="space-y-5">
      <h2 className="text-base font-bold text-arch-blue font-mono">🚨 Manejo de Errores</h2>
      <p className="text-sm text-arch-white/70">Capturar y manejar errores de forma centralizada.</p>
      <div className="grid lg:grid-cols-2 gap-4">
        <CodeBlock title="Error handling" language="js"
          code={`// ── TRY/CATCH en cada ruta ──
app.get('/api/users/:id', (req, res) => {
  try {
    const user = db.prepare('SELECT * FROM users WHERE id = ?')
      .get(req.params.id);
    if (!user) {
      return res.status(404).json({ error: 'No encontrado' });
    }
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: 'Error interno' });
  }
});

// ── WRAPPER para async (evitar repetir try/catch) ──
const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

app.get('/api/users', asyncHandler(async (req, res) => {
  const users = await getUsers();  // si falla, va al error handler
  res.json(users);
}));

// ── ERROR HANDLER GLOBAL (4 argumentos!) ──
// SIEMPRE al final, después de todas las rutas
app.use((err, req, res, next) => {
  console.error('Error:', err.message);
  
  const status = err.status || 500;
  res.status(status).json({
    success: false,
    error: status === 500 ? 'Error interno' : err.message,
    ...(process.env.NODE_ENV === 'development' && {
      stack: err.stack
    })
  });
});

// ── 404 HANDLER (antes del error handler) ──
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    error: \`Ruta \${req.method} \${req.originalUrl} no encontrada\`
  });
});

// ── CUSTOM ERROR CLASS ──
class AppError extends Error {
  constructor(message, status) {
    super(message);
    this.status = status;
  }
}
// throw new AppError('Email ya existe', 409);`} />
        <ArchCard title="Orden en server.js" icon="📋" variant="blue">
          <ol className="space-y-1.5 text-xs list-decimal pl-4">
            <li>Middleware globales (json, cors, morgan)</li>
            <li>Rutas de la API (/api/users, /api/products)</li>
            <li>Archivos estáticos (express.static)</li>
            <li>404 handler (ruta no encontrada)</li>
            <li>Error handler global (4 args) ← SIEMPRE AL FINAL</li>
          </ol>
        </ArchCard>
      </div>
    </div>
  )
}

/* ══════════════════════════════════════════
   09: Patrón MVC
   ══════════════════════════════════════════ */
function ExpMvc() {
  return (
    <div className="space-y-5">
      <h2 className="text-base font-bold text-arch-blue font-mono">🏗️ Patrón MVC</h2>
      <p className="text-sm text-arch-white/70">
        MVC = <span className="text-arch-blue">M</span>odel <span className="text-arch-blue">V</span>iew <span className="text-arch-blue">C</span>ontroller. Separa responsabilidades.
      </p>
      <div className="grid lg:grid-cols-2 gap-4">
        <div className="space-y-4">
          <ArchCard title="¿Qué hace cada parte?" icon="🏗️" variant="blue">
            <ul className="space-y-2 text-xs">
              <li><span className="text-arch-green font-bold">Model</span> — Datos y base de datos. Queries SQL.</li>
              <li><span className="text-arch-cyan font-bold">View</span> — En APIs = la respuesta JSON (o React en frontend).</li>
              <li><span className="text-arch-yellow font-bold">Controller</span> — Lógica. Recibe req, usa model, envía res.</li>
              <li><span className="text-arch-purple font-bold">Routes</span> — Conecta URLs con controllers.</li>
            </ul>
          </ArchCard>
          <CodeBlock title="models/userModel.js" language="js"
            code={`import db from '../database/db.js';

export const UserModel = {
  getAll: () => {
    return db.prepare('SELECT * FROM users').all();
  },
  
  getById: (id) => {
    return db.prepare('SELECT * FROM users WHERE id = ?').get(id);
  },
  
  create: (name, email) => {
    const stmt = db.prepare('INSERT INTO users (name, email) VALUES (?, ?)');
    const result = stmt.run(name, email);
    return { id: result.lastInsertRowid, name, email };
  },
  
  update: (id, name, email) => {
    const stmt = db.prepare('UPDATE users SET name = ?, email = ? WHERE id = ?');
    return stmt.run(name, email, id);
  },
  
  delete: (id) => {
    return db.prepare('DELETE FROM users WHERE id = ?').run(id);
  }
};`} />
        </div>
        <div className="space-y-4">
          <CodeBlock title="controllers/userController.js" language="js"
            code={`import { UserModel } from '../models/userModel.js';

export const UserController = {
  getAll: (req, res) => {
    const users = UserModel.getAll();
    res.json({ success: true, data: users });
  },

  getById: (req, res) => {
    const user = UserModel.getById(req.params.id);
    if (!user) return res.status(404).json({ error: 'No encontrado' });
    res.json({ success: true, data: user });
  },

  create: (req, res) => {
    const { name, email } = req.body;
    if (!name || !email) return res.status(400).json({ error: 'Faltan datos' });
    const user = UserModel.create(name, email);
    res.status(201).json({ success: true, data: user });
  },

  update: (req, res) => {
    const { name, email } = req.body;
    const result = UserModel.update(req.params.id, name, email);
    if (result.changes === 0) return res.status(404).json({ error: 'No encontrado' });
    res.json({ success: true, data: { id: req.params.id, name, email } });
  },

  delete: (req, res) => {
    const result = UserModel.delete(req.params.id);
    if (result.changes === 0) return res.status(404).json({ error: 'No encontrado' });
    res.status(204).send();
  }
};`} />
          <ArchCard title="Estructura MVC" icon="📁" variant="green">
            <pre className="text-[10px] font-mono text-arch-gray-light">{`mi-api/
├── controllers/
│   └── userController.js    ← lógica
├── models/
│   └── userModel.js         ← datos/SQL
├── routes/
│   └── users.js             ← URLs
├── database/
│   └── db.js                ← conexión
├── middleware/
│   └── auth.js              ← middlewares
└── server.js                ← montar todo`}</pre>
          </ArchCard>
        </div>
      </div>
    </div>
  )
}

/* ══════════════════════════════════════════
   10: Variables de entorno
   ══════════════════════════════════════════ */
function ExpEnv() {
  return (
    <div className="space-y-5">
      <h2 className="text-base font-bold text-arch-blue font-mono">🔐 Variables de Entorno</h2>
      <p className="text-sm text-arch-white/70">Configuración que cambia entre desarrollo y producción.</p>
      <div className="grid lg:grid-cols-2 gap-4">
        <div className="space-y-4">
          <TerminalBlock user="dev" host="arch" path="~/mi-api" commands={[
            { type: 'input', text: 'npm install dotenv' },
          ]} />
          <CodeBlock title=".env (NUNCA commitear)" language="bash"
            code={`PORT=3000
NODE_ENV=development
DB_PATH=./database/app.db
JWT_SECRET=mi-secreto-super-seguro-123
CORS_ORIGIN=http://localhost:5173`} />
          <CodeBlock title="server.js — usar variables" language="js"
            code={`import 'dotenv/config';  // cargar .env

const PORT = process.env.PORT || 3000;
const isProduction = process.env.NODE_ENV === 'production';

app.listen(PORT, () => {
  console.log(\`🚀 Server en puerto \${PORT}\`);
  console.log(\`📦 Modo: \${process.env.NODE_ENV}\`);
});`} />
        </div>
        <div className="space-y-4">
          <CodeBlock title=".env.example (SÍ commitear)" language="bash"
            code={`PORT=3000
NODE_ENV=development
DB_PATH=./database/app.db
JWT_SECRET=cambiar-este-secreto
CORS_ORIGIN=http://localhost:5173`} />
          <ArchCard title="Reglas de .env" icon="📌" variant="red">
            <ul className="space-y-1.5 text-xs">
              <li><span className="text-arch-red">✗</span> NUNCA commitear .env a Git</li>
              <li><span className="text-arch-green">✓</span> Agregar .env a .gitignore</li>
              <li><span className="text-arch-green">✓</span> Crear .env.example con keys sin valores</li>
              <li><span className="text-arch-green">✓</span> Diferentes .env por entorno (dev, prod)</li>
              <li><span className="text-arch-green">✓</span> Acceder con process.env.VARIABLE</li>
              <li><span className="text-arch-green">✓</span> Siempre poner valor por defecto</li>
            </ul>
          </ArchCard>
          <CodeBlock title=".gitignore" language="bash"
            code={`node_modules/
.env
*.db
dist/`} />
        </div>
      </div>
    </div>
  )
}

export const expressTopics = {
  'exp-intro':      ExpIntro,
  'exp-setup':      ExpSetup,
  'exp-routes':     ExpRoutes,
  'exp-middleware':  ExpMiddleware,
  'exp-request':    ExpRequest,
  'exp-response':   ExpResponse,
  'exp-static':     ExpStatic,
  'exp-errors':     ExpErrors,
  'exp-mvc':        ExpMvc,
  'exp-env':        ExpEnv,
}