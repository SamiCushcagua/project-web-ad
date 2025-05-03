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
            </tr>
        `;
    });

    html += `
            </tbody>
        </table>
    `;

    // Mostrar las tablas en el contenedor
    document.getElementById('verses-container').innerHTML = html;
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

setupCounter(document.querySelector('#counter'))
