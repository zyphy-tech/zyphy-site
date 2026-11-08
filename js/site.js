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
      var t='Olá! Sou '+v('nome')+(v('empresa')?' da '+v('empresa'):'')+'.';
      if(serv.length)t+='\nPreciso de: '+serv.join(', ')+'.';
      if(v('mensagem'))t+='\n'+v('mensagem');
      if(v('whatsapp'))t+='\nMeu WhatsApp: '+v('whatsapp');
      window.open('https://wa.me/5511924507188?text='+encodeURIComponent(t),'_blank','noopener');
    });
  }
})();
