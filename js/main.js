document.addEventListener('DOMContentLoaded', () => {
    // Header Scroll Effect
    const header = document.getElementById('header');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Smooth Scroll for Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if(targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const headerHeight = header.offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Copy Pix Key Logic
    const btnCopy = document.getElementById('btn-copy');
    const pixKey = document.getElementById('pix-key');
    const copyFeedback = document.getElementById('copy-feedback');

    if (btnCopy && pixKey) {
        btnCopy.addEventListener('click', () => {
            const textToCopy = pixKey.textContent.trim();
            
            navigator.clipboard.writeText(textToCopy).then(() => {
                // Show feedback
                copyFeedback.classList.add('show');
                
                // Hide after 3 seconds
                setTimeout(() => {
                    copyFeedback.classList.remove('show');
                }, 3000);
            }).catch(err => {
                console.error('Falha ao copiar: ', err);
                // Fallback for older browsers
                const textArea = document.createElement("textarea");
                textArea.value = textToCopy;
                document.body.appendChild(textArea);
                textArea.select();
                try {
                    document.execCommand('copy');
                    copyFeedback.classList.add('show');
                    setTimeout(() => {
                        copyFeedback.classList.remove('show');
                    }, 3000);
                } catch (err) {
                    console.error('Falha no fallback de cópia', err);
                }
                document.body.removeChild(textArea);
            });
        });
    }
});
