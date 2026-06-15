/* =========================================================================
   RASTREAMENTO — Meta Pixel + Google Analytics 4 (GA4)
   -------------------------------------------------------------------------
   COMO ATIVAR:
   1) Crie o Meta Pixel (business.facebook.com → Gerenciador de Eventos) e o
      GA4 (analytics.google.com). Copie os dois IDs.
   2) Substitua os placeholders abaixo:
        META_PIXEL_ID  → ex.: '123456789012345'
        GA4_ID         → ex.: 'G-XXXXXXXXXX'
   3) No GA4, marque o evento "contact_whatsapp" como "Evento principal"
      (conversão) em Administrador → Eventos.
   4) No Meta, o clique no WhatsApp dispara o evento padrão "Contact".

   LGPD: os pixels só carregam APÓS o consentimento do visitante (banner).
   Enquanto não houver aceite, nenhum cookie de marketing é definido.
   ========================================================================= */

(function () {
    'use strict';

    var META_PIXEL_ID = 'META_PIXEL_ID'; // TODO: trocar pelo ID real do Meta Pixel
    var GA4_ID        = 'GA4_ID';        // TODO: trocar pelo ID real do GA4 (G-XXXX)

    var CONSENT_KEY = 'consent_marketing';
    var pixelsLoaded = false;

    /* ---------- Inicialização dos pixels ---------- */
    function loadMetaPixel() {
        if (META_PIXEL_ID === 'META_PIXEL_ID') return; // ainda não configurado
        !function (f, b, e, v, n, t, s) {
            if (f.fbq) return; n = f.fbq = function () {
                n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments);
            };
            if (!f._fbq) f._fbq = n; n.push = n; n.loaded = !0; n.version = '2.0';
            n.queue = []; t = b.createElement(e); t.async = !0;
            t.src = v; s = b.getElementsByTagName(e)[0]; s.parentNode.insertBefore(t, s);
        }(window, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js');
        window.fbq('init', META_PIXEL_ID);
        window.fbq('track', 'PageView');
    }

    function loadGA4() {
        if (GA4_ID === 'GA4_ID') return; // ainda não configurado
        var s = document.createElement('script');
        s.async = true;
        s.src = 'https://www.googletagmanager.com/gtag/js?id=' + GA4_ID;
        document.head.appendChild(s);
        window.dataLayer = window.dataLayer || [];
        window.gtag = function () { window.dataLayer.push(arguments); };
        window.gtag('js', new Date());
        window.gtag('config', GA4_ID);
    }

    function initPixels() {
        if (pixelsLoaded) return;
        pixelsLoaded = true;
        loadMetaPixel();
        loadGA4();
    }

    /* ---------- Evento de conversão: clique no WhatsApp ---------- */
    function trackWhatsApp(label) {
        if (!pixelsLoaded) return; // sem consentimento, não rastreia
        if (window.fbq) window.fbq('track', 'Contact', { content_name: label || 'whatsapp' });
        if (window.gtag) window.gtag('event', 'contact_whatsapp', {
            event_category: 'engagement',
            event_label: label || 'whatsapp'
        });
    }

    // Delegação no documento: pega também os links do WhatsApp criados
    // dinamicamente pelo chatbot.
    document.addEventListener('click', function (e) {
        var link = e.target.closest && e.target.closest('a[href*="wa.me"], a[href*="api.whatsapp.com"]');
        if (link) trackWhatsApp(link.getAttribute('aria-label') || link.textContent.trim().slice(0, 60));
    }, true);

    /* ---------- Banner de consentimento (LGPD) ---------- */
    function hasChoice() { return localStorage.getItem(CONSENT_KEY) !== null; }
    function granted() { return localStorage.getItem(CONSENT_KEY) === 'granted'; }

    function showBanner() {
        var bar = document.createElement('div');
        bar.setAttribute('role', 'dialog');
        bar.setAttribute('aria-label', 'Aviso de cookies');
        bar.style.cssText = 'position:fixed;bottom:0;left:0;right:0;z-index:70;background:#fff;border-top:1px solid #E2E8F0;box-shadow:0 -4px 20px rgba(0,0,0,0.08);padding:16px;display:flex;flex-wrap:wrap;gap:12px;align-items:center;justify-content:center;font-family:inherit;';
        bar.innerHTML =
            '<p style="margin:0;font-size:13px;color:#475569;max-width:640px;font-weight:500;">' +
            'Usamos cookies para entender como você navega e melhorar sua experiência. ' +
            'Você pode aceitar ou recusar os cookies de marketing.</p>' +
            '<div style="display:flex;gap:8px;">' +
            '<button id="consent-reject" style="background:#F1F5F9;color:#1A1A1A;border:1px solid #E2E8F0;padding:10px 18px;border-radius:9999px;font-size:13px;font-weight:700;cursor:pointer;">Recusar</button>' +
            '<button id="consent-accept" style="background:#0F766E;color:#fff;border:0;padding:10px 18px;border-radius:9999px;font-size:13px;font-weight:700;cursor:pointer;">Aceitar</button>' +
            '</div>';
        document.body.appendChild(bar);

        bar.querySelector('#consent-accept').addEventListener('click', function () {
            localStorage.setItem(CONSENT_KEY, 'granted');
            initPixels();
            bar.remove();
        });
        bar.querySelector('#consent-reject').addEventListener('click', function () {
            localStorage.setItem(CONSENT_KEY, 'denied');
            bar.remove();
        });
    }

    /* ---------- Boot ---------- */
    if (hasChoice()) {
        if (granted()) initPixels();
    } else {
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', showBanner);
        } else {
            showBanner();
        }
    }
})();
