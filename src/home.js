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

    // Voeg event listeners toe aan de verwijderknoppen
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

// Voeg event listener toe voor de filter
document.getElementById('bookFilter').addEventListener('change', mostrarFavoritos);

// Laad favorieten bij het opstarten
mostrarFavoritos(); 