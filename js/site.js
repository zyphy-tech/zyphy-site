(function(){
  // menu Serviços: abre no toque (telas grandes sem mouse) e fecha fora/Esc
  var card=document.querySelector('.zcard'), btn=document.querySelector('.zsvc');
  if(card&&btn){
    btn.setAttribute('aria-expanded','false');
    btn.addEventListener('click',function(e){e.stopPropagation();var o=card.classList.toggle('open');btn.setAttribute('aria-expanded',o?'true':'false');});
    document.addEventListener('click',function(e){if(!card.contains(e.target)){card.classList.remove('open');btn.setAttribute('aria-expanded','false');}});
    document.addEventListener('keydown',function(e){if(e.key==='Escape'){card.classList.remove('open');btn.setAttribute('aria-expanded','false');var d=document.querySelector('.zham[open]');if(d)d.removeAttribute('open');}});
  }
  // formulário de contato: monta a mensagem e abre o WhatsApp (nada é enviado pra servidor)
  var f=document.getElementById('fcontato'), msg=document.getElementById('fmsg');
  if(f){
    f.addEventListener('submit',function(e){
      e.preventDefault();
      var v=function(n){var el=f.elements[n];return el&&el.value?el.value.trim():'';};
      if(!f.elements['lgpd'].checked){msg.textContent='Marque que leu a política de privacidade pra continuar.';f.elements['lgpd'].focus();return;}
      if(!v('nome')){msg.textContent='Escreve o seu nome pra gente saber com quem fala.';f.elements['nome'].focus();return;}
      msg.textContent='';
      var serv=[].slice.call(f.querySelectorAll('input[name=servico]:checked')).map(function(i){return i.value;});
      var t=(f.getAttribute('data-origem')?'Olá! Vim pela página de '+f.getAttribute('data-origem')+'. Sou ':'Olá! Sou ')+v('nome')+(v('empresa')?' da '+v('empresa'):'')+'.';
      if(serv.length)t+='\nPreciso de: '+serv.join(', ')+'.';
      if(v('mensagem'))t+='\n'+v('mensagem');
      if(v('whatsapp'))t+='\nMeu WhatsApp: '+v('whatsapp');
      // medição: o envio vale depois da validação, sem dado pessoal (só os serviços marcados)
      if(window.zyphyMedir)window.zyphyMedir('envio_formulario',{posicao:'formulario',servicos:serv.join(', ')});
      window.open('https://wa.me/5511942988665?text='+encodeURIComponent(t),'_blank','noopener');
    });
  }
  // painel "um por vez" (celular): o número troca o recorte; deslizar troca o número e a legenda.
  // Sem script o trilho continua deslizando e a legenda aparece inteira.
  [].forEach.call(document.querySelectorAll('[data-tour]'),function(t){
    var trilho=t.querySelector('.tour-track'), bts=t.querySelectorAll('.tour-nav button'), itens=t.querySelectorAll('.anl>li'), atual=-1;
    if(!trilho||!bts.length)return;
    t.classList.add('tour-js');
    var marcar=function(i){
      if(i===atual)return; atual=i;
      [].forEach.call(bts,function(b,n){b.setAttribute('aria-pressed',n===i?'true':'false');});
      [].forEach.call(itens,function(li,n){li.classList.toggle('on',n===i);});
    };
    var calmo=window.matchMedia&&window.matchMedia('(prefers-reduced-motion:reduce)').matches;
    [].forEach.call(bts,function(b,i){b.addEventListener('click',function(){
      var alvo=trilho.children[i]; if(!alvo)return;
      trilho.scrollTo({left:alvo.offsetLeft-trilho.offsetLeft,behavior:calmo?'auto':'smooth'}); marcar(i);
    });});
    var quadro=0;
    trilho.addEventListener('scroll',function(){
      if(quadro)return;
      quadro=requestAnimationFrame(function(){
        quadro=0; var meio=trilho.scrollLeft+trilho.clientWidth/2, perto=0, dist=1e9;
        [].forEach.call(trilho.children,function(c,i){var d=Math.abs(c.offsetLeft-trilho.offsetLeft+c.offsetWidth/2-meio); if(d<dist){dist=d;perto=i;}});
        marcar(perto);
      });
    },{passive:true});
    marcar(0);
    // os recortes fora da tela são "lazy": pede todos quando o trilho chega perto, pra não piscar ao deslizar
    if('IntersectionObserver' in window){
      var io=new IntersectionObserver(function(es){
        if(!es[0].isIntersecting)return;
        [].forEach.call(trilho.querySelectorAll('img'),function(im){im.loading='eager';});
        io.disconnect();
      },{rootMargin:'400px'});
      io.observe(trilho);
    }
  });
})();
