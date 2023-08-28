// URL da API do GitHub para obter os repositórios de um usuário
const githubAPIURL = "https://api.github.com/users/PixoPjl/repos";

// Função para formatar o nome do projeto
function formatProjectName(projectName) {
    const words = projectName.split("-");
    return words.join(" ");
}

// Função para buscar e exibir o último projeto
async function fetchAndDisplayLastProject() {
    try {
        const response = await axios.get(githubAPIURL);
        const projects = response.data;

        // Ordena os projetos pela data de criação (do mais recente para o mais antigo)
        projects.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

        // Pega o nome e a URL do último projeto
        const lastProjectName = projects[0].name;
        const lastProjectURL = projects[0].html_url;

        // Formata o nome do último projeto
        const formattedLastProjectName = formatProjectName(lastProjectName);

        // Seleciona o link do último projeto e atribui o nome formatado e a URL
        const lastProjectLink = document.getElementById("right-link");
        lastProjectLink.textContent = formattedLastProjectName;
        lastProjectLink.href = lastProjectURL;

        // Aplica a classe clickable-background ao elemento footer-background
        const footerBackground = document.querySelector(".right-background");
        footerBackground.classList.add("clickable-background");
    } catch (error) {
        console.error("Erro ao buscar projetos do GitHub:", error);
    }
}

// Chama a função para buscar e exibir o último projeto
fetchAndDisplayLastProject();
