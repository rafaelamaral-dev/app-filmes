// ====== SELEÇÃO DE ELEMENTOS ======
const input = document.querySelector('#buscarFilme');
const btnBuscar = document.querySelector('#btnBuscar');
const estatus = document.getElementById('status');
const results = document.getElementById('resultados');


// ====== FUNÇÃO PRINCIPAL ======
function buscarFilmes() {
    const filmeDigitado = input.value.toLowerCase().trim();

    if (filmeDigitado === '') {
        estatus.textContent = "Digite um nome antes!";
        results.innerHTML = '';
        input.focus();
        return;
    }

    results.innerHTML = '';
    estatus.textContent = 'Carregando...';

    const url = `https://api.themoviedb.org/3/search/movie?api_key=e82b59262ae74742b50d6084f76ee059&language=pt-BR&query=${filmeDigitado}`;

    carregar(url);
}


// ====== BUSCAR NA API ======
async function carregar(url) {
    try {
        const res = await fetch(url);

        if (!res.ok) throw new Error(`HTTP ${res.status}`);

        const data = await res.json();

        estatus.textContent = "";

        if (data.results.length === 0) {
            results.textContent = "Nenhum filme encontrado.";
            return;
        }

        data.results.forEach(filme => {
            const card = criarCardFilme(filme);
            results.appendChild(card);
        });

        input.value = '';
        input.focus();

    } catch (err) {
        console.error("Erro geral:", err.message);
        results.textContent = 'Erro ao buscar filmes.';
        estatus.textContent = '';
    }
}


// ====== GERAR CARD DO FILME ======
function criarCardFilme(filme) {
    const card = document.createElement('div');
    card.classList.add("card");

    const posterURL = filme.poster_path
        ? `https://image.tmdb.org/t/p/w200${filme.poster_path}`
        : "https://via.placeholder.com/200x300?text=Sem+Imagem";

    card.innerHTML = `
        <img src="${posterURL}" alt="${filme.title}">
        <h3>${filme.title}</h3>
        <p class="nota">⭐ ${filme.vote_average}</p>
    `;

    // Clique → página de detalhes
    card.addEventListener('click', () => {
        window.location.href = `detalhe.html?id=${filme.id}`;
    });

    return card;
}


// ====== EVENTOS ======
btnBuscar.addEventListener('click', buscarFilmes);

input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') buscarFilmes();
});
