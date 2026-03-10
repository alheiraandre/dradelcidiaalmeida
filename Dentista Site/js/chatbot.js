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
        div.classList.add('text-sm', 'p-3', 'max-w-[85%]', 'border', 'border-studio');
        
        if (sender === 'user') {
            div.classList.add('bg-white', 'text-black', 'rounded-tl-xl', 'rounded-bl-xl', 'rounded-br-xl', 'self-end');
            div.textContent = text; 
        } else {
            div.classList.add('bg-[#1a1a1a]', 'text-gray-300', 'rounded-tr-xl', 'rounded-bl-xl', 'rounded-br-xl', 'self-start');
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

    // Base de Conhecimento do Robô
    const faqBase = [
        { palavras: ['preço','preco','valor','custa','orçamento','orcamento','pagamento'], resposta: 'Por determinação do CRO, não divulgamos valores sem avaliação presencial. Oferecemos parcelamento em até 12x. Quer agendar?' },
        { palavras: ['endereço','onde','fica','local','rua','flamengo'], resposta: 'Rua Almirante Tamandaré, 66 – Sala 437<br>Flamengo, Rio de Janeiro – RJ<br>CEP 22210-060' },
        { palavras: ['horário','horario','funciona','aberto','agenda'], resposta: 'Segunda a sexta: 8h às 19h<br>Atendimentos com hora marcada.' },
        { palavras: ['implante','dente','perdi','prótese'], resposta: 'Implantes com carga imediata. 30 anos de experiência e taxa de sucesso acima de 98%.' },
        { palavras: ['lente','faceta','clareamento','estética'], resposta: 'Lentes de contato dental + clareamento a laser. Resultado em apenas 2 consultas.' },
        { palavras: ['invisalign','alinhador','ortodontia'], resposta: 'Alinhadores invisíveis de última geração para um tratamento discreto.' },
        { palavras: ['botox','bruxismo','harmonização'], resposta: 'Harmonização orofacial + toxina botulínica terapêutica.' },
        { palavras: ['domiciliar','casa','idoso'], resposta: 'Odontologia domiciliar premium com equipamento portátil.' }
    ];

    const sendMessage = () => {
        const text = chatInput.value.trim();
        if (!text) return;

        appendMessage(text, 'user');
        chatInput.value = '';
        setChatLoading(true);

        const typing = document.createElement('div');
        typing.className = 'text-xs text-gray-500 self-start ml-2 animate-pulse';
        typing.textContent = 'O assistente está digitando…';
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
                    <a href="https://wa.me/5521997580999" target="_blank" class="text-sm text-[#25D366] font-bold hover:underline">
                       👉 Agendar pelo WhatsApp
                    </a>`;
                    break; 
                }
            }

            if (respostaFinal === "") {
                respostaFinal = `Olá! Para um atendimento mais rápido e detalhado sobre esse assunto, nossa equipe está pronta para te ajudar no WhatsApp.<br><br>
                <a href="https://wa.me/5521997580999?text=Ol%C3%A1%2C%20estou%20no%20site%20e%20gostaria%20de%20falar%20sobre%3A%20${encodeURIComponent(text)}" 
                   target="_blank" 
                   class="inline-block mt-3 bg-[#25D366] text-white px-4 py-2 rounded-lg font-bold text-center w-full hover:bg-[#1EAB52] transition-colors">
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