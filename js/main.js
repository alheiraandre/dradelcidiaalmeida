document.addEventListener('DOMContentLoaded', () => {

    // As 7 seções de serviço e os links do menu agora são HTML estático
    // (renderizados direto no index.html) para melhor indexação/SEO.
    // A geração via JavaScript foi removida para não duplicar o conteúdo.

    const sliderCompare = document.getElementById('slider-compare');
    const beforeImage = document.getElementById('before-image');
    const sliderHandle = document.getElementById('slider-handle');
    const beforeImgElement = document.getElementById('before-img-element');

    if (sliderCompare && beforeImage && sliderHandle && beforeImgElement) {
        const resizeBeforeImage = () => {
            beforeImgElement.style.width = `${sliderCompare.parentElement.offsetWidth}px`;
        };
        window.addEventListener('resize', resizeBeforeImage);
        resizeBeforeImage();

        sliderCompare.addEventListener('input', (e) => {
            const sliderPos = e.target.value;
            beforeImage.style.width = `${sliderPos}%`;
            sliderHandle.style.left = `${sliderPos}%`;
        });
    }

    const menuOverlay  = document.getElementById('menu-overlay');
    const openMenuBtn  = document.getElementById('open-menu-btn');
    const mobileMenuBtn= document.getElementById('mobile-menu-btn');
    const closeMenuBtn = document.getElementById('close-menu-btn');

    const setMenuExpanded = (open) => {
        [openMenuBtn, mobileMenuBtn].forEach(btn => {
            if (btn) btn.setAttribute('aria-expanded', String(open));
        });
    };

    const openMenu = () => {
        menuOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
        setMenuExpanded(true);
        menuOverlay.querySelector('a, button')?.focus();
    };

    const closeMenu = () => {
        menuOverlay.classList.remove('active');
        document.body.style.overflow = '';
        setMenuExpanded(false);
        openMenuBtn?.focus(); 
    };

    openMenuBtn?.addEventListener('click', openMenu);
    mobileMenuBtn?.addEventListener('click', openMenu);
    closeMenuBtn?.addEventListener('click', closeMenu);
    menuOverlay.addEventListener('click', e => { if (e.target === menuOverlay) closeMenu(); });
    document.querySelectorAll('.menu-action').forEach(l => l.addEventListener('click', closeMenu));

    document.addEventListener('keydown', e => {
        if (e.key === 'Escape') {
            if (menuOverlay.classList.contains('active')) closeMenu();
        }
    });

    let touchStartY = 0;
    let touchStartX = 0;

    menuOverlay.addEventListener('touchstart', e => {
        touchStartY = e.changedTouches[0].screenY;
        touchStartX = e.changedTouches[0].screenX;
    }, {passive: true});

    menuOverlay.addEventListener('touchend', e => {
        const touchEndY = e.changedTouches[0].screenY;
        const touchEndX = e.changedTouches[0].screenX;
        
        if (touchEndY - touchStartY > 50 || touchEndX - touchStartX > 50) {
            if (menuOverlay.classList.contains('active')) closeMenu();
        }
    }, {passive: true});

    const lottieContainer = document.getElementById('lottie-smile-container');
    if (lottieContainer) {
        lottie.loadAnimation({
            container: lottieContainer,
            renderer: 'svg',
            loop: true,
            autoplay: true,
            path: './assets/animacoes/sorriso.json' 
        });
    }

    // Depoimentos: as avaliações reais ficam no perfil verificado do Google
    // (4.98 / 127 avaliações). Não publicamos textos de depoimentos no site
    // para garantir conformidade com o CDC, o CONAR e a Resolução CFO 196/2019.
    // Para exibir avaliações no site, integre um widget que puxe os reviews
    // reais do Google a partir do Place ID da clínica (ver GOOGLE_PLACE_ID).

});