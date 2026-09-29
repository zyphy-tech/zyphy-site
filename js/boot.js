/* ==========================================================================
   Zyphy — antes do primeiro paint. Carregado no <head> sem defer. Fica em
   arquivo, e não inline, para a CSP (vercel.json) aceitar só script-src 'self'.
   ========================================================================== */
(function(){
  /* o Firefox não carrega a face local de reserva enquanto a Sofia está
     baixando e desenha com a fonte padrão (H1 estoura a coluna); pedir a
     face aqui faz ele usar a reserva calibrada desde o primeiro paint */
  if (document.fonts && document.fonts.load) document.fonts.load("800 1em 'Sofia Fallback'");
})();
