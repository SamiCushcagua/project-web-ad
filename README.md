# Bijbel Vers Verkenner

Een interactieve webapplicatie voor het verkennen en beheren van bijbelverzen. Hiermee kunt u verzen zoeken, favorieten opslaan en filteren op boeken.

## Kenmerken

-  Zoeken naar verzen op boek en hoofdstuk
-  Favoriete verzen opslaan
-  Filteren van favorieten op boek
-  Responsief ontwerp
-  Standaard donkere modus

## Vereisten

- Node.js (versie 14 of hoger)
- npm (inbegrepen bij Node.js)

## Installatie

1. Kloon de repository:
```bash

```

2. Installeer de dependencies:
```bash
npm install
```

3. Start de ontwikkelserver:
```bash
npm run dev
```

4. Open uw browser en ga naar:
```
http://localhost:5173
```

## Gebruik

### Verzen Zoeken
1. Selecteer een bijbelboek
2. Voer het hoofdstuknummer in
3. Klik op "Zoeken" om de verzen te bekijken

### Favorieten Beheren
- Om een vers op te slaan: Klik op de "Opslaan" knop naast het vers
- Om uw favorieten te bekijken: Klik op "Ga naar Favorieten" in de navigatie
- Om een favoriet te verwijderen: Klik op de "Verwijderen" knop naast het vers

### Favorieten Filteren
- Gebruik op de favorietenpagina de selector om te filteren op specifiek boek

## Gebruikte Technologieën

- Vite
- JavaScript
- HTML5
- CSS3
- Bible API (bible-api.com)

## Projectstructuur

```
bible-verse-explorer/
├── src/
│   ├── main.js          # Hoofdlogica
│   ├── home.js          # Favorietenpagina logica
│   ├── style.css        # Stijlen
│   └── index.html       # Hoofdpagina
├── public/              # Statische bestanden
└── package.json         # Dependencies en scripts
```



# Bible Verse Explorer

Una aplicación web interactiva para explorar y gestionar versículos bíblicos. Permite buscar versículos, guardar favoritos y filtrar por libros.

## Características

-  Búsqueda de versículos por libro y capítulo
-  Guardar versículos favoritos
- Filtrado de favoritos por libro
-  Diseño responsive
- Modo oscuro por defecto

## Requisitos Previos

- Node.js (versión 14 o superior)
- npm (incluido con Node.js)

## Instalación

1. Clona el repositorio:
```bash

```

2. Instala las dependencias:
```bash
npm install
```

3. Inicia el servidor de desarrollo:
```bash
npm run dev
```

4. Abre tu navegador y visita:
```
http://localhost:5173
```

## Uso

### Búsqueda de Versículos
1. Selecciona un libro de la Biblia
2. Ingresa el número de capítulo
3. Haz clic en "Buscar" para ver los versículos

### Gestión de Favoritos
- Para guardar un versículo: Haz clic en el botón "Guardar" junto al versículo
- Para ver tus favoritos: Haz clic en "Ir a Favoritos" en la navegación
- Para eliminar un favorito: Haz clic en el botón "Eliminar" junto al versículo

### Filtrado de Favoritos
- En la página de favoritos, usa el selector para filtrar por libro específico

## Tecnologías Utilizadas

- Vite
- JavaScript
- HTML5
- CSS3
- Bible API (bible-api.com)

## Estructura del Proyecto

```
bible-verse-explorer/
├── src/
│   ├── main.js          # Lógica principal
│   ├── home.js          # Lógica de la página de favoritos
│   ├── style.css        # Estilos
│   └── index.html       # Página principal
├── public/              # Archivos estáticos
└── package.json         # Dependencias y scripts
```

