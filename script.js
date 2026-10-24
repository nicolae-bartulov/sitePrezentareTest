(function(){
  var burger=document.querySelector('.burger'),nav=document.getElementById('nav');
  burger.addEventListener('click',function(){var o=nav.classList.toggle('open');burger.setAttribute('aria-expanded',o)});
  nav.addEventListener('click',function(e){if(e.target.tagName==='A'){nav.classList.remove('open');burger.setAttribute('aria-expanded','false')}});
  document.getElementById('an').textContent=new Date().getFullYear();

  var main=document.getElementById('pagina-principala'),legal=document.getElementById('pagina-legala');
  function route(){
    var h=location.hash.slice(1),isLegal=h==='confidentialitate'||h==='cookies';
    main.hidden=isLegal;legal.hidden=!isLegal;
    if(isLegal){var el=document.getElementById(h);if(el)el.scrollIntoView()}
    else if(h){var t=document.getElementById(h);if(t)t.scrollIntoView()}
    else window.scrollTo(0,0);
  }
  window.addEventListener('hashchange',route);route();

  var form=document.getElementById('form'),stare=document.getElementById('stare');
  function setErr(el,txt){
    var old=el.parentNode.querySelector('.msg-err');if(old)old.remove();
    el.classList.toggle('err',!!txt);el.removeAttribute('aria-invalid');
    if(txt){var p=document.createElement('p');p.className='msg-err';p.textContent=txt;el.parentNode.appendChild(p);el.setAttribute('aria-invalid','true')}
  }
  form.addEventListener('submit',function(e){
    e.preventDefault();var bad=null;
    [['nume','Completează numele.'],['tel','Completează un număr de telefon.'],['email','Completează un e-mail valid.']].forEach(function(f){
      var el=form.elements[f[0]],v=el.value.trim(),ok=v&&(f[0]!=='email'||/^\S+@\S+\.\S+$/.test(v))&&(f[0]!=='tel'||v.replace(/\D/g,'').length>=9);
      setErr(el,ok?'':f[1]);if(!ok&&!bad)bad=el;
    });
    var ok=document.getElementById('ok');setErr(ok,ok.checked?'':'Bifează acordul pentru a trimite solicitarea.');
    if(!ok.checked&&!bad)bad=ok;
    if(bad){bad.focus();stare.textContent='Verifică câmpurile marcate.';return}
    /* DEMO: aici nu se trimite nimic. Conectează formularul la un serviciu real (vezi README). */
    stare.textContent='Mod demonstrativ: formularul este valid, dar nu a fost trimis nicăieri. Conectează-l la un serviciu de e-mail înainte de publicare.';
    form.reset();
  });
})();

/* Ecran de intrare: logo, apoi „Access Permis”, apoi deschidere. Orice tastă sau click îl închide. */
(function(){
  var el=document.getElementById('intro'),root=document.documentElement;
  if(!el||!root.classList.contains('has-intro'))return;
  var t=[];
  function done(){t.forEach(clearTimeout);el.remove();root.classList.remove('has-intro');document.removeEventListener('keydown',done)}
  t.push(setTimeout(function(){el.classList.add('granted')},1200));
  t.push(setTimeout(function(){el.classList.add('open')},1900));
  t.push(setTimeout(done,2800));
  el.addEventListener('click',done);document.addEventListener('keydown',done);
})();

/* Comutator temă: întunecat / luminos. Fără alegere salvată, urmează setarea sistemului. */
(function(){
  var b=document.getElementById('tema'),r=document.documentElement,mq=matchMedia('(prefers-color-scheme: dark)');
  if(!b)return;
  function dark(){var t=r.getAttribute('data-theme');return t?t==='dark':mq.matches}
  function sync(){var d=dark();b.setAttribute('aria-pressed',d);b.querySelector('use').setAttribute('href',d?'#i-sun':'#i-moon');b.title=d?'Treci la tema luminoasă':'Treci la tema întunecată'}
  b.addEventListener('click',function(){var n=dark()?'light':'dark';r.setAttribute('data-theme',n);try{localStorage.setItem('tema',n)}catch(e){}sync()});
  if(mq.addEventListener)mq.addEventListener('change',sync);
  sync();
})();
