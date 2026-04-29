/* =============================================
   BIRTHDAY WEBSITE — JAVASCRIPT
   birthday.js

   Jangan edit file ini.
   Semua konfigurasi ada di assets.js.
   ============================================= */

'use strict';

// ─────────────────────────────────────────────
// CONSTANTS
// ─────────────────────────────────────────────

const CONFETTI_COLORS = [
  '#F4A7B9', '#FBD0DA', '#E8D5C4',
  '#FFDEE9', '#ffffff', '#F9C5D0',
  '#D4537E', '#EAC4D5',
];

const HEART_EMOJIS = ['💗', '💕', '🌸', '🎀', '✦'];
const TILTS        = [-4, -2, 0, 2, 4, -3, 3, -1, 1, -5, 5];
const STICKERS     = ['🎀', '✦', '🌸', '💕', '✿', '🎞', '💗'];


// ─────────────────────────────────────────────
// STATE
// ─────────────────────────────────────────────

let currentSong = 0;
let isPlaying   = false;
let galIdx      = 0;
let isDrag      = false;
let dragX       = 0;
let dragSX      = 0;
let envOpen     = false;
let cardFlipped = false;


// ─────────────────────────────────────────────
// HELPERS
// ─────────────────────────────────────────────

function formatTime(s) {
  const m   = Math.floor(s / 60);
  const sec = Math.floor(s % 60);
  return `${m}:${sec < 10 ? '0' : ''}${sec}`;
}

function rand(min, max) {
  return Math.random() * (max - min) + min;
}


// ─────────────────────────────────────────────
// APPLY CONFIG — inject values from assets.js
// ─────────────────────────────────────────────

function applyConfig() {
  const c = CONFIG;

  // Nama — plain text
  document.querySelectorAll('.js-nama').forEach(el => {
    el.textContent = c.namaLengkap;
  });

  // Nama — italic wrapped
  document.querySelectorAll('.js-nama-em').forEach(el => {
    el.innerHTML = `<em>${c.namaLengkap}</em>`;
  });

  // Umur
  const umurEl = document.getElementById('js-umur');
  if (umurEl) umurEl.textContent = c.umur;

  // Tanda tangan
  const signEl = document.getElementById('js-sign');
  if (signEl) signEl.textContent = `with love, ${c.namaPengirim} ✦`;

  // Pesan hero (newline → <br>)
  const heroMsg = document.getElementById('js-hero-message');
  if (heroMsg) heroMsg.innerHTML = c.pesanHero.replace(/\n/g, '<br>');

  // Salutasi & isi kartu
  const salutEl = document.getElementById('js-kartu-salut');
  if (salutEl) salutEl.textContent = `Dear ${c.namaLengkap},`;

  const kartuEl = document.getElementById('js-kartu-message');
  if (kartuEl) kartuEl.textContent = c.pesanKartu;

  // Pesan bouquet
  const bouquetMsgEl = document.getElementById('js-bouquet-message');
  if (bouquetMsgEl) bouquetMsgEl.textContent = c.pesanBouquet;

  // Pesan closing
  const closingEl = document.getElementById('js-closing-message');
  if (closingEl) closingEl.innerHTML = c.pesanClosing.replace(/\n/g, '<br>');

  // Hirono image
  if (c.hironoImg) {
    const hironoImg = document.getElementById('hironoImg');
    const hironoPH  = document.getElementById('hirono-placeholder');
    if (hironoImg) { hironoImg.src = c.hironoImg; hironoImg.classList.add('loaded'); }
    if (hironoPH)  hironoPH.style.display = 'none';
  }

  // Bouquet image
  if (c.bouquetImg) {
    const bouquetImg = document.getElementById('bouquetImg');
    const bouquetPH  = document.getElementById('bouquetPlaceholder');
    if (bouquetImg) { bouquetImg.src = c.bouquetImg; bouquetImg.style.display = 'block'; }
    if (bouquetPH)  bouquetPH.style.display = 'none';
  }
}


// ─────────────────────────────────────────────
// 1. LANDING
// ─────────────────────────────────────────────

function spawnConfetti() {
  const container = document.getElementById('confetti');
  container.innerHTML = '';
  for (let i = 0; i < 90; i++) {
    const piece = document.createElement('div');
    piece.className = 'confetti-piece';
    const color = CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)];
    piece.style.cssText = `
      left: ${rand(0, 100)}vw;
      top: ${rand(-30, -10)}px;
      background: ${color};
      width: ${rand(6, 16)}px;
      height: ${rand(6, 16)}px;
      border-radius: ${Math.random() > 0.5 ? '50%' : '2px'};
      animation-delay: ${rand(0, 0.8)}s;
      animation-duration: ${rand(2, 3.5)}s;
      transform: rotate(${rand(0, 360)}deg);
    `;
    container.appendChild(piece);
  }
}

function openBox() {
  document.getElementById('lid').classList.add('open');
  document.getElementById('bow').classList.add('open');
  spawnConfetti();
  setTimeout(() => document.getElementById('s-landing').classList.add('hide'), 400);
  setTimeout(() => {
    document.getElementById('s-landing').style.display = 'none';
    document.getElementById('reveal').classList.add('show');
  }, 1000);
}

function goToHero() {
  document.getElementById('reveal').style.display = 'none';
  document.getElementById('s-hero').scrollIntoView({ behavior: 'smooth' });
}

function replayFromStart() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
  setTimeout(() => {
    const l = document.getElementById('s-landing');
    l.style.display = 'flex';
    l.classList.remove('hide');

    const r = document.getElementById('reveal');
    r.classList.remove('show');
    r.style.display = '';

    document.getElementById('lid').classList.remove('open');
    document.getElementById('bow').classList.remove('open');
    document.getElementById('confetti').innerHTML = '';
  }, 600);
}

function spawnPetals() {
  for (let i = 0; i < 16; i++) {
    const p = document.createElement('div');
    p.className = 'petal';
    const color = CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)];
    const size  = rand(6, 18);
    p.style.cssText = `
      left: ${rand(0, 100)}vw;
      width: ${size}px; height: ${size}px;
      border-radius: 50% 0 50% 0;
      background: ${color};
      animation-duration: ${rand(6, 14)}s;
      animation-delay: ${rand(0, 8)}s;
    `;
    document.body.appendChild(p);
  }
}


// ─────────────────────────────────────────────
// 3. MUSIC PLAYER
// ─────────────────────────────────────────────

function renderPlaylist() {
    const songs     = CONFIG.playlist;
    const container = document.getElementById('playlist');
    container.innerHTML = '';
    
    songs.forEach((song, i) => {
        const item = document.createElement('div');
        item.className = `playlist-item${i === currentSong ? ' active' : ''}`;
        
        // ✅ PERBAIKAN DI SINI (Tag img ditambahkan)
        item.innerHTML = `
            <div class="playlist-cover">
                ${song.cover 
                    ? `<img src="${song.cover}" alt="cover" onerror="this.style.display='none'; this.parentElement.innerHTML='🎵'">` 
                    : '🎵'}
            </div>
            <div class="playlist-info">
                <div class="playlist-name">${song.title}</div>
                <div class="playlist-artist">${song.artist}</div>
            </div>
            <div class="playlist-duration">${song.duration || '—'}</div>
            ${i === currentSong && isPlaying ? '<div class="active-indicator"></div>' : ''}
        `;
        
        item.addEventListener('click', () => selectSong(i));
        container.appendChild(item);
    });
}

function updateCoverDisplay(song) {
    const ph  = document.getElementById('mainCoverPlaceholder');
    const img = document.getElementById('mainCoverImg');
    
    if (song.cover) {
        ph.style.display = 'none';
        img.src = song.cover;
        img.style.display = 'block';
        
        // ✅ Tambahan: Jika gambar error, tampilkan placeholder lagi
        img.onerror = function() {
            this.style.display = 'none';
            ph.style.display = 'flex';
            ph.innerHTML = '🎵'; // Atau teks lain
        };
    } else {
        ph.style.display  = 'flex';
        img.style.display = 'none';
    }
}

function selectSong(index) {
  const wasPlaying = isPlaying;
  pauseAudio();
  currentSong = index;
  const song  = CONFIG.playlist[index];
  const audio = document.getElementById('audioPlayer');

  document.getElementById('songTitle').textContent   = song.title;
  document.getElementById('songArtist').textContent  = song.artist;
  document.getElementById('progressBar').style.width = '0%';
  document.getElementById('currentTime').textContent = '0:00';
  document.getElementById('totalTime').textContent   = song.duration || '—';

  updateCoverDisplay(song);

  if (song.mp3) {
    audio.src = song.mp3;
    if (wasPlaying) playAudio();
  } else {
    audio.src = '';
  }

  renderPlaylist();
}

function setPlayingUI(playing) {
  document.getElementById('playIcon').style.display  = playing ? 'none'  : 'block';
  document.getElementById('pauseIcon').style.display = playing ? 'block' : 'none';
  document.getElementById('mainCoverImg').classList.toggle('playing', playing);
  document.getElementById('mainCoverPlaceholder').classList.toggle('playing', playing);
}

function playAudio() {
  const audio = document.getElementById('audioPlayer');
  if (!audio.src || audio.src === window.location.href) return;
  audio.play();
  isPlaying = true;
  setPlayingUI(true);
  renderPlaylist();
}

function pauseAudio() {
  document.getElementById('audioPlayer').pause();
  isPlaying = false;
  setPlayingUI(false);
  renderPlaylist();
}

function togglePlay() { isPlaying ? pauseAudio() : playAudio(); }
function prevSong()   { selectSong((currentSong - 1 + CONFIG.playlist.length) % CONFIG.playlist.length); }
function nextSong()   { selectSong((currentSong + 1) % CONFIG.playlist.length); }

function seekAudio(event) {
  const audio = document.getElementById('audioPlayer');
  const rect  = document.getElementById('progressWrap').getBoundingClientRect();
  if (audio.duration) audio.currentTime = ((event.clientX - rect.left) / rect.width) * audio.duration;
}

function initAudioListeners() {
  const audio = document.getElementById('audioPlayer');
  audio.addEventListener('timeupdate', () => {
    if (!audio.duration) return;
    document.getElementById('progressBar').style.width = `${(audio.currentTime / audio.duration) * 100}%`;
    document.getElementById('currentTime').textContent = formatTime(audio.currentTime);
  });
  audio.addEventListener('loadedmetadata', () => {
    CONFIG.playlist[currentSong].duration = formatTime(audio.duration);
    document.getElementById('totalTime').textContent = formatTime(audio.duration);
    renderPlaylist();
  });
  audio.addEventListener('ended', nextSong);
}


// ─────────────────────────────────────────────
// 4. GALLERY
// ─────────────────────────────────────────────

function renderGallery() {
    const slots = CONFIG.galeri;
    const track = document.getElementById('carouselTrack');
    track.innerHTML = '';
    slots.forEach((slot, i) => {
        const card = document.createElement('div');
        card.className = `polaroid${i === galIdx ? ' center-active' : ''}`;
        card.style.transform = `rotate(${TILTS[i % TILTS.length]}deg)`;
        const showSticker = i % 2 === 0;
        
        // ✅ TAMBAHKAN ONLOAD HANDLER
        card.innerHTML = `<div class="polaroid-photo">
            <img src="${slot.img}" alt="foto ${i + 1}" onload="this.classList.add('loaded')" onerror="this.style.display='none'">
        </div>
        <div class="polaroid-caption">
            <span class="caption-text">${slot.caption}</span>
        </div>
        ${showSticker ? `<div class="sticker">${STICKERS[i % STICKERS.length]}</div>` : ''}
        `;
        
        card.addEventListener('click', () => {
            if (i !== galIdx) { galGoTo(i); return; }
            openLightbox(i);
        });
        track.appendChild(card);
    });

  // Dots
  const dotsEl = document.getElementById('dots');
  dotsEl.innerHTML = '';
  slots.forEach((_, i) => {
    const dot = document.createElement('div');
    dot.className = `dot${i === galIdx ? ' active' : ''}`;
    dot.onclick   = () => galGoTo(i);
    dotsEl.appendChild(dot);
  });

  document.getElementById('gallery-counter').textContent = `${slots.length} foto`;
}

function galGoTo(index, animate = true) {
  galIdx = Math.max(0, Math.min(index, CONFIG.galeri.length - 1));
  const track  = document.getElementById('carouselTrack');
  const CARD_W = 220 + 28;
  track.style.transition = animate ? 'transform 0.5s cubic-bezier(0.25,1,0.5,1)' : 'none';
  track.style.transform  = `translateX(-${galIdx * CARD_W}px)`;
  renderGallery();
}

function galleryNav(direction) { galGoTo(galIdx + direction); }

function openLightbox(index) {
  const slot = CONFIG.galeri[index];
  document.getElementById('lbImg').src = slot.img;
  document.getElementById('lbCaption').textContent = slot.caption;
  document.getElementById('lightbox').classList.add('open');
}

function closeLightbox(event) {
  const lb = document.getElementById('lightbox');
  if (event && event.target !== lb && !event.target.closest('.lightbox-close')) return;
  lb.classList.remove('open');
}

function initGalleryDrag() {
  const track  = document.getElementById('carouselTrack');
  const CARD_W = 220 + 28;

  track.addEventListener('mousedown', (e) => {
    isDrag = true; dragX = e.clientX; dragSX = galIdx * CARD_W;
    track.classList.add('dragging');
  });
  window.addEventListener('mousemove', (e) => {
    if (!isDrag) return;
    track.style.transition = 'none';
    track.style.transform  = `translateX(-${dragSX - (e.clientX - dragX)}px)`;
  });
  window.addEventListener('mouseup', (e) => {
    if (!isDrag) return;
    isDrag = false;
    track.classList.remove('dragging');
    const dx = e.clientX - dragX;
    if (Math.abs(dx) > 60) galleryNav(dx < 0 ? 1 : -1);
    else galGoTo(galIdx);
  });
  track.addEventListener('touchstart', (e) => {
    dragX = e.touches[0].clientX; dragSX = galIdx * CARD_W;
  }, { passive: true });
  track.addEventListener('touchmove', (e) => {
    const dx = e.touches[0].clientX - dragX;
    track.style.transition = 'none';
    track.style.transform  = `translateX(-${dragSX - dx}px)`;
  }, { passive: true });
  track.addEventListener('touchend', (e) => {
    const dx = e.changedTouches[0].clientX - dragX;
    if (Math.abs(dx) > 60) galleryNav(dx < 0 ? 1 : -1);
    else galGoTo(galIdx);
  });
}


// ─────────────────────────────────────────────
// 5. FLIP CARD
// ─────────────────────────────────────────────

function openEnvelope() {
  if (envOpen) return;
  envOpen = true;
  document.getElementById('envFlap').classList.add('open');
  document.getElementById('seal').classList.add('open');
  document.getElementById('envOpenHint').style.opacity = '0';
  setTimeout(() => document.getElementById('cardWrap').classList.add('revealed'), 400);
}

function flipCard() {
  if (!envOpen) return;
  cardFlipped = !cardFlipped;
  document.getElementById('flipInner').classList.toggle('flipped', cardFlipped);
}


// ─────────────────────────────────────────────
// 7. CLOSING HEARTS
// ─────────────────────────────────────────────

function startFloatingHearts() {
  setInterval(() => {
    const h       = document.createElement('div');
    h.className   = 'heart-float';
    h.textContent = HEART_EMOJIS[Math.floor(Math.random() * HEART_EMOJIS.length)];
    h.style.cssText = `
      left: ${rand(0, 95)}vw;
      animation-duration: ${rand(5, 10)}s;
      font-size: ${rand(12, 26)}px;
    `;
    document.body.appendChild(h);
    setTimeout(() => h.remove(), 10000);
  }, 1800);
}


// ─────────────────────────────────────────────
// INIT
// ─────────────────────────────────────────────

document.addEventListener('DOMContentLoaded', () => {
  applyConfig();
  spawnPetals();
  initAudioListeners();
  selectSong(0);
  renderPlaylist();
  renderGallery();
  galGoTo(0, false);
  initGalleryDrag();
  startFloatingHearts();
});
