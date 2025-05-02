import './style.css'
import javascriptLogo from './javascript.svg'
import viteLogo from '/vite.svg'
import { setupCounter } from './counter.js'



const versiculoDivX = document.getElementById('versiculoX');
const versiculoDivY = document.getElementById('versiculoY');



// Función para obtener el número total de capítulos de un libro
async function getBookInfo(book) {
    try {
        // Hacemos una llamada al primer capítulo para obtener la información del libro
        const response = await fetch(`https://bible-api.com/${book}+1`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error al obtener información del libro:', error);
        return null;
    }
}

// Función para obtener dos capítulos consecutivos
async function getTwoChapters(book, firstChapter) {
    try {
        // Obtener el primer capítulo
        const response1 = await fetch(`https://bible-api.com/${book}+${firstChapter}`);
        const data1 = await response1.json();

        // Obtener el siguiente capítulo
        const response2 = await fetch(`https://bible-api.com/${book}+${Number(firstChapter) + 1}`);
        const data2 = await response2.json();

        // Crear las tablas HTML
        let html = `
            <h2>${data1.reference} (${data1.verses.length} versículos)</h2>
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

        // Agregar versículos del primer capítulo
        data1.verses.forEach(verse => {
            html += `
                <tr>
                    <td>${verse.book_name}</td>
                    <td>${verse.chapter}</td>
                    <td>${verse.verse}</td>
                    <td>${verse.text}</td>
                </tr>
            `;
        });

        html += `
                </tbody>
            </table>

            <h2>${data2.reference} (${data2.verses.length} versículos)</h2>
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

        // Agregar versículos del segundo capítulo
        data2.verses.forEach(verse => {
            html += `
                <tr>
                    <td>${verse.book_name}</td>
                    <td>${verse.chapter}</td>
                    <td>${verse.verse}</td>
                    <td>${verse.text}</td>
                </tr>
            `;
        });

        html += `
                </tbody>
            </table>
        `;

        // Mostrar las tablas en el contenedor
        document.getElementById('verses-container').innerHTML = html;

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



setupCounter(document.querySelector('#counter'))
