import './style.css'
import javascriptLogo from './javascript.svg'
import viteLogo from '/vite.svg'
import { setupCounter } from './counter.js'



const versiculoDivX = document.getElementById('versiculoX');
const versiculoDivY = document.getElementById('versiculoY');

// Variables globales para almacenar los datos de los capítulos
let currentData1 = null;
let currentData2 = null;

// Función para obtener el número total de capítulos de un libro
async function getBookInfo(book) {
    try {
        const response = await fetch(`https://bible-api.com/${book}+1`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error al obtener información del libro:', error);
        return null;
    }
}

// Función para guardar un versículo en favoritos
function guardarFavorito(versiculo) {
    try {
        // Obtener favoritos actuales
        let favoritos = JSON.parse(localStorage.getItem('favoritos') || '[]');
        
        // Verificar si el versículo ya está en favoritos
        const yaExiste = favoritos.some(fav => 
            fav.book === versiculo.book_name && 
            fav.chapter === versiculo.chapter && 
            fav.verse === versiculo.verse
        );

        if (!yaExiste) {
            // Agregar nuevo favorito
            favoritos.push({
                book: versiculo.book_name,
                chapter: versiculo.chapter,
                verse: versiculo.verse,
                text: versiculo.text
            });
            
            // Guardar en localStorage
            localStorage.setItem('favoritos', JSON.stringify(favoritos));
            
            // Actualizar lista de favoritos
            mostrarFavoritos();
            
            // Mostrar mensaje de éxito
            alert('Versículo guardado en favoritos');
        } else {
            alert('Este versículo ya está en favoritos');
        }
    } catch (error) {
        console.error('Error al guardar favorito:', error);
        alert('Error al guardar el versículo');
    }
}

// Función para mostrar favoritos
function mostrarFavoritos() {
    const favoritos = JSON.parse(localStorage.getItem('favoritos') || '[]');
    const favoritesList = document.getElementById('favorites-list');
    
    if (favoritos.length === 0) {
        favoritesList.innerHTML = '<p>No hay versículos favoritos guardados</p>';
        return;
    }
    
    let html = '<ul>';
    favoritos.forEach(fav => {
        html += `
            <li>
                ${fav.book} ${fav.chapter}:${fav.verse} - ${fav.text}
                <button class="delete-btn" data-book="${fav.book}" data-chapter="${fav.chapter}" data-verse="${fav.verse}">Eliminar</button>
            </li>
        `;
    });
    html += '</ul>';
    
    favoritesList.innerHTML = html;

    // Agregar event listeners a los botones de eliminar
    document.querySelectorAll('.delete-btn').forEach(button => {
        button.addEventListener('click', function() {
            const book = this.dataset.book;
            const chapter = parseInt(this.dataset.chapter);
            const verse = parseInt(this.dataset.verse);
            eliminarFavorito(book, chapter, verse);
        });
    });
}

// Función para eliminar un favorito
function eliminarFavorito(book, chapter, verse) {
    let favoritos = JSON.parse(localStorage.getItem('favoritos') || '[]');
    
    favoritos = favoritos.filter(fav => 
        !(fav.book === book && fav.chapter === chapter && fav.verse === verse)
    );
    
    localStorage.setItem('favoritos', JSON.stringify(favoritos));
    mostrarFavoritos();
}

// Función para buscar texto en los versículos
function searchText(searchTerm) {
    if (!currentData1 || !currentData2) return;
    
    // Convertir el término de búsqueda a minúsculas para búsqueda sin distinción de mayúsculas
    searchTerm = searchTerm.toLowerCase();
    
    // Función para resaltar el texto encontrado
    function highlightText(text) {
        const regex = new RegExp(`(${searchTerm})`, 'gi');
        return text.replace(regex, '<mark>$1</mark>');
    }

    // Crear las tablas HTML con el texto resaltado
    let html = `
        <h2>${currentData1.reference} (${currentData1.verses.length} versículos)</h2>
        <table>
            <thead>
                <tr>
                    <th>Libro</th>
                    <th>Capítulo</th>
                    <th>Versículo</th>
                    <th>Texto</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
    `;

    // Agregar versículos del primer capítulo con texto resaltado
    currentData1.verses.forEach(verse => {
        const highlightedText = highlightText(verse.text);
        html += `
            <tr>
                <td>${verse.book_name}</td>
                <td>${verse.chapter}</td>
                <td>${verse.verse}</td>
                <td>${highlightedText}</td>
                <td>
                    <button class="favorite-btn" data-verse='${JSON.stringify(verse)}'>Guardar</button>
                </td>
            </tr>
        `;
    });

    html += `
            </tbody>
        </table>

        <h2>${currentData2.reference} (${currentData2.verses.length} versículos)</h2>
        <table>
            <thead>
                <tr>
                    <th>Libro</th>
                    <th>Capítulo</th>
                    <th>Versículo</th>
                    <th>Texto</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
    `;

    // Agregar versículos del segundo capítulo con texto resaltado
    currentData2.verses.forEach(verse => {
        const highlightedText = highlightText(verse.text);
        html += `
            <tr>
                <td>${verse.book_name}</td>
                <td>${verse.chapter}</td>
                <td>${verse.verse}</td>
                <td>${highlightedText}</td>
                <td>
                    <button class="favorite-btn" data-verse='${JSON.stringify(verse)}'>Guardar</button>
                </td>
            </tr>
        `;
    });

    html += `
            </tbody>
        </table>
    `;

    // Mostrar las tablas en el contenedor
    document.getElementById('verses-container').innerHTML = html;

    // Agregar event listeners a los botones de guardar
    document.querySelectorAll('.favorite-btn').forEach(button => {
        button.addEventListener('click', function() {
            const verse = JSON.parse(this.dataset.verse);
            guardarFavorito(verse);
        });
    });
}

// Función para obtener dos capítulos consecutivos
async function getTwoChapters(book, firstChapter) {
    try {
        // Obtener el primer capítulo
        const response1 = await fetch(`https://bible-api.com/${book}+${firstChapter}`);
        currentData1 = await response1.json();

        // Obtener el siguiente capítulo
        const response2 = await fetch(`https://bible-api.com/${book}+${Number(firstChapter) + 1}`);
        currentData2 = await response2.json();

        // Mostrar los capítulos sin resaltar
        searchText('');

    } catch (error) {
        console.error('Error:', error);
        document.getElementById('verses-container').innerHTML = 'Error al cargar los versículos';
    }
}

// Manejar el envío del formulario
document.getElementById('searchForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    const book = document.getElementById('bookSelect').value;
    const chapter = document.getElementById('chapterNumber').value;
    
    // Obtener información del libro
    const bookInfo = await getBookInfo(book);
    
    // Validar el número de capítulo
    if (bookInfo && chapter > bookInfo.verses.length) {
        alert(`Este libro solo tiene ${bookInfo.verses.length} capítulos`);
        return;
    }
    
    getTwoChapters(book, chapter);
});

// Manejar la búsqueda de texto
document.getElementById('searchButton').addEventListener('click', function() {
    const searchTerm = document.getElementById('textSearch').value;
    searchText(searchTerm);
});

// También buscar al presionar Enter en el campo de búsqueda
document.getElementById('textSearch').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        const searchTerm = this.value;
        searchText(searchTerm);
    }
});

// Cargar favoritos al iniciar
mostrarFavoritos();

setupCounter(document.querySelector('#counter'))
