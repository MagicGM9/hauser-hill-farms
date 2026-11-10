const farm={produce:[{name:'Apples',type:'fruit',photo:'IMG_3119.jpeg',description:''},{name:'Tomatoes',type:'vegetable',photo:'IMG_3128.jpeg',description:''},{name:'Raspberries',type:'fruit',photo:'IMG_3130.jpeg',description:''},{name:'Cauliflower',type:'vegetable',photo:'IMG_3120.jpeg',description:''},{name:'Fall at the stand',type:'seasonal',photo:'IMG_3102.jpeg',description:'Pumpkins & autumn favorites.'},{name:'Seasonal flowers',type:'seasonal',photo:'IMG_6885.jpeg',description:'Ask about seasonal selections.'},{name:'Peaches',type:'fruit',photo:'IMG_2527.jpeg',description:''},{name:'Cherries',type:'fruit',photo:'IMG_0560.jpeg',description:''},{name:'Strawberries',type:'fruit',photo:'IMG_8328.jpeg',description:''},{name:'Radishes',type:'vegetable',photo:'IMG_0141.jpeg',description:''},{name:'Beans & greens',type:'vegetable',photo:'IMG_2584.jpeg',description:''},{name:'Pumpkins & gourds',type:'seasonal',photo:'IMG_0014.jpeg',description:''}]};
const grid=document.querySelector('#produce');function render(filter='all'){grid.innerHTML=farm.produce.filter(p=>filter==='all'||p.type===filter).map((p,i)=>`<article class="produce-card" style="--card-order:${i}"><div class="crop"><img loading="lazy" decoding="async" width="480" height="480" src="assets/responsive/${p.photo.replace(/\.jpeg$/,'')}-480.webp" srcset="assets/responsive/${p.photo.replace(/\.jpeg$/,'')}-480.webp 480w, assets/responsive/${p.photo.replace(/\.jpeg$/,'')}-960.webp 960w" sizes="(max-width:700px) 45vw, (max-width:1000px) 22vw, 15vw" alt="${p.name} photographed at Hauser Hill Farms"></div><h3>${p.name}</h3><p>${p.description}</p></article>`).join('')};render();document.querySelectorAll('[data-filter]').forEach(b=>b.addEventListener('click',()=>{document.querySelectorAll('[data-filter]').forEach(x=>x.setAttribute('aria-pressed',String(x===b)));render(b.dataset.filter)}));

const storyButton=document.querySelector('.story-toggle');storyButton.addEventListener('click',()=>{const open=storyButton.getAttribute('aria-expanded')!=='true';storyButton.setAttribute('aria-expanded',String(open));document.querySelector('#family-history').hidden=!open;storyButton.innerHTML=(open?'Close family story':'Read our family’s story')+' <span aria-hidden="true">'+(open?'−':'＋')+'</span>';});

// Helpful, bounded idle cues; scrolling clears them immediately.
const heroSequence=document.querySelector('.harvest-sequence'),scrollCue=document.querySelector('.scroll-invitation');
const motionPreference=matchMedia('(prefers-reduced-motion: reduce)');let idleTimer,lastScroll=scrollY;
function heroActive(){const r=heroSequence.getBoundingClientRect();return r.top<innerHeight*.5&&r.bottom>innerHeight;}
function resetScrollCue(){clearTimeout(idleTimer);heroSequence.dataset.idle='0';scrollCue.innerHTML=(matchMedia('(pointer:coarse)').matches?'Swipe up to explore':'Scroll to explore')+' <span aria-hidden="true">↓</span>';if(!heroActive()||motionPreference.matches)return;idleTimer=setTimeout(()=>{heroSequence.dataset.idle='1';scrollCue.innerHTML='Scroll down to explore <span aria-hidden="true">↓</span>';idleTimer=setTimeout(()=>{if(!heroActive())return;heroSequence.dataset.idle='2';scrollCue.innerHTML='Scroll down or tap here <span aria-hidden="true">↓</span>';},4000);},3000);}
addEventListener('scroll',()=>{if(Math.abs(scrollY-lastScroll)>2){lastScroll=scrollY;resetScrollCue();}},{passive:true});
scrollCue.addEventListener('click',()=>{const r=heroSequence.getBoundingClientRect();const stage=heroSequence.querySelector('.basket-hero');const end=scrollY+r.bottom-stage.offsetHeight-parseFloat(getComputedStyle(stage).top);const step=innerWidth<=700?Math.max(160,innerHeight*.3):innerHeight*.65;scrollTo({top:Math.min(scrollY+step,end+40),behavior:motionPreference.matches?'instant':'smooth'});});
motionPreference.addEventListener('change',resetScrollCue);resetScrollCue();
document.querySelectorAll('a[href="#main"]').forEach(link=>link.addEventListener('click',event=>{event.preventDefault();scrollTo({top:0,behavior:motionPreference.matches?'instant':'smooth'});}));

// Reflect the section in view without changing navigation or scrolling focus.
const sectionLinks=[...document.querySelectorAll('.farm-header nav a[href^="#"]')];
const sectionObserver=new IntersectionObserver(entries=>{
 const visible=entries.filter(entry=>entry.isIntersecting);
 if(!visible.length)return;
 const id=visible[0].target.id;
 sectionLinks.forEach(link=>{
  if(link.hash==='#'+id)link.setAttribute('aria-current','location');
  else link.removeAttribute('aria-current');
 });
},{rootMargin:'-25% 0px -55% 0px',threshold:0});
['main','visit','harvest','story'].forEach(id=>{const section=document.getElementById(id);if(section)sectionObserver.observe(section)});
