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
    sideLinks.forEach(function(a,i){a.classList.toggle('active',i===best)});
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