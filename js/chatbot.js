document.addEventListener('DOMContentLoaded', () => {
    
    const chatWindow   = document.getElementById('chatbot-window');
    const chatToggle   = document.getElementById('chatbot-toggle');
    const chatCloseBtn = document.getElementById('chatbot-close');
    const chatInput    = document.getElementById('chat-input');
    const chatSendBtn  = document.getElementById('chat-send');
    const messagesEl   = document.getElementById('chat-messages');

    const openChat = () => {
        chatWindow.classList.remove('hidden');
        chatWindow.style.display = 'flex';
        setTimeout(() => chatWindow.classList.remove('opacity-0', 'translate-y-4'), 10);
        chatToggle.setAttribute('aria-expanded', 'true');
        chatInput?.focus();

        const sugestoes = document.getElementById('chat-suggestions');
        if (sugestoes) sugestoes.style.display = 'flex';
    };

    const closeChat = () => {
        chatWindow.classList.add('opacity-0', 'translate-y-4');
        chatToggle.setAttribute('aria-expanded', 'false');
        setTimeout(() => {
            chatWindow.classList.add('hidden');
            chatWindow.style.display = '';
        }, 300);
    };

    chatToggle?.addEventListener('click', () => {
        chatWindow.classList.contains('hidden') ? openChat() : closeChat();
    });
    chatCloseBtn?.addEventListener('click', closeChat);

    const appendMessage = (text, sender) => {
        const div = document.createElement('div');
        div.classList.add('text-sm', 'p-4', 'max-w-[85%]', 'border', 'border-studio', 'font-medium', 'shadow-sm');
        
        if (sender === 'user') {
            div.classList.add('bg-primary', 'text-white', 'rounded-tl-xl', 'rounded-bl-xl', 'rounded-br-xl', 'self-end', 'border-primary');
            div.textContent = text; 
        } else {
            div.classList.add('bg-secBg', 'text-darkText', 'rounded-tr-xl', 'rounded-bl-xl', 'rounded-br-xl', 'self-start');
            div.innerHTML = text; 
        }
        
        messagesEl.appendChild(div);
        messagesEl.scrollTop = messagesEl.scrollHeight;
        return div;
    };

    const setChatLoading = (loading) => {
        chatInput.disabled  = loading;
        chatSendBtn.disabled = loading;
        chatSendBtn.style.opacity = loading ? '0.5' : '1';
    };

    const faqBase = [
        { palavras: ['preço','preco','valor','custa','orçamento','orcamento','pagamento'], resposta: 'Por determinação do CRO, não divulgamos valores sem avaliação presencial. Oferecemos parcelamento facilitado em até 12x. Quer agendar sua avaliação?' },
        { palavras: ['endereço','onde','fica','local','rua','flamengo'], resposta: 'Nossa clínica fica na Rua Almirante Tamandaré, 66 – Sala 437<br>Flamengo, Rio de Janeiro – RJ<br>CEP 22210-060' },
        { palavras: ['horário','horario','funciona','aberto','agenda'], resposta: 'Funcionamos de Segunda a Sexta: 8h às 19h.<br>Os atendimentos são feitos com hora marcada.' },
        { palavras: ['implante','dente','perdi','prótese'], resposta: 'Realizamos Implantes com carga imediata. Temos 30 anos de experiência com uma taxa de sucesso altíssima.' },
        { palavras: ['lente','faceta','clareamento','estética'], resposta: 'Trabalhamos com Lentes de Contato Dental de alta precisão e Clareamento a Laser para transformar seu sorriso.' },
        { palavras: ['invisalign','alinhador','ortodontia'], resposta: 'Temos os melhores Alinhadores Invisíveis de última geração para um tratamento totalmente discreto e confortável.' },
        { palavras: ['botox','bruxismo','harmonização'], resposta: 'Oferecemos Harmonização Orofacial completa e tratamentos com Toxina Botulínica (Botox) terapêutica.' },
        { palavras: ['domiciliar','casa','idoso'], resposta: 'Nossa especialidade: Odontologia Domiciliar Premium. Levamos nosso equipamento portátil até sua casa com o máximo de conforto.' }
    ];

    const sendMessage = () => {
        const text = chatInput.value.trim();
        if (!text) return;

        appendMessage(text, 'user');
        chatInput.value = '';
        setChatLoading(true);

        const typing = document.createElement('div');
        typing.className = 'text-xs text-gray-400 font-bold self-start ml-2 animate-pulse';
        typing.textContent = 'O assistente está a escrever…';
        messagesEl.appendChild(typing);
        messagesEl.scrollTop = messagesEl.scrollHeight;

        setTimeout(() => {
            typing.remove();
            
            const textoMinusculo = text.toLowerCase();
            let respostaFinal = "";

            for (const item of faqBase) {
                const achouPalavra = item.palavras.some(palavra => textoMinusculo.includes(palavra));
                if (achouPalavra) {
                    respostaFinal = `${item.resposta}<br><br>
                    <a href="https://wa.me/5521997580999" target="_blank" class="text-sm text-primary font-bold hover:underline flex items-center gap-1 mt-2">
                       👉 Agendar pelo WhatsApp
                    </a>`;
                    break; 
                }
            }

            if (respostaFinal === "") {
                respostaFinal = `Olá! Para um atendimento mais rápido e cuidadoso sobre esse assunto, nossa equipa está pronta para a ajudar no WhatsApp.<br><br>
                <a href="https://wa.me/5521997580999?text=Ol%C3%A1%2C%20estou%20no%20site%20e%20gostaria%20de%20falar%20sobre%3A%20${encodeURIComponent(text)}" 
                   target="_blank" 
                   class="inline-block mt-3 bg-primary text-white px-4 py-3 rounded-lg font-bold text-center w-full hover:bg-primaryHover transition-colors shadow-sm">
                   Conversar no WhatsApp
                </a>`;
            }
            
            appendMessage(respostaFinal, 'bot');
            setChatLoading(false);
            chatInput.focus();
        }, 1500); 
    };

    chatSendBtn?.addEventListener('click', sendMessage);
    chatInput?.addEventListener('keydown', e => { 
        if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage(); } 
    });

    document.querySelectorAll('.suggestion-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            chatInput.value = btn.textContent;
            sendMessage(); 
            const container = document.getElementById('chat-suggestions');
            if(container) container.style.display = 'none';
        });
    });

    document.addEventListener('keydown', e => {
        if (e.key === 'Escape' && !chatWindow.classList.contains('hidden')) {
            closeChat();
        }
    });

});