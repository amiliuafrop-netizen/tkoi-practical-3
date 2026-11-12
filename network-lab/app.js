'use strict';
/* NETWORK LAB START — beginner-friendly didactic models, not real network emulation. */
const LESSONS = [
 {id:'lan',emoji:'🔌',title:'З’єднання пристроїв',short:'Побудуй маленьку мережу',minutes:'5 хв',
  subtitle:'Дізнайся, для чого потрібні кабелі та комутатор.',
  facts:[['💻','Комп’ютер','Надсилає й отримує дані.'],['▤','Комутатор','Допомагає кільком комп’ютерам працювати в одній мережі.'],['🔗','Кабель Ethernet','Передає дані між мережевими портами.']],
  remember:'Щоб два ПК обмінювалися даними через комутатор, кожен має бути під’єднаний до нього відповідним кабелем.',
  extra:['Локальна мережа, або LAN, — мережа в межах дому, класу чи офісу.','У схемі «зірка» кожен комп’ютер підключений до центрального комутатора.','Оптичне волокно теж передає дані, але для нього потрібні сумісні оптичні інтерфейси або трансивери.'],
  term:['LAN','Local Area Network — локальна комп’ютерна мережа.'],
  instruction:'З’єднай обидва ПК із комутатором. Для кожного вибери правильний кабель.',
  hint:'Зверни увагу на слово Ethernet. Обидва комп’ютери мають звичайні Ethernet-порти, тому вибери «Кабель Ethernet» двічі.'},
 {id:'route',emoji:'🧭',title:'Маршрутизатор і шлюз',short:'Знайди шлях до іншої мережі',minutes:'6 хв',
  subtitle:'Зрозумій, як пристрої з різних мереж спілкуються.',
  facts:[['🏠','Своя мережа','Комп’ютери однієї підмережі можуть спілкуватися без маршрутизатора.'],['🧭','Маршрутизатор','Передає IP-пакети між різними мережами.'],['🚪','Шлюз','Це IP-адреса маршрутизатора у локальній підмережі.']],
  remember:'Шлюз комп’ютера має бути доступний у його локальній мережі.',
  extra:['Якщо комп’ютер має IP 192.168.10.10/24, його локальна підмережа — 192.168.10.0/24.','Інтерфейс маршрутизатора в цій підмережі має адресу 192.168.10.1.','На боці сервера використовується інша підмережа: 192.168.20.0/24.'],
  term:['Шлюз','Мережевий пристрій, через який пакет потрапляє в іншу мережу.'],
  instruction:'Обери правильний шлюз для комп’ютера й сервера. У них різні мережі.',
  hint:'PC має адресу 192.168.10.10, отже шлюз — 192.168.10.1. Сервер має адресу 192.168.20.10, отже його шлюз — 192.168.20.1.'},
 {id:'ip',emoji:'🔢',title:'IP-адреси без плутанини',short:'Налаштуй адресу для ПК',minutes:'5 хв',
  subtitle:'Навчися розуміти IP-адресу та просту підмережу.',
  facts:[['🏷️','IP-адреса','Це числова адреса пристрою в мережі.'],['👥','Одна підмережа','ПК у цій вправі мають бути в мережі 192.168.1.0/24.'],['⚠️','Адреси унікальні','Два ПК не повинні мати однакову IP-адресу.']],
  remember:'При масці /24 у цій вправі перші три числа IP-адреси однакові: 192.168.1.*, а останнє число пристроїв — різне.',
  extra:['IPv4 має чотири числа від 0 до 255, розділені крапками.','Маска /24 відповідає 255.255.255.0.','У цій підмережі .0 — адреса мережі, .255 — широкомовна адреса. Для ПК використовуємо інші адреси.'],
  term:['IPv4','Чотирибайтна адреса, наприклад 192.168.1.20.'],
  instruction:'Перший комп’ютер має адресу 192.168.1.10. Задай другому іншу правильну адресу з тієї ж мережі.',
  hint:'Спробуй адресу 192.168.1.20. Перші три числа збігаються, а останнє відрізняється від 10.'},
 {id:'osi',emoji:'📦',title:'Як подорожують дані',short:'Збери шлях повідомлення',minutes:'6 хв',
  subtitle:'Побач, як повідомлення проходить мережеві рівні.',
  facts:[['💬','HTTP','Прикладний протокол для взаємодії з вебсервісом.'],['🚚','TCP','Допомагає надійно передавати потік даних.'],['🗺️','IP + Ethernet','IP відповідає за адресацію, Ethernet — за локальні кадри.']],
  remember:'Перед передаванням дані «пакують»: HTTP → TCP → IP → Ethernet. Це спрощена схема інкапсуляції.',
  extra:['Модель OSI має сім рівнів, а TCP/IP описує стек Інтернету.','При надсиланні даних кожен нижчий рівень додає власну службову інформацію.','Коли дані надходять до отримувача, заголовки знімаються у зворотному порядку.'],
  term:['Інкапсуляція','Додавання заголовків протоколів під час передавання даних.'],
  instruction:'Розстав протоколи у правильному порядку: від повідомлення до передавання по кабелю.',
  hint:'Спочатку вебзапит HTTP, потім транспорт TCP, далі адресація IP, а останнім — кадр Ethernet.'},
 {id:'services',emoji:'🌐',title:'DNS, DHCP і NAT',short:'Увімкни потрібні служби',minutes:'6 хв',
  subtitle:'Три корисні служби, які є в багатьох мережах.',
  facts:[['📫','DHCP','Автоматично видає IP-адресу та інші параметри.'],['🔎','DNS','Допомагає знайти IP-адресу за доменним ім’ям.'],['🌍','NAT','Перетворює мережеві адреси, наприклад під час доступу до Інтернету.']],
  remember:'DHCP дає адресу, DNS знаходить адресу за назвою, NAT допомагає приватній мережі використовувати зовнішнє підключення.',
  extra:['Без DHCP довелося б вручну задавати IP-адреси багатьом пристроям.','DNS не «створює Інтернет», а надає інформацію про домени.','Для цього навчального сценарію домашній маршрутизатор має виконувати NAT під час виходу в Інтернет.'],
  term:['DNS','Domain Name System — система доменних імен.'],
  instruction:'У будинку потрібно автоматично отримувати IP, відкривати сайти за іменами та користуватися Інтернетом через приватну мережу. Увімкни потрібні служби.',
  hint:'У цьому сценарії потрібні всі три: DHCP, DNS і NAT. Увімкни кожен перемикач.'},
 {id:'fault',emoji:'🛠️',title:'Знайди несправність',short:'Полагодь мережу',minutes:'6 хв',
  subtitle:'Стань мережевим детективом та виправ дві помилки.',
  facts:[['🔌','Спочатку кабель','Перевір, чи з’єднання ввімкнене й справне.'],['🔢','Потім IP','Переконайся, що пристрої в потрібній підмережі.'],['🔁','Перевір ще раз','Після кожного виправлення повтори тест.']],
  remember:'Найзручніше виправляти помилки по одній: кабель → IP-адреса → повторна перевірка.',
  extra:['Вимкнений порт може виглядати як несправний кабель.','Навіть якщо всі кабелі працюють, неправильна IP-адреса завадить зв’язку.','У реальних мережах Ping можуть обмежувати правила безпеки, тому це не універсальний доказ доступності сервісу.'],
  term:['Діагностика','Пошук причини збою за симптомами та результатами перевірок.'],
  instruction:'Два ПК перестали обмінюватися даними. Увімкни кабель і виправ адресу другого ПК.',
  hint:'Спочатку постав галочку «Кабель підключено». Потім зміни 192.168.40.20 на 192.168.30.20.'},
 {id:'gpon',emoji:'💡',title:'Інтернет через оптоволокно',short:'Побудуй схему GPON',minutes:'7 хв',
  subtitle:'Познайомся з обладнанням провайдера та оптичною лінією.',
  facts:[['🏢','OLT','Обладнання провайдера, що керує оптичною мережею доступу.'],['🔀','Сплітер','Пасивно розподіляє оптичну потужність між напрямками.'],['🏡','ONT','Абонентський оптичний термінал удома або в офісі.']],
  remember:'Проста схема GPON: OLT → оптичний сплітер → ONT. Під час передавання по волокну частина оптичної потужності втрачається.',
  extra:['Оптичні втрати вимірюють у децибелах (дБ).','У цій вправі для навчання беремо 0,35 дБ/км, втрати на з’єднаннях 1 дБ і умовний резерв 3 дБ.','Це лише навчальний розрахунок, а не проєктний норматив: реальні параметри залежать від класу оптики, довжини хвилі, зварок, сплітерів і обладнання.'],
  term:['GPON','Gigabit-capable Passive Optical Network — пасивна оптична мережа доступу.'],
  instruction:'Розстав обладнання у правильному порядку та перевір, чи вистачить оптичного бюджету 28 дБ.',
  hint:'Після OLT має стояти сплітер, а у абонента — ONT. Якщо втрати надто великі, зменш довжину або вибери сплітер 1:8.'},
 {id:'5g',emoji:'📡',title:'Створи покриття 5G',short:'Постав дві базові станції',minutes:'6 хв',
  subtitle:'Спробуй покрити всі райони міста стільниковим зв’язком.',
  facts:[['📡','Базова станція','Забезпечує бездротовий зв’язок із пристроями.'],['🏙️','Покриття','Одна станція може обслуговувати кілька районів.'],['🧩','Планування','Важливо вибрати місця так, щоб не лишилося «білих плям».']],
  remember:'Розміщення базових станцій впливає на покриття. У вправі кожна станція покриває задані райони.',
  extra:['У реальному 5G-плануванні важливі частота, рельєф, перешкоди, щільність користувачів і потужність.','Ця спрощена модель перевіряє логіку вибору місць, а не розраховує реальну радіомережу.','5G використовує мережу радіодоступу (RAN) та ядро мережі.'],
  term:['5G','П’яте покоління мобільного зв’язку.'],
  instruction:'Обери рівно дві базові станції, щоб забезпечити покриття усіх шести районів.',
  hint:'Подивись, які райони обслуговують станції. Вдале поєднання: «Узбережжя» + «Парк».'}
];
const QUIZ=[
 {q:'Що робить комутатор у локальній мережі?',a:['Розподіляє електроенергію','З’єднує мережеві пристрої','Зберігає фотографії'],right:1,why:'Комутатор з’єднує пристрої в LAN і пересилає Ethernet-кадри.'},
 {q:'Який кабель вибрати для звичайного Ethernet-порту комп’ютера?',a:['Ethernet (вита пара)','Оптичне волокно без трансивера','Живлення 220 В'],right:0,why:'Для такого порту використовують сумісний мідний Ethernet-кабель.'},
 {q:'Навіщо потрібен маршрутизатор?',a:['Щоб передавати дані між різними мережами','Щоб тільки друкувати документи','Щоб замінити монітор'],right:0,why:'Маршрутизатор пересилає IP-пакети між мережами.'},
 {q:'Яка IP-адреса підходить для другого ПК у мережі 192.168.1.0/24, якщо перший має 192.168.1.10?',a:['192.168.2.20','192.168.1.20','192.168.1.10'],right:1,why:'Адреса має бути в підмережі 192.168.1.0/24 і не дублювати іншу.'},
 {q:'Що означає маска /24 у нашій простій вправі?',a:['Перші три числа визначають підмережу','Усього 24 комп’ютери','Швидкість 24 Мбіт/с'],right:0,why:'Для адрес 192.168.1.* маска /24 означає мережеву частину з перших 24 біт.'},
 {q:'Яка служба автоматично видає IP-адреси?',a:['DNS','NAT','DHCP'],right:2,why:'DHCP надає пристроям мережеві параметри автоматично.'},
 {q:'Що робить DNS?',a:['Знаходить IP-адреси за доменними іменами','З’єднує волокно','Підсилює Wi-Fi'],right:0,why:'DNS дозволяє дізнатися IP для домену, наприклад example.com.'},
 {q:'Що потрібно перевірити найперше, коли зник зв’язок?',a:['Колір фону браузера','Кабель і порт','Назву принтера'],right:1,why:'Починай із фізичного з’єднання: живлення, кабелі, порти.'},
 {q:'У якому порядку з’єднані елементи GPON?',a:['ONT → OLT → Wi-Fi','OLT → Сплітер → ONT','DNS → OLT → TCP'],right:1,why:'OLT у провайдера, сплітер розгалужує оптику, ONT у абонента.'},
 {q:'Для чого потрібні базові станції 5G?',a:['Щоб надавати бездротове покриття','Для заміни жорстких дисків','Для друку фотографій'],right:0,why:'Базові станції забезпечують радіодоступ пристроїв до мобільної мережі.'}
];
const START={lan:{pc1:'',pc2:''},route:{pc:'',server:''},ip:{ip:'192.168.2.20'},osi:{s1:'',s2:'',s3:'',s4:''},services:{dhcp:false,dns:false,nat:false},fault:{cable:false,ip:'192.168.40.20'},gpon:{middle:'',end:'',distance:22,ratio:'32'},'5g':{sites:[]}};
const SITE_COVER={a:[0,1,2],b:[0,3,4],c:[3,4],d:[1,2,5]};
const SITE_NAMES={a:'Центр',b:'Узбережжя',c:'Порт',d:'Парк'};
const DISTRICTS=['Центр','Вокзал','Університет','Набережна','Порт','Парк'];
const STORAGE='network-lab-start-v1';
const $=(selector,scope=document)=>scope.querySelector(selector);
const esc=(v)=>String(v).replace(/[&<>"']/g,s=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[s]));
const clone=(v)=>JSON.parse(JSON.stringify(v));
function load(){try{const v=JSON.parse(localStorage.getItem(STORAGE)||'{}');return v&&typeof v==='object'?v:{}}catch{return {}}}
const saved=load();
const state={current:LESSONS.some(l=>l.id===saved.current)?saved.current:'lan',answers:clone(START),completed:saved.completed&&typeof saved.completed==='object'?saved.completed:{},quizAnswers:saved.quizAnswers&&typeof saved.quizAnswers==='object'?saved.quizAnswers:{},quizResult:saved.quizResult&&typeof saved.quizResult==='object'?saved.quizResult:null,quizOpen:false,quizIndex:0,studentName:typeof saved.studentName==='string'?saved.studentName:'',studentGroup:typeof saved.studentGroup==='string'?saved.studentGroup:''};
if(saved.answers&&typeof saved.answers==='object'){for(const id of Object.keys(START)){if(saved.answers[id]&&typeof saved.answers[id]==='object'){state.answers[id]={...state.answers[id],...saved.answers[id]}}}}
function save(){try{localStorage.setItem(STORAGE,JSON.stringify({current:state.current,answers:state.answers,completed:state.completed,quizAnswers:state.quizAnswers,quizResult:state.quizResult,studentName:state.studentName,studentGroup:state.studentGroup}))}catch{}}
function moveTo(id){state.current=id;save();renderLesson();$('#study').scrollIntoView({behavior:'smooth',block:'start'})}
function lesson(){return LESSONS.find(l=>l.id===state.current)||LESSONS[0]}
function completedCount(){return LESSONS.filter(l=>state.completed[l.id]).length}
function renderGrid(){const n=completedCount();$('#progressCount').textContent=`${n} / 8`;$('#progressBar').style.width=`${n/8*100}%`;$('#lessonGrid').innerHTML=LESSONS.map((l,i)=>`<button class="lesson-tile ${state.current===l.id?'active':''} ${state.completed[l.id]?'done':''}" data-lesson="${l.id}" aria-current="${state.current===l.id?'step':'false'}"><div class="tile-top"><span class="tile-icon">${l.emoji}</span><span class="tile-number">УРОК ${String(i+1).padStart(2,'0')}</span></div><strong>${esc(l.title)}</strong><small>${esc(l.short)}</small></button>`).join('')}
function renderLesson(){const l=lesson(),idx=LESSONS.indexOf(l);renderGrid();$('#lessonKicker').textContent=`УРОК ${String(idx+1).padStart(2,'0')} · ${l.minutes} · ДЛЯ ПОЧАТКІВЦІВ`;$('#lessonTitle').textContent=l.title;$('#lessonSubtitle').textContent=l.subtitle;$('#learnFacts').innerHTML=l.facts.map(([emoji,title,desc])=>`<div class="fact"><span class="fact-icon">${emoji}</span><b>${esc(title)}</b><p>${esc(desc)}</p></div>`).join('');$('#rememberText').textContent=l.remember;$('#extraTheory').innerHTML=l.extra.map(t=>`<p>• ${esc(t)}</p>`).join('');$('#wordTitle').textContent=l.term[0];$('#wordBody').textContent=l.term[1];$('#practiceTitle').textContent=l.title;$('#practiceIntro').textContent=l.instruction;$('#prevLesson').disabled=idx===0;$('#nextLesson').textContent=idx===LESSONS.length-1?'До підсумкового тесту →':'Наступний урок →';$('.more-details').open=false;renderPractice();clearFeedback()}
const option=(value,label,current)=>`<option value="${esc(value)}" ${current===value?'selected':''}>${esc(label)}</option>`;
function selectHTML(id,label,options,current,help=''){return `<div class="input-card"><label for="field-${id}">${esc(label)}</label><select id="field-${id}" data-field="${id}">${options.map(x=>option(x[0],x[1],current)).join('')}</select>${help?`<p>${esc(help)}</p>`:''}</div>`}
function inputHTML(id,label,value,help=''){return `<div class="input-card"><label for="field-${id}">${esc(label)}</label><input id="field-${id}" data-field="${id}" value="${esc(value)}" autocomplete="off" spellcheck="false">${help?`<p>${esc(help)}</p>`:''}</div>`}
function node(icon,title,sub='',type=''){return `<div class="net-node ${type}"><span class="emoji">${icon}</span><b>${esc(title)}</b>${sub?`<small>${esc(sub)}</small>`:''}</div>`}
const link=(ok)=>`<div class="net-link ${ok?'on':''}"></div>`;
function renderPractice(){const id=state.current,v=state.answers[id];let html='';if(id==='lan'){
 const choices=[['','Немає кабелю'],['ethernet','Кабель Ethernet'],['fiber','Оптичний кабель']];
 html=`<div class="flow-caption">Мета: ПК 1 → Комутатор → ПК 2</div><div class="network-diagram">${node('💻','ПК 1')} ${link(v.pc1==='ethernet')} ${node('▤','SW-1','','switch')} ${link(v.pc2==='ethernet')} ${node('💻','ПК 2')}</div><div class="input-cards">${selectHTML('pc1','З’єднання ПК 1 → SW-1',choices,v.pc1)}${selectHTML('pc2','З’єднання ПК 2 → SW-1',choices,v.pc2)}</div><p class="mini-note">✓ Зелена лінія з’явиться, коли вибереш сумісний кабель.</p>`;
}else if(id==='route'){
 const pcopt=[['','Обери шлюз'],['192.168.20.1','192.168.20.1'],['192.168.10.1','192.168.10.1'],['8.8.8.8','8.8.8.8']];const srvopt=[['','Обери шлюз'],['192.168.10.1','192.168.10.1'],['192.168.20.1','192.168.20.1'],['8.8.8.8','8.8.8.8']];
 html=`<div class="network-diagram">${node('💻','PC','192.168.10.10')} ${link(true)} ${node('🧭','Router','10.1 / 20.1','router')} ${link(true)} ${node('🖥️','Сервер','192.168.20.10')}</div><div class="input-cards">${selectHTML('pc','Шлюз комп’ютера',pcopt,v.pc,'Комп’ютер у мережі 192.168.10.*')}${selectHTML('server','Шлюз сервера',srvopt,v.server,'Сервер у мережі 192.168.20.*')}</div>`;
}else if(id==='ip'){
 html=`<div class="network-diagram">${node('💻','ПК 1','192.168.1.10')} ${link(true)} ${node('▤','SW-1','','switch')} ${link(true)} ${node('💻','ПК 2',v.ip)}</div><div class="input-cards"><div class="input-card"><label>Маска підмережі</label><b>/24 = 255.255.255.0</b><p>Однакова для двох ПК</p></div>${inputHTML('ip','IP-адреса другого ПК',v.ip,'Підказка: 192.168.1.*')}</div>`;
}else if(id==='osi'){
 const opts=[['','Оберіть протокол'],['HTTP','HTTP'],['TCP','TCP'],['IP','IP'],['Ethernet','Ethernet']];
 html=`<div class="flow-caption">Як «упакувати» вебповідомлення для надсилання?</div><div class="stages">${[1,2,3,4].map(i=>`<div class="stage-card"><strong>Крок ${i}</strong><select data-field="s${i}" aria-label="Протокол на кроці ${i}">${opts.map(x=>option(x[0],x[1],v['s'+i])).join('')}</select></div>${i<4?'<span class="stage-arrow">→</span>':''}`).join('')}</div><p class="stage-help">📦 Це вправа про порядок інкапсуляції, а не про всі сім рівнів OSI.</p>`;
}else if(id==='services'){
 html=`<div class="flow-caption">Усі потрібні функції зараз вимкнені</div>${[['dhcp','📫 DHCP','Видає IP-адресу автоматично'],['dns','🔎 DNS','Допомагає відкривати сайти за іменем'],['nat','🌍 NAT','Дозволяє домашній мережі використовувати спільне зовнішнє підключення']].map(([k,t,desc])=>`<label class="toggle-row"><span><b>${t}</b><small>${desc}</small></span><input type="checkbox" data-field="${k}" ${v[k]?'checked':''}></label>`).join('')}<p class="mini-note">У цій моделі всі три функції потрібні для сценарію домашнього доступу до Інтернету.</p>`;
}else if(id==='fault'){
 html=`<div class="flow-caption">Знайди дві помилки на схемі</div><div class="network-diagram">${node('💻','ПК 1','192.168.30.10')} ${link(true)} ${node('▤','SW-1','','switch')} <div class="net-link ${v.cable?'on':'error'}"></div> ${node('💻','ПК 2',v.ip)}</div><label class="toggle-row"><span><b>🔌 Кабель до ПК 2 підключено</b><small>${v.cable?'З’єднання активне':'З’єднання зараз вимкнене'}</small></span><input type="checkbox" data-field="cable" ${v.cable?'checked':''}></label><div class="input-cards">${inputHTML('ip','IP-адреса ПК 2',v.ip,'ПК 1 уже має 192.168.30.10/24')}</div>`;
}else if(id==='gpon'){
 const choices=[['','Обери пристрій'],['splitter','Сплітер'],['ont','ONT'],['olt','OLT']];const end=[['','Обери пристрій'],['ont','ONT'],['splitter','Сплітер'],['olt','OLT']];let loss=gponLoss(v);
 html=`<div class="network-diagram">${node('🏢','OLT','Провайдер')} ${link(v.middle==='splitter')} ${node('🔀',v.middle==='splitter'?'Сплітер':v.middle==='ont'?'ONT':'?',null,'switch')} ${link(v.end==='ont')} ${node('🏠',v.end==='ont'?'ONT':v.end==='splitter'?'Сплітер':'?','Абонент')}</div><div class="input-cards">${selectHTML('middle','Пристрій після OLT',choices,v.middle)}${selectHTML('end','Пристрій у абонента',end,v.end)}${selectHTML('ratio','Сплітер для кількості абонентів',[['32','1:32 — більше розгалужень'],['8','1:8 — менше розгалужень']],v.ratio)}<div class="input-card"><label for="field-distance">Довжина оптичного кабелю — <span id="distanceVal">${v.distance}</span> км</label><input type="range" id="field-distance" data-field="distance" min="1" max="30" step="1" value="${v.distance}"><p>Порівняй втрати та бюджет</p></div></div><div class="meter-box"><div class="meter-top"><span>Загальні навчальні втрати + резерв</span><span id="lossText">${loss.toFixed(1)} із 28 дБ</span></div><div class="meter"><span id="lossMeter" style="width:${Math.min(100,loss/28*100)}%;background:${loss>28?'#de8f7c':''}"></span></div><div class="meter-foot">Довжина × 0,35 + сплітер (${v.ratio==='8'?'10,5':'17'} дБ) + з’єднання 1 дБ + резерв 3 дБ. Спрощена модель.</div></div>`;
}else if(id==='5g'){
 const covered=new Set(v.sites.flatMap(x=>SITE_COVER[x]||[]));
 html=`<div class="flow-caption">Місто з шести районів · обери максимум дві станції</div><div class="coverage-grid">${DISTRICTS.map((d,i)=>`<div class="coverage-tile ${covered.has(i)?'covered':''}">${covered.has(i)?'✓ ':'◌ '}${esc(d)}</div>`).join('')}</div><div class="meter-box"><div class="meter-top"><span>Покрито районів</span><span>${covered.size} / 6</span></div><div class="meter"><span style="width:${covered.size/6*100}%"></span></div></div><div class="flow-caption" style="margin-top:18px">Обери місця для двох станцій:</div><div class="site-grid">${Object.keys(SITE_COVER).map(k=>`<button type="button" class="site-btn ${v.sites.includes(k)?'selected':''}" data-site="${k}" aria-pressed="${v.sites.includes(k)}">📡 ${esc(SITE_NAMES[k])} ${v.sites.includes(k)?'✓':''}<small>${SITE_COVER[k].map(n=>DISTRICTS[n]).join(', ')}</small></button>`).join('')}</div>`;
}$('#practiceRoot').innerHTML=html;}
function gponLoss(v){return Number(v.distance)*.35+(String(v.ratio)==='8'?10.5:17)+1+3}
function readInput(target){const id=target.dataset.field;if(!id)return;const v=state.answers[state.current];if(!Object.prototype.hasOwnProperty.call(v,id))return;v[id]=target.type==='checkbox'?target.checked:target.type==='range'?Number(target.value):target.value;save();clearFeedback();if(state.current==='gpon'&&id==='distance'){$('#distanceVal').textContent=v.distance;$('#lossText').textContent=`${gponLoss(v).toFixed(1)} із 28 дБ`;$('#lossMeter').style.width=`${Math.min(100,gponLoss(v)/28*100)}%`;$('#lossMeter').style.background=gponLoss(v)>28?'#de8f7c':''} else if(state.current==='lan'||state.current==='gpon'||(state.current==='fault'&&target.type==='checkbox')){renderPractice()}}
function validateIP(x){if(!/^\d{1,3}(\.\d{1,3}){3}$/.test(x))return null;const p=x.split('.').map(Number);if(p.some(n=>n>255||n<0))return null;return p}
function check(){const id=state.current,v=state.answers[id];let err=null;let good='Чудово! Ти правильно виконав завдання.';
 if(id==='lan'){for(const field of ['pc1','pc2']){if(v[field]==='') {err=[`Немає з’єднання з ${field==='pc1'?'ПК 1':'ПК 2'}.`,'Обери кабель Ethernet у відповідному списку.'];break}if(v[field]==='fiber'){err=['Невідповідний кабель.','У цій вправі комп’ютери мають звичайні мідні Ethernet-порти. Вибери «Кабель Ethernet».'];break}}good='Обидва комп’ютери під’єднані до комутатора правильними кабелями.'}
 if(id==='route'){if(!v.pc)err=['Не вибрано шлюз комп’ютера.','PC належить до мережі 192.168.10.*, його шлюз — 192.168.10.1.'];else if(v.pc!=='192.168.10.1')err=['Неправильний шлюз комп’ютера.','Шлюз має бути в локальній підмережі PC: вибери 192.168.10.1.'];else if(!v.server)err=['Не вибрано шлюз сервера.','Сервер знаходиться в мережі 192.168.20.*, вибери 192.168.20.1.'];else if(v.server!=='192.168.20.1')err=['Неправильний шлюз сервера.','Серверу потрібен шлюз 192.168.20.1, а не адреса з іншої підмережі.'];good='Маршрутизатор зможе передавати пакети між двома навчальними підмережами.'}
 if(id==='ip'){const p=validateIP(v.ip.trim());if(!p)err=['Адреса IPv4 записана неправильно.','Введи чотири числа від 0 до 255 через крапку, наприклад 192.168.1.20.'];else if(p.slice(0,3).join('.')!=='192.168.1')err=['Другий ПК опинився в іншій підмережі.','При масці /24 перші три числа мають бути 192.168.1.'];else if(p[3]===10)err=['Конфлікт IP-адрес.','ПК 1 вже використовує 192.168.1.10. Зміни останнє число, наприклад на 20.'];else if(p[3]===0||p[3]===255)err=['Ця адреса не підходить для ПК.','У мережі 192.168.1.0/24 адреса .0 позначає мережу, а .255 — широкомовну адресу. Обери число 1–254, крім 10.'];good=`Готово! ПК 1 та ПК 2 (${v.ip}) мають різні адреси в одній підмережі.`}
 if(id==='osi'){const expected=['HTTP','TCP','IP','Ethernet'];for(let i=0;i<4;i++){if(v['s'+(i+1)]!==expected[i]){err=[`На кроці ${i+1} неправильний протокол.`,`На цьому кроці має бути ${expected[i]}. Порядок інкапсуляції: HTTP → TCP → IP → Ethernet.`];break}}good='Правильно! Ти відтворив спрощений порядок інкапсуляції вебзапиту.'}
 if(id==='services'){for(const [k,title] of [['dhcp','DHCP'],['dns','DNS'],['nat','NAT']]){if(!v[k]){err=[`Службу ${title} вимкнено.`,{dhcp:'Щоб комп’ютер отримав IP автоматично, увімкни DHCP.',dns:'Щоб відкрити сайт за доменним ім’ям, увімкни DNS.',nat:'Для нашого сценарію доступу приватної мережі до Інтернету ввімкни NAT.'}[k]];break}}good='Усі потрібні сервіси домашньої мережі увімкнені.'}
 if(id==='fault'){const p=validateIP(v.ip.trim());if(!v.cable)err=['З’єднання з ПК 2 вимкнене.','Спочатку постав галочку «Кабель до ПК 2 підключено», потім перевір IP.'];else if(!p)err=['IP-адреса другого ПК записана неправильно.','Введи правильну IPv4-адресу, наприклад 192.168.30.20.'];else if(p.slice(0,3).join('.')!=='192.168.30')err=['ПК 2 у неправильній підмережі.','ПК 1 має 192.168.30.10/24. Зміни адресу другого ПК на 192.168.30.20.'];else if(p[3]===10||p[3]===0||p[3]===255)err=['Недопустима або вже зайнята адреса.','Для ПК 2 візьми адресу 192.168.30.20.'];good='Полагоджено! Кабель працює, а обидва ПК мають коректні IP-адреси.'}
 if(id==='gpon'){let loss=gponLoss(v);if(v.middle!=='splitter')err=['Неправильний пристрій після OLT.','Після OLT у нашій навчальній схемі має бути оптичний сплітер.'];else if(v.end!=='ont')err=['Неправильний пристрій у абонента.','В кінці оптичної лінії в оселі встановлюють ONT.'];else if(loss>28)err=['Перевищено навчальний оптичний бюджет.','Спробуй коротший кабель або сплітер 1:8. Потрібно вміститися у 28 дБ, включно з резервом.'];good=`Схема GPON складена правильно. Умовні втрати з резервом: ${loss.toFixed(1)} дБ (ліміт 28 дБ).`}
 if(id==='5g'){const covered=new Set(v.sites.flatMap(x=>SITE_COVER[x]||[]));if(v.sites.length<2)err=['Потрібно вибрати дві станції.',`Обрано ${v.sites.length} з 2. Натисни ще одну станцію на схемі.`];else if(covered.size<6)err=[`Покрито лише ${covered.size} з 6 районів.`,`Без покриття: ${DISTRICTS.filter((_,i)=>!covered.has(i)).join(', ')}. Заміни одну станцію, щоб покрити ці райони.`];good='Відмінно! Дві базові станції покривають усі шість навчальних районів.'}
 if(err){showFeedback('error',`Є що виправити: ${err[0]}`,err[1])}else{state.completed[id]=true;save();renderGrid();showFeedback('success','✓ Завдання виконано!',good+' Тепер можна переходити до наступного уроку.')}
}
function showFeedback(type,title,desc){const el=$('#feedback');el.className='feedback '+type;el.innerHTML=`<span class="feedback-icon">${type==='success'?'🎉':type==='info'?'💡':'🔧'}</span><div><strong>${esc(title)}</strong><p>${esc(desc)}</p></div>`;el.scrollIntoView({behavior:'smooth',block:'nearest'})}
function clearFeedback(){const e=$('#feedback');e.className='feedback is-hidden';e.textContent=''}
function renderQuiz(){
 const root=$('#quizRoot');
 if(state.quizResult){
   const r=state.quizResult;
   const missed=QUIZ.map((q,i)=>({q,i})).filter(({q,i})=>state.quizAnswers[i]!==q.right);
   root.innerHTML=`<div class="quiz-result"><strong>${r.correct===10?'🎉 Бездоганно!':'🌱 Ти молодець, що спробував!'} ${r.grade} / 12 балів</strong><p>Правильних відповідей: ${r.correct} із ${r.total}. ${missed.length?'Прочитай ці пояснення та спробуй ще раз:':'Усі відповіді правильні!'}</p>${missed.map(({q,i})=>`<div class="quiz-review"><b>${i+1}. ${esc(q.q)}</b><p>✓ ${esc(q.a[q.right])}. ${esc(q.why)}</p></div>`).join('')}<div style="display:flex;gap:10px;flex-wrap:wrap;margin-top:16px"><button id="retryQuiz" class="subtle-btn">↻ Повторити тест</button><button id="reportAfterQuiz" class="primary-btn">↗ Мій звіт</button></div></div>`;
   return;
 }
 if(!state.quizOpen){
   root.innerHTML=`<div class="quiz-start"><div class="quiz-start-icon">✏️</div><div><h3>Перевір, що запам’ятав</h3><p>Питання показуватимуться по одному. Після завершення побачиш пояснення та оцінку.</p><button id="startQuiz" class="primary-btn">Почати тест →</button></div></div>`;
   return;
 }
 const i=state.quizIndex,q=QUIZ[i];
 root.innerHTML=`<div class="quiz-wizard-head"><span>Запитання <b>${i+1}</b> із ${QUIZ.length}</span><span>Відповіді: ${Object.keys(state.quizAnswers).length} / ${QUIZ.length}</span></div><div class="progress-rail quiz-progress"><span style="width:${(i+1)/QUIZ.length*100}%"></span></div><div class="quiz-one-question"><h3>${i+1}. ${esc(q.q)}</h3><div class="quiz-options">${q.a.map((a,k)=>`<label><input type="radio" name="quiz${i}" value="${k}" ${state.quizAnswers[i]===k?'checked':''}>${esc(a)}</label>`).join('')}</div></div><div class="quiz-wizard-controls"><button id="quizPrev" class="subtle-btn" ${i===0?'disabled':''}>← Назад</button><button id="${i===QUIZ.length-1?'submitQuiz':'quizNext'}" class="primary-btn">${i===QUIZ.length-1?'Завершити тест ✓':'Наступне запитання →'}</button></div><div id="quizFeedback" aria-live="polite"></div>`;
}
function scoreQuiz(){const n=Object.keys(state.quizAnswers).length;
 if(n<QUIZ.length){$('#quizFeedback').innerHTML=`<div class="feedback error"><span class="feedback-icon">✍️</span><div><strong>Залишилися запитання без відповіді</strong><p>Ти відповів на ${n} з ${QUIZ.length}. Повернись до пропущених, використовуючи кнопку «Назад».</p></div></div>`;return}
 const correct=QUIZ.reduce((sum,q,i)=>sum+(state.quizAnswers[i]===q.right?1:0),0);
 state.quizResult={correct,total:QUIZ.length,grade:Math.round(correct/QUIZ.length*12)};state.quizOpen=false;save();renderQuiz();$('#quizSection').scrollIntoView({behavior:'smooth'});
}
function reportPreview(){let rows=LESSONS.map((l,i)=>`<li>${esc(l.title)} — ${state.completed[l.id]?'✅ виконано':'○ ще не виконано'}</li>`).join('');$('#reportPreview').innerHTML=`<b>Практичних уроків завершено: ${completedCount()} з 8</b><ul>${rows}</ul><b>Підсумковий тест:</b> ${state.quizResult?`${state.quizResult.grade} / 12 балів (${state.quizResult.correct} з ${state.quizResult.total})`:'ще не пройдено'}`}
function openReport(){reportPreview();$('#studentName').value=state.studentName;$('#studentGroup').value=state.studentGroup;const dlg=$('#reportDialog');if(dlg.showModal)dlg.showModal();else dlg.setAttribute('open','')}
function printReport(){state.studentName=$('#studentName').value.trim();state.studentGroup=$('#studentGroup').value.trim();save();const date=new Date().toLocaleDateString('uk-UA');$('#printSheet').innerHTML=`<div class="print-header">Дисципліна: «Вступ до спеціальності» · NETWORK LAB START</div><h1>Звіт про проходження навчальної лабораторії</h1><p><b>Студент:</b> ${esc(state.studentName||'Не вказано')}<br><b>Група:</b> ${esc(state.studentGroup||'Не вказано')}<br><b>Дата:</b> ${esc(date)}</p><h2>Практичні завдання</h2><table><thead><tr><th>№</th><th>Тема</th><th>Результат</th></tr></thead><tbody>${LESSONS.map((l,i)=>`<tr><td>${i+1}</td><td>${esc(l.title)}</td><td>${state.completed[l.id]?'Виконано':'Не виконано'}</td></tr>`).join('')}</tbody></table><h2>Підсумок</h2><p>Виконано практичних робіт: <b>${completedCount()} з 8</b>.</p><p>Результат тесту: <b>${state.quizResult?`${state.quizResult.correct}/${state.quizResult.total} правильних, ${state.quizResult.grade}/12 балів`:'не проходив'}</b>.</p><p class="print-note">Примітка: навчальний тренажер використовує спрощені симуляції. Результат збережено локально у браузері; для офіційного оцінювання викладач перевіряє правильність виконання та звіт.</p>`;window.print()}
function setup(){renderLesson();renderQuiz();$('#lessonGrid').addEventListener('click',e=>{const el=e.target.closest('[data-lesson]');if(el)moveTo(el.dataset.lesson)});$('#heroStart').addEventListener('click',()=>moveTo('lan'));$('#prevLesson').addEventListener('click',()=>{const idx=LESSONS.findIndex(l=>l.id===state.current);if(idx>0)moveTo(LESSONS[idx-1].id)});$('#nextLesson').addEventListener('click',()=>{const idx=LESSONS.findIndex(l=>l.id===state.current);if(idx<LESSONS.length-1)moveTo(LESSONS[idx+1].id);else $('#quizSection').scrollIntoView({behavior:'smooth'})});$('#practiceRoot').addEventListener('change',e=>{if(e.target.dataset.field)readInput(e.target)});$('#practiceRoot').addEventListener('input',e=>{if(e.target.dataset.field&&(e.target.type==='range'||e.target.type==='text'))readInput(e.target)});$('#practiceRoot').addEventListener('click',e=>{const b=e.target.closest('[data-site]');if(!b)return;const id=b.dataset.site,v=state.answers['5g'];if(!v.sites.includes(id)&&v.sites.length>=2){showFeedback('info','Можна вибрати лише дві станції.','Спочатку натисни вже вибрану станцію, щоб прибрати її, а потім обери нову.');return}v.sites=v.sites.includes(id)?v.sites.filter(x=>x!==id):[...v.sites,id];save();renderPractice();clearFeedback()});$('#hintButton').addEventListener('click',()=>showFeedback('info','Підказка для тебе',lesson().hint));$('#checkButton').addEventListener('click',check);$('#jumpQuiz').addEventListener('click',()=>$('#quizSection').scrollIntoView({behavior:'smooth'}));$('#quizRoot').addEventListener('change',e=>{if(e.target.matches('input[type=radio]')){const i=Number(e.target.name.slice(4));state.quizAnswers[i]=Number(e.target.value);save();const fb=$('#quizFeedback');if(fb)fb.innerHTML=''}});
 $('#quizRoot').addEventListener('click',e=>{
  if(e.target.closest('#startQuiz')){state.quizOpen=true;state.quizIndex=0;renderQuiz()}
  if(e.target.closest('#quizPrev')){state.quizIndex=Math.max(0,state.quizIndex-1);renderQuiz()}
  if(e.target.closest('#quizNext')){if(state.quizAnswers[state.quizIndex]===undefined){$('#quizFeedback').innerHTML='<div class="feedback info"><span class="feedback-icon">💡</span><div><strong>Обери одну відповідь</strong><p>Познач варіант і натисни «Наступне запитання».</p></div></div>';return}state.quizIndex=Math.min(QUIZ.length-1,state.quizIndex+1);renderQuiz()}
  if(e.target.closest('#submitQuiz'))scoreQuiz();
  if(e.target.closest('#retryQuiz')){state.quizAnswers={};state.quizResult=null;state.quizOpen=true;state.quizIndex=0;save();renderQuiz()}
  if(e.target.closest('#reportAfterQuiz'))openReport()
 });
 $('#reportButton').addEventListener('click',openReport);$('#studentName').addEventListener('input',e=>{state.studentName=e.target.value;save()});$('#studentGroup').addEventListener('input',e=>{state.studentGroup=e.target.value;save()});$('#printReport').addEventListener('click',printReport)}
setup();