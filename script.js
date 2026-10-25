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
  form.addEventListener('submit',async function(e){
    e.preventDefault();var bad=null;
    [['nume','Completează numele.'],['tel','Completează un număr de telefon.'],['email','Completează un e-mail valid.']].forEach(function(f){
      var el=form.elements[f[0]],v=el.value.trim(),ok=v&&(f[0]!=='email'||/^\S+@\S+\.\S+$/.test(v))&&(f[0]!=='tel'||v.replace(/\D/g,'').length>=9);
      setErr(el,ok?'':f[1]);if(!ok&&!bad)bad=el;
    });
    var ok=document.getElementById('ok');setErr(ok,ok.checked?'':'Bifează acordul pentru a trimite solicitarea.');
    if(!ok.checked&&!bad)bad=ok;
    if(bad){bad.focus();stare.textContent='Verifică câmpurile marcate.';return}
    var submit=form.querySelector('[type="submit"]'),submitLabel=submit.textContent;
    submit.disabled=true;submit.textContent='Se trimite...';
    stare.textContent='Solicitarea se trimite...';
    try{
      var response=await fetch(form.action,{method:'POST',body:new FormData(form),headers:{Accept:'application/json'}});
      var result=await response.json();
      if(!response.ok||!result.success)throw new Error(result.message||'Trimiterea solicitării a eșuat.');
      stare.textContent='Solicitarea a fost trimisă. Îți mulțumim!';
      form.reset();
    }catch(error){
      stare.textContent='Nu am putut trimite solicitarea. Verifică conexiunea și încearcă din nou.';
    }finally{
      submit.disabled=false;submit.textContent=submitLabel;
    }
  });
})();

/* Acces demo la ecranul de intrare. Parola este doar o verificare vizuală, nu autentificare. */
(function(){
  var el=document.getElementById('intro'),root=document.documentElement,form=document.getElementById('intro-form'),input=document.getElementById('intro-password'),status=document.getElementById('intro-status');
  if(!el||!root.classList.contains('has-intro')||!form||!input||!status)return;
  root.classList.add('intro-active');
  function openIntro(message){
    el.classList.add('granted');
    status.textContent=message||'Access Permis';
    window.setTimeout(function(){
      el.classList.add('open');
      window.setTimeout(function(){
        el.remove();
        root.classList.remove('has-intro','intro-active','intro-unlocked');
      },700);
    },700);
  }
  if(root.classList.contains('intro-unlocked')){
    window.setTimeout(openIntro,1200);
    return;
  }
  input.focus();
  form.addEventListener('submit',function(e){
    e.preventDefault();
    if(input.value!=='hocuspocus'){
      el.classList.add('error');
      input.setAttribute('aria-invalid','true');
      status.textContent='Parola este incorectă. Încearcă din nou.';
      input.focus();
      return;
    }
    var storageWarning='';
    try{localStorage.setItem('intro-unlocked','1')}catch(error){storageWarning=' Parola nu a putut fi memorată pentru reîncărcările viitoare.'}
    input.removeAttribute('aria-invalid');
    el.classList.remove('error');
    openIntro(storageWarning?'Access Permis.'+storageWarning:'Access Permis');
  });
  input.addEventListener('input',function(){
    if(el.classList.contains('error')){
      el.classList.remove('error');
      input.removeAttribute('aria-invalid');
      status.textContent='';
    }
  });
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
