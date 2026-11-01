'use strict';
/* StudyOS V1 - vanilla JS, IndexedDB, offline-first */
const $ = (s, e = document) => e.querySelector(s);
const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

/* ---------- i18n: key: [English, বাংলা] ---------- */
const L = {
  home: ['Home', 'হোম'], study: ['Study', 'পড়া'], tasks: ['Tasks', 'কাজ'], waste: ['Distractions', 'অপচয়'],
  review: ['Review', 'রিভিউ'], stats: ['Analytics', 'বিশ্লেষণ'], settings: ['Settings', 'সেটিংস'],
  today: ['Today', 'আজ'], total: ['Total', 'মোট'], studyToday: ['Studied today', 'আজ পড়েছি'], target: ['Daily target', 'দৈনিক লক্ষ্য'],
  done: ['Completed tasks', 'সম্পন্ন কাজ'], pending: ['Pending tasks', 'বাকি কাজ'], score: ['Productivity score', 'উৎপাদনশীলতা স্কোর'],
  wasted: ['Time wasted', 'নষ্ট সময়'], h: ['h', 'ঘ'], m: ['m', 'মি'], subject: ['Subject', 'বিষয়'], chapter: ['Chapter', 'অধ্যায়'],
  addSubject: ['Add subject', 'বিষয় যোগ'], addChapter: ['Add chapter', 'অধ্যায় যোগ'], addSubjectFirst: ['Add a subject first', 'আগে একটি বিষয় যোগ করুন'],
  timer: ['Study timer', 'স্টাডি টাইমার'], topic: ['What are you studying?', 'কী পড়ছেন?'], start: ['Start', 'শুরু'], stop: ['Stop & save', 'থামান ও সংরক্ষণ'],
  manual: ['Add time manually', 'হাতে সময় যোগ'], minutes: ['Minutes', 'মিনিট'], date: ['Date', 'তারিখ'], note: ['Notes', 'নোট'],
  save: ['Save', 'সংরক্ষণ'], cancel: ['Cancel', 'বাতিল'], delete: ['Delete', 'মুছুন'], edit: ['Edit', 'সম্পাদনা'], sure: ['Delete this?', 'মুছে ফেলবেন?'],
  title: ['Title', 'শিরোনাম'], deadline: ['Deadline', 'সময়সীমা'], priority: ['Priority', 'অগ্রাধিকার'], high: ['High', 'উচ্চ'], med: ['Medium', 'মাঝারি'], low: ['Low', 'কম'],
  newTask: ['New task', 'নতুন কাজ'], completed: ['Completed', 'সম্পন্ন'], overdue: ['Overdue', 'মেয়াদ শেষ'],
  chess: ['Chess', 'দাবা'], youtube: ['YouTube', 'ইউটিউব'], reels: ['Reels', 'রিলস'], other: ['Other', 'অন্যান্য'], type: ['Type', 'ধরন'],
  addTime: ['Add time', 'সময় যোগ'], recent: ['Recent', 'সাম্প্রতিক'], none: ['Nothing yet', 'এখনো কিছু নেই'],
  q1: ['What did I study?', 'আজ কী পড়লাম?'], q2: ['What did I accomplish?', 'কী অর্জন করলাম?'], q3: ['Where did I waste time?', 'কোথায় সময় নষ্ট করলাম?'], q4: ['What should I improve tomorrow?', 'আগামীকাল কী উন্নত করব?'],
  daily: ['Daily', 'দৈনিক'], weekly: ['Weekly', 'সাপ্তাহিক'], studyVs: ['Study vs distraction', 'পড়া বনাম অপচয়'], avg: ['Average / day', 'গড় / দিন'], best: ['Best day', 'সেরা দিন'],
  bySubject: ['By subject', 'বিষয় অনুযায়ী'], reminders: ['Reminders', 'রিমাইন্ডার'], studyRem: ['Study reminder', 'পড়ার রিমাইন্ডার'], revRem: ['Daily review reminder', 'দৈনিক রিভিউ রিমাইন্ডার'],
  taskRem: ['Task deadline reminder', 'কাজের রিমাইন্ডার'], minBefore: ['Minutes before deadline', 'সময়সীমার কত মিনিট আগে'], enableNotif: ['Enable notifications', 'নোটিফিকেশন চালু করুন'],
  notifHelp: ['On iPad: Share → Add to Home Screen, open StudyOS from the icon, then enable. Reminders fire while the app is open or recently active.', 'iPad-এ: Share → Add to Home Screen করে আইকন থেকে খুলুন, তারপর চালু করুন। অ্যাপ খোলা বা সদ্য সক্রিয় থাকলে রিমাইন্ডার আসবে।'],
  studyMsg: ['Time to study!', 'পড়ার সময় হয়েছে!'], revMsg: ["Write today's review", 'আজকের রিভিউ লিখুন'], taskMsg: ['Deadline is near', 'সময়সীমা ঘনিয়ে এসেছে'],
  streak: ['Study streak', 'স্টাডি স্ট্রিক'], curStreak: ['Current streak', 'বর্তমান স্ট্রিক'], longStreak: ['Longest streak', 'দীর্ঘতম স্ট্রিক'], totalXP: ['Total XP', 'মোট XP'], activeDays: ['Active study days', 'সক্রিয় পড়ার দিন'],
  days: ['days', 'দিন'], needMin: ['to count today as an active day', 'আজকের দিন সক্রিয় ধরতে'], week: ['Week', 'সপ্তাহ'], month: ['Month', 'মাস'], xpDay: ['Active day', 'সক্রিয় দিন'], xp7: ['7-day streak bonus!', '৭ দিনের স্ট্রিক বোনাস!'], xp30: ['30-day streak bonus!', '৩০ দিনের স্ট্রিক বোনাস!'],
  salah: ['Salah Tracker', 'সালাত ট্র্যাকার'], fajr: ['Fajr', 'ফজর'], dhuhr: ['Dhuhr', 'যোহর'], asr: ['Asr', 'আসর'], maghrib: ['Maghrib', 'মাগরিব'], isha: ['Isha', 'ইশা'],
  salahDone: ['All five prayers completed — +50 XP earned. Alhamdulillah!', 'পাঁচ ওয়াক্ত সালাত সম্পন্ন — +৫০ XP অর্জিত। আলহামদুলিল্লাহ!'], salahXP: ['Salah XP', 'সালাত XP'], salahFull: ['full days', 'পূর্ণ দিন'],
  about: ['About StudyOS', 'StudyOS সম্পর্কে'], aboutBy: ['Developed by', 'ডেভেলপ করেছেন'], aboutName: ['Syed Md. Ajwad Abrar', 'সৈয়দ মোঃ আজওয়াদ আবরার'], aboutCollege: ['Dhaka Medical College (K79)', 'ঢাকা মেডিকেল কলেজ (কে৭৯)'],
  export: ['Download backup', 'ব্যাকআপ ডাউনলোড'], import: ['Restore backup', 'ব্যাকআপ রিস্টোর'], hours: ['hours', 'ঘণ্টা'], saved: ['Saved', 'সংরক্ষিত']
};
const DEF = { lang: 'en', theme: '', target: 4, rs: false, rst: '18:00', rr: false, rrt: '21:00', rt: false, rtm: 30 };
const S = { subjects: [], chapters: [], sessions: [], tasks: [], wastes: [], reviews: [], cfg: { ...DEF }, timer: null, view: 'home', range: 'week', sd: null, cal: 'month', calOff: 0, salah: {}, sl: null };
const t = k => (L[k] || [k, k])[S.cfg.lang === 'bn' ? 1 : 0];
const nb = s => S.cfg.lang === 'bn' ? String(s).replace(/\d/g, d => '০১২৩৪৫৬৭৮৯'[d]) : String(s);
const fmt = m => { m = Math.round(m); return nb(m >= 60 ? `${Math.floor(m / 60)}${t('h')} ${m % 60}${t('m')}` : `${m}${t('m')}`); };

/* ---------- IndexedDB ---------- */
const STORES = ['subjects', 'chapters', 'sessions', 'tasks', 'wastes', 'reviews', 'kv'];
let db;
const openDB = () => new Promise((res, rej) => {
  const r = indexedDB.open('studyos', 1);
  r.onupgradeneeded = () => STORES.forEach(s => r.result.createObjectStore(s, s === 'kv' ? { keyPath: 'k' } : { keyPath: 'id', autoIncrement: true }));
  r.onsuccess = () => { db = r.result; res(); };
  r.onerror = () => rej(r.error);
});
const tx = (s, mode, f) => new Promise((res, rej) => {
  const x = db.transaction(s, mode), q = f(x.objectStore(s));
  x.oncomplete = () => res(q && q.result); x.onerror = () => rej(x.error);
});
const all = s => tx(s, 'readonly', o => o.getAll());
const put = (s, v) => tx(s, 'readwrite', o => o.put(v));
const del = (s, id) => tx(s, 'readwrite', o => o.delete(id));
const getKV = async (k, d) => { const r = await tx('kv', 'readonly', o => o.get(k)); return r ? r.v : d; };
const setKV = (k, v) => put('kv', { k, v });
const saveCfg = () => setKV('cfg', S.cfg);
async function load() {
  for (const s of ['subjects', 'chapters', 'sessions', 'tasks', 'wastes', 'reviews']) S[s] = await all(s);
  S.cfg = { ...DEF, ...(await getKV('cfg', {})) };
  S.timer = await getKV('timer', null);
  S.salah = await getKV('salah', {});
}
const render = async () => { await load(); await gamiCheck(); draw(); };

/* ---------- helpers ---------- */
const dk = d => { d = new Date(d); return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0'); };
const today = () => dk(new Date());
const days = n => Array.from({ length: n }, (_, i) => { const x = new Date(); x.setDate(x.getDate() - (n - 1 - i)); return dk(x); });
const dl = d => new Date(d + 'T00:00').toLocaleDateString(S.cfg.lang === 'bn' ? 'bn-BD' : 'en-US', { weekday: 'short' });
const sum = (a, d) => a.filter(x => x.date === d).reduce((s, x) => s + x.minutes, 0);
const opts = (a, v) => a.map(o => `<option value="${esc(o[0])}"${String(o[0]) === String(v) ? ' selected' : ''}>${esc(o[1])}</option>`).join('');
const clock = ms => { const s = Math.floor(ms / 1000), p = n => String(n).padStart(2, '0'); return `${p(Math.floor(s / 3600))}:${p(Math.floor(s / 60) % 60)}:${p(s % 60)}`; };
const topics = () => [['', '—'], ...S.subjects.flatMap(s => [['s' + s.id, s.name], ...S.chapters.filter(c => c.sid === s.id).map(c => ['c' + c.id, `${s.name} › ${c.name}`])])];
const parse = v => { if (v && v[0] === 'c') { const c = S.chapters.find(x => x.id == v.slice(1)); return { cid: c && c.id, sid: c && c.sid }; } if (v && v[0] === 's') return { sid: +v.slice(1), cid: undefined }; return { sid: undefined, cid: undefined }; };
const tname = x => { const s = S.subjects.find(a => a.id === x.sid), c = S.chapters.find(a => a.id === x.cid); return s ? s.name + (c ? ' › ' + c.name : '') : '—'; };
const toast = m => { const e = $('#toast'); e.textContent = m; e.className = 'show'; clearTimeout(toast.h); toast.h = setTimeout(() => e.className = '', 4000); };
const stat = (l, v, c = '') => `<div class="card stat ${c}"><small>${l}</small><b>${v}</b></div>`;

function score(d) {
  const s = sum(S.sessions, d), w = sum(S.wastes, d), tg = Math.max(30, S.cfg.target * 60);
  const rel = S.tasks.filter(x => x.doneDate === d || (!x.done && d === today() && x.deadline && x.deadline.slice(0, 10) <= d));
  const tr = rel.length ? rel.filter(x => x.done).length / rel.length : .5;
  return Math.round(Math.min(s / tg, 1) * 50 + tr * 30 + (s + w ? s / (s + w) : 0) * 20);
}

/* ---------- modal form ---------- */
function modal(title, fields, save, remove) {
  const m = $('#modal');
  m.hidden = false;
  m.innerHTML = `<form class="sheet"><h3>${esc(title)}</h3>${fields.map(f => `<label>${esc(f.l)}${
    f.type === 'select' ? `<select name="${f.n}">${opts(f.o, f.v)}</select>`
    : f.type === 'textarea' ? `<textarea name="${f.n}" rows="3">${esc(f.v)}</textarea>`
    : `<input name="${f.n}" type="${f.type || 'text'}" value="${esc(f.v)}" ${f.req ? 'required' : ''} ${f.type === 'number' ? 'min="0" inputmode="numeric"' : ''}>`}</label>`).join('')}
    <div class="row"><button type="button" class="btn ghost" data-x>${t('cancel')}</button>${remove ? `<button type="button" class="btn danger" data-d>${t('delete')}</button>` : ''}<button class="btn">${t('save')}</button></div></form>`;
  const close = () => { m.hidden = true; m.innerHTML = ''; };
  m.onclick = e => { if (e.target === m) close(); };
  $('[data-x]', m).onclick = close;
  if (remove) $('[data-d]', m).onclick = async () => { if (confirm(t('sure'))) { await remove(); close(); render(); } };
  $('form', m).onsubmit = async e => { e.preventDefault(); await save(Object.fromEntries(new FormData(e.target))); close(); render(); };
}
const sesForm = x => modal(x.id ? t('edit') : t('manual'), [
  { n: 'tp', l: t('topic'), type: 'select', o: topics(), v: x.cid ? 'c' + x.cid : x.sid ? 's' + x.sid : '' },
  { n: 'minutes', l: t('minutes'), type: 'number', v: x.minutes, req: 1 },
  { n: 'date', l: t('date'), type: 'date', v: x.date, req: 1 },
  { n: 'note', l: t('note'), type: 'textarea', v: x.note }],
  o => put('sessions', { ...x, ...parse(o.tp), minutes: +o.minutes, date: o.date, note: o.note, ts: x.ts || Date.now() }),
  x.id && (() => del('sessions', x.id)));
const taskForm = x => modal(x.id ? t('edit') : t('newTask'), [
  { n: 'title', l: t('title'), v: x.title, req: 1 },
  { n: 'deadline', l: t('deadline'), type: 'datetime-local', v: x.deadline },
  { n: 'pr', l: t('priority'), type: 'select', o: [['high', t('high')], ['med', t('med')], ['low', t('low')]], v: x.pr || 'med' }],
  o => put('tasks', { ...x, title: o.title, deadline: o.deadline, pr: o.pr, done: !!x.done, created: x.created || Date.now() }),
  x.id && (() => del('tasks', x.id)));
const WT = ['chess', 'youtube', 'reels', 'other'], WI = { chess: '♟', youtube: '▶', reels: '🎞', other: '⋯' };
const wasteForm = x => modal(x.id ? t('edit') : t('addTime'), [
  { n: 'type', l: t('type'), type: 'select', o: WT.map(k => [k, t(k)]), v: x.type },
  { n: 'minutes', l: t('minutes'), type: 'number', v: x.minutes, req: 1 },
  { n: 'date', l: t('date'), type: 'date', v: x.date, req: 1 }],
  o => put('wastes', { ...x, type: o.type, minutes: +o.minutes, date: o.date, ts: x.ts || Date.now() }),
  x.id && (() => del('wastes', x.id)));

/* ---------- Study streak + XP ----------
   Everything is DERIVED from the saved study sessions, so XP can never be counted twice.
   Only a small "already celebrated" list is stored (kv key xpSeen) so each reward pops up once. */
const G = { MIN: 25, XP_MIN: 1, XP_DAY: 20, B7: 100, B30: 500, SALAH: 50 };
/* Salah records live in kv key "salah": { "YYYY-MM-DD": ["fajr","dhuhr",...] }.
   The +50 XP is only ever CALCULATED here from those records (one per date with all five prayers). */
const SP = ['fajr', 'dhuhr', 'asr', 'maghrib', 'isha'];
const salahSet = d => new Set(((S.salah || {})[d] || []).filter(p => SP.includes(p)));
const dnum = d => { const [y, m, a] = d.split('-'); return Math.round(Date.UTC(y, m - 1, a) / 864e5); };
const addDays = (d, n) => { const [y, m, a] = d.split('-'); return dk(new Date(y, m - 1, +a + n)); };
function gami() {
  const per = {};
  S.sessions.forEach(x => per[x.date] = (per[x.date] || 0) + x.minutes);
  const act = Object.keys(per).filter(d => per[d] >= G.MIN).sort(), A = new Set(act), rewards = {};
  let run = 0, prev = null, longest = 0;
  act.forEach(d => {
    run = prev && dnum(d) - dnum(prev) === 1 ? run + 1 : 1; prev = d;
    rewards['day:' + d] = G.XP_DAY;
    if (run === 7) rewards['b7:' + d] = G.B7;
    if (run === 30) rewards['b30:' + d] = G.B30;
    longest = Math.max(longest, run);
  });
  const salahDays = Object.keys(S.salah || {}).filter(d => /^\d{4}-\d{2}-\d{2}$/.test(d) && salahSet(d).size === SP.length).length, salahXP = salahDays * G.SALAH;
  const xp = Object.values(per).reduce((a, m) => a + m * G.XP_MIN, 0) + Object.values(rewards).reduce((a, b) => a + b, 0) + salahXP;
  let cur = 0, d = A.has(today()) ? today() : addDays(today(), -1);
  while (A.has(d)) { cur++; d = addDays(d, -1); }
  return { per, A, xp, cur, longest, total: act.length, rewards, salahXP, salahDays };
}
async function gamiCheck() {
  const g = gami(), keys = Object.keys(g.rewards);
  let seen = await getKV('xpSeen', null);
  if (seen === null) { await setKV('xpSeen', Object.fromEntries(keys.map(k => [k, 1]))); return; } // first run: existing history is not re-announced
  const fresh = keys.filter(k => !seen[k]);
  if (!fresh.length) return;
  fresh.forEach(k => seen[k] = 1);
  await setKV('xpSeen', seen);
  const msg = fresh.sort().map(k => k.startsWith('b30') ? `🏆 +${G.B30} XP ${t('xp30')}` : k.startsWith('b7') ? `🔥 +${G.B7} XP ${t('xp7')}` : `⭐ +${G.XP_DAY} XP ${t('xpDay')}`);
  setTimeout(() => toast(msg.join('  ·  ')), 400);
}
function calendar(g) {
  const wk = S.cal === 'week', now = new Date(), td = today();
  let cells = [], title;
  if (wk) {
    const dow = (now.getDay() + 6) % 7;
    for (let i = 0; i < 7; i++) cells.push(dk(new Date(now.getFullYear(), now.getMonth(), now.getDate() - dow + i)));
    title = nb(cells[0].slice(5)) + ' – ' + nb(cells[6].slice(5));
  } else {
    const f = new Date(now.getFullYear(), now.getMonth() + S.calOff, 1), n = new Date(f.getFullYear(), f.getMonth() + 1, 0).getDate();
    title = f.toLocaleDateString(S.cfg.lang === 'bn' ? 'bn-BD' : 'en-US', { month: 'long', year: 'numeric' });
    cells = Array((f.getDay() + 6) % 7).fill('');
    for (let i = 1; i <= n; i++) cells.push(dk(new Date(f.getFullYear(), f.getMonth(), i)));
  }
  const heads = Array.from({ length: 7 }, (_, i) => `<b>${new Date(2024, 0, 1 + i).toLocaleDateString(S.cfg.lang === 'bn' ? 'bn-BD' : 'en-US', { weekday: 'short' })}</b>`).join('');
  return `<div class="calhd">${wk ? '' : `<button class="chip" data-a="calNav" data-n="-1">‹</button>`}<b>${esc(title)}</b>${wk ? '' : `<button class="chip" data-a="calNav" data-n="1" ${S.calOff >= 0 ? 'disabled' : ''}>›</button>`}</div>
  <div class="cal">${heads}${cells.map(d => d ? `<button class="cd${g.A.has(d) ? ' on' : (g.per[d] ? ' part' : '')}${d === td ? ' td' : ''}${d > td ? ' fu' : ''}" data-a="calDay" data-d="${d}">${nb(+d.slice(8))}</button>` : '<i></i>').join('')}</div>`;
}
function streakCard() {
  const g = gami(), m = g.per[today()] || 0;
  return `<div class="card"><h3>🔥 ${t('streak')}</h3>
  <div class="mini"><div><small>${t('curStreak')}</small><b>${nb(g.cur)} ${t('days')}</b></div><div><small>${t('longStreak')}</small><b>${nb(g.longest)} ${t('days')}</b></div><div><small>${t('totalXP')}</small><b>${nb(g.xp)}</b></div><div><small>${t('activeDays')}</small><b>${nb(g.total)}</b></div></div>
  <div class="bar"><i style="width:${Math.min(100, m / G.MIN * 100)}%"></i></div><small>${m >= G.MIN ? '✓ ' : ''}${nb(Math.min(m, G.MIN))}/${nb(G.MIN)} ${t('m')} ${t('needMin')}</small>
  <div class="seg"><button class="${S.cal === 'week' ? 'on' : ''}" data-a="calMode" data-m="week">${t('week')}</button><button class="${S.cal === 'week' ? '' : 'on'}" data-a="calMode" data-m="month">${t('month')}</button></div>${calendar(g)}</div>`;
}

function salahCard() {
  const td = today(), d = S.sl && S.sl <= td ? S.sl : td, st = salahSet(d), n = st.size, full = n === SP.length, g = gami();
  const left = S.cfg.lang === 'bn' ? `+${nb(G.SALAH)} XP পেতে আরও ${nb(SP.length - n)}টি বাকি` : `${SP.length - n} left to earn +${G.SALAH} XP`;
  return `<div class="card salah${full ? ' full' : ''}"><div class="sh"><h3>🕌 ${t('salah')}</h3><span class="pill sc">${nb(n)}/${nb(SP.length)}</span></div>
  <small>${d === td ? t('today') : nb(d)}</small>
  <div class="sl">${SP.map(p => `<button class="sp${st.has(p) ? ' on' : ''}" data-a="sTg" data-p="${p}" data-d="${d}" aria-pressed="${st.has(p)}"><i>${st.has(p) ? '✓' : ''}</i><span>${t(p)}</span></button>`).join('')}</div>
  <div class="bar"><i style="width:${n / SP.length * 100}%"></i></div>
  <p class="smsg">${full ? '✨ ' + t('salahDone') : left}</p>
  <div class="sdays">${days(7).map(x => { const c = salahSet(x).size; return `<button class="sd${c === SP.length ? ' f' : ''}${x === d ? ' sel' : ''}" data-a="sDay" data-d="${x}"><small>${dl(x)}</small><b>${nb(c)}</b></button>`; }).join('')}</div>
  <small>${t('salahXP')}: ${nb(g.salahXP)} XP · ${nb(g.salahDays)} ${t('salahFull')}</small></div>`;
}

const CAP = '<svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M2 9l10-5 10 5-10 5-10-5z"/><path d="M6 11.5V16c0 1.5 3 3 6 3s6-1.5 6-3v-4.5"/><path d="M22 9v6"/></svg>';
const aboutCard = () => `<small class="abl">${t('about')}</small>
  <div class="card about"><div class="abi">${CAP}</div><div class="abt">StudyOS</div><div class="abln"></div><small class="abby">${t('aboutBy')}</small><div class="abn">${t('aboutName')}</div><div class="abc">${t('aboutCollege')}</div></div>`;

/* ---------- views ---------- */
const V = {};
V.home = () => {
  const d = today(), s = sum(S.sessions, d), w = sum(S.wastes, d), tg = Math.max(30, S.cfg.target * 60), sc = score(d);
  const pend = S.tasks.filter(x => !x.done).length, dn = S.tasks.filter(x => x.done && x.doneDate === d).length;
  return `<div class="card hero"><div class="ring" style="--p:${sc}"><b>${nb(sc)}</b></div><div class="grow"><small>${t('score')}</small><h2>${fmt(s)}</h2><small>${t('target')}: ${nb(S.cfg.target)}${t('h')}</small></div></div>
  <div class="bar"><i style="width:${Math.min(100, s / tg * 100)}%"></i></div>
  <div class="grid">${stat(t('studyToday'), fmt(s))}${stat(t('target'), nb(S.cfg.target) + t('h'))}${stat(t('done'), nb(dn))}${stat(t('pending'), nb(pend))}${stat(t('wasted'), fmt(w), 'bad')}</div>
  ${S.timer ? `<div class="card run"><b class="clk"></b><span>${esc(tname(S.timer))}</span><button class="btn" data-a="go" data-v="study">${t('study')}</button></div>` : ''}
  ${salahCard()}
  ${streakCard()}`;
};
V.study = () => {
  const recent = [...S.sessions].sort((a, b) => b.ts - a.ts).slice(0, 15);
  return `<div class="card"><h3>${t('timer')}</h3>${S.timer
    ? `<div class="big clk"></div><p>${esc(tname(S.timer))}</p><button class="btn danger" data-a="stop">■ ${t('stop')}</button>`
    : `<label>${t('topic')}<select id="tp">${opts(topics())}</select></label><button class="btn" data-a="start">▶ ${t('start')}</button>`}</div>
  <div class="row"><button class="btn ghost" data-a="manual">＋ ${t('manual')}</button><button class="btn ghost" data-a="addS">＋ ${t('addSubject')}</button><button class="btn ghost" data-a="addC">＋ ${t('addChapter')}</button></div>
  ${S.subjects.map(s => `<div class="card"><div class="item flat" data-a="editS" data-id="${s.id}"><b class="grow">${esc(s.name)}</b><small>${fmt(S.sessions.filter(x => x.sid === s.id).reduce((a, x) => a + x.minutes, 0))}</small></div>
    <div class="chips">${S.chapters.filter(c => c.sid === s.id).map(c => `<button class="chip" data-a="editC" data-id="${c.id}">${esc(c.name)}</button>`).join('')}</div></div>`).join('')}
  <h3>${t('recent')}</h3>${recent.map(x => `<div class="item" data-a="editSes" data-id="${x.id}"><div class="grow"><b>${esc(tname(x))}</b><small>${x.date}${x.note ? ' · ' + esc(x.note.slice(0, 60)) : ''}</small></div><b>${fmt(x.minutes)}</b></div>`).join('') || `<p class="mut">${t('none')}</p>`}`;
};
V.tasks = () => {
  const p = { high: 0, med: 1, low: 2 };
  const pend = S.tasks.filter(x => !x.done).sort((a, b) => (p[a.pr] - p[b.pr]) || (a.deadline || '9').localeCompare(b.deadline || '9'));
  const dn = S.tasks.filter(x => x.done).sort((a, b) => (b.doneDate || '').localeCompare(a.doneDate || '')).slice(0, 15);
  const item = x => { const od = !x.done && x.deadline && new Date(x.deadline) < new Date();
    return `<div class="item ${x.done ? 'dn' : ''}"><button class="chk ${x.done ? 'on' : ''}" data-a="tg" data-id="${x.id}">${x.done ? '✓' : ''}</button>
    <div class="grow" data-a="editT" data-id="${x.id}"><b>${esc(x.title)}</b><small class="${od ? 'bad' : ''}">${x.deadline ? esc(nb(x.deadline.replace('T', ' '))) : ''}${od ? ' · ' + t('overdue') : ''}</small></div><span class="pill ${x.pr}">${t(x.pr)}</span></div>`; };
  return `<div class="row"><button class="btn" data-a="addT">＋ ${t('newTask')}</button></div>
  <h3>${t('pending')} (${nb(pend.length)})</h3>${pend.map(item).join('') || `<p class="mut">${t('none')}</p>`}
  <h3>${t('completed')}</h3>${dn.map(item).join('') || `<p class="mut">${t('none')}</p>`}`;
};
V.waste = () => {
  const d = today(), w7 = days(7), tot = S.wastes.reduce((a, x) => a + x.minutes, 0);
  return `<div class="grid">${stat(t('today'), fmt(sum(S.wastes, d)), 'bad')}${stat(t('weekly'), fmt(S.wastes.filter(x => w7.includes(x.date)).reduce((a, x) => a + x.minutes, 0)), 'bad')}${stat(t('total'), fmt(tot), 'bad')}</div>
  <div class="chips">${WT.map(k => `<button class="chip" data-a="addW" data-ty="${k}">${WI[k]} ${t(k)} ＋</button>`).join('')}</div>
  <h3 style="margin-top:18px">${t('recent')}</h3>${[...S.wastes].sort((a, b) => b.ts - a.ts).slice(0, 20).map(x => `<div class="item" data-a="editW" data-id="${x.id}"><div class="grow"><b>${WI[x.type]} ${t(x.type)}</b><small>${x.date}</small></div><b>${fmt(x.minutes)}</b></div>`).join('') || `<p class="mut">${t('none')}</p>`}`;
};
const autoS = d => { const m = {}; S.sessions.filter(x => x.date === d).forEach(x => { const k = tname(x); m[k] = (m[k] || 0) + x.minutes; }); return Object.entries(m).map(([k, v]) => `${k}: ${fmt(v)}`).join(', '); };
const autoW = d => { const m = {}; S.wastes.filter(x => x.date === d).forEach(x => m[x.type] = (m[x.type] || 0) + x.minutes); return Object.entries(m).map(([k, v]) => `${t(k)}: ${fmt(v)}`).join(', '); };
const RQ = [['studied', 'q1'], ['done', 'q2'], ['wasted', 'q3'], ['improve', 'q4']];
V.review = () => {
  const d = today(), r = S.reviews.find(x => x.date === d), au = { studied: autoS(d), wasted: autoW(d) };
  return `<div class="card" id="rv"><h3>${t('review')} · ${nb(d)}</h3>${RQ.map(([k, q]) => `<label>${t(q)}<textarea name="${k}" rows="3">${esc(r ? r[k] : au[k] || '')}</textarea></label>`).join('')}<button class="btn" data-a="saveR">${t('save')}</button></div>
  ${S.reviews.filter(x => x.date !== d).sort((a, b) => b.date.localeCompare(a.date)).slice(0, 10).map(x => `<details class="card"><summary>${nb(x.date)}</summary>${RQ.map(([k, q]) => `<p><small>${t(q)}</small><br>${esc(x[k])}</p>`).join('')}</details>`).join('')}`;
};
const bars = (o, cls, lab = x => x) => { const e = Object.entries(o).sort((a, b) => b[1] - a[1]), mx = e.length ? e[0][1] : 1;
  return e.map(([k, v]) => `<div class="hb"><span>${esc(lab(k))}</span><div><i class="${cls}" style="width:${v / mx * 100}%"></i></div><em>${fmt(v)}</em></div>`).join('') || `<p class="mut">${t('none')}</p>`; };
function chart(rows) {
  const W = 320, H = 150, mx = Math.max(60, ...rows.flatMap(r => [r.s, r.w])), g = W / rows.length, bw = 14;
  return `<svg viewBox="0 0 ${W} ${H + 22}" class="chart" role="img">${rows.map((r, i) => { const x = i * g + g / 2, a = r.s / mx * H, b = r.w / mx * H;
    return `<rect x="${x - bw - 1}" y="${H - a}" width="${bw}" height="${a}" rx="3" fill="var(--ac)"/><rect x="${x + 1}" y="${H - b}" width="${bw}" height="${b}" rx="3" fill="var(--bad)"/><text x="${x}" y="${H + 15}" text-anchor="middle">${r.l}</text>`; }).join('')}</svg>`;
}
V.stats = () => {
  const wk = S.range === 'week', ds = wk ? days(7) : [S.sd || today()];
  const ss = S.sessions.filter(x => ds.includes(x.date)), ww = S.wastes.filter(x => ds.includes(x.date));
  const st = ss.reduce((a, x) => a + x.minutes, 0), wt = ww.reduce((a, x) => a + x.minutes, 0), tot = st + wt || 1;
  const by = {}, bt = {};
  ss.forEach(x => { const k = (S.subjects.find(s => s.id === x.sid) || {}).name || '—'; by[k] = (by[k] || 0) + x.minutes; });
  ww.forEach(x => bt[x.type] = (bt[x.type] || 0) + x.minutes);
  const rows = ds.map(d => ({ l: dl(d), s: sum(S.sessions, d), w: sum(S.wastes, d) })), best = rows.reduce((a, b) => b.s > a.s ? b : a, rows[0]);
  return `<div class="seg"><button class="${wk ? '' : 'on'}" data-a="rng" data-r="day">${t('daily')}</button><button class="${wk ? 'on' : ''}" data-a="rng" data-r="week">${t('weekly')}</button></div>
  ${wk ? '' : `<input type="date" id="sd" value="${ds[0]}">`}
  <div class="grid">${stat(t('studyToday'), fmt(st))}${stat(t('wasted'), fmt(wt), 'bad')}${wk ? stat(t('avg'), fmt(st / 7)) + stat(t('best'), best.s ? best.l : '—') : stat(t('done'), nb(S.tasks.filter(x => x.doneDate === ds[0]).length)) + stat(t('score'), nb(score(ds[0])))}</div>
  <div class="card"><h3>${t('studyVs')}</h3>${wk ? chart(rows) : ''}<div class="split"><i style="width:${st / tot * 100}%"></i><b style="width:${wt / tot * 100}%"></b></div><small>${t('study')} ${nb(Math.round(st / tot * 100))}% · ${t('waste')} ${nb(Math.round(wt / tot * 100))}%</small></div>
  <div class="card"><h3>${t('bySubject')}</h3>${bars(by, '')}</div><div class="card"><h3>${t('waste')}</h3>${bars(bt, 'bad', t)}</div>`;
};
V.set = () => {
  const c = S.cfg, i = (l, k, ty = 'number', x = '') => `<label>${l}<input data-k="${k}" type="${ty}" value="${c[k]}" ${x}></label>`, cb = (l, k) => `<label class="sw"><input data-k="${k}" type="checkbox" ${c[k] ? 'checked' : ''}>${l}</label>`;
  return `<h2>${t('settings')}</h2><div class="card">${i(t('target') + ' (' + t('hours') + ')', 'target', 'number', 'min="0.5" step="0.5"')}</div>
  <div class="card"><h3>${t('reminders')}</h3>${cb(t('studyRem'), 'rs')}${i('', 'rst', 'time')}${cb(t('revRem'), 'rr')}${i('', 'rrt', 'time')}${cb(t('taskRem'), 'rt')}${i(t('minBefore'), 'rtm', 'number', 'min="1"')}
  <button class="btn" data-a="notif">🔔 ${t('enableNotif')}</button><p><small>${t('notifHelp')}</small></p></div>
  <div class="card"><div class="row"><button class="btn ghost" data-a="exp">⬇ ${t('export')}</button><label class="btn ghost" style="margin:0">⬆ ${t('import')}<input type="file" id="imp" accept=".json" hidden></label></div></div>
  ${aboutCard()}`;
};

/* ---------- actions ---------- */
const A = {
  go: d => { S.view = d.v; draw(); },
  start: async () => { S.timer = { start: Date.now(), ...parse($('#tp').value) }; await setKV('timer', S.timer); render(); },
  stop: async () => {
    const tm = S.timer, mins = Math.max(1, Math.round((Date.now() - tm.start) / 60000));
    await setKV('timer', null);
    const x = { date: today(), minutes: mins, sid: tm.sid, cid: tm.cid, note: '', ts: Date.now() };
    x.id = await put('sessions', x);
    await render(); sesForm(x);
  },
  manual: () => sesForm({ date: today(), minutes: 30, note: '' }),
  editSes: d => sesForm(S.sessions.find(x => x.id == d.id)),
  addS: () => modal(t('addSubject'), [{ n: 'name', l: t('subject'), req: 1 }], o => put('subjects', { name: o.name })),
  editS: d => { const s = S.subjects.find(x => x.id == d.id); modal(t('edit'), [{ n: 'name', l: t('subject'), v: s.name, req: 1 }], o => put('subjects', { ...s, name: o.name }), async () => { await del('subjects', s.id); for (const c of S.chapters.filter(c => c.sid === s.id)) await del('chapters', c.id); }); },
  addC: () => S.subjects.length ? modal(t('addChapter'), [{ n: 'sid', l: t('subject'), type: 'select', o: S.subjects.map(s => [s.id, s.name]) }, { n: 'name', l: t('chapter'), req: 1 }], o => put('chapters', { sid: +o.sid, name: o.name })) : toast(t('addSubjectFirst')),
  editC: d => { const c = S.chapters.find(x => x.id == d.id); modal(t('edit'), [{ n: 'name', l: t('chapter'), v: c.name, req: 1 }], o => put('chapters', { ...c, name: o.name }), () => del('chapters', c.id)); },
  addT: () => taskForm({}),
  editT: d => taskForm(S.tasks.find(x => x.id == d.id)),
  tg: async d => { const x = S.tasks.find(a => a.id == d.id); x.done = !x.done; x.doneDate = x.done ? today() : null; await put('tasks', x); render(); },
  addW: d => wasteForm({ type: d.ty, minutes: 15, date: today() }),
  editW: d => wasteForm(S.wastes.find(x => x.id == d.id)),
  saveR: async () => { const v = {}; document.querySelectorAll('#rv textarea').forEach(e => v[e.name] = e.value); const r = S.reviews.find(x => x.date === today()) || {}; await put('reviews', { ...r, ...v, date: today() }); toast('✓ ' + t('saved')); render(); },
  rng: d => { S.range = d.r; draw(); },
  calMode: d => { S.cal = d.m; S.calOff = 0; draw(); },
  calNav: d => { S.calOff = Math.min(0, S.calOff + +d.n); draw(); },
  calDay: d => toast(nb(d.d) + ' · ' + fmt(gami().per[d.d] || 0)),
  sTg: async d => {
    if (!SP.includes(d.p) || !/^\d{4}-\d{2}-\d{2}$/.test(d.d) || d.d > today()) return;
    const rec = await getKV('salah', {}), set = new Set((rec[d.d] || []).filter(p => SP.includes(p))), was = set.size === SP.length;
    set.has(d.p) ? set.delete(d.p) : set.add(d.p);
    const arr = SP.filter(p => set.has(p));
    if (arr.length) rec[d.d] = arr; else delete rec[d.d];
    await setKV('salah', rec);
    await render();
    if (arr.length === SP.length && !was) toast('🕌 +' + G.SALAH + ' XP — ' + t('salahDone'));
  },
  sDay: d => { S.sl = d.d; draw(); },
  notif: async () => { if (!('Notification' in window)) return toast(t('notifHelp')); toast((await Notification.requestPermission()) === 'granted' ? '✓' : '✗'); },
  exp: async () => { const o = {}; for (const s of STORES) o[s] = await all(s); const a = document.createElement('a'); a.href = URL.createObjectURL(new Blob([JSON.stringify(o)], { type: 'application/json' })); a.download = 'studyos-backup-' + today() + '.json'; a.click(); }
};
async function importData(f) {
  if (!f) return;
  try { const o = JSON.parse(await f.text()); for (const s of STORES) { await tx(s, 'readwrite', x => x.clear()); for (const r of o[s] || []) await put(s, r); } await render(); toast('✓'); } catch (e) { toast('✗ Invalid file'); }
}

/* ---------- reminders (run while app is open) ---------- */
async function notify(title, body) {
  toast(title + (body ? ' — ' + body : ''));
  if ('Notification' in window && Notification.permission === 'granted') {
    try { const r = await navigator.serviceWorker.ready; r.showNotification(title, { body, icon: 'icons/icon-192.png', tag: title + body }); }
    catch (e) { try { new Notification(title, { body }); } catch (e2) { } }
  }
}
async function remind() {
  const n = new Date(), hm = n.toTimeString().slice(0, 5), d = dk(n), c = S.cfg, f = await getKV('fired', {});
  let ch = 0; const go = (id, a, b) => { if (f[id]) return; f[id] = 1; ch = 1; notify(a, b); };
  if (c.rs && hm >= c.rst) go('s' + d, '📚 StudyOS', t('studyMsg'));
  if (c.rr && hm >= c.rrt && !S.reviews.some(x => x.date === d)) go('r' + d, '📝 StudyOS', t('revMsg'));
  if (c.rt) S.tasks.filter(x => !x.done && x.deadline).forEach(x => { const ms = new Date(x.deadline) - n; if (ms <= c.rtm * 60000 && ms > -3600000) go('t' + x.id + x.deadline, '✅ ' + x.title, t('taskMsg')); });
  if (ch) await setKV('fired', f);
}

/* ---------- draw + events ---------- */
const NAV = [['home', '🏠'], ['study', '📚'], ['tasks', '✅'], ['waste', '⏳'], ['review', '📝'], ['stats', '📊']];
function tick() { if (S.timer) document.querySelectorAll('.clk').forEach(e => e.textContent = nb(clock(Date.now() - S.timer.start))); }
function draw() {
  const c = S.cfg, th = c.theme || (matchMedia('(prefers-color-scheme:dark)').matches ? 'dark' : 'light');
  document.documentElement.dataset.theme = th; document.documentElement.lang = c.lang;
  $('#langBtn').textContent = c.lang === 'bn' ? 'EN' : 'বাং'; $('#themeBtn').textContent = th === 'dark' ? '☀' : '☾';
  $('#nav').innerHTML = NAV.map(([k, i]) => `<button data-v="${k}" class="${S.view === k ? 'on' : ''}"><i>${i}</i><span>${t(k)}</span></button>`).join('');
  $('#app').innerHTML = V[S.view](); tick();
}
$('#nav').onclick = e => { const b = e.target.closest('[data-v]'); if (b) { S.view = b.dataset.v; draw(); scrollTo(0, 0); } };
$('#setBtn').onclick = () => { S.view = 'set'; draw(); };
$('#langBtn').onclick = async () => { S.cfg.lang = S.cfg.lang === 'bn' ? 'en' : 'bn'; await saveCfg(); draw(); };
$('#themeBtn').onclick = async () => { S.cfg.theme = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark'; await saveCfg(); draw(); };
$('#app').onclick = e => { const b = e.target.closest('[data-a]'); if (b && A[b.dataset.a]) A[b.dataset.a](b.dataset); };
$('#app').onchange = e => {
  const el = e.target, k = el.dataset.k;
  if (k) { S.cfg[k] = el.type === 'checkbox' ? el.checked : el.type === 'number' ? +el.value : el.value; saveCfg(); }
  if (el.id === 'sd') { S.sd = el.value; draw(); }
  if (el.id === 'imp') importData(el.files[0]);
};

(async () => {
  await openDB(); await load(); await gamiCheck(); draw(); remind();
  setInterval(remind, 30000); setInterval(tick, 1000);
  document.addEventListener('visibilitychange', () => { if (!document.hidden) { tick(); remind(); } });
  if ('serviceWorker' in navigator && !window.Capacitor) navigator.serviceWorker.register('sw.js').catch(() => { });
  if (navigator.storage && navigator.storage.persist) navigator.storage.persist();
})();
