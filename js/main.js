document.addEventListener('DOMContentLoaded', function() {
    
    // Expand/collapse article content
    const lerMaisBtns = document.querySelectorAll('.ler-mais');
    
    lerMaisBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const content = this.previousElementSibling;
            
            if (content.classList.contains('collapsed')) {
                // Expand content
                content.classList.remove('collapsed');
                this.textContent = 'Ler menos';
            } else {
                // Collapse content
                content.classList.add('collapsed');
                this.textContent = 'Ler mais';
                
                // Scroll back to the top of the article
                const article = content.closest('.noticia');
                if (article) {
                    article.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            }
        });
    });

    // Mobile optimization - add touch support for better mobile experience
    const articles = document.querySelectorAll('.noticia');
    
    articles.forEach(article => {
        let touchStartX = 0;
        let touchEndX = 0;
        
        article.addEventListener('touchstart', e => {
            touchStartX = e.changedTouches[0].screenX;
        }, false);
        
        article.addEventListener('touchend', e => {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        }, false);
        
        function handleSwipe() {
            // If swiped left (next article)
            if (touchEndX < touchStartX - 50) {
                const nextArticle = article.nextElementSibling;
                if (nextArticle && nextArticle.classList.contains('noticia')) {
                    nextArticle.scrollIntoView({ behavior: 'smooth' });
                }
            }
            
            // If swiped right (previous article)
            if (touchEndX > touchStartX + 50) {
                const prevArticle = article.previousElementSibling;
                if (prevArticle && prevArticle.classList.contains('noticia')) {
                    prevArticle.scrollIntoView({ behavior: 'smooth' });
                }
            }
        }
    });
});
