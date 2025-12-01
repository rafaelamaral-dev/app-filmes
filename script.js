//1 - Selecting elements
const input = document.querySelector('#buscarFilme');
const btnBuscar = document.querySelector('#btnBuscar');
const estatus = document.getElementById('status');
const results = document.getElementById('resultados');

//2 - Creating functions
function buscarFilmes(){
    let filmeDigitado = input.value.toLowerCase().trim();

    if(filmeDigitado === ''){
        estatus.textContent = "Digite um nome antes!";
        results.innerHTML = '';
        input.focus();
        return;
    }

    results.innerHTML = '';
    estatus.textContent = 'Carregando...';

    carregar(`https://api.themoviedb.org/3/search/movie?api_key=e82b59262ae74742b50d6084f76ee059&query=${filmeDigitado}`);
}

async function carregar(url){
    try {
        const res = await fetch(url);

        if (!res.ok) throw new Error(`HTTP ${res.status}`);

        const data = await res.json();
        console.log(data); //Veja o objeto no console!

        estatus.textContent = "";

        if (data.results.length === 0){
            results.textContent = "Nenhum filme encontrado.";
            return;
        }

        // Gera vários cards
        data.results.forEach(filme => {
            const card = document.createElement('div');
            card.style.border = '1px solid #ccc';
            card.style.padding = '10px';
            card.style.margin = '10px 0';
            card.style.cursor = 'pointer';

            card.innerHTML = `
                <h3>${filme.title}</h3>
                <p>Nota: ${filme.vote_average}</p>
                <img src="https://image.tmdb.org/t/p/w200${filme.poster_path}" alt="${filme.title}">
            `;

            // Clicar leva para detalhe.html?id=XXXX
            card.addEventListener('click', () => {
                window.location.href = `detalhe.html?id=${filme.id}`;
            });

            results.appendChild(card);
        });

        input.value = '';
        input.focus();

    } catch(err) {
        console.error("Erro geral:", err.message);
        results.textContent = 'Erro ao buscar filmes.';
        estatus.textContent = '';
        input.focus();
    }
}

//3 - Add events
btnBuscar.addEventListener('click', buscarFilmes);

input.addEventListener('keydown', (e) => {
    if(e.key === 'Enter'){
        buscarFilmes();
    }
});
