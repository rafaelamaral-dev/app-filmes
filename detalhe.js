// =========================
// 1 - Pegar ID da URL
// =========================
const params = new URLSearchParams(window.location.search);
const id = params.get("id");

if (!id) {
    document.body.innerHTML = "<h2>ID inválido</h2>";
    throw new Error("ID não encontrado na URL");
}

// =========================
// 2 - Selecionar elementos
// =========================
const titulo = document.getElementById("titulo");
const poster = document.getElementById("poster");
const descricao = document.getElementById("descricao");
const nota = document.getElementById("nota");
const lancamento = document.getElementById("lancamento");

// =========================
// LOADING temporário
// =========================
descricao.textContent = "Carregando...";
nota.textContent = "";
lancamento.textContent = "";


// =========================
// 3 - Buscar detalhes do filme
// =========================
async function carregarDetalhes() {
    try {
        const res = await fetch(
            `https://api.themoviedb.org/3/movie/${id}?api_key=e82b59262ae74742b50d6084f76ee059&language=pt-BR`
        );

        if (!res.ok) throw new Error(`HTTP ${res.status}`);

        const filme = await res.json();

        // =========================
        // 4 - Preencher na tela
        // =========================
        const ano = filme.release_date ? filme.release_date.slice(0, 4) : "–";
        titulo.textContent = `${filme.title} (${ano})`;

        // Fallback caso não tenha poster
        poster.src = filme.poster_path
            ? `https://image.tmdb.org/t/p/w400${filme.poster_path}`
            : "assets/no-poster.png";

        poster.alt = `Poster do filme ${filme.title}`;

        descricao.textContent =
            filme.overview || "Nenhuma descrição disponível.";

        nota.innerHTML = `<strong>Nota média:</strong> ${filme.vote_average ?? "–"}`;
        lancamento.innerHTML = `<strong>Lançamento:</strong> ${filme.release_date ?? "–"}`;

    } catch (err) {
        console.error(err);

        document.querySelector(".movie-detail").innerHTML = `
            <p style="font-size:18px; color:#900; text-align:center;">
                Erro ao carregar detalhes do filme.
            </p>
        `;
    }
}

carregarDetalhes();
