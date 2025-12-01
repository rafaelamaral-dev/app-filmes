// 1 - Pegar o ID da URL
const params = new URLSearchParams(window.location.search);
const id = params.get("id");

if (!id) {
    document.body.innerHTML = "<h2>ID inválido</h2>";
    throw new Error("ID não encontrado na URL");
}

// 2 - Selecionar elementos
const titulo = document.getElementById('titulo');
const poster = document.getElementById('poster');
const descricao = document.getElementById('descricao');
const nota = document.getElementById('nota');
const lancamento = document.getElementById('lancamento');

// 3 - Buscar detalhes do filme
async function carregarDetalhes() {
    try {
        const res = await fetch(
            `https://api.themoviedb.org/3/movie/${id}?api_key=e82b59262ae74742b50d6084f76ee059&language=pt-BR`
        );

        if (!res.ok) throw new Error(`HTTP ${res.status}`);

        const filme = await res.json();

        // 4 - Preencher na tela
        titulo.textContent = `${filme.title} (${filme.release_date.slice(0,4)})`;
        poster.src = `https://image.tmdb.org/t/p/w300${filme.poster_path}`;
        descricao.textContent = filme.overview || "Sem descrição disponível.";
        nota.textContent = `Nota média: ${filme.vote_average}`;
        lancamento.textContent = `Lançamento: ${filme.release_date}`;

    } catch (err) {
        console.error(err);
        document.body.innerHTML = "<h2>Erro ao carregar detalhes.</h2>";
    }
}

carregarDetalhes();
