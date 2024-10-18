import{c as p}from"./index.f6e68809.js";import{a as e,h as y,j as d,aZ as I,r as f,a_ as k,a$ as E,u as F,am as w,av as D,au as j,aw as A,aQ as h,ap as b}from"./react-select.esm.90a3a7d9.js";import{C as z,M,a as K,e as R,c as T}from"./store_list.d1e98cff.js";import{E as N,u as q}from"./AntdProvider.69a49074.js";const g=({children:t,className:c,groupTitle:n,size:a,unstyled:i=!1,notGlobalCol:m=!1,...o})=>e(y,{children:d("div",{className:p(!m&&"grid gap-x-3","grid-cols-2",!i&&"mb-10 rounded-lg  p-2 shadow-lg shadow-slate-500/40 ",c),...o,children:[n&&e("h1",{className:"col-span-full mb-3 text-center text-2xl font-bold text-gray-800",children:n}),t]})}),Q=({children:t,title:c,className:n,...a})=>d("div",{className:p("col-span-full grid gap-x-3","grid-cols-2"),...a,children:[c&&e("h1",{className:"col-span-full mb-1  text-xl font-bold text-gray-800",children:c}),t]});g.Item=Q;function P(){return e("div",{className:"flex h-full w-full items-center justify-center",children:e(I,{size:"large"})})}function G(t){const[c,n]=f.exports.useState(null),[a,i]=f.exports.useState([]);f.exports.useEffect(()=>{if(!t.current)return;const u=t.current.querySelectorAll("div[id]"),s=Array.from(u).map(r=>({label:r.getAttribute("aria-label")||"",key:r.id}));i(s)},[t]);const m=l=>{var s;const u=(s=t.current)==null?void 0:s.querySelector(`#${l}`);u&&(u.scrollIntoView({behavior:"smooth"}),n(l))},o=f.exports.useCallback(()=>{if(!t.current)return;const l=t.current.scrollTop;a.forEach(({key:u})=>{const s=document.getElementById(u);if(s){const r=s.getBoundingClientRect();l>=r.top&&l<r.bottom&&n(u)}})},[a,t]);return f.exports.useEffect(()=>{if(!t.current)return;const l=t.current;return l.addEventListener("scroll",o),()=>{l.removeEventListener("scroll",o)}},[t,o]),{activeKey:c,handleClick:m,tabArray:a}}const L=({className:t,tabClassName:c,tabsClassName:n,children:a,mode:i="horizontal",isSwitch:m})=>{var C;const[o,l]=f.exports.useState(i),u=f.exports.useRef(null),s=G(u),r=s.activeKey?s.activeKey:((C=s.tabArray[0])==null?void 0:C.key)||"",{handleClick:v,tabArray:S}=s;return d(y,{children:[d("nav",{className:p("flex h-[2rem] items-center justify-center gap-1  bg-white ","animate-in fade-in  ease-in-out",o==="vertical"&&"absolute right-4 top-1/2  z-10 translate-y-[-50%] transform flex-col bg-transparent backdrop-blur-sm backdrop-filter",n),children:[S.map(({key:x,label:B})=>e("div",{className:p("relative min-w-[60px] cursor-pointer text-center font-semibold     hover:text-blue-600  ",'after:absolute after:top-6 after:hidden after:h-0.5 after:w-full after:bg-blue-500 after:content-[""]  after:animate-in after:fade-in after:zoom-in after:duration-300 hover:after:block',o==="vertical"&&"after:top-0 after:h-full after:w-0.5",r===x&&"after:block text-blue-600",c),onClick:()=>v(x),children:B},x)),!!m&&e(k,{checkedChildren:"horizontal",unCheckedChildren:"vertical",defaultChecked:!0,onChange:()=>l(o==="vertical"?"horizontal":"vertical")})]}),e(z,{ref:u,className:p("h-[calc(100vh-6rem)] overflow-y-auto scroll-smooth  scrollbar-thin scrollbar-track-gray-100 scrollbar-thumb-dark ",t,o==="vertical"&&" h-[calc(100vh-4rem)] pr-12"),children:a})]})},_=()=>d(E.Group,{children:[e(E.Button,{children:"\u5C0F"}),e(E.Button,{children:"\u9810\u8A2D"}),e(E.Button,{children:"\u5927"})]}),V=({onClick:t,className:c,children:n,...a})=>{const i=F(),m=()=>i(-1);return e(N,{className:p("slide",c),onClick:t||m,...a,children:n||" \u56DE\u4E0A\u4E00\u9801"})},$=({title:t})=>e(y,{children:d("div",{className:" flex items-center justify-between",children:[e("h1",{className:"text-3xl",children:t}),d("div",{className:"flex gap-2",children:[e(V,{}),e(_,{})]})]})}),J=()=>{const{id:t="create"}=w(),c=t==="create"?"\u5275\u5EFA":"\u4FEE\u6539",n=D(),{message:a}=q(),i=F(),{data:m={},isFetching:o}=j({queryKey:["store",t],queryFn:()=>K(t),enabled:t!=="create"}),{mutate:l}=A({mutationFn:R,onSuccess:()=>{a.success("\u4FEE\u6539\u6210\u529F"),n.invalidateQueries(["store_list"]),i(-1)},onError:r=>{a==null||a.error("\u4FEE\u6539\u5931\u6557!!"+(r==null?void 0:r.message)||"")}}),{mutate:u}=A({mutationFn:T,onSuccess:r=>{a.success("\u5275\u5EFA\u6210\u529F"),n.invalidateQueries(["store_list"]),i(-1)},onError:r=>{a==null||a.error("\u5275\u5EFA\u5931\u6557!!"+(r==null?void 0:r.message)||"")}}),s=r=>{if(t==="create")u(r);else{const v={id:t,...r};l(v)}};return o?e(P,{}):e(L,{children:d(M,{children:[e($,{title:"\u7279\u5E97\u4E0A\u50B3"}),d(h,{layout:"vertical",initialValues:m,onFinish:s,children:[e(g,{groupTitle:"\u7279\u5E97\u4E0A\u50B3",id:"\u7279\u5E97\u4E0A\u50B3","aria-label":"\u7279\u5E97\u4E0A\u50B3",children:d(g.Item,{title:"\u7279\u5E97\u4E0A\u50B3",children:[e(h.Item,{label:"\u6848\u4EF6\u7DE8\u865F",name:"caseNo",children:e(b,{})}),e(h.Item,{label:"\u7279\u5E97\u7DE8\u865F",name:"specialStoreNo",children:e(b,{})}),e(h.Item,{label:"\u7279\u5E97\u540D\u7A31",name:"specialStoreName",children:e(b,{})}),e(h.Item,{label:"\u7D71\u4E00\u7DE8\u865F",name:"uniformNo",children:e(b,{})}),e(h.Item,{label:"\u62DB\u652C\u55AE\u4F4D",name:"solicitationUnit",children:e(b,{})}),e(h.Item,{label:"\u72C0\u614B",name:"status",children:e(b,{})})]})}),e(h.Item,{className:"col-span-full flex justify-center",children:e(N,{htmlType:"submit",children:c})})]})]})})};export{J as default};
