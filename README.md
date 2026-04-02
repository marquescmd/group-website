(university - veiga de almeida - rio de janeiro, tijuca)
1 period - 2026.1
members:
cauã
anna clara
gyovanna
nicole
mateus

## Cabeçalho global

- Estilos em `style/header.css` (importado pelas demais folhas).
- **Logo** à esquerda (maior e nítida, link para `catalogo.html`), **Home**, **About**, **News** e **Contact** à direita em `.nav-links`.
- Faixa de marca grande (`style/brand-hero.css`) só em **`index.html`** e **`catalogo.html`**: logo ampla no topo do conteúdo, com tagline e leve gradiente laranja.
- Em telas estreitas, no header a logo fica acima e os links centralizam abaixo.

## Página de comédia

Este projeto possui páginas de catálogo em `pages/comedy_page.html`, `pages/action_page.html`, `pages/kids_page.html`, `pages/love_page.html` e `pages/terror_page.html`, estilizadas por `style/style-comedy.css`.
Cada uma busca dados da API do TMDB e exibe uma lista curada de filmes (títulos em português, `pt-BR`).

## Estrutura do `pages/comedy_page.html` (e páginas de gênero)

- **Header** (`.page-header`)
  - Link de retorno para `pages/catalogo.html`.
  - Título da página (centralizado).

- **Área de filtros**
  - Campo de busca (`#query`) para filtrar dentro da lista fixa de títulos.
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
  - `TMDB_LANGUAGE`: `pt-BR` (buscas e textos localizados).
  - `TMDB_REGION`: `BR` (onde assistir / fallback de região).
  - `IMAGE_BASE_URL`: base para pôsteres.
  - `SELECTED_TITLES`: lista fixa dos filmes escolhidos (30 títulos por página de gênero, exceto comédia que pode ter lista maior).

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
  - Escolhe link por região com base em `TMDB_REGION` (BR), com fallback para US se necessário.
  - Abre o link em nova aba com:
    - `window.open(link, "_blank", "noopener,noreferrer")`
  - Cache de links em memória: `providerLinkCache` (evita consultas repetidas no mesmo filme).

- **Eventos de interface**
  - Botão buscar: recarrega com termo digitado.
  - Enter no input: executa busca.
  - (Removido seletor de idioma; idioma fixo `pt-BR`.)
  - Botões de paginação: sem ação ativa (comentário no código indicando desativação).

## Estrutura visual em `style/style-comedy.css`

- **Tema global (`style/theme.css`)**
  - Preto profundo `#0D0D0D` — fundo principal e rodapé.
  - Laranja `#F27405` — botões de ação (CTA), links de destaque, detalhes em hover.
  - Branco `#FFFFFF` — títulos e textos principais.
  - Antracite `#1A1A1A` — cards de filmes, painéis e áreas secundárias.
  - Prateado `#A6A6A6` — textos secundários, metadados (ano, nota).

- **Layout**
  - Cabeçalho (`.page-header`) centralizado, sem imagem lateral.
  - Container principal (`.wrap`) com largura máxima e margens laterais.
  - Filtro em painel (`.panel`) com fundo antracite.
  - Botão **Buscar** e CTAs do catálogo em laranja.
  - Resultados em grade responsiva (`.grid`).

- **Componentes**
  - Cards (`.card`) com pôster, título e badges de ano/nota.
  - Erros (`.error`) com estilo de destaque.
  - Link `Voltar` com hover.

## Página `pages/catalogo.html`

- Conteúdo principal (`.container1`) centralizado na vertical e na horizontal (`justify-content: center`), com espaçamento interno (`padding` e `gap`).

## Endpoints TMDB usados

- Buscar filmes por nome:
  - `GET /search/movie`
- Buscar disponibilidade legal (onde assistir):
  - `GET /movie/{movie_id}/watch/providers`

## Como personalizar rapidamente

- Alterar lista de filmes:
  - editar array `SELECTED_TITLES`.
- Trocar cores do site inteiro:
  - editar variáveis em `style/theme.css` (importado por `catalogo.css`, `style-comedy.css`, `style.css`, etc.).
- Idioma:
  - fixo em `pt-BR` nas páginas de catálogo; ajuste `TMDB_LANGUAGE` e `TMDB_REGION` no script se precisar.
