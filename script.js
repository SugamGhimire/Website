document.addEventListener("DOMContentLoaded", function () {

/* ---------------- CONSTELLATION ---------------- */

const wrap   = document.getElementById('constellation');
const svg    = document.getElementById('constSvg');
const nodes  = wrap.querySelectorAll('.skill-node');
const card   = document.getElementById('skillInfoCard');

const COUNT  = nodes.length;
const CX = 350, CY = 350, R = 230;

const SKILLS = [
{
icon:'bx-layer',
title:'Full-Stack Development',
desc:'End-to-end web apps from database to UI, deployed to live hosting.',
bullets:[
'PHP + MySQL full web apps',
'Authentication systems',
'CRUD dashboards',
'Deployment to live hosting'
]
},
{
icon:'bxl-react',
title:'React Frontend',
desc:'Component-based UIs with reactive state and interactive dashboards.',
bullets:[
'Component-based UI',
'State management basics',
'Interactive dashboards'
]
},
{
icon:'bxl-php',
title:'PHP Backend',
desc:'Server-side logic, REST-style APIs, and secure session handling.',
bullets:[
'REST-style APIs',
'Authentication & sessions',
'Secure database queries'
]
},
{
icon:'bx-data',
title:'MySQL Databases',
desc:'Relational schema design and optimised queries for production apps.',
bullets:[
'Database schema design',
'Optimised queries',
'CRUD operations'
]
},
{
icon:'bx-rocket',
title:'Web Deployment',
desc:'Taking projects live with proper hosting, domains, and SSL.',
bullets:[
'GitHub Pages',
'cPanel hosting',
'Domain + SSL setup'
]
}
];

function layout(){
const orbitFrac = 230 / 700;

svg.querySelectorAll('.spoke, .spoke-particle').forEach(el=>el.remove());

nodes.forEach((node,i)=>{
const angle = (2*Math.PI*i/COUNT) - Math.PI/2;

node.style.left = (50 + Math.cos(angle)*orbitFrac*100) + '%';
node.style.top  = (50 + Math.sin(angle)*orbitFrac*100) + '%';

const sx = CX + Math.cos(angle)*R;
const sy = CY + Math.sin(angle)*R;

const line = document.createElementNS('http://www.w3.org/2000/svg','line');
line.setAttribute('x1',CX);
line.setAttribute('y1',CY);
line.setAttribute('x2',sx);
line.setAttribute('y2',sy);
line.setAttribute('class','spoke');
line.setAttribute('data-idx',i);
svg.appendChild(line);

const circle = document.createElementNS('http://www.w3.org/2000/svg','circle');
circle.setAttribute('class','spoke-particle');
circle.setAttribute('data-idx',i);
circle.setAttribute('r','3.5');
circle.setAttribute('fill','#00bcd4');
circle.setAttribute('opacity','0');
svg.appendChild(circle);

node.addEventListener('mouseenter',()=>{
const spoke = svg.querySelector(`.spoke[data-idx="${i}"]`);
const particle = svg.querySelector(`.spoke-particle[data-idx="${i}"]`);

if(spoke) spoke.classList.add('active');
if(particle){
particle.setAttribute('opacity','1');
particle.innerHTML='';
const anim = document.createElementNS('http://www.w3.org/2000/svg','animateMotion');
anim.setAttribute('dur','0.9s');
anim.setAttribute('repeatCount','indefinite');
anim.setAttribute('path',`M ${CX} ${CY} L ${sx} ${sy}`);
particle.appendChild(anim);
}
});

node.addEventListener('mouseleave',()=>{
const spoke = svg.querySelector(`.spoke[data-idx="${i}"]`);
const particle = svg.querySelector(`.spoke-particle[data-idx="${i}"]`);

if(spoke) spoke.classList.remove('active');
if(particle){
particle.setAttribute('opacity','0');
particle.innerHTML='';
}
});
});
}

function showCard(i){
const s = SKILLS[i];
card.querySelector('.sic-icon').className = `bx ${s.icon} sic-icon`;
card.querySelector('.sic-title').textContent = s.title;
card.querySelector('.sic-desc').textContent = s.desc;
card.querySelector('.sic-bullets').innerHTML = s.bullets.map(b=>`<li>${b}</li>`).join('');
card.classList.add('visible');
}

function hideCard(){
card.classList.remove('visible');
}

nodes.forEach((node,i)=>{
node.addEventListener('mouseenter',()=>showCard(i));
node.addEventListener('mouseleave',hideCard);
node.addEventListener('focus',()=>showCard(i));
node.addEventListener('blur',hideCard);
});

layout();
window.addEventListener('resize',layout);

/* ---------------- TYPEWRITER ---------------- */

const words = ['Dev','Coder','Creator','Fullstack'];
const el = document.getElementById('typewriter');

let wordIndex=0;
let charIndex=0;
let isDeleting=false;

function typeEffect(){
const currentWord = words[wordIndex];

if(!isDeleting && charIndex <= currentWord.length){
el.textContent = currentWord.substring(0,charIndex);
charIndex++;
}
else if(isDeleting && charIndex >= 0){
el.textContent = currentWord.substring(0,charIndex);
charIndex--;
}

if(!isDeleting && charIndex === currentWord.length + 1){
isDeleting=true;
setTimeout(typeEffect,1400);
return;
}

if(isDeleting && charIndex === 0){
isDeleting=false;
wordIndex=(wordIndex+1)%words.length;
setTimeout(typeEffect,300);
return;
}

setTimeout(typeEffect,isDeleting ? 60 : 100);
}

typeEffect();

/* ---------------- SCROLL REVEAL ---------------- */

const sections = document.querySelectorAll('.section');
const observer = new IntersectionObserver(entries=>{
entries.forEach(e=>{
if(e.isIntersecting){
e.target.classList.add('reveal');
} else {
e.target.classList.remove('reveal');
}
});
},{threshold:0.1});

sections.forEach(s=>observer.observe(s));

window.addEventListener('load',()=>{
sections.forEach(s=>{
if(s.getBoundingClientRect().top < window.innerHeight*0.8){
s.classList.add('reveal');
}
});
});

/* ---------------- BACK TO TOP ---------------- */

const backToTop = document.getElementById('backToTop');
window.addEventListener('scroll',()=>{
backToTop.classList.toggle('visible', window.scrollY > window.innerHeight*0.5);
});

});
