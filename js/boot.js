/* ==========================================================================
   Zyphy — antes do primeiro paint. Carregado no <head> sem defer, porque as
   classes precisam existir quando o CSS pinta a página. Fica em arquivo, e
   não inline, para a CSP (vercel.json) aceitar só script-src 'self'.
   ========================================================================== */
/* js: habilita os estados "antes" das bandas que expandem.
   motion: só sem prefers-reduced-motion; sem ela tudo fica no estado final. */
(function(){
  var d=document.documentElement; d.classList.add("js");
  if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    d.classList.add("motion");
    /* intro: o texto do hero espera o vídeo terminar (js/main.js revela).
       Com economia de dados não há vídeo, então o texto aparece direto */
    var c = navigator.connection;
    if (!(c && c.saveData)) d.classList.add("intro");
  }
  /* o Firefox não carrega a face local de reserva enquanto a Sofia está
     baixando e desenha com a fonte padrão (H1 estoura a coluna); pedir a
     face aqui faz ele usar a reserva calibrada desde o primeiro paint */
  if (document.fonts && document.fonts.load) document.fonts.load("800 1em 'Sofia Fallback'");
})();
