# Guía Paso a Paso para Configurar Strapi CMS 🚀

Esta guía detalla de manera simple y didáctica cómo desplegar, modelar y conectar tu propia instancia de **Strapi de manera asíncrona** con este portafolio web interactivo.

---

## 📋 Índice
1. [Inicializar Strapi en Local](#1-inicializar-strapi-en-local)
2. [Crear Estructura de Schemas (Content-Types)](#2-crear-estructura-de-schemas-content-types)
3. [Configurar Permisos Públicos en Strapi](#3-configurar-permisos-públicos-en-strapi)
4. [Llenar Información (Seeding)](#4-llenar-información-seeding)
5. [Conectar con el Portafolio](#5-conectar-con-el-portafolio)

---

## 1. Inicializar Strapi en Local

Para crear un nuevo proyecto Strapi desde cero, abre tu terminal y ejecuta:

```bash
# Crea un nuevo servidor Strapi configurado de forma predeterminada
npx create-strapi-app@latest mi-portafolio-cms --quickstart
```

Una vez que termine la instalación, se abrirá automáticamente tu navegador en `http://localhost:1337/admin`. Registra tu usuario administrador para acceder al panel de control de Strapi.

---

## 2. Crear Estructura de Schemas (Content-Types)

Dentro del panel administrador de Strapi, ve a la pestaña **Content-Type Builder** (Creador de Tipos de Contenidos) en el menú lateral izquierdo. Deberás estructurar los modelos exactamente como se detalla a continuación:

### A. Colección `Profile` *(Single Type)*
Crea un **Single Type** llamado `Profile` (Perfil) con los siguientes campos:

| Nombre del Campo | Tipo de Dato | Descripción / Opciones |
| :--- | :--- | :--- |
| `name` | **Text** (Short) | Nombre completo (ej: Sofia G. Silva) |
| `role` | **Text** (Short) | Tu cargo/rol (ej: Especialista Front-End e CMS) |
| `description` | **Text** (Long) | Descripción introductoria corta |
| `longDescription` | **Text** (Long) | Tu biografía completa o texto destacado |
| `avatar` | **Media** (Single) | Foto de perfil personal |
| `resume` | **Media** (Single) | Currículum Vitae (PDF o Documento descargable) |
| `email` | **Text** (Short) | Correo electrónico de contacto |
| `location` | **Text** (Short) | Ubicación (ej: Santiago, Chile) |
| `workStatus` | **Text** (Short) | Estado laboral (ej: Disponible para nuevos proyectos) |

---

### B. Colección `Skill` *(Collection Type)*
Crea un **Collection Type** llamado `Skill` (Habilidades) con los siguientes campos:

| Nombre del Campo | Tipo de Dato | Opciones permitidas |
| :--- | :--- | :--- |
| `name` | **Text** (Short) | Nombre de la habilidad (ej: React, Tailwind) |
| `category` | **Enumeration** | Ingresa estos valores exactos: `Frontend`, `Backend`, `Design`, `Tools`, `Other` |
| `level` | **Number** (Integer) | Valor de `0` a `100` que representa tu nivel de expertise |
| `icon` | **Text** (Short) | Nombre del ícono de Lucide (ej: `React`, `Code2`, `Database`, `Figma`) |

---

### C. Colección `Education` *(Collection Type)*
Crea un **Collection Type** llamado `Education` para registrar tu formación académica y certificaciones:

| Nombre del Campo | Tipo de Dato | Opciones permitidas |
| :--- | :--- | :--- |
| `institution` | **Text** (Short) | Entidad educativa (ej: Universidad Complutense) |
| `degree` | **Text** (Short) | Título obtenido o curso (ej: Licenciatura en Computación) |
| `duration` | **Text** (Short) | Años de duración (ej: `2020 - 2024` o `Ene 2026`) |
| `description` | **Text** (Long) | Resumen de asignaturas o logros obtenidos |
| `type` | **Enumeration** | Ingresa estos valores exactos: `education` (Estudios), `certification` (Certificaciones) |
| `credentialUrl` | **Text** (Short) | Enlace para validar credencial (opcional) |

---

### D. Colección `Experience` *(Collection Type)*
Crea un **Collection Type** llamado `Experience` (Trayectoria Profesional) con estos campos:

| Nombre del Campo | Tipo de Dato | Descripción / Opciones |
| :--- | :--- | :--- |
| `company` | **Text** (Short) | Nombre de la organización/compañía |
| `role` | **Text** (Short) | Cargo que desempeñaste (ej: Front-End Developer) |
| `duration` | **Text** (Short) | Período transcurrido (ej: `2024 - Presente`) |
| `description` | **Text** (Long) | Logros principales separados por salto de línea |
| `skills` | **Text** (Short) | Tecnologías aplicadas separadas por coma (ej: `React, Strapi, Tailwind`) |

---

### E. Colección `Social` *(Collection Type)*
Crea un **Collection Type** llamado `Social` (Redes Sociales):

| Nombre del Campo | Tipo de Dato | Descripción / Opciones |
| :--- | :--- | :--- |
| `platform` | **Text** (Short) | Identificador en minúsculas (ej: `github`, `linkedin`, `instagram`) |
| `url` | **Text** (Short) | Enlace directo a tu perfil |
| `label` | **Text** (Short) | Texto visible del enlace (ej: `GitHub / sofia-dev`) |

---

## 3. Configurar Permisos Públicos en Strapi

Por defecto, los endpoints de Strapi están protegidos por seguridad. Para permitir que el portafolio consulte la información de manera limpia sin necesidad de tokens de API complejos:

1. Ve a **Settings** (Ajustes) en el panel izquierdo de Strapi.
2. En la sección **Users & Permissions Plugin**, haz clic en **Roles**.
3. Haz clic sobre el rol **Public** (Público).
4. En la cuadrícula de permisos, selecciona los de cada uno de tus Content-Types creados y marca el checkbox de **find** y **findOne** (e.g. `education`, `experience`, `profile`, `skill`, `social`).
5. Guarda los cambios haciendo clic en **Save** en la parte superior derecha.

---

## 4. Llenar Información (Seeding)

Ve al **Content Manager** (Gestor de Contenidos) en el menú de navegación izquierdo y rellena los datos con tu propia información profesional. Una vez llenado, no olvides presionar **Publish** (Publicar) en cada registro para que se habiliten de manera pública.

---

## 5. Conectar con el Portafolio

Sacas el máximo partido de tu web estática conectando directamente la API pública:

1. Modifica la variable del entorno en el archivo `.env` o `.env.example` en la raíz de tu proyecto:
   ```env
   VITE_STRAPI_URL=http://localhost:1337
   VITE_USE_MOCK_DATA=false
   ```
2. El sistema detectará las entradas publicadas y reemplazará automáticamente los datos locales estáticos con tu información en vivo cargada desde tu servidor Strapi.

¡Listo! Tu portafolio ahora cuenta con un potente backend Headless CMS perfectamente integrado.
