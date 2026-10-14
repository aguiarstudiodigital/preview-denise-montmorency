
ASD SIGNATURE 01 — DENISE MONTMORENCY
=====================================

Estrutura preparada para preview e para publicação final sem reconstrução.

COMO EDITAR
- Contatos e links principais: js/config.js
- Textos e seções: index.html
- Cores, fontes e layout: css/style.css
- Animações GSAP: js/animations.js
- Comportamentos: js/main.js
- Imagens reais: assets/

PUBLICAÇÃO
1. Preview: subir toda esta pasta para GitHub Pages.
2. Produção: subir os mesmos arquivos para a pasta do domínio na HostGator.
3. Antes da produção, trocar DOMINIO-OFICIAL em sitemap.xml pelo domínio escolhido.
4. Validar cargos/comissões da OAB e créditos editoriais que serão destacados publicamente.
5. Conectar GA4/Search Console somente após definir a política de cookies/consentimento aplicável.
6. Testar WhatsApp, telefone, e-mail, Instagram e Maps no celular.
7. Se houver uma cena Spline final, substituir apenas o conteúdo de #hero-3d-slot; o restante do site não precisa ser reconstruído.

3D
A V1 já possui composição tridimensional CSS + GSAP leve, responsiva e com reduced-motion.
A cena Spline/WebGL pode ser plugada depois no slot do Hero sem refazer as demais seções.


V7 — HERO CINEMATOGRÁFICA RESPONSIVA
- Removida qualquer seção intermediária "Presença e experiência".
- A Hero agora usa os vídeos finais fornecidos pela cliente.
- Desktop carrega assets/video/hero-desktop.mp4.
- Mobile carrega assets/video/hero-mobile.mp4.
- O carregamento é automático por largura de tela e apenas um vídeo é carregado por vez.
- Ambos os arquivos recebidos já vieram sem faixa de áudio.
- Fallback estático incluído para conexão lenta, autoplay bloqueado ou preferência de movimento reduzido.
- Site continua 100% portátil para HostGator (HTML/CSS/JS + assets locais).
- Observação: os arquivos recebidos são 848x478 (desktop) e 478x850 (mobile). Funcionam para preview/produção leve, mas uma futura exportação em 1920x1080 e 1080x1920 aumentará a nitidez em telas grandes.


V8 — REFINAMENTO GLOBAL
- Tipografia reduzida e equilibrada no desktop e mobile.
- Hero mobile ganhou mais respiro e hierarquia.
- Títulos de seções deixaram de competir com a Hero.
- Textos de apoio foram encurtados em Entender / Organizar / Planejar / Defender.
- Autoridade: título reduzido para 'Conhecimento jurídico que gera autoridade.'
- Publicações: título reduzido para 'Uma trajetória também registrada em livros.'
- CTA final encurtado.
- Melhoradas margens, espaçamentos e proporção entre imagem e texto.
- Vídeos e estrutura técnica da V7 preservados.


V9 — AJUSTES DE COPY E CONTATO
- Título da seção de atuação alterado para 'Direito Previdenciário.'
- Linha de telefone removida da seção de contato.
- WhatsApp, e-mail, endereço e Instagram mantidos.
- Demais ajustes e vídeos da V8 preservados.

V11 — TIMING E VIEWPORT
- Texto da Hero agora aparece somente após o evento real de término do vídeo.
- Desktop respeita os ~16,06 s do vídeo e mobile os ~10,53 s, sem timer fixo de 9 s.
- Após o fim real do vídeo, a copy entra com atraso curto de 250 ms.
- Fallback técnico passou a considerar a duração real do arquivo, evitando entrada antecipada.
- Hero ganhou regras específicas para notebooks/telas desktop de baixa altura, mantendo CTA e OAB visíveis em 100% de zoom.
- Localização e cue de scroll são ocultados em telas desktop baixas para preservar o enquadramento principal.
