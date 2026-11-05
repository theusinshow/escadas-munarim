/**
 * Intro da capa (DEC-067; sem tela de carregamento desde DEC-082). Marca
 * `data-intro="espera"` antes do primeiro paint — a barra e a capa ficam na
 * posição de entrada — e solta com "vai" dois quadros depois, para as
 * transições de `globals.css` ("Intro") rodarem. Com `reduce`, não marca nada.
 */
export const SCRIPT_INTRO = `(function(){var d=document.documentElement;if(matchMedia('(prefers-reduced-motion: reduce)').matches)return;d.setAttribute('data-intro','espera');requestAnimationFrame(function(){requestAnimationFrame(function(){d.setAttribute('data-intro','vai')})})})();`;
