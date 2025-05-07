import './style.css'
import javascriptLogo from './javascript.svg'
import viteLogo from '/vite.svg'

const versiculoDivX = document.getElementById('versiculoX');
const versiculoDivY = document.getElementById('versiculoY');

// Globale variabelen voor het opslaan van hoofdstukgegevens
let currentData1 = null;
let currentData2 = null;

// Functie om het totale aantal hoofdstukken van een boek te krijgen
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

// Functie om een vers op te slaan in favorieten
function guardarFavorito(versiculo) {
    try {
        // Huidige favorieten ophalen
        let favoritos = JSON.parse(localStorage.getItem('favoritos') || '[]');
        
        // Controleren of het vers al in favorieten staat
        const yaExiste = favoritos.some(fav => 
            fav.book === versiculo.book_name && 
            fav.chapter === versiculo.chapter && 
            fav.verse === versiculo.verse
        );

        if (!yaExiste) {
            // Nieuwe favoriet toevoegen
            favoritos.push({
                book: versiculo.book_name,
                chapter: versiculo.chapter,
                verse: versiculo.verse,
                text: versiculo.text
            });
            
            // Opslaan in localStorage
            localStorage.setItem('favoritos', JSON.stringify(favoritos));
            
            // Favorietenlijst bijwerken
            mostrarFavoritos();
            
            // Succesbericht tonen
            alert('Versículo guardado en favoritos');
        } else {
            alert('Este versículo ya está en favoritos');
        }
    } catch (error) {
        console.error('Error al guardar favorito:', error);
        alert('Error al guardar el versículo');
    }
}

// Functie om favorieten weer te geven
function mostrarFavoritos() {
    const favoritos = JSON.parse(localStorage.getItem('favoritos') || '[]');
    const favoritesList = document.getElementById('favorites-list');
    
    if (favoritos.length === 0) {
        favoritesList.innerHTML = '<p>No hay versículos favoritos guardados</p>';
        return;
    }
    
    // Krijg de geselecteerde filterwaarde
    const libroSeleccionado = document.getElementById('bookFilter').value;
    
    // Filter de favorieten
    let favoritosFiltrados = [];
    if (libroSeleccionado === 'all') {
        favoritosFiltrados = favoritos;
    } else {
        for (let favorito of favoritos) {
            if (favorito.book === libroSeleccionado) {
                favoritosFiltrados.push(favorito);
            }
        }
    }
    
    let html = '<ul>';
    favoritosFiltrados.forEach(fav => {
        html += `
            <li>
                ${fav.book} ${fav.chapter}:${fav.verse} - ${fav.text}
                <button class="delete-btn" data-book="${fav.book}" data-chapter="${fav.chapter}" data-verse="${fav.verse}">Eliminar</button>
            </li>
        `;
    });
    html += '</ul>';
    
    favoritesList.innerHTML = html;

    // Event listeners toevoegen aan verwijderknoppen
    document.querySelectorAll('.delete-btn').forEach(button => {
        button.addEventListener('click', function() {
            const book = this.dataset.book;
            const chapter = parseInt(this.dataset.chapter);
            const verse = parseInt(this.dataset.verse);
            eliminarFavorito(book, chapter, verse);
        });
    });
}

// Functie om een favoriet te verwijderen
function eliminarFavorito(book, chapter, verse) {
    let favoritos = JSON.parse(localStorage.getItem('favoritos') || '[]');
    
    favoritos = favoritos.filter(fav => 
        !(fav.book === book && fav.chapter === chapter && fav.verse === verse)
    );
    
    localStorage.setItem('favoritos', JSON.stringify(favoritos));
    mostrarFavoritos();
}

// Functie om tekst in verzen te zoeken
function searchText(searchTerm) {
    if (!currentData1 || !currentData2) return;
    
    // Zoekterm naar kleine letters converteren voor hoofdletterongevoelige zoekopdracht
    searchTerm = searchTerm.toLowerCase();
    
    // Functie om gevonden tekst te markeren
    function highlightText(text) {
        if (!searchTerm) return text;
        const regex = new RegExp(searchTerm, 'gi');
        return text.replace(regex, match => `<mark style="background-color: yellow; color: black;">${match}</mark>`);
    }

    // HTML-tabellen maken met gemarkeerde tekst
    let html = `
        <div class="chapters-container">
            <div class="chapter-box">
                <h2>${currentData1.reference} (${currentData1.verses.length} versículos)</h2>
                <div class="table-responsive">
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

    // Verzen van het eerste hoofdstuk toevoegen met gemarkeerde tekst
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
                </div>
            </div>

            <div class="chapter-box">
                <h2>${currentData2.reference} (${currentData2.verses.length} versículos)</h2>
                <div class="table-responsive">
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

    // Verzen van het tweede hoofdstuk toevoegen met gemarkeerde tekst
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
                </div>
            </div>
        </div>
    `;

    // Tabellen in de container weergeven
    document.getElementById('verses-container').innerHTML = html;

    // Event listeners toevoegen aan opslaanknoppen
    document.querySelectorAll('.favorite-btn').forEach(button => {
        button.addEventListener('click', function() {
            const verse = JSON.parse(this.dataset.verse);
            guardarFavorito(verse);
        });
    });
}

// Functie om twee opeenvolgende hoofdstukken te krijgen
async function getTwoChapters(book, firstChapter) {
    try {
        // Eerste hoofdstuk ophalen
        const response1 = await fetch(`https://bible-api.com/${book}+${firstChapter}`);
        currentData1 = await response1.json();

        // Volgende hoofdstuk ophalen
        const response2 = await fetch(`https://bible-api.com/${book}+${Number(firstChapter) + 1}`);
        currentData2 = await response2.json();

        // Hoofdstukken weergeven zonder markering
        searchText('');

    } catch (error) {
        console.error('Error:', error);
        document.getElementById('verses-container').innerHTML = 'Error al cargar los versículos';
    }
}

// Formulierverzending afhandelen
document.getElementById('searchForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    const book = document.getElementById('bookSelect').value;
    const chapter = document.getElementById('chapterNumber').value;
    
    // Boekinformatie ophalen
    const bookInfo = await getBookInfo(book);
    
    // Hoofdstuknummer valideren
    if (bookInfo && chapter > bookInfo.verses.length) {
        alert(`Este libro solo tiene ${bookInfo.verses.length} capítulos`);
        return;
    }
    
    getTwoChapters(book, chapter);
});

// Tekstzoekopdracht afhandelen
document.getElementById('searchButton').addEventListener('click', function() {
    console.log('Botón de búsqueda clickeado');
    const searchTerm = document.getElementById('textSearch').value;
    console.log('Término de búsqueda:', searchTerm);
    searchText(searchTerm);
});

// Ook zoeken bij Enter in het zoekveld
document.getElementById('textSearch').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        console.log('Enter presionado en el campo de búsqueda');
        const searchTerm = this.value;
        console.log('Término de búsqueda:', searchTerm);
        searchText(searchTerm);
    }
});

// Event listener toevoegen voor de filter
document.getElementById('bookFilter').addEventListener('change', mostrarFavoritos);

// Favorieten laden bij het opstarten
mostrarFavoritos();
