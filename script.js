// Inicialização do Script e Ícones Lucide
document.addEventListener('DOMContentLoaded', () => {
    // Inicializa ícones Lucide caso existam elementos <i data-lucide="...">
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }

    console.log("Aplicação 'Cuide da Sua Saúde' carregada com sucesso.");
});