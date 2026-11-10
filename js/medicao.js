// Medição do site: Tag Manager com Consent Mode (padrão negado) e aviso de cookies próprio.
// Arquivo separado e sem script inline por causa da CSP (vercel.json). O GA4 e as tags ficam no
// Tag Manager; aqui só o consentimento, o aviso e os eventos de contato no dataLayer.
// Sem GTM_ID nada carrega e o aviso não aparece.
(function(){
  var GTM_ID = ''; // ex.: 'GTM-ABC1234'
  var CHAVE = 'zyphy_consentimento', VERSAO = 1, VALIDADE_DIAS = 365;

  var dl = window.dataLayer = window.dataLayer || [];
  function gtag(){ dl.push(arguments); }

  function ler(){
    try {
      var c = JSON.parse(localStorage.getItem(CHAVE) || 'null');
      if (!c || c.v !== VERSAO) return null;
      if (Date.now() - new Date(c.em).getTime() > VALIDADE_DIAS * 864e5) return null;
      return c;
    } catch (e) { return null; }
  }
  function sinais(c){
    var a = c && c.analise ? 'granted' : 'denied', p = c && c.publicidade ? 'granted' : 'denied';
    // ad_personalization fica sempre negado: a Zyphy não faz remarketing.
    return { analytics_storage: a, ad_storage: p, ad_user_data: p, ad_personalization: 'denied' };
  }

  // 1. Padrão negado, antes de qualquer tag. A escolha guardada entra logo em seguida.
  var d = sinais(null); d.security_storage = 'granted'; d.functionality_storage = 'granted';
  gtag('consent', 'default', d);
  gtag('set', 'ads_data_redaction', true);
  var escolha = ler();
  if (escolha) gtag('consent', 'update', sinais(escolha));

  // 2. Tag Manager (só com ID).
  if (GTM_ID) {
    dl.push({ 'gtm.start': Date.now(), event: 'gtm.js' });
    var s = document.createElement('script');
    s.async = true;
    s.src = 'https://www.googletagmanager.com/gtm.js?id=' + encodeURIComponent(GTM_ID);
    document.head.appendChild(s);
  }

  // 3. Eventos de contato. O Tag Manager não lê o botão (a CSP barra variável de JavaScript
  // personalizado); o site manda o evento pronto, com a posição do botão.
  function posicaoDe(el){
    if (el.getAttribute('data-posicao')) return el.getAttribute('data-posicao');
    if (el.closest('header')) return 'topo';
    if (el.closest('footer')) return 'rodape';
    return 'conteudo';
  }
  function conversaoDe(el){
    var c = el.getAttribute('data-conversao');
    if (c) return c;
    var h = el.getAttribute('href') || '';
    if (/^https:\/\/(wa\.me|api\.whatsapp\.com)\//.test(h)) return 'whatsapp';
    if (/^mailto:/i.test(h)) return 'email';
    if (/^tel:/i.test(h)) return 'telefone';
    return null;
  }
  window.zyphyMedir = function(evento, dados){
    var e = { event: evento, pagina: location.pathname };
    for (var k in dados) if (Object.prototype.hasOwnProperty.call(dados, k)) e[k] = dados[k];
    dl.push(e);
  };
  document.addEventListener('click', function(ev){
    var el = ev.target && ev.target.closest ? ev.target.closest('[data-conversao],a[href]') : null;
    if (!el) return;
    var c = conversaoDe(el);
    if (c) window.zyphyMedir('clique_' + c, { posicao: posicaoDe(el) });
  }, true);

  if (!GTM_ID) return;

  // 4. Aviso de cookies.
  var aviso = null;
  function apagarCookiesDoGoogle(c){
    var prefixos = [];
    if (!c.analise) prefixos.push('_ga');
    if (!c.publicidade) prefixos.push('_gcl_');
    if (!prefixos.length) return;
    var dominio = location.hostname.replace(/^www\./, '');
    document.cookie.split(';').forEach(function(par){
      var nome = par.split('=')[0].trim();
      if (!prefixos.some(function(p){ return nome.indexOf(p) === 0; })) return;
      ['', ';domain=' + dominio, ';domain=.' + dominio].forEach(function(dm){
        document.cookie = nome + '=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/' + dm;
      });
    });
  }
  function salvar(analise, publicidade){
    var c = { v: VERSAO, analise: !!analise, publicidade: !!publicidade, em: new Date().toISOString() };
    try { localStorage.setItem(CHAVE, JSON.stringify(c)); } catch (e) {}
    gtag('consent', 'update', sinais(c));
    dl.push({ event: 'consentimento_atualizado', consent_analise: c.analise, consent_publicidade: c.publicidade });
    apagarCookiesDoGoogle(c);
    fechar();
  }
  function fechar(){ if (aviso) { aviso.remove(); aviso = null; } }

  function el(tag, cls, texto){
    var e = document.createElement(tag);
    if (cls) e.className = cls;
    if (texto) e.textContent = texto;
    return e;
  }
  function botao(texto, cls, fn){
    var b = el('button', cls, texto); b.type = 'button'; b.addEventListener('click', fn); return b;
  }
  function opcao(id, titulo, desc, marcado){
    var l = el('label', 'zck-op'); l.htmlFor = id;
    var i = el('input'); i.type = 'checkbox'; i.id = id; i.checked = marcado;
    var t = el('span', 'zck-op-txt');
    t.appendChild(el('b', null, titulo)); t.appendChild(el('span', null, desc));
    l.appendChild(i); l.appendChild(t);
    return { label: l, input: i };
  }

  function abrir(detalhe){
    fechar();
    var atual = ler() || { analise: false, publicidade: false };
    aviso = el('section', 'zck');
    aviso.setAttribute('aria-label', 'Aviso de cookies');
    aviso.appendChild(el('h2', 'zck-tit', 'Cookies'));
    var p = el('p', 'zck-txt', 'Com a sua permissão, usamos cookies do Google Analytics e do Google Ads para saber quantas pessoas chegam pelo Google e quantas entram em contato. Sem permissão, nada disso é usado. ');
    var a = el('a', null, 'Política de privacidade'); a.href = '/privacidade/#cookies';
    p.appendChild(a);
    aviso.appendChild(p);

    var ops = el('div', 'zck-ops');
    var oa = opcao('zck-analise', 'Análise', 'Google Analytics: quantas visitas e quantos contatos o site recebe.', atual.analise);
    var op = opcao('zck-publicidade', 'Publicidade', 'Google Ads: saber qual anúncio trouxe o contato.', atual.publicidade);
    ops.appendChild(oa.label); ops.appendChild(op.label);
    if (!detalhe) ops.hidden = true;
    aviso.appendChild(ops);

    var acoes = el('div', 'zck-acoes');
    var salvarEscolha = botao('Salvar escolha', 'zck-b zck-b2', function(){ salvar(oa.input.checked, op.input.checked); });
    var escolher = botao('Escolher', 'zck-b zck-b2', function(){ ops.hidden = false; escolher.replaceWith(salvarEscolha); oa.input.focus(); });
    acoes.appendChild(botao('Recusar', 'zck-b', function(){ salvar(false, false); }));
    acoes.appendChild(botao('Aceitar', 'zck-b', function(){ salvar(true, true); }));
    acoes.appendChild(detalhe ? salvarEscolha : escolher);
    aviso.appendChild(acoes);

    document.body.appendChild(aviso);
    if (detalhe) oa.input.focus();
  }
  window.zyphyCookies = function(){ abrir(true); };

  function iniciar(){
    // Para mudar a escolha depois: no rodapé e na política de privacidade.
    var link = document.querySelector('footer a[href="/privacidade/"]');
    if (link) {
      var b = botao('Preferências de cookies', 'zck-link', window.zyphyCookies);
      link.parentNode.insertBefore(b, link.nextSibling);
    }
    [].forEach.call(document.querySelectorAll('[data-cookies="abrir"]'), function(x){
      x.hidden = false;
      x.addEventListener('click', window.zyphyCookies);
    });
    if (!ler()) abrir(false);
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', iniciar);
  else iniciar();
})();
