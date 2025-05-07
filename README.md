# Bible Verse Explorer

Una aplicación web interactiva para explorar y gestionar versículos bíblicos. Permite buscar versículos, guardar favoritos y filtrar por libros.

## Características

- 🔍 Búsqueda de versículos por libro y capítulo
- ⭐ Guardar versículos favoritos
- 📚 Filtrado de favoritos por libro
- 📱 Diseño responsive
- 🌙 Modo oscuro por defecto

## Requisitos Previos

- Node.js (versión 14 o superior)
- npm (incluido con Node.js)

## Instalación

1. Clona el repositorio:
```bash
git clone https://github.com/tu-usuario/bible-verse-explorer.git
cd bible-verse-explorer
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

## Scripts Disponibles

- `npm run dev` - Inicia el servidor de desarrollo
- `npm run build` - Construye la aplicación para producción
- `npm run preview` - Vista previa de la versión de producción

## Contribuir

1. Haz un Fork del proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE.md](LICENSE.md) para más detalles.

## Contacto

Tu Nombre - [@tutwitter](https://twitter.com/tutwitter)

Link del Proyecto: [https://github.com/tu-usuario/bible-verse-explorer](https://github.com/tu-usuario/bible-verse-explorer) 