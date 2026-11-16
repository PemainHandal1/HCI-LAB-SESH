// Light / dark mode toggle. Follows the device setting until the visitor picks one; the choice is remembered.
(function(){
  var root=document.documentElement;
  var btn=document.querySelector('.theme-toggle');
  var mq=window.matchMedia('(prefers-color-scheme: dark)');
  function saved(){try{return localStorage.getItem('theme')}catch(e){return null}}
  function current(){return root.getAttribute('data-theme')||(mq.matches?'dark':'light')}
  function paint(){
    var dark=current()==='dark';
    btn.querySelector('.ic').textContent=dark?'☀':'☾';
    btn.querySelector('.tx').textContent=dark?'Light':'Dark';
  }
  var t=saved();
  if(t==='light'||t==='dark')root.setAttribute('data-theme',t);
  paint();
  mq.addEventListener&&mq.addEventListener('change',paint);
  btn.addEventListener('click',function(){
    var next=current()==='dark'?'light':'dark';
    root.setAttribute('data-theme',next);
    try{localStorage.setItem('theme',next)}catch(e){}
    paint();
  });
})();

document.getElementById('yr').textContent=new Date().getFullYear();

// Each stage lifts up and fades as you scroll to the next one.
(function(){
  var stages=[].slice.call(document.querySelectorAll('.stage'));
  var ticking=false;
  var side=document.querySelector('.side');
  var sideLinks=[].slice.call(document.querySelectorAll('.side a'));
  function update(){
    var vh=window.innerHeight;
    stages.forEach(function(st){
      var r=st.getBoundingClientRect(),p=0,dir=0;
      if(r.top>0){p=r.top/(vh*.8);dir=1}
      else if(r.bottom<vh){p=(vh-r.bottom)/(vh*.8);dir=-1}
      p=Math.min(1,p);
      var inner=st.firstElementChild;
      inner.style.opacity=1-p;
      inner.style.transform='translateY('+(dir*(dir>0?50:70)*p)+'px)';
    });
    // side navigation: highlight the group that is mostly on screen, show it after the intro
    var best=0,bestV=-1;
    stages.forEach(function(st,i){
      var r=st.getBoundingClientRect();
      var v=Math.min(r.bottom,vh)-Math.max(r.top,0);
      if(v>bestV){bestV=v;best=i}
    });
    sideLinks.forEach(function(a,i){a.classList.toggle('active',i===best);if(i===best){a.setAttribute('aria-current','location')}else{a.removeAttribute('aria-current')}});
    side.classList.toggle('show',best>0);
    ticking=false;
  }
  function req(){if(!ticking){ticking=true;requestAnimationFrame(update)}}
  window.addEventListener('scroll',req,{passive:true});
  window.addEventListener('resize',req);
  update();
})();

// Slow smooth scrolling for the menu buttons.
// Change DURATION (in milliseconds) to make it faster or slower. 1500 = 1.5 seconds.
(function(){
  var DURATION=1500;
  var root=document.documentElement;
  function ease(t){return t<.5?4*t*t*t:1-Math.pow(-2*t+2,3)/2}
  document.querySelectorAll('nav a[href^="#"]').forEach(function(link){
    link.addEventListener('click',function(e){
      var target=document.querySelector(link.getAttribute('href'));
      if(!target)return;
      e.preventDefault();
      var start=window.pageYOffset;
      var end=Math.max(0,target.getBoundingClientRect().top+start);
      root.style.scrollSnapType='none';
      var t0=null;
      function step(now){
        if(t0===null)t0=now;
        var p=Math.min((now-t0)/DURATION,1);
        window.scrollTo(0,start+(end-start)*ease(p));
        if(p<1){requestAnimationFrame(step)}else{root.style.scrollSnapType=''}
      }
      requestAnimationFrame(step);
    });
  });
})();

// ===== Language switch (English / Bahasa Indonesia) =====
// Elements with data-i18n are translated. English text stays in the HTML; Indonesian text is in ID below.
var ID={
0:'Mahasiswa Ilmu Komputer, calon polisi siber',
1:'Saya kuliah Ilmu Komputer di BINUS International dan alumnus SMA Taruna Nusantara. Tujuan saya adalah melindungi orang dari kejahatan di dunia digital sebagai polisi siber.',
2:'Tentang',3:'Keahlian',4:'Proyek',5:'Kehidupan',6:'Kontak',7:'Gulir ke bawah ↓',
8:'Tentang saya',
9:'Halo, saya Yedija Rafael. Saya mahasiswa Ilmu Komputer di BINUS International, tempat saya belajar bagaimana perangkat lunak, jaringan, dan data bekerja.',
10:'Sebelum kuliah, saya lulus dari SMA Taruna Nusantara. Saya ingin memakai kemampuan teknis saya untuk melayani masyarakat sebagai polisi siber, melawan kejahatan siber seperti penipuan online, peretasan, dan pencurian data.',
11:'Saya orang yang bersemangat dengan hal-hal baru. Membuat website ini sendiri dan menemukan hal baru membuat pikiran saya menggebu-gebu: semakin banyak yang saya temukan, semakin saya ingin menemukan dan mempelajarinya.',
12:'Kepribadian',
13:'Saya energik dan banyak bicara saat kita membahas sesuatu yang menarik bagi otak saya.',
14:'Energik',15:'Banyak bicara',16:'Penasaran',17:'Memotivasi',
18:'Keahlian',
19:'Saya bisa bernegosiasi dan membujuk orang lain.',
20:'Saya berpikir jernih di bawah tekanan dan bisa memotivasi orang lain.',
21:'Saya semakin lancar dengan logika di dalam Python.',
22:'Saya suka membangun relasi dengan siapa saja.',
23:'Saya berlari hampir setiap hari, jadi ini hobi sekaligus keahlian.',
24:'Negosiasi',25:'Persuasi',27:'Relasi',28:'Lari',
29:'Pendidikan',30:'Awal September 2026 sampai sekarang',
31:'<strong>BINUS International</strong><br>Sarjana Ilmu Komputer',
32:'Mei 2023 sampai Mei 2026',
33:'<strong>SMA Taruna Nusantara</strong><br>Alumnus',
34:'Pengalaman',35:'Organisasi Siswa Intra Sekolah (OSIS)',
36:'Anggota tim Hubungan Masyarakat dan Dokumentasi.',
37:'PATAKA (Tim Pengibar Bendera)',38:'Anggota tim pengibar bendera sekolah saya.',
39:'Pencapaian',40:'Meraih skor 7.0 pada IELTS.',
41:'Proyek',
42:'<strong>Saat ini:</strong> Saya membagi waktu antara kuliah dan persiapan akademi kepolisian.',
43:'<strong>Di GitHub:</strong> Saya sudah membuat cukup banyak proyek, dan banyak di antaranya memakai HTML dan CSS. <a class="link" href="https://github.com/PemainHandal1" target="_blank" rel="noopener noreferrer">Lihat di sini</a>.',
44:'<strong>Portofolio ini:</strong> website pribadi pertama saya, dibuat dengan HTML, CSS, dan JavaScript.',
45:'Tujuan',
46:'Jangka pendek: menyelesaikan gelar Ilmu Komputer dengan kemampuan yang kuat',
47:'Jangka panjang: menjadi polisi yang baik',
48:'Impian: membahagiakan orang tua dan keluarga saya, dan mampu menafkahi mereka',
49:'Sedang dipelajari',
50:'Membuat antarmuka dan pengalaman pengguna yang baik (Interaksi Manusia dan Komputer).',
51:'Semantik dan cara kerja kode Python (Algoritma dan Pemrograman).',
52:'Mengendalikan rasa gugup ketika hasil kerja saya belum cukup atau belum sesuai harapan (kontrol diri dan kesabaran).',
53:'Nilai-nilai',
54:'Saya sangat menjunjung integritas dan kejujuran, karena keduanya adalah karakter dan nilai dasar yang seharusnya dimiliki semua orang.',
55:'Nilai-nilai ini berdampak besar pada diri Anda dan orang-orang di sekitar Anda.',
56:'Minat',
57:'Saya berlari hampir setiap hari. Saya juga sangat penasaran bagaimana kejahatan digital terjadi dan bagaimana menghentikannya.',
58:'Lari',59:'Teknologi',60:'Keamanan siber',61:'Relasi',
62:'Fakta menarik',63:'Jarak lari mingguan saya 30 sampai 40 km.',
64:'Saya bercita-cita mengikuti Ironman dalam beberapa tahun ke depan.',
65:'“Hari ini saya belajar kode agar besok bisa melindungi orang di dunia maya.”',
66:'Cara saya bekerja',
67:'Saya orang yang tepat waktu, dan saya menghargai anggota tim yang bekerja bersama saya sampai selesai tanpa numpang nama.',
68:'Saya tidak suka orang yang numpang nama. Saya tidak masalah dengan rekan yang perlu saya jelaskan secara rinci sampai mengerti, tetapi tidak dengan mereka yang numpang nama dan jarang berkomunikasi.',
69:'Bahasa',70:'Bahasa Indonesia, [level]<br>Bahasa Inggris, IELTS 7.0',
71:'Hubungi saya',
72:'Saya terbuka untuk magang, kompetisi, komunitas keamanan siber, dan percakapan tentang teknologi dan penegakan hukum.',
'skip':'Langsung ke konten','gh-title':'Repositori GitHub',
'gh-intro':'Proyek yang diambil langsung dari akun GitHub saya.','gh-search':'Cari repositori',
'cf-title':'Kirim pesan kepada saya','cf-name':'Nama','cf-email':'Email','cf-msg':'Pesan','cf-send':'Kirim pesan'
};
var LBL={en:['Home','About','Skills','Projects','Repos','Life','Contact'],id:['Beranda','Tentang','Keahlian','Proyek','Repo','Kehidupan','Kontak']};
// Texts that are made by JavaScript
var UI={
  en:{loading:'Loading repositories...',none:'No repositories match your search.',error:'Could not load repositories right now. You can see them on my GitHub profile.',
      updated:'Updated',noDesc:'No description.',search:'Search by name, language, or description',
      eName:'Please enter your name.',eEmail:'Please enter a valid email address.',eMsg:'Please write a message of at least 10 characters.',ok:'Opening your email app with your message...',other:'Bahasa Indonesia'},
  id:{loading:'Memuat repositori...',none:'Tidak ada repositori yang cocok dengan pencarian Anda.',error:'Repositori tidak dapat dimuat sekarang. Anda bisa melihatnya di profil GitHub saya.',
      updated:'Diperbarui',noDesc:'Tidak ada deskripsi.',search:'Cari berdasarkan nama, bahasa, atau deskripsi',
      eName:'Silakan isi nama Anda.',eEmail:'Silakan isi alamat email yang valid.',eMsg:'Silakan tulis pesan minimal 10 karakter.',ok:'Membuka aplikasi email Anda dengan pesan Anda...',other:'English'}
};
var lang='en';
try{lang=localStorage.getItem('lang')||'en'}catch(e){}
function T(k){return UI[lang][k]}
var langBtn=document.querySelector('.lang-toggle');
var repoSearch=document.getElementById('repo-search');
function setLang(l){
  lang=l;
  try{localStorage.setItem('lang',l)}catch(e){}
  document.documentElement.lang=l;
  document.querySelectorAll('[data-i18n]').forEach(function(el){
    if(el.dataset.en===undefined)el.dataset.en=el.innerHTML;
    var k=el.getAttribute('data-i18n');
    el.innerHTML=(l==='id'&&ID[k]!==undefined)?ID[k]:el.dataset.en;
  });
  document.querySelectorAll('.side .lbl').forEach(function(el,i){el.textContent=LBL[l][i]});
  langBtn.querySelector('.lt').textContent=l==='en'?'ID':'EN';
  langBtn.setAttribute('aria-label',l==='en'?'Ganti bahasa ke Bahasa Indonesia':'Switch language to English');
  repoSearch.placeholder=T('search');
  renderRepos();
  clearErrors();
}
langBtn.addEventListener('click',function(){setLang(lang==='en'?'id':'en')});

// ===== GitHub repositories (fetched live from the GitHub API) with search =====
var repos=null,repoFailed=false;
var repoList=document.getElementById('repo-list');
repoList.setAttribute('aria-label','GitHub repositories');
function renderRepos(){
  repoList.textContent='';
  if(repoFailed){repoList.textContent=T('error');return}
  if(repos===null){repoList.textContent=T('loading');return}
  var q=repoSearch.value.trim().toLowerCase();
  var shown=repos.filter(function(r){
    return (r.name+' '+(r.description||'')+' '+(r.language||'')).toLowerCase().indexOf(q)!==-1;
  });
  if(!shown.length){repoList.textContent=T('none');return}
  shown.forEach(function(r){
    var card=document.createElement('article');card.className='repo';
    var a=document.createElement('a');a.href=r.html_url;a.target='_blank';a.rel='noopener noreferrer';a.textContent=r.name;
    var p=document.createElement('p');p.textContent=r.description||T('noDesc');
    var sm=document.createElement('small');
    var date=new Date(r.pushed_at).toLocaleDateString(lang==='id'?'id-ID':'en-US',{month:'short',year:'numeric'});
    sm.textContent=(r.language?r.language+' · ':'')+T('updated')+' '+date;
    card.appendChild(a);card.appendChild(p);card.appendChild(sm);
    repoList.appendChild(card);
  });
}
repoSearch.addEventListener('input',renderRepos);
fetch('https://api.github.com/users/PemainHandal1/repos?sort=pushed&per_page=100')
  .then(function(res){if(!res.ok)throw new Error('http');return res.json()})
  .then(function(data){repos=data.filter(function(r){return !r.fork});renderRepos()})
  .catch(function(){repoFailed=true;renderRepos()});

// ===== Contact form with validation =====
var form=document.getElementById('contact-form');
var fields=[['cf-name','eName',function(v){return v.trim().length>=2}],
            ['cf-email','eEmail',function(v){return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim())}],
            ['cf-msg','eMsg',function(v){return v.trim().length>=10}]];
function clearErrors(){
  fields.forEach(function(f){
    document.getElementById(f[0]).removeAttribute('aria-invalid');
    document.getElementById(f[0]+'-err').textContent='';
  });
  document.getElementById('cf-status').textContent='';
}
form.addEventListener('submit',function(e){
  e.preventDefault();
  clearErrors();
  var firstBad=null;
  fields.forEach(function(f){
    var input=document.getElementById(f[0]);
    if(!f[2](input.value)){
      input.setAttribute('aria-invalid','true');
      document.getElementById(f[0]+'-err').textContent='⚠ '+T(f[1]);
      if(!firstBad)firstBad=input;
    }
  });
  if(firstBad){firstBad.focus();return}
  var name=document.getElementById('cf-name').value.trim();
  var email=document.getElementById('cf-email').value.trim();
  var msg=document.getElementById('cf-msg').value.trim();
  document.getElementById('cf-status').textContent=T('ok');
  window.location.href='mailto:yedija.yunus@binus.ac.id?subject='+encodeURIComponent('Portfolio message from '+name)+
    '&body='+encodeURIComponent(msg+'\n\n'+name+' ('+email+')');
});

setLang(lang);
