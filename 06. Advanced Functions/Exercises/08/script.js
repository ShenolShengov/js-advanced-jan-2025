function getArticleGenerator(articles) {    
    return () => {
        if (articles.length === 0) return;
        const contentEl = document.querySelector('#content');
        const articleEl = document.createElement('article');
        articleEl.textContent =  articles.shift();
        contentEl.appendChild(articleEl);
    };
}
