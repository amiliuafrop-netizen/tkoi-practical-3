'use strict';
/* Pure навчальна логіка для самоперевірки. Це НЕ емулятор реального TCP/IP-стеку. */
(function(root){
 const TYPES = {
  pc:{media:['ethernet'],ports:1,host:true},laptop:{media:['ethernet','wireless'],ports:2,host:true},switch:{media:['ethernet'],ports:8},router:{media:['ethernet'],ports:4},server:{media:['ethernet'],ports:2,host:true},ap:{media:['ethernet','wireless'],ports:12},olt:{media:['fiber'],ports:2},splitter:{media:['fiber'],ports:3},ont:{media:['fiber','ethernet'],ports:2}
 };
 const isIP = ip => { if(typeof ip!=='string'||!/^(?:\d{1,3}\.){3}\d{1,3}$/.test(ip)) return false; return ip.split('.').every(v=>+v>=0&&+v<=255);};
 const ipNum = ip => ip.split('.').reduce((a,n)=>((a<<8)|+n)>>>0,0);
 const numIP = n => [24,16,8,0].map(s=>(n>>>s)&255).join('.');
 const maskNum = prefix => prefix===0?0:(0xffffffff<<(32-prefix))>>>0;
 const network = (ip,prefix) => numIP((ipNum(ip)&maskNum(+prefix))>>>0);
 const broadcast = (ip,prefix) => numIP(((ipNum(ip)&maskNum(+prefix))|(~maskNum(+prefix)))>>>0);
 const validPrefix=p=>Number.isInteger(+p)&&+p>=0&&+p<=32;
 const sameNetwork = (a,b) => !!a&&!!b&&isIP(a.ip)&&isIP(b.ip)&&validPrefix(a.prefix)&&validPrefix(b.prefix)&&+a.prefix===+b.prefix&&network(a.ip,a.prefix)===network(b.ip,b.prefix);
 const issue=(level,title,why,fix,focus='',link='')=>({level,title,why,fix,focus,link});
 const nodeBy=(s,id)=>s.nodes.find(n=>n.id===id);
 const supported=(link,s)=>{const a=nodeBy(s,link.a),b=nodeBy(s,link.b);return !!a&&!!b&&TYPES[a.type]?.media.includes(link.media)&&TYPES[b.type]?.media.includes(link.media);};
 const path=(s,from,to,includeInactive=false)=>{const adj=new Map(s.nodes.map(n=>[n.id,[]]));for(const l of s.links){if(!nodeBy(s,l.a)||!nodeBy(s,l.b))continue;if(!includeInactive&&(!l.up||!supported(l,s)))continue;adj.get(l.a).push(l.b);adj.get(l.b).push(l.a);}const q=[[from]];const visited=new Set([from]);while(q.length){const p=q.shift(),last=p.at(-1);if(last===to)return p;for(const next of adj.get(last)||[]){if(!visited.has(next)){visited.add(next);q.push([...p,next]);}}}return null;};
 const optical=(o)=>{const map={2:3.5,4:7.3,8:10.5,16:13.7,32:17.0,64:20.5};const fiber=+o.km*+o.atten,split=map[o.ratio]??17,connectors=+o.connectors*.3,splices=+o.splices*.1;const total=fiber+split+connectors+splices,rx=+o.tx-total,margin=rx-(+o.sens);return {fiber,split,connectors,splices,total,rx,margin,ok:margin>=3};};
 const coverage=(s)=>{const cells=[];let good=0;for(let y=0;y<12;y++)for(let x=0;x<20;x++){const cx=(x+.5)*5,cy=(y+.5)*5;const covered=s.sites.some(p=>Math.hypot(cx-p.x,cy-p.y)<=s.radius);cells.push({x,y,covered});if(covered)good++;}return {percent:Math.round(100*good/cells.length),cells,sites:s.sites.length};};
 function check(s,from,to){const a=nodeBy(s,from),b=nodeBy(s,to);if(!a||!b)return {ok:false,reason:'Вихідний або кінцевий пристрій відсутній.',fix:'Додай потрібні пристрої на схему.'};if(a.off||b.off)return {ok:false,reason:'Один із кінцевих пристроїв вимкнений.',fix:'Увімкни живлення пристроїв.'};
  const p=path(s,from,to);if(!p){const phys=path(s,from,to,true);if(phys){const bad=s.links.filter(l=>phys.includes(l.a)&&phys.includes(l.b)&&(!l.up||!supported(l,s)));return {ok:false,reason:bad.some(l=>!l.up)?'Фізичний канал вимкнено (Link down).':'Неправильний тип кабелю між пристроями.',fix:bad.some(l=>!l.up)?'Натисни червону лінію та увімкни канал.':'Обери з’єднання та заміни тип кабелю на сумісний.'};}return {ok:false,reason:'Між пристроями немає повного фізичного шляху.',fix:'Увімкни режим «З’єднати» та додай потрібні кабелі.'};}
  if(p.some(id=>nodeBy(s,id)?.off))return {ok:false,reason:'Проміжний пристрій вимкнений.',fix:'Перевір живлення вузлів на шляху.'};
  if(!TYPES[a.type].host||!TYPES[b.type].host)return {ok:true,reason:'Фізичний шлях існує (навчальна перевірка).',path:p,physical:true};
  if(!isIP(a.ip)||a.ip==='0.0.0.0'||!validPrefix(a.prefix))return {ok:false,reason:'Вузол-джерело не має коректної IPv4-адреси.',fix:'Задай коректний IPv4 або отримай адресу через DHCP.',focus:a.id};
  if(!isIP(b.ip)||b.ip==='0.0.0.0'||!validPrefix(b.prefix))return {ok:false,reason:'Вузол-одержувач не має коректної IPv4-адреси.',fix:'Налаштуй IPv4-адресу пристрою призначення.',focus:b.id};
  if(a.ip===b.ip)return {ok:false,reason:'Конфлікт: джерело та одержувач мають однакову IP-адресу.',fix:'Признач різні IPv4-адреси.',focus:b.id};
  if((+a.prefix<=30&&(a.ip===network(a.ip,a.prefix)||a.ip===broadcast(a.ip,a.prefix)))||(+b.prefix<=30&&(b.ip===network(b.ip,b.prefix)||b.ip===broadcast(b.ip,b.prefix))))return {ok:false,reason:'Одна з IP-адрес є адресою мережі або broadcast.',fix:'Обери допустиму хостову адресу в підмережі.'};
  const routeNodes=p.filter(id=>nodeBy(s,id)?.type==='router').map(id=>nodeBy(s,id));
  if(sameNetwork(a,b)){if(routeNodes.length)return {ok:false,reason:'У навчальній топології між вузлами однієї підмережі стоїть L3-маршрутизатор.',fix:'Об’єднай вузли однієї мережі через комутатор або переналаштуй мережеві сегменти.'};return {ok:true,reason:'ICMP Echo Request і Reply доставлено.',path:p};}
  if(!routeNodes.length)return {ok:false,reason:'Вузли розташовані в різних підмережах без маршрутизатора.',fix:'Додай маршрутизатор між мережами або налаштуй адреси в одну підмережу.'};
  const r=routeNodes[0];const nets=r.networks||[];
  for(const host of [a,b]){if(!isIP(host.gateway))return {ok:false,reason:`На ${host.label} відсутній коректний шлюз за замовчуванням.`,fix:`Вкажи IP інтерфейсу маршрутизатора у мережі ${network(host.ip,host.prefix)}/${host.prefix}.`,focus:host.id};if(network(host.ip,host.prefix)!==network(host.gateway,host.prefix))return {ok:false,reason:`Шлюз ${host.gateway} пристрою ${host.label} перебуває поза його локальною підмережею.`,fix:`Для ${host.label} введи IP маршрутизатора з мережі ${network(host.ip,host.prefix)}/${host.prefix}.`,focus:host.id};if(!nets.includes(`${host.gateway}/${host.prefix}`))return {ok:false,reason:`Маршрутизатор не має налаштованого інтерфейсу ${host.gateway}/${host.prefix}.`,fix:`У стенді R-1 використовує ${nets.join(' та ')}. Зміни шлюз ${host.label} на відповідний інтерфейс.`,focus:host.id};}
  return {ok:true,reason:'ICMP успішно пройшов через маршрутизатор.',path:p};
 }
 function diagnose(s,moduleId,opt){const errors=[];const add=(...args)=>errors.push(issue(...args));const use=new Map();
 for(const n of s.nodes){if(n.off)add('error',`${n.label}: живлення вимкнено`,'Вимкнений пристрій не пересилає трафік.','Увімкни «Живлення» у панелі пристрою.',n.id);
  if(TYPES[n.type]?.host){if(!isIP(n.ip)||n.ip==='0.0.0.0'){if(n.dhcp&&n.ip==='0.0.0.0')add('warn',`${n.label}: очікується DHCP`,'Автоматичну IP-адресу ще не отримано.','Увімкни DHCP-сервер і натисни «DHCP-запит» на ПК.',n.id);else add('error',`${n.label}: IPv4-адреса неправильна`,'Адреса має складатися з чотирьох октетів 0–255.','Введи, наприклад, 192.168.10.10.',n.id);continue;}
   if(!validPrefix(n.prefix)){add('error',`${n.label}: недійсний CIDR`,'Префікс IPv4 має бути від 0 до 32.','Для звичайної локальної мережі скористайся /24.',n.id);continue;}
   if(+n.prefix<=30&&(n.ip===network(n.ip,n.prefix)||n.ip===broadcast(n.ip,n.prefix)))add('error',`${n.label}: службова IPv4-адреса`,'Адресу мережі та broadcast за типовою схемою не призначають хостам.','Обери допустиму адресу вузла всередині підмережі.',n.id);
   if(use.has(n.ip)){add('error',`Конфлікт IPv4: ${n.ip}`,`${n.label} та ${use.get(n.ip)} мають однакову адресу.`,`Признач ${n.label} унікальну адресу.`,n.id);}else use.set(n.ip,n.label);
   if(n.gateway&&(!isIP(n.gateway)||network(n.gateway,n.prefix)!==network(n.ip,n.prefix)))add('error',`${n.label}: некоректний шлюз`, `Шлюз ${n.gateway} не є коректною адресою у локальній підмережі ${network(n.ip,n.prefix)}/${n.prefix}.`,'Вкажи адресу інтерфейсу маршрутизатора в цій підмережі.',n.id);
  }
 }
 for(const l of s.links){let a=nodeBy(s,l.a),b=nodeBy(s,l.b);if(!a||!b)continue;if(!supported(l,s))add('error',`Несумісний кабель: ${a.label} ↔ ${b.label}`,`Обрано «${l.media}», але не всі порти підтримують цей носій.`,`Використай ${TYPES[a.type].media.filter(m=>TYPES[b.type].media.includes(m)).join(' або ')||'відповідні проміжні пристрої'}.`,'',l.id);if(!l.up)add('error',`Link down: ${a.label} ↔ ${b.label}`,'Канал адміністративно вимкнено або обірвано.','Відкрий кабель натисканням на лінію та увімкни його.','',l.id);if(l.media==='ethernet'&&+l.meters>100)add('warn',`Довжина Ethernet > 100 м`,'Типовий мідний сегмент Ethernet структурованої кабельної системи має обмеження близько 100 м.','Зменш довжину або використай відповідний оптичний канал.','',l.id);}
 for(const n of s.nodes){let used=s.links.filter(l=>l.a===n.id||l.b===n.id).length;if(used>TYPES[n.type].ports)add('error',`${n.label}: перевищення портів`,`Зайнято ${used} з ${TYPES[n.type].ports} навчально доступних портів.`,'Видали зайві підключення або додай комутатор.',n.id);}
 if(moduleId!=='5g'&&moduleId!=='gpon'){const result=check(s,s.from,s.to);if(!result.ok)add('error','Цільовий Ping не проходить',result.reason,result.fix,result.focus||'');}
 if(moduleId==='gpon'){const target=path(s,s.from,s.to);if(!target)add('error','Оптичний ланцюг неповний','Потрібен повний фізичний шлях від OLT до ПК через splitter та ONT.','З’єднай OLT → SPL → ONT оптичним волокном, а ONT → ПК через Ethernet.');const o=optical(opt);if(o.margin<3)add('warn',`Замалий оптичний запас: ${o.margin.toFixed(1)} дБ`,'Запас менший за навчальний поріг 3 дБ.','Зменш довжину, кількість з’єднань, коефіцієнт спліта або змоделюй інший клас передавача.');}
 if(!errors.length)add('ok','Базова діагностика пройдена','Помилок у перевірених параметрах не знайдено.','Для підтвердження зв’язку запусти Ping або перевір ціль профільної місії.');return errors;}
 const calcSubnet=(ip,prefix)=>{if(!isIP(ip)||!validPrefix(prefix))return null;const n=network(ip,prefix),b=broadcast(ip,prefix),total=2**(32-prefix);let usable=+prefix>=31?total:Math.max(0,total-2);return {network:n,broadcast:b,mask:numIP(maskNum(+prefix)),usable,total,first:+prefix>=31?n:numIP((ipNum(n)+1)>>>0),last:+prefix>=31?b:numIP((ipNum(b)-1)>>>0)};};
 const api={TYPES,isIP,ipNum,numIP,maskNum,network,broadcast,sameNetwork,supported,path,optical,coverage,check,diagnose,calcSubnet};root.NL_ENGINE=api;if(typeof module!=='undefined'&&module.exports)module.exports=api;
})(typeof window!=='undefined'?window:globalThis);
