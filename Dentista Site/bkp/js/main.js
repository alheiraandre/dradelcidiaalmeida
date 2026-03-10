document.addEventListener('DOMContentLoaded', () => {

    // ==========================================
    // 1. DADOS E RENDERIZAÇÃO DAS ESPECIALIDADES
    // ==========================================
    const IMG_BASE = './assets/img/especialidades/';
    const specialtiesData = [
        { id: 'implantes', num: '01', title: 'Implantes &<br>Cirurgias Avançadas', shortTitle: 'Implantes', shortDesc: 'Cirurgias avançadas...', desc: 'Recupere a sua qualidade de vida...', tags: ['Enxertos Ósseos', 'Carga Imediata', 'Alta Precisão'], imageName: 'implantes', alt: 'Procedimento de implante dentário', invertLayout: false },
        { id: 'ortodontia', num: '02', title: 'Ortodontia<br>Estética', shortTitle: 'Ortodontia', shortDesc: 'Alinhadores invisíveis...', desc: 'Alinhamento dentário focado na discrição...', tags: ['Alinhadores', 'Conforto', 'Digital'], imageName: 'ortodontia', alt: 'Sorriso com alinhadores invisíveis', invertLayout: true },
        { id: 'estetica', num: '03', title: 'Estética<br>Dental', shortTitle: 'Estética Dental', shortDesc: 'Lentes de contato...', desc: 'A arte de desenhar sorrisos perfeitos...', tags: ['Lentes', 'Facetas', 'Clareamento'], imageName: 'estetica', alt: 'Transformação estética do sorriso', invertLayout: false },
        { id: 'endodontia', num: '04', title: 'Tratamento<br>de Canal', shortTitle: 'Endodontia', shortDesc: 'Tratamento de canal preciso...', desc: 'Endodontia indolor e rápida...', tags: ['Sem dor', 'Microscopia', 'Preservação'], imageName: 'endodontia', alt: 'Tecnologia em tratamento de canal', invertLayout: true },
        { id: 'periodontia', num: '05', title: 'Periodontia<br>& Saúde Gengival', shortTitle: 'Periodontia', shortDesc: 'Prevenção e tratamento...', desc: 'A base de um sorriso saudável...', tags: ['Gengiva', 'Profilaxia', 'Tratamento'], imageName: 'periodontia', alt: 'Saúde gengival e prevenção periodontal', invertLayout: false },
        { id: 'harmonizacao', num: '06', title: 'Harmonização<br>& Toxina Terapêutica', shortTitle: 'Harmonização', shortDesc: 'Toxina botulínica...', desc: 'O equilíbrio perfeito entre função...', tags: ['Botox', 'Bruxismo', 'Estética'], imageName: 'harmonizacao', alt: 'Harmonização facial com toxina botulínica', invertLayout: true },
        { id: 'domiciliar', num: '07', title: 'Odontologia<br>Domiciliar', shortTitle: 'Domiciliar', shortDesc: 'Odontologia de excelência...', desc: 'A mesma excelência do nosso consultório...', tags: ['Portátil', 'Acessibilidade', 'Humanizado'], imageName: 'domiciliar', alt: 'Atendimento odontológico domiciliar premium', invertLayout: false }
    ];

    const detailedSections   = document.getElementById('detailed-sections');
    const menuLinksContainer = document.getElementById('menu-links-container');
    const detailTpl          = document.getElementById('template-detailed-section').content;

    specialtiesData.forEach((item) => {
        const menuLink = document.createElement('a');
        menuLink.href      = `#${item.id}`;
        menuLink.className = 'menu-action menu-link text-4xl md:text-6xl font-bold uppercase tracking-tighter text-gray-600 hover:text-white';
        menuLink.textContent = `${item.num}. ${item.shortTitle}`;
        menuLinksContainer.appendChild(menuLink);

        const detailNode  = document.importNode(detailTpl, true);
        const container   = detailNode.querySelector('.detailed-container');
        container.id      = item.id;

        if (item.invertLayout) {
            const textDiv = detailNode.querySelector('.text-content');
            const imgDiv  = detailNode.querySelector('.image-content');
            imgDiv.classList.add('order-last', 'md:order-first', 'border-t', 'md:border-t-0', 'md:border-r', 'border-studio');
            textDiv.classList.remove('border-b', 'md:border-b-0', 'md:border-r');
        }

        detailNode.querySelector('.detailed-num').textContent  = item.num;
        detailNode.querySelector('.detailed-title').innerHTML  = item.title;
        detailNode.querySelector('.detailed-desc').textContent = item.desc;

        const sourceWebp = detailNode.querySelector('.detailed-source-webp');
        const imgEl      = detailNode.querySelector('.detailed-img');

        if (sourceWebp) sourceWebp.srcset = `${IMG_BASE}${item.imageName}.webp`;
        imgEl.src = `${IMG_BASE}${item.imageName}.jpg`;
        imgEl.alt = item.alt;

        const tagsContainer = detailNode.querySelector('.detailed-tags');
        item.tags.forEach(tag => {
            const li = document.createElement('li');
            li.className = 'studio-tag';
            li.textContent = tag;
            tagsContainer.appendChild(li);
        });

        detailedSections.appendChild(detailNode);
    });

    // ==========================================
    // 2. SLIDER ANTES/DEPOIS
    // ==========================================
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

    // ==========================================
    // 3. MENU MOBILE & SWIPE GESTURES
    // ==========================================
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

    // ==========================================
    // 4. ANIMAÇÃO LOTTIE
    // ==========================================
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

/// ==========================================
    // 5. CARROSSEL DE AVALIAÇÕES (AUTO-SCROLL INFINITO)
    // ==========================================
    const reviews = [
        { nome: "Fernanda Lima", texto: "Fiz questão de vir avaliar o trabalho da Dra. Elcídia por ser uma profissional ética e de extremo bom gosto. Eu indico de olhos fechados!", nota: "5.0", data: "Fev 2026" },
        { nome: "Carlos Mendes", texto: "Implante em apenas 1 dia! Voltei a sorrir sem medo. Atendimento impecável.", nota: "5.0", data: "Jan 2026" },
        { nome: "Juliana Costa", texto: "Lentes de contato perfeitas. Meu sorriso ficou natural e iluminado.", nota: "5.0", data: "Dez 2025" },
        { nome: "Roberto Silva", texto: "Odontologia domiciliar salvou minha mãe. Atendimento humano e profissional.", nota: "5.0", data: "Nov 2025" },
        { nome: "Mariana Oliveira", texto: "Harmonização + botox para bruxismo. Resultado incrível e sem dor.", nota: "5.0", data: "Out 2025" }
    ];

    const carouselContainer = document.getElementById('reviews-carousel');
    if (carouselContainer) {
        
        // 1. Criamos o HTML apenas dos cartões de avaliação (agora mais elegantes e compactos)
        let cardsHTML = '';
        reviews.forEach(r => {
            cardsHTML += `
                <div class="bg-[#111] border border-studio p-6 rounded-xl flex-shrink-0 w-[280px] md:w-[320px] transition-colors hover:bg-white/5 cursor-pointer">
                    <div class="flex items-center gap-3 mb-4">
                        <div class="text-xl">⭐</div>
                        <div>
                            <p class="font-bold text-sm text-white">${r.nome}</p>
                            <p class="text-xs text-gray-500">${r.data} • ${r.nota}</p>
                        </div>
                    </div>
                    <p class="text-gray-400 text-sm italic leading-relaxed">"${r.texto}"</p>
                </div>`;
        });

        // 2. Criamos a "esteira" do carrossel. 
        // Duplicamos o conteúdo (cardsHTML + cardsHTML) para o loop não ter buracos.
        // Adicionamos classes do Tailwind para pausar a animação no "hover".
        const trackHTML = `
            <div class="flex gap-4 w-max animate-scroll hover:[animation-play-state:paused]">
                ${cardsHTML}
                ${cardsHTML}
            </div>
        `;

        // 3. Injetamos a esteira na tela
        carouselContainer.innerHTML = trackHTML;

        // 4. Injetamos a regra da animação CSS direto via JS (assim você não precisa abrir o styles.css de novo)
        const style = document.createElement('style');
        style.innerHTML = `
            @keyframes scroll-infinite {
                0% { transform: translateX(0); }
                100% { transform: translateX(-50%); } /* Move exatos 50% (o tamanho da primeira lista) */
            }
            .animate-scroll {
                /* 25 segundos é um tempo confortável para leitura. Altere esse número se quiser mais rápido/lento */
                animation: scroll-infinite 25s linear infinite; 
            }
        `;
        document.head.appendChild(style);
    }

}); // <-- Fim do arquivo main.js