import React, { useState, useEffect, useRef, useCallback, useMemo, useReducer } from 'react';

const useFetch = (url) => {
  const [state, setState] = useState({ data: null, loading: true, error: null });
  useEffect(() => {
    const ctrl = new AbortController();
    setState({ data: null, loading: true, error: null });
    fetch(url, { signal: ctrl.signal })
      .then(r => { if (!r.ok) throw new Error(r.statusText); return r.json(); })
      .then(data => setState({ data, loading: false, error: null }))
      .catch(e => { if (e.name !== 'AbortError') setState({ data: null, loading: false, error: e.message }); });
    return () => ctrl.abort();
  }, [url]);
  return state;
};

const useDebounce = (value, delay) => {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const id = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(id);
  }, [value, delay]);
  return debounced;
};

const useLocalStorage = (key, initial) => {
  const [val, setVal] = useState(() => {
    try { const s = localStorage.getItem(key); return s ? JSON.parse(s) : initial; }
    catch { return initial; }
  });
  const set = useCallback(v => { setVal(v); localStorage.setItem(key, JSON.stringify(v)); }, [key]);
  return [val, set];
};

const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD': {
      const ex = state.find(i => i.id === action.item.id);
      return ex ? state.map(i => i.id === action.item.id ? { ...i, qty: i.qty + 1 } : i) : [...state, { ...action.item, qty: 1 }];
    }
    case 'REMOVE': return state.filter(i => i.id !== action.id);
    case 'CLEAR': return [];
    default: return state;
  }
};

const PRODUCTS = [
  { id: 1, name: 'React Book', price: 29 },
  { id: 2, name: 'Node.js Guide', price: 24 },
  { id: 3, name: 'TypeScript Handbook', price: 19 },
  { id: 4, name: 'CSS Mastery', price: 15 },
];

class ErrorBoundary extends React.Component {
  state = { hasError: false, error: null };
  static getDerivedStateFromError(error) { return { hasError: true, error }; }
  componentDidCatch(error, info) { console.error('Boundary:', error, info); }
  render() {
    if (this.state.hasError)
      return (
        <div style={{ background: '#2d1b1b', border: '1px solid #da3633', borderRadius: '6px', padding: '14px', color: '#ff6b6b', marginBottom: '10px' }}>
          <p>Caught: <strong>{this.state.error?.message}</strong></p>
          <button style={{ background: '#238636', color: '#fff', border: 'none', padding: '6px 12px', borderRadius: '6px', cursor: 'pointer', marginTop: '8px' }}
            onClick={() => this.setState({ hasError: false, error: null })}>Retry</button>
        </div>
      );
    return this.props.children;
  }
}

const BrokenComp = () => { throw new Error('Simulated crash!'); };

const ds = {
  demo: { background: '#0d1117', border: '1px solid #30363d', borderRadius: '8px', padding: '18px' },
  demoTitle: { color: '#c957ff', marginBottom: '14px', fontSize: '0.88rem', fontWeight: 700 },
  row: { display: 'flex', gap: '8px', marginBottom: '12px', flexWrap: 'wrap', alignItems: 'center' },
  row2: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '7px 0', borderBottom: '1px solid #1c2128' },
  label: { color: '#8b949e', fontSize: '0.72rem', fontWeight: 700, letterSpacing: '1px', marginBottom: '8px' },
  result: { background: '#161b22', borderRadius: '6px', padding: '12px', fontSize: '0.88rem', lineHeight: 1.8, color: '#ccc' },
  numBtn: { background: '#1c2128', border: '1px solid #30363d', color: '#8b949e', padding: '5px 12px', borderRadius: '6px', cursor: 'pointer', fontSize: '0.82rem' },
  numActive: { background: '#c957ff', color: '#fff', border: '1px solid #c957ff' },
  addBtn: { background: '#238636', color: '#fff', border: 'none', padding: '6px 12px', borderRadius: '6px', cursor: 'pointer', fontSize: '0.8rem' },
  remBtn: { background: '#da3633', color: '#fff', border: 'none', padding: '6px 12px', borderRadius: '6px', cursor: 'pointer', fontSize: '0.8rem' },
  clrBtn: { background: '#1c2128', color: '#ccc', border: '1px solid #30363d', padding: '6px 12px', borderRadius: '6px', cursor: 'pointer', fontSize: '0.8rem' },
  listItem: { padding: '7px 10px', background: '#161b22', borderRadius: '4px', marginBottom: '4px', cursor: 'pointer', fontSize: '0.82rem', color: '#ccc' },
  input: { background: '#1c2128', border: '1px solid #30363d', color: '#fff', padding: '6px 12px', borderRadius: '6px', fontSize: '0.82rem', outline: 'none' },
};

const FetchDemo = () => {
  const [userId, setUserId] = useState(1);
  const { data, loading, error } = useFetch(`https://jsonplaceholder.typicode.com/users/${userId}`);
  return (
    <div style={ds.demo}>
      <p style={ds.demoTitle}>Live: useFetch with AbortController</p>
      <div style={ds.row}>
        {[1,2,3,4,5].map(id => (
          <button key={id} style={{...ds.numBtn,...(userId===id?ds.numActive:{})}} onClick={() => setUserId(id)}>User {id}</button>
        ))}
      </div>
      {loading && <p style={{color:'#8b949e',fontSize:'0.85rem'}}>Fetching...</p>}
      {error && <p style={{color:'#ff6b6b',fontSize:'0.85rem'}}>Error: {error}</p>}
      {data && <div style={ds.result}><p><b>Name:</b> {data.name}</p><p><b>Email:</b> {data.email}</p><p><b>Company:</b> {data.company?.name}</p></div>}
    </div>
  );
};

const CartDemo = () => {
  const [cart, dispatch] = useReducer(cartReducer, []);
  const total = useMemo(() => cart.reduce((s, i) => s + i.price * i.qty, 0), [cart]);
  return (
    <div style={ds.demo}>
      <p style={ds.demoTitle}>Live: useReducer Cart + useMemo total</p>
      <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'16px'}}>
        <div>
          <p style={ds.label}>Products</p>
          {PRODUCTS.map(p => (
            <div key={p.id} style={ds.row2}>
              <span style={{color:'#ccc',fontSize:'0.83rem'}}>{p.name} - ${p.price}</span>
              <button style={ds.addBtn} onClick={() => dispatch({type:'ADD',item:p})}>+ Add</button>
            </div>
          ))}
        </div>
        <div>
          <p style={ds.label}>Cart ({cart.length})</p>
          {cart.length === 0 && <p style={{color:'#8b949e',fontSize:'0.82rem'}}>Empty</p>}
          {cart.map(i => (
            <div key={i.id} style={ds.row2}>
              <span style={{color:'#ccc',fontSize:'0.82rem'}}>{i.name} x{i.qty} = ${i.price*i.qty}</span>
              <button style={ds.remBtn} onClick={() => dispatch({type:'REMOVE',id:i.id})}>x</button>
            </div>
          ))}
          {cart.length > 0 && (
            <div style={{display:'flex',justifyContent:'space-between',marginTop:'10px',paddingTop:'10px',borderTop:'1px solid #30363d'}}>
              <strong style={{color:'#c9ff57'}}>Total: ${total}</strong>
              <button style={ds.clrBtn} onClick={() => dispatch({type:'CLEAR'})}>Clear</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const ErrorBoundaryDemo = () => {
  const [crash, setCrash] = useState(false);
  return (
    <div style={ds.demo}>
      <p style={ds.demoTitle}>Live: Error Boundary</p>
      <ErrorBoundary>
        {crash ? <BrokenComp /> : <p style={{color:'#3fb950',fontSize:'0.85rem'}}>Component is healthy</p>}
      </ErrorBoundary>
      <button style={{...ds.addBtn,background:crash?'#238636':'#da3633',marginTop:'8px'}} onClick={() => setCrash(c => !c)}>
        {crash ? 'Reset' : 'Trigger Crash'}
      </button>
    </div>
  );
};

const ExpList = React.memo(({ items, onSelect }) => (
  <ul style={{listStyle:'none',padding:0,maxHeight:'160px',overflowY:'auto'}}>
    {items.map(item => (
      <li key={item.id} style={ds.listItem} onClick={() => onSelect(item)}>
        {item.name} - score: {item.score}
      </li>
    ))}
  </ul>
));

const MemoDemo = () => {
  const [filter, setFilter] = useState('');
  const [selected, setSelected] = useState(null);
  const [count, setCount] = useState(0);
  const raw = useMemo(() => Array.from({length:20},(_,i) => ({id:i,name:`Item ${i}`,score:Math.floor(Math.random()*100)})), []);
  const filtered = useMemo(() => raw.filter(i => i.name.includes(filter)), [raw, filter]);
  const onSelect = useCallback(item => setSelected(item), []);
  return (
    <div style={ds.demo}>
      <p style={ds.demoTitle}>Live: useCallback + useMemo + React.memo</p>
      <div style={ds.row}>
        <input style={ds.input} placeholder="Filter..." value={filter} onChange={e => setFilter(e.target.value)} />
        <button style={ds.addBtn} onClick={() => setCount(c => c+1)}>Re-render parent ({count})</button>
      </div>
      <p style={{color:'#8b949e',fontSize:'0.78rem',marginBottom:'8px'}}>ExpList is memoized - skips re-render on parent update</p>
      {selected && <p style={{color:'#c9ff57',fontSize:'0.82rem',marginBottom:'6px'}}>Selected: {selected.name}</p>}
      <ExpList items={filtered} onSelect={onSelect} />
    </div>
  );
};

const DebounceDemo = () => {
  const [query, setQuery] = useState('');
  const debounced = useDebounce(query, 500);
  const url = `https://jsonplaceholder.typicode.com/posts?_limit=3${debounced ? '&q=' + debounced : ''}`;
  const { data, loading } = useFetch(url);
  return (
    <div style={ds.demo}>
      <p style={ds.demoTitle}>Live: useDebounce - API called 500ms after typing stops</p>
      <input style={{...ds.input,width:'100%',marginBottom:'10px'}} placeholder="Type to search posts..." value={query} onChange={e => setQuery(e.target.value)} />
      <p style={{color:'#8b949e',fontSize:'0.78rem',marginBottom:'8px'}}>Debounced: <span style={{color:'#c9ff57'}}>"{debounced}"</span> {loading && 'loading...'}</p>
      {data && data.map(p => <div key={p.id} style={ds.listItem}>{p.title.slice(0,55)}...</div>)}
    </div>
  );
};

const StorageDemo = () => {
  const [theme, setTheme] = useLocalStorage('demo-theme', 'dark');
  const [notes, setNotes] = useLocalStorage('demo-notes', '');
  return (
    <div style={ds.demo}>
      <p style={ds.demoTitle}>Live: useLocalStorage - persists across refresh</p>
      <div style={ds.row}>
        <span style={{color:'#8b949e',fontSize:'0.85rem'}}>Theme:</span>
        {['dark','light','blue'].map(t => (
          <button key={t} style={{...ds.numBtn,...(theme===t?ds.numActive:{})}} onClick={() => setTheme(t)}>{t}</button>
        ))}
      </div>
      <textarea
        style={{...ds.input,width:'100%',height:'70px',marginTop:'10px',resize:'vertical'}}
        placeholder="Type notes - they persist on refresh..."
        value={notes}
        onChange={e => setNotes(e.target.value)}
      />
      <p style={{color:'#8b949e',fontSize:'0.75rem',marginTop:'6px'}}>Saved to localStorage key: "demo-notes"</p>
    </div>
  );
};

const StopwatchDemo = () => {
  const [time, setTime] = useState(0);
  const [running, setRunning] = useState(false);
  const ref = useRef(null);
  const start = () => { if (running) return; setRunning(true); ref.current = setInterval(() => setTime(t => t+10), 10); };
  const stop = () => { clearInterval(ref.current); setRunning(false); };
  const reset = () => { stop(); setTime(0); };
  useEffect(() => () => clearInterval(ref.current), []);
  const fmt = ms => {
    const m = Math.floor(ms/60000).toString().padStart(2,'0');
    const s = Math.floor((ms%60000)/1000).toString().padStart(2,'0');
    const cs = Math.floor((ms%1000)/10).toString().padStart(2,'0');
    return `${m}:${s}.${cs}`;
  };
  return (
    <div style={ds.demo}>
      <p style={ds.demoTitle}>Live: useRef Stopwatch - interval ID in ref, no extra re-render</p>
      <div style={{fontSize:'2.5rem',fontWeight:800,color:'#c957ff',textAlign:'center',fontFamily:'monospace',padding:'16px 0'}}>{fmt(time)}</div>
      <div style={ds.row}>
        <button style={ds.addBtn} onClick={start} disabled={running}>Start</button>
        <button style={ds.remBtn} onClick={stop} disabled={!running}>Stop</button>
        <button style={ds.clrBtn} onClick={reset}>Reset</button>
      </div>
    </div>
  );
};

const IMPLS = [
  { id:1, title:'useFetch + AbortController', tags:['Custom Hook','Async','Cleanup'], marks:'Functional completeness + Security + Code quality',
    code:'const useFetch = (url) => {\n  const [state, setState] = useState({ data:null, loading:true, error:null });\n  useEffect(() => {\n    const ctrl = new AbortController();\n    fetch(url, { signal: ctrl.signal })\n      .then(r => { if(!r.ok) throw new Error(r.statusText); return r.json(); })\n      .then(data => setState({ data, loading:false, error:null }))\n      .catch(e => { if(e.name!=="AbortError") setState({ data:null, loading:false, error:e.message }); });\n    return () => ctrl.abort();\n  }, [url]);\n  return state;\n};',
    component: <FetchDemo /> },
  { id:2, title:'useReducer Cart + useMemo', tags:['useReducer','useMemo','State'], marks:'Technical design + Validation + Code quality',
    code:'const cartReducer = (state, action) => {\n  switch(action.type) {\n    case "ADD": { const ex=state.find(i=>i.id===action.item.id); return ex?state.map(i=>i.id===action.item.id?{...i,qty:i.qty+1}:i):[...state,{...action.item,qty:1}]; }\n    case "REMOVE": return state.filter(i=>i.id!==action.id);\n    case "CLEAR": return [];\n    default: return state;\n  }\n};\nconst [cart, dispatch] = useReducer(cartReducer, []);\nconst total = useMemo(()=>cart.reduce((s,i)=>s+i.price*i.qty,0),[cart]);',
    component: <CartDemo /> },
  { id:3, title:'Error Boundary', tags:['Class Component','Error Handling','Fallback UI'], marks:'Security + Reliability + User feedback',
    code:'class ErrorBoundary extends React.Component {\n  state = { hasError:false, error:null };\n  static getDerivedStateFromError(error) { return { hasError:true, error }; }\n  componentDidCatch(error, info) { console.error("Boundary:", error, info); }\n  render() {\n    if(this.state.hasError) return <Fallback onRetry={()=>this.setState({hasError:false})}/>;\n    return this.props.children;\n  }\n}',
    component: <ErrorBoundaryDemo /> },
  { id:4, title:'useCallback + useMemo + React.memo', tags:['Performance','Memoization','React.memo'], marks:'Technical design + Code quality + Architecture',
    code:'const ExpList = React.memo(({ items, onSelect }) => (\n  <ul>{items.map(item=><li key={item.id} onClick={()=>onSelect(item)}>{item.name}</li>)}</ul>\n));\nconst filtered = useMemo(()=>raw.filter(i=>i.name.includes(filter)),[raw,filter]);\nconst onSelect = useCallback(item=>setSelected(item),[]);',
    component: <MemoDemo /> },
  { id:5, title:'useDebounce Custom Hook', tags:['Custom Hook','Performance','API Optimization'], marks:'Functional completeness + Code quality',
    code:'const useDebounce = (value, delay) => {\n  const [debounced, setDebounced] = useState(value);\n  useEffect(() => {\n    const id = setTimeout(()=>setDebounced(value), delay);\n    return ()=>clearTimeout(id);\n  }, [value, delay]);\n  return debounced;\n};\nconst debounced = useDebounce(query, 500);\nuseEffect(()=>{ if(debounced) fetchResults(debounced); },[debounced]);',
    component: <DebounceDemo /> },
  { id:6, title:'useLocalStorage Custom Hook', tags:['Custom Hook','Persistence','localStorage'], marks:'Functional completeness + Technical design',
    code:'const useLocalStorage = (key, initial) => {\n  const [val, setVal] = useState(()=>{\n    try { const s=localStorage.getItem(key); return s?JSON.parse(s):initial; }\n    catch { return initial; }\n  });\n  const set = useCallback(v=>{ setVal(v); localStorage.setItem(key,JSON.stringify(v)); },[key]);\n  return [val, set];\n};\nconst [theme, setTheme] = useLocalStorage("theme","dark");',
    component: <StorageDemo /> },
  { id:7, title:'useRef Stopwatch', tags:['useRef','setInterval','Cleanup'], marks:'Functional completeness + Code quality',
    code:'const ref = useRef(null);\nconst start = () => { ref.current=setInterval(()=>setTime(t=>t+10),10); setRunning(true); };\nconst stop = () => { clearInterval(ref.current); setRunning(false); };\nuseEffect(()=>()=>clearInterval(ref.current), []); // cleanup on unmount',
    component: <StopwatchDemo /> },
];

export default function Round4Implementation() {
  const [open, setOpen] = useState(null);
  const [showCode, setShowCode] = useState({});
  const [done, setDone] = useState({});
  const doneCount = Object.values(done).filter(Boolean).length;

  return (
    <div style={s.page}>
      <div style={s.header}>
        <div>
          <span style={s.round}>ROUND 4 - 45 MARKS</span>
          <h1 style={s.h1}><span style={{color:'#c957ff'}}>7 implementations</span><br/>Technical implementation</h1>
          <p style={s.sub}>Attempt at least 3. Each evaluated at 15 marks. All 7 have live demos + code view.</p>
        </div>
        <div style={s.score}>
          <div style={s.scoreNum}>{doneCount}/7</div>
          <div style={s.scoreLabel}>Done</div>
        </div>
      </div>

      <div style={s.marksBox}>
        {['6 - Functional completeness','2 - Technical design','2 - Security & secure coding','2 - Validation & feedback','2 - Code quality','1 - Testing & explanation'].map(m => (
          <div key={m} style={{color:'#8b949e',fontSize:'0.82rem',minWidth:'200px'}}>- {m}</div>
        ))}
      </div>

      <div style={s.list}>
        {IMPLS.map(impl => (
          <div key={impl.id} style={{...s.card,...(open===impl.id?s.cardActive:{}),...(done[impl.id]?s.cardDone:{})}}>
            <div style={s.cardHeader} onClick={() => setOpen(open===impl.id?null:impl.id)}>
              <span style={s.implNum}>#{impl.id}</span>
              <div style={{flex:1}}>
                <h3 style={s.implTitle}>{impl.title}</h3>
                <p style={{color:'#8b949e',fontSize:'0.72rem',margin:'2px 0 0'}}>{impl.marks}</p>
              </div>
              <div style={s.tags}>{impl.tags.map(t => <span key={t} style={s.tag}>{t}</span>)}</div>
              {done[impl.id] && <span style={s.doneBadge}>Done</span>}
              <span style={{color:'#8b949e',fontSize:'0.8rem'}}>{open===impl.id?'▲':'▼'}</span>
            </div>
            {open===impl.id && (
              <div style={s.body}>
                <div style={s.tabRow}>
                  <button style={{...s.tabBtn,...(!showCode[impl.id]?s.tabActive:{})}} onClick={() => setShowCode(p=>({...p,[impl.id]:false}))}>Live Demo</button>
                  <button style={{...s.tabBtn,...(showCode[impl.id]?s.tabActive:{})}} onClick={() => setShowCode(p=>({...p,[impl.id]:true}))}>Code</button>
                  <button style={{...s.doneBtn,background:done[impl.id]?'#1c2128':'#238636',marginLeft:'auto'}} onClick={() => setDone(p=>({...p,[impl.id]:!p[impl.id]}))}>
                    {done[impl.id]?'Unmark':'Mark Done'}
                  </button>
                </div>
                {showCode[impl.id] ? <pre style={s.pre}>{impl.code}</pre> : impl.component}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

const s = {
  page: {padding:'40px',maxWidth:'1000px',margin:'0 auto'},
  header: {display:'flex',justifyContent:'space-between',alignItems:'flex-start',marginBottom:'24px'},
  round: {color:'#c957ff',fontSize:'0.72rem',letterSpacing:'2px'},
  h1: {fontSize:'2.5rem',fontWeight:800,margin:'10px 0'},
  sub: {color:'#8b949e',fontSize:'0.9rem'},
  score: {background:'#161b22',border:'1px solid #30363d',borderRadius:'12px',padding:'16px 24px',textAlign:'center',minWidth:'90px'},
  scoreNum: {fontSize:'2rem',fontWeight:800,color:'#c957ff'},
  scoreLabel: {color:'#8b949e',fontSize:'0.75rem'},
  marksBox: {background:'#161b22',border:'1px solid #30363d',borderRadius:'8px',padding:'14px 18px',marginBottom:'24px',display:'flex',flexWrap:'wrap',gap:'8px'},
  list: {display:'flex',flexDirection:'column',gap:'10px'},
  card: {background:'#161b22',border:'1px solid #30363d',borderRadius:'10px',overflow:'hidden'},
  cardActive: {border:'1px solid #c957ff'},
  cardDone: {border:'1px solid #3fb950',opacity:0.85},
  cardHeader: {display:'flex',alignItems:'center',gap:'12px',padding:'16px 20px',cursor:'pointer'},
  implNum: {color:'#c957ff',fontWeight:700,minWidth:'24px',fontSize:'0.9rem'},
  implTitle: {fontSize:'0.95rem',fontWeight:600,margin:0},
  tags: {display:'flex',gap:'5px',flexWrap:'wrap'},
  tag: {background:'#1c2128',border:'1px solid #30363d',color:'#8b949e',padding:'2px 7px',borderRadius:'4px',fontSize:'0.7rem'},
  doneBadge: {background:'#3fb95022',color:'#3fb950',fontSize:'0.7rem',padding:'2px 8px',borderRadius:'10px'},
  body: {padding:'0 20px 20px'},
  tabRow: {display:'flex',gap:'8px',marginBottom:'12px',alignItems:'center'},
  tabBtn: {background:'#0d1117',border:'1px solid #30363d',color:'#8b949e',padding:'6px 14px',borderRadius:'6px',cursor:'pointer',fontSize:'0.82rem'},
  tabActive: {background:'#1c2128',border:'1px solid #c957ff',color:'#fff'},
  doneBtn: {color:'#fff',border:'none',padding:'6px 14px',borderRadius:'6px',cursor:'pointer',fontSize:'0.8rem'},
  pre: {background:'#0d1117',border:'1px solid #30363d',borderRadius:'6px',padding:'14px',color:'#e6edf3',fontSize:'0.76rem',overflowX:'auto',whiteSpace:'pre-wrap'},
};
