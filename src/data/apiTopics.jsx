/* ============================================
   apiTopics.jsx — TODOS los temas de API REST (10/10)
   ============================================ */
import CodeBlock from '../components/ui/CodeBlock'
import ArchCard from '../components/ui/ArchCard'
import LiveDemo from '../components/ui/LiveDemo'
import TerminalBlock from '../components/ui/Terminal'

function ApiIntro() {
  return (
    <div className="space-y-5">
      <h2 className="text-base font-bold text-arch-green font-mono">📖 ¿Qué es REST?</h2>
      <p className="text-sm text-arch-white/70">Arquitectura para comunicar sistemas usando HTTP.</p>
      <div className="grid lg:grid-cols-2 gap-4">
        <ArchCard title="Métodos HTTP" icon="📡" variant="green">
          <div className="space-y-1.5 text-xs">
            {[
              { m: 'GET', d: 'Obtener datos', c: 'green' },
              { m: 'POST', d: 'Crear nuevo', c: 'blue' },
              { m: 'PUT', d: 'Actualizar completo', c: 'yellow' },
              { m: 'PATCH', d: 'Actualizar parcial', c: 'orange' },
              { m: 'DELETE', d: 'Eliminar', c: 'red' },
            ].map(h => (
              <div key={h.m} className={`flex items-center gap-2 p-1.5 rounded bg-arch-${h.c}/10 border border-arch-${h.c}/20`}>
                <span className={`text-arch-${h.c} font-bold w-14`}>{h.m}</span>
                <span className="text-arch-white/70">{h.d}</span>
              </div>
            ))}
          </div>
        </ArchCard>
        <ArchCard title="Convenciones REST" icon="📏" variant="blue">
          <ul className="space-y-1 text-xs">
            <li className="p-1 rounded bg-term-bg"><span className="text-arch-green">GET</span> /api/users — listar</li>
            <li className="p-1 rounded bg-term-bg"><span className="text-arch-green">GET</span> /api/users/:id — uno</li>
            <li className="p-1 rounded bg-term-bg"><span className="text-arch-blue">POST</span> /api/users — crear</li>
            <li className="p-1 rounded bg-term-bg"><span className="text-arch-yellow">PUT</span> /api/users/:id — actualizar</li>
            <li className="p-1 rounded bg-term-bg"><span className="text-arch-red">DELETE</span> /api/users/:id — eliminar</li>
          </ul>
        </ArchCard>
      </div>
    </div>
  )
}

function ApiCrud() {
  return (
    <div className="space-y-5">
      <h2 className="text-base font-bold text-arch-green font-mono">🔄 CRUD Completo</h2>
      <p className="text-sm text-arch-white/70">Create, Read, Update, Delete — las 4 operaciones básicas.</p>
      <div className="grid lg:grid-cols-2 gap-4">
        <CodeBlock title="routes/users.js — CRUD" language="js"
          code={`import { Router } from 'express';
import db from '../database/db.js';
const router = Router();

// GET /api/users
router.get('/', (req, res) => {
  const users = db.prepare('SELECT * FROM users').all();
  res.json({ success: true, data: users });
});

// GET /api/users/:id
router.get('/:id', (req, res) => {
  const user = db.prepare('SELECT * FROM users WHERE id = ?').get(req.params.id);
  if (!user) return res.status(404).json({ error: 'No encontrado' });
  res.json({ success: true, data: user });
});

// POST /api/users
router.post('/', (req, res) => {
  const { name, email } = req.body;
  if (!name || !email) return res.status(400).json({ error: 'Datos incompletos' });
  try {
    const result = db.prepare('INSERT INTO users (name, email) VALUES (?, ?)').run(name, email);
    res.status(201).json({ success: true, data: { id: result.lastInsertRowid, name, email } });
  } catch (err) {
    if (err.message.includes('UNIQUE')) return res.status(409).json({ error: 'Email duplicado' });
    throw err;
  }
});

// PUT /api/users/:id
router.put('/:id', (req, res) => {
  const { name, email } = req.body;
  const result = db.prepare('UPDATE users SET name=?, email=? WHERE id=?').run(name, email, req.params.id);
  if (result.changes === 0) return res.status(404).json({ error: 'No encontrado' });
  res.json({ success: true });
});

// DELETE /api/users/:id
router.delete('/:id', (req, res) => {
  const result = db.prepare('DELETE FROM users WHERE id=?').run(req.params.id);
  if (result.changes === 0) return res.status(404).json({ error: 'No encontrado' });
  res.status(204).send();
});

export default router;`} />
        <ArchCard title="Probar con curl" icon="🧪" variant="green">
          <pre className="text-[10px] font-mono text-arch-white/70 leading-relaxed">{`# Listar
curl localhost:3000/api/users

# Crear
curl -X POST localhost:3000/api/users \\
  -H "Content-Type: application/json" \\
  -d '{"name":"Ana","email":"ana@mail.com"}'

# Actualizar
curl -X PUT localhost:3000/api/users/1 \\
  -H "Content-Type: application/json" \\
  -d '{"name":"Ana García","email":"ana@mail.com"}'

# Eliminar
curl -X DELETE localhost:3000/api/users/1`}</pre>
        </ArchCard>
      </div>
    </div>
  )
}

function ApiValidation() {
  return (
    <div className="space-y-5">
      <h2 className="text-base font-bold text-arch-green font-mono">✅ Validación de Datos</h2>
      <p className="text-sm text-arch-white/70">Nunca confiar en los datos del cliente. Validar SIEMPRE.</p>
      <div className="grid lg:grid-cols-2 gap-4">
        <CodeBlock title="Validación manual" language="js"
          code={`// ── VALIDACIÓN SIMPLE ──
router.post('/', (req, res) => {
  const { name, email, age } = req.body;
  const errors = [];

  if (!name || name.trim().length < 2) {
    errors.push('name: mínimo 2 caracteres');
  }
  if (!email || !email.includes('@')) {
    errors.push('email: formato inválido');
  }
  if (age !== undefined && (typeof age !== 'number' || age < 0)) {
    errors.push('age: debe ser número positivo');
  }

  if (errors.length > 0) {
    return res.status(400).json({ success: false, errors });
  }

  // Si pasa validación, crear...
});

// ── MIDDLEWARE DE VALIDACIÓN REUTILIZABLE ──
const validate = (rules) => (req, res, next) => {
  const errors = [];
  for (const [field, checks] of Object.entries(rules)) {
    const value = req.body[field];
    if (checks.required && !value) {
      errors.push(\`\${field} es requerido\`);
    }
    if (checks.minLength && value && value.length < checks.minLength) {
      errors.push(\`\${field} mín \${checks.minLength} chars\`);
    }
    if (checks.isEmail && value && !value.includes('@')) {
      errors.push(\`\${field} formato inválido\`);
    }
  }
  if (errors.length) return res.status(400).json({ errors });
  next();
};

// Uso:
router.post('/', validate({
  name: { required: true, minLength: 2 },
  email: { required: true, isEmail: true },
}), createUser);`} />
        <ArchCard title="Qué validar SIEMPRE" icon="📋" variant="green">
          <ul className="space-y-1.5 text-xs">
            <li><span className="text-arch-green">✓</span> Campos requeridos presentes</li>
            <li><span className="text-arch-green">✓</span> Tipos correctos (string, number)</li>
            <li><span className="text-arch-green">✓</span> Longitud mínima/máxima</li>
            <li><span className="text-arch-green">✓</span> Formato (email, URL, fecha)</li>
            <li><span className="text-arch-green">✓</span> Rango de números (edad 0-150)</li>
            <li><span className="text-arch-green">✓</span> Sanitizar: trim(), escapar HTML</li>
            <li><span className="text-arch-red">✗</span> NUNCA confiar en el frontend</li>
          </ul>
        </ArchCard>
      </div>
    </div>
  )
}

function ApiAuth() {
  return (
    <div className="space-y-5">
      <h2 className="text-base font-bold text-arch-green font-mono">🔐 Autenticación JWT</h2>
      <p className="text-sm text-arch-white/70">JSON Web Tokens para autenticar usuarios en APIs.</p>
      <div className="grid lg:grid-cols-2 gap-4">
        <CodeBlock title="Auth con JWT" language="js"
          code={`import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
// npm install jsonwebtoken bcryptjs

const SECRET = process.env.JWT_SECRET;

// ── REGISTRO ──
router.post('/register', async (req, res) => {
  const { name, email, password } = req.body;
  
  // Hash del password (NUNCA guardar en texto plano)
  const hashed = await bcrypt.hash(password, 10);
  
  db.prepare('INSERT INTO users (name, email, password) VALUES (?, ?, ?)')
    .run(name, email, hashed);
  
  res.status(201).json({ message: 'Registrado' });
});

// ── LOGIN ──
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = db.prepare('SELECT * FROM users WHERE email = ?').get(email);
  
  if (!user || !await bcrypt.compare(password, user.password)) {
    return res.status(401).json({ error: 'Credenciales inválidas' });
  }
  
  // Generar token JWT
  const token = jwt.sign(
    { id: user.id, email: user.email },
    SECRET,
    { expiresIn: '24h' }
  );
  
  res.json({ token, user: { id: user.id, name: user.name } });
});

// ── MIDDLEWARE DE AUTH ──
const requireAuth = (req, res, next) => {
  const header = req.headers.authorization;
  if (!header) return res.status(401).json({ error: 'Token requerido' });
  
  const token = header.replace('Bearer ', '');
  try {
    const decoded = jwt.verify(token, SECRET);
    req.user = decoded;  // { id, email }
    next();
  } catch {
    res.status(401).json({ error: 'Token inválido' });
  }
};

// ── RUTAS PROTEGIDAS ──
router.get('/me', requireAuth, (req, res) => {
  const user = db.prepare('SELECT id, name, email FROM users WHERE id = ?')
    .get(req.user.id);
  res.json(user);
});`} />
        <ArchCard title="Flujo JWT" icon="🔑" variant="cyan">
          <ol className="space-y-1.5 text-xs list-decimal pl-4">
            <li>Cliente envía email + password al /login</li>
            <li>Servidor verifica credenciales</li>
            <li>Servidor genera y envía un JWT token</li>
            <li>Cliente guarda el token (localStorage)</li>
            <li>Cliente envía token en cada petición: Authorization: Bearer TOKEN</li>
            <li>Servidor verifica el token con el middleware</li>
          </ol>
        </ArchCard>
      </div>
    </div>
  )
}

function ApiUpload() {
  return (
    <div className="space-y-5">
      <h2 className="text-base font-bold text-arch-green font-mono">📤 Upload de Archivos</h2>
      <p className="text-sm text-arch-white/70">Subir imágenes y archivos al servidor.</p>
      <div className="grid lg:grid-cols-2 gap-4">
        <CodeBlock title="Upload con multer" language="js"
          code={`import multer from 'multer';
// npm install multer

// Configurar almacenamiento
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');  // carpeta destino
  },
  filename: (req, file, cb) => {
    const unique = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const ext = file.originalname.split('.').pop();
    cb(null, \`\${unique}.\${ext}\`);
  }
});

// Filtro de tipos
const fileFilter = (req, file, cb) => {
  const allowed = ['image/jpeg', 'image/png', 'image/webp'];
  if (allowed.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Solo imágenes JPG, PNG o WebP'), false);
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 }  // 5MB
});

// Ruta de upload
router.post('/avatar', requireAuth, upload.single('avatar'), (req, res) => {
  if (!req.file) return res.status(400).json({ error: 'No se envió archivo' });
  
  const url = \`/uploads/\${req.file.filename}\`;
  db.prepare('UPDATE users SET avatar = ? WHERE id = ?').run(url, req.user.id);
  
  res.json({ success: true, url });
});

// Servir uploads
app.use('/uploads', express.static('uploads'));`} />
        <ArchCard title="Tips de upload" icon="💡" variant="default">
          <ul className="space-y-1 text-xs">
            <li><span className="text-arch-green">✓</span> Validar tipo de archivo (mimetype)</li>
            <li><span className="text-arch-green">✓</span> Limitar tamaño máximo</li>
            <li><span className="text-arch-green">✓</span> Renombrar archivos (evitar colisiones)</li>
            <li><span className="text-arch-green">✓</span> Agregar /uploads al .gitignore</li>
            <li><span className="text-arch-yellow">→</span> En producción usar S3, Cloudinary, etc</li>
          </ul>
        </ArchCard>
      </div>
    </div>
  )
}

function ApiPagination() {
  return (
    <div className="space-y-5">
      <h2 className="text-base font-bold text-arch-green font-mono">📄 Paginación y Filtros</h2>
      <p className="text-sm text-arch-white/70">No devolver 10,000 registros de golpe.</p>
      <div className="grid lg:grid-cols-2 gap-4">
        <CodeBlock title="Paginación + filtros + búsqueda" language="js"
          code={`// GET /api/users?page=2&limit=10&sort=name&order=asc&search=ana
router.get('/', (req, res) => {
  const page  = Math.max(1, parseInt(req.query.page) || 1);
  const limit = Math.min(100, Math.max(1, parseInt(req.query.limit) || 10));
  const offset = (page - 1) * limit;
  const sort  = ['name', 'email', 'created_at'].includes(req.query.sort) ? req.query.sort : 'id';
  const order = req.query.order === 'desc' ? 'DESC' : 'ASC';
  const search = req.query.search || '';

  // Contar total
  let countSql = 'SELECT COUNT(*) FROM users';
  let dataSql = \`SELECT * FROM users\`;
  const params = [];

  // Filtro de búsqueda
  if (search) {
    const where = ' WHERE name LIKE ? OR email LIKE ?';
    countSql += where;
    dataSql += where;
    params.push(\`%\${search}%\`, \`%\${search}%\`);
  }

  const total = db.prepare(countSql).pluck().get(...params);

  dataSql += \` ORDER BY \${sort} \${order} LIMIT ? OFFSET ?\`;
  const users = db.prepare(dataSql).all(...params, limit, offset);

  res.json({
    success: true,
    data: users,
    pagination: {
      page, limit, total,
      totalPages: Math.ceil(total / limit),
      hasNext: page * limit < total,
      hasPrev: page > 1,
    }
  });
});`} />
        <ArchCard title="Respuesta paginada" icon="📊" variant="green">
          <pre className="text-[10px] font-mono text-arch-white/70">{`{
  "success": true,
  "data": [ ... ],
  "pagination": {
    "page": 2,
    "limit": 10,
    "total": 47,
    "totalPages": 5,
    "hasNext": true,
    "hasPrev": true
  }
}`}</pre>
        </ArchCard>
      </div>
    </div>
  )
}

function ApiCors() {
  return (
    <div className="space-y-5">
      <h2 className="text-base font-bold text-arch-green font-mono">🌍 CORS</h2>
      <p className="text-sm text-arch-white/70">
        Cross-Origin Resource Sharing — permitir que tu frontend React (puerto 5173) hable con tu API (puerto 3000).
      </p>
      <div className="grid lg:grid-cols-2 gap-4">
        <CodeBlock title="Configurar CORS" language="js"
          code={`import cors from 'cors';
// npm install cors

// ── PERMITIR TODO (desarrollo) ──
app.use(cors());

// ── CONFIGURACIÓN ESPECÍFICA (producción) ──
app.use(cors({
  origin: ['http://localhost:5173', 'https://miapp.com'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,  // permitir cookies
}));

// ── CORS MANUAL (sin paquete) ──
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:5173');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if (req.method === 'OPTIONS') return res.sendStatus(200);
  next();
});`} />
        <ArchCard title="¿Qué es CORS?" icon="🤔" variant="blue">
          <p className="text-xs mb-2">
            Los navegadores bloquean peticiones entre diferentes dominios/puertos por seguridad. 
            CORS le dice al navegador: "está bien, este origen puede acceder a mi API".
          </p>
          <div className="space-y-1 text-xs">
            <p className="text-arch-red">❌ localhost:5173 → localhost:3000 (bloqueado sin CORS)</p>
            <p className="text-arch-green">✅ localhost:5173 → localhost:3000 (permitido con CORS)</p>
          </div>
        </ArchCard>
      </div>
    </div>
  )
}

function ApiTesting() {
  return (
    <div className="space-y-5">
      <h2 className="text-base font-bold text-arch-green font-mono">🧪 Testing de APIs</h2>
      <p className="text-sm text-arch-white/70">Probar tus endpoints sin frontend.</p>
      <div className="grid lg:grid-cols-2 gap-4">
        <CodeBlock title="Probar con curl" language="bash"
          code={`# GET
curl http://localhost:3000/api/users

# GET con formato bonito
curl -s http://localhost:3000/api/users | npx json

# POST
curl -X POST http://localhost:3000/api/users \\
  -H "Content-Type: application/json" \\
  -d '{"name":"Ana","email":"ana@mail.com"}'

# PUT
curl -X PUT http://localhost:3000/api/users/1 \\
  -H "Content-Type: application/json" \\
  -d '{"name":"Ana García","email":"ana@mail.com"}'

# DELETE
curl -X DELETE http://localhost:3000/api/users/1

# Con auth token
curl http://localhost:3000/api/me \\
  -H "Authorization: Bearer eyJhbG..."

# Ver headers de respuesta
curl -I http://localhost:3000/api/users

# Upload
curl -X POST http://localhost:3000/api/avatar \\
  -F "avatar=@foto.jpg" \\
  -H "Authorization: Bearer TOKEN"`} />
        <div className="space-y-4">
          <ArchCard title="Herramientas de testing" icon="🧰" variant="blue">
            <ul className="space-y-1.5 text-xs">
              <li><span className="text-arch-blue">Thunder Client</span> — Extensión de VSCode (como Postman)</li>
              <li><span className="text-arch-yellow">Postman</span> — App desktop con GUI completa</li>
              <li><span className="text-arch-green">curl</span> — Terminal, rápido y scripteable</li>
              <li><span className="text-arch-cyan">HTTPie</span> — curl moderno con mejor sintaxis</li>
              <li><span className="text-arch-purple">Insomnia</span> — Alternativa ligera a Postman</li>
            </ul>
          </ArchCard>
          <ArchCard title="Thunder Client en VSCode" icon="⚡" variant="green">
            <ol className="space-y-1 text-xs list-decimal pl-4">
              <li>Instalar extensión "Thunder Client"</li>
              <li>Click en el icono del rayo ⚡ en la sidebar</li>
              <li>New Request → elegir método</li>
              <li>Poner URL, headers, body</li>
              <li>Send → ver respuesta</li>
              <li>Guardar en Collections para reusar</li>
            </ol>
          </ArchCard>
        </div>
      </div>
    </div>
  )
}

function ApiDeploy() {
  return (
    <div className="space-y-5">
      <h2 className="text-base font-bold text-arch-green font-mono">🚀 Deploy</h2>
      <p className="text-sm text-arch-white/70">Poner tu API en internet para que otros la usen.</p>
      <div className="grid lg:grid-cols-2 gap-4">
        <div className="space-y-4">
          <ArchCard title="Plataformas gratuitas" icon="☁️" variant="green">
            <ul className="space-y-1.5 text-xs">
              <li><span className="text-arch-green font-bold">Railway</span> — El más fácil. Conecta GitHub y listo.</li>
              <li><span className="text-arch-blue font-bold">Render</span> — Gratis con cold starts. Muy popular.</li>
              <li><span className="text-arch-purple font-bold">Fly.io</span> — Gratis con 3 VMs pequeñas.</li>
              <li><span className="text-arch-cyan font-bold">Vercel</span> — Serverless functions (limitado para Express).</li>
            </ul>
          </ArchCard>
          <CodeBlock title="Preparar para deploy" language="js"
            code={`// server.js — cambios para producción
const PORT = process.env.PORT || 3000;
// La plataforma asigna PORT automáticamente

// Escuchar en 0.0.0.0 (no solo localhost)
app.listen(PORT, '0.0.0.0', () => {
  console.log(\`🚀 Puerto \${PORT}\`);
});`} />
        </div>
        <CodeBlock title="Deploy en Railway" language="bash"
          code={`# 1. Crear cuenta en railway.app
# 2. Conectar tu repo de GitHub
# 3. Railway detecta Node.js automáticamente
# 4. Configurar variables de entorno:
#    PORT (Railway lo asigna solo)
#    JWT_SECRET
#    NODE_ENV=production

# package.json necesita:
{
  "scripts": {
    "start": "node server.js"
  },
  "engines": {
    "node": ">=18"
  }
}

# .gitignore (no subir)
node_modules/
.env
*.db

# Procfile (opcional)
web: node server.js

# Tu API estará en:
# https://mi-api.up.railway.app`} />
      </div>
    </div>
  )
}

function ApiProject() {
  return (
    <div className="space-y-5">
      <h2 className="text-base font-bold text-arch-green font-mono">🏆 Proyecto Final</h2>
      <p className="text-sm text-arch-white/70">Estructura completa de una API profesional.</p>
      <div className="grid lg:grid-cols-2 gap-4">
        <ArchCard title="Estructura profesional" icon="📁" variant="green">
          <pre className="text-[10px] font-mono text-arch-gray-light leading-relaxed">{`mi-api/
├── database/
│   ├── db.js              # conexión
│   └── migrate.js         # migraciones
├── middleware/
│   ├── auth.js            # JWT verify
│   ├── validate.js        # validación
│   └── errorHandler.js    # errores
├── models/
│   ├── userModel.js       # queries users
│   └── postModel.js       # queries posts
├── controllers/
│   ├── authController.js  # login/register
│   ├── userController.js  # CRUD users
│   └── postController.js  # CRUD posts
├── routes/
│   ├── auth.js            # /api/auth
│   ├── users.js           # /api/users
│   └── posts.js           # /api/posts
├── uploads/               # archivos subidos
├── .env                   # secretos (no git)
├── .env.example           # template
├── .gitignore
├── package.json
└── server.js              # punto de entrada`}</pre>
        </ArchCard>
        <div className="space-y-4">
          <CodeBlock title="server.js final" language="js"
            code={`import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import authRoutes from './routes/auth.js';
import userRoutes from './routes/users.js';
import postRoutes from './routes/posts.js';
import { errorHandler } from './middleware/errorHandler.js';
import './database/migrate.js';

const app = express();

// Middleware global
app.use(cors({ origin: process.env.CORS_ORIGIN }));
app.use(express.json());
app.use(express.static('uploads'));

// Rutas
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/posts', postRoutes);

// 404
app.use('*', (req, res) => {
  res.status(404).json({ error: 'Ruta no encontrada' });
});

// Error handler global
app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(\`🚀 API en puerto \${PORT}\`);
});`} />
          <ArchCard title="🎓 ¡Completaste Backend!" icon="🏆" variant="cyan">
            <p className="text-xs">
              Ahora sabes crear APIs profesionales con Express + SQLite. 
              El siguiente paso: conectar con tu frontend React y desplegar.
            </p>
            <ul className="space-y-1 text-xs mt-2">
              <li><span className="text-arch-green">✓</span> Express: servidor, rutas, middleware</li>
              <li><span className="text-arch-green">✓</span> SQLite: CRUD, JOINs, migraciones</li>
              <li><span className="text-arch-green">✓</span> API REST: auth, validación, paginación</li>
            </ul>
          </ArchCard>
        </div>
      </div>
    </div>
  )
}

export const apiTopics = {
  'api-intro':       ApiIntro,
  'api-crud':        ApiCrud,
  'api-validation':  ApiValidation,
  'api-auth':        ApiAuth,
  'api-upload':      ApiUpload,
  'api-pagination':  ApiPagination,
  'api-cors':        ApiCors,
  'api-testing':     ApiTesting,
  'api-deploy':      ApiDeploy,
  'api-project':     ApiProject,
}