
(function(){
  var menuButton=document.querySelector('.menu-btn');
  var nav=document.querySelector('.navlinks');
  menuButton.addEventListener('click',function(){var open=nav.classList.toggle('open');menuButton.setAttribute('aria-expanded',String(open));menuButton.textContent=open?'Close':'Menu';});
  nav.querySelectorAll('a').forEach(function(link){link.addEventListener('click',function(){nav.classList.remove('open');menuButton.setAttribute('aria-expanded','false');menuButton.textContent='Menu';});});

  var filterButtons=document.querySelectorAll('[data-filter]');
  var projects=document.querySelectorAll('.project');
  filterButtons.forEach(function(button){button.addEventListener('click',function(){var filter=button.getAttribute('data-filter');filterButtons.forEach(function(b){b.classList.remove('active');});button.classList.add('active');projects.forEach(function(project){var categories=(project.getAttribute('data-category')||'').split(' ');project.hidden=filter!=='all'&&categories.indexOf(filter)===-1;});});});

  var dialog=document.getElementById('workflow-dialog');
  var dialogImage=document.getElementById('dialog-image');
  var dialogTitle=document.getElementById('dialog-title');
  document.querySelectorAll('.project-media').forEach(function(button){button.addEventListener('click',function(){dialogImage.src=button.getAttribute('data-image');dialogImage.alt='Expanded n8n canvas for '+button.getAttribute('data-title');dialogTitle.textContent=button.getAttribute('data-title');dialog.showModal();});});
  dialog.querySelector('.dialog-close').addEventListener('click',function(){dialog.close();});
  dialog.addEventListener('click',function(event){if(event.target===dialog)dialog.close();});

  var reveal=document.querySelectorAll('.reveal');
  if('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches){
    var revealObserver=new IntersectionObserver(function(entries){entries.forEach(function(entry){if(entry.isIntersecting){entry.target.classList.add('visible');revealObserver.unobserve(entry.target);}});},{threshold:.08});
    reveal.forEach(function(item){revealObserver.observe(item);});
  }else{reveal.forEach(function(item){item.classList.add('visible');});}

  var sectionLinks=document.querySelectorAll('.navlinks a[href^="#"]');
  var sections=document.querySelectorAll('main section[id]');
  if('IntersectionObserver' in window){
    var navObserver=new IntersectionObserver(function(entries){entries.forEach(function(entry){if(entry.isIntersecting){sectionLinks.forEach(function(a){a.classList.toggle('active',a.getAttribute('href')==='#'+entry.target.id);});}});},{rootMargin:'-20% 0px -65% 0px'});
    sections.forEach(function(section){navObserver.observe(section);});
  }
})();
