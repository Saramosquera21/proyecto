// src/lib/storage.ts
export type Usuario = {
  id: number
  nombre: string
  email: string
  passwordHash: string
  creadoEn: string
}

const USERS_KEY = "dropen_users"
const CURRENT_USER_KEY = "dropen_current_user"
const TOKEN_KEY = "dropen_token"

// Helpers de localStorage
function getItem<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key)
    return raw ? JSON.parse(raw) as T : fallback
  } catch {
    return fallback
  }
}

function setItem<T>(key: string, value: T) {
  localStorage.setItem(key, JSON.stringify(value))
}

// "Conexión" a la base de datos del navegador
export function getUsers(): Usuario[] {
  return getItem<Usuario[]>(USERS_KEY, [])
}

export function saveUsers(users: Usuario[]) {
  setItem(USERS_KEY, users)
}

// Hash de contraseña con Web Crypto (SHA-256)
export async function hashPassword(password: string): Promise<string> {
  const enc = new TextEncoder().encode(password)
  const digest = await crypto.subtle.digest("SHA-256", enc)
  const bytes = Array.from(new Uint8Array(digest))
  return bytes.map(b => b.toString(16).padStart(2, "0")).join("")
}

// Registro de usuario en navegador
export async function registerUser(nombre: string, email: string, password: string): Promise<{ ok: boolean; message: string; id?: number }> {
  const users = getUsers()
  const exists = users.some(u => u.email.toLowerCase() === email.toLowerCase())
  if (exists) {
    return { ok: false, message: "El email ya está registrado" }
  }
  const passwordHash = await hashPassword(password)
  const id = users.length ? Math.max(...users.map(u => u.id)) + 1 : 1
  const nuevo: Usuario = {
    id,
    nombre,
    email,
    passwordHash,
    creadoEn: new Date().toISOString()
  }
  users.push(nuevo)
  saveUsers(users)
  return { ok: true, message: "Usuario registrado", id }
}

// Login verificando email y contraseña (contra localStorage)
export async function loginUser(email: string, password: string): Promise<{ ok: boolean; message: string; token?: string; usuario?: Usuario }> {
  const users = getUsers()
  const usuario = users.find(u => u.email.toLowerCase() === email.toLowerCase())
  if (!usuario) {
    return { ok: false, message: "Usuario no encontrado" }
  }
  const passwordHash = await hashPassword(password)
  if (usuario.passwordHash !== passwordHash) {
    return { ok: false, message: "Contraseña incorrecta" }
  }
  const token = generateToken(usuario)
  setCurrentUser(usuario)
  setToken(token)
  return { ok: true, message: "Login exitoso", token, usuario }
}

// Token muy simple (no JWT real). Para producción usa tu backend/JWT.
function generateToken(usuario: Usuario): string {
  const payload = `${usuario.id}:${usuario.email}:${Date.now()}`
  const random = Math.random().toString(36).slice(2)
  return btoa(`${payload}:${random}`)
}

// Sesión
export function getToken(): string | null {
  return getItem<string | null>(TOKEN_KEY, null)
}

export function setToken(token: string) {
  setItem(TOKEN_KEY, token)
}

export function clearToken() {
  localStorage.removeItem(TOKEN_KEY)
}

export function getCurrentUser(): Usuario | null {
  return getItem<Usuario | null>(CURRENT_USER_KEY, null)
}

export function setCurrentUser(usuario: Usuario) {
  setItem(CURRENT_USER_KEY, usuario)
}

export function logout() {
  clearToken()
  localStorage.removeItem(CURRENT_USER_KEY)
}
