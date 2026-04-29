/* =============================================
   BIRTHDAY WEBSITE — KONFIGURASI ASSET
   assets.js

   ✏️ FILE INI YANG PERLU KAMU EDIT.
   Isi path file sesuai nama file yang kamu
   taruh di folder images/ dan music/.
   ============================================= */

const CONFIG = {

  /* ─────────────────────────────────────────
     IDENTITAS
  ───────────────────────────────────────── */

  // Nama temanmu — tampil di landing, hero, & kartu pesan
  namaLengkap: 'Diana Lawrencia (TC)',

  // Umur yang di-celebrate
  umur: '21',

  // Namamu sendiri — tampil di tanda tangan kartu
  namaPengirim: 'H',

  /* ─────────────────────────────────────────
     TEKS UCAPAN
  ───────────────────────────────────────── */

  pesanHero: `di hari yang spesial ini, aku cuma mau bilang —
kamu adalah seseorang yang bikin hari-hari terasa
lebih berwarna, lebih hangat, dan lebih berarti.
semoga tahun ini bawa hal-hal indah yang udah lama kamu tunggu. 🎀`,

  pesanKartu: `aku bersyukur banget punya kamu di hidupku.
kamu itu teman yang selalu ada, yang bikin hari-hari terasa lebih ringan dan lebih berwarna.

semoga di usiamu yang baru ini, semua hal baik yang kamu impikan akhirnya datang menghampiri. kamu layak dapat yang terbaik — beneran. 🎀

happy birthday, ya! 

`,

  pesanBouquet: 'semoga bunga ini bisa sedikit menggambarkan betapa berartinya kamu 🌹',

  pesanClosing: `setiap momen bareng kamu itu berharga.
terima kasih udah jadi bagian dari hidupku.
happy birthday — semoga tahun ini jadi yang paling indah. 🌸`,

  /* ─────────────────────────────────────────
     IMAGES — taruh file di folder images/
  ───────────────────────────────────────── */

  hironoImg:  'images/hirono.png',
  bouquetImg: 'images/Bouquet.png',

  /* ─────────────────────────────────────────
     GALERI FOTO — tambah/kurangi sesuka kamu
  ───────────────────────────────────────── */
  galeri: [
    { img: 'images/test.jpg', caption: 'ingat ini ga? 🥹' },
    { img: 'images/gn1.png', caption: 'my fav pic of us' },
    { img: 'images/hirono.png', caption: 'bestie vibes ✨' },
    { img: 'images/gn2.png', caption: 'this one hits different' },
    { img: 'images/fotbar1.png', caption: 'forever cherished 🎀' },
    { img: 'images/foto6.jpg', caption: 'look at us hehe' },
    // { img: 'images/foto7.jpg', caption: 'caption foto 7' },
  ],

  /* ─────────────────────────────────────────
     PLAYLIST — taruh file di folder music/
  ───────────────────────────────────────── */
  playlist: [
    {
      title:  'Scars',
      artist: 'Keenan Te',
      mp3:    'music/KeenanTe-Scars.mp3',
      cover:  'music/KeenanTe-Scars.png',
    },
    {
      title:  'Nama Lagu 2',
      artist: 'Nama Artist',
      mp3:    'music/lagu2.mp3',
      cover:  'music/cover2.jpg',
    },
    {
      title:  'Nama Lagu 3',
      artist: 'Nama Artist',
      mp3:    'music/lagu3.mp3',
      cover:  'music/cover3.jpg',
    },
    // Tambah lagu:
    // { title: 'Lagu 4', artist: 'Artist', mp3: 'music/lagu4.mp3', cover: 'music/cover4.jpg' },
  ],

};
