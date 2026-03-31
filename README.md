(university - veiga de almeida - rio de janeiro, tijuca)
1 period - 2026.1
members:
cauã
anna clara
gyovanna
nicole
mateus

## Página de comédia

Este projeto possui uma página de catálogo em `pages/comedy_page.html` estilizada por `style/style-comedy.css`.
Ela busca dados da API do TMDB e exibe apenas uma lista curada de filmes escolhidos pelo grupo.

## Estrutura do `pages/comedy_page.html`

- **Header**
  - Bloco com imagem (`.spider-banner`) no topo esquerdo: `../images/miranha.jpg`.
  - Link de retorno para `pages/index.html`.
  - Título da página.

- **Área de filtros**
  - Campo de busca (`#query`) para filtrar dentro da lista fixa de títulos.
  - Seletor de idioma (`#lang`), usado nas chamadas da TMDB.
  - Botão `Buscar` (`#btnSearch`) para atualizar os resultados.
  - Caixa de erro (`#error`) para feedback de falhas.

- **Área de status**
  - Status de carregamento e quantidade de filmes encontrados (`#status`).
  - Área de paginação (`#btnPrev`, `#pageInfo`, `#btnNext`) atualmente desativada no modo de lista fixa.

- **Grade de resultados**
  - Container `#grid` onde os cards dos filmes são renderizados dinamicamente.

## Como o JavaScript funciona

- **Configuração da API**
  - `TMDB_API_KEY`: chave da API (modo teste, no front-end).
  - `TMDB_BASE_URL`: `https://api.themoviedb.org/3`.
  - `IMAGE_BASE_URL`: base para pôsteres.
  - `SELECTED_TITLES`: lista fixa dos filmes escolhidos.

- **Funções principais**
  - `buildUrl(path, params)`: monta URL da TMDB e inclui `api_key`.
  - `tmdbGet(path, params)`: faz `fetch`, trata erro de rede e erro HTTP.
  - `fetchMovieByTitle(title)`: busca filme por título usando `/search/movie`.
  - `chooseBestResult(results, expectedTitle)`: escolhe o melhor match da busca.
  - `loadSelected(query)`: carrega a lista curada completa (ou filtrada pela busca digitada).
  - `renderMovies(list)`: monta cards no grid.
  - `movieCard(movie)`: template HTML de cada card.

- **Clique para streaming legal**
  - Ao clicar em um card, o código consulta `/movie/{id}/watch/providers`.
  - Escolhe link por região com base no idioma (prioriza país do idioma, depois BR e US).
  - Abre o link em nova aba com:
    - `window.open(link, "_blank", "noopener,noreferrer")`
  - Cache de links em memória: `providerLinkCache` (evita consultas repetidas no mesmo filme).

- **Eventos de interface**
  - Botão buscar: recarrega com termo digitado.
  - Enter no input: executa busca.
  - Troca de idioma: limpa cache de provedores e recarrega resultados.
  - Botões de paginação: sem ação ativa (comentário no código indicando desativação).

## Estrutura visual em `style/style-comedy.css`

- **Tema base**
  - Paleta escura padronizada com base em `body` (`#141414`).
  - Variáveis CSS no `:root` para cor de fundo, painel, texto, borda e destaque.

- **Layout**
  - Header em grid com 2 colunas: imagem quadrada + conteúdo textual.
  - Container principal (`.wrap`) centralizado.
  - Filtro em painel (`.panel`) com inputs e botão.
  - Resultados em grade responsiva (`.grid`) com 2, 4 ou 5 colunas conforme viewport.

- **Componentes**
  - Cards (`.card`) com pôster, título e badges de ano/nota.
  - Erros (`.error`) com estilo de destaque.
  - Link `Voltar` com hover.

- **Responsividade**
  - Em telas menores (`max-width: 700px`), header empilha em uma coluna.
  - A imagem do banner reduz de tamanho para manter proporção e legibilidade.

## Endpoints TMDB usados

- Buscar filmes por nome:
  - `GET /search/movie`
- Buscar disponibilidade legal (onde assistir):
  - `GET /movie/{movie_id}/watch/providers`

## Como personalizar rapidamente

- Trocar imagem do topo:
  - editar `src` da `<img>` em `.spider-banner` no `comedy_page.html`.
- Alterar lista de filmes:
  - editar array `SELECTED_TITLES`.
- Trocar cores da página:
  - ajustar variáveis do `:root` em `style-comedy.css`.
- Mudar idioma padrão:
  - alterar valor inicial do `<select id="lang">`.
