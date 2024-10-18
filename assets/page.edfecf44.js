import{c0 as p,r as o,a as e,h as x,j as d,c as g}from"./react-select.esm.90a3a7d9.js";const y=new Array(100).fill(null).map((t,l)=>{const a=p.person.fullName(),c=p.internet.email(),i=p.phone.number("09## ### ###"),r=p.image.avatar();return{id:l+1,name:a,email:c,phone:i,avatar:r}}),b=10,v=Math.ceil(y.length/b),N=()=>{const[t,l]=o.exports.useState(1),a=o.exports.useMemo(()=>y.slice((t-1)*b,t*b),[t]),c=o.exports.useCallback(()=>{t!==v&&l(t+1)},[t]),i=o.exports.useCallback(()=>{t!==1&&l(t-1)},[t]);return e(x,{children:d("div",{className:"overflow-x-auto",children:[e(C,{data:a}),e(k,{page:t,nextPage:c,prevPage:i})]})})},k=({page:t,nextPage:l,prevPage:a})=>d("div",{className:"w-full flex justify-center join",children:[e("button",{onClick:a,className:"join-item btn",children:"\xAB"}),d("button",{className:"join-item btn",children:["Page ",t]}),e("button",{onClick:l,className:"join-item btn",children:"\xBB"})]});function C({data:t}){const[l,a]=o.exports.useState([]),c=()=>{l.length===t.length?a([]):a(t.map(n=>n.id))},i=n=>{l.includes(n)?a(l.filter(u=>u!==n)):a([...l,n])},r=n=>l.includes(n),s=[1,2,1,4,3,2],h=s.map((n,u)=>e("col",{style:{width:`${n/s.reduce((m,f)=>m+f,0)*100}%`}},u));return e("div",{className:"overflow-x-auto w-full",children:d("table",{className:"table table-xs table-pin-rows table-pin-cols table-fixed ",children:[e("colgroup",{children:h}),e("thead",{children:d("tr",{children:[e("th",{children:e("label",{children:e("input",{type:"checkbox",className:"checkbox",checked:l.length===t.length,onChange:c})})}),e("th",{children:"Name"}),e("th",{children:"Avatar"}),e("th",{children:"Email"}),e("th",{children:"Phone"}),e("th",{children:"Action"})]})}),e("tbody",{children:t.map(n=>d("tr",{children:[e("td",{children:e("label",{children:e("input",{type:"checkbox",className:"checkbox",checked:r(n.id),onChange:()=>i(n.id)})})}),e("td",{children:n.name}),e("td",{children:e("img",{src:n.avatar,className:" w-8 h-8 rounded-full",alt:"Avatar"})}),e("td",{children:n.email}),e("td",{children:n.phone}),e("th",{children:e("button",{className:"btn glass text-white  btn-xs",children:"Detail"})})]},n.id))})]})})}const S=()=>e("div",{children:"Header"}),A=t=>{var n;const{items:l,value:a,onChange:c,className:i=""}=t,r=o.exports.useRef(null),[s,h]=o.exports.useState(!1);return d("div",{className:g("dropdown text-black",{"dropdown-open":s},i),ref:r,children:[e("input",{type:"text",className:"input input-bordered w-full",value:a,onChange:u=>c(u.target.value),placeholder:"Type something..",tabIndex:0}),e("div",{className:"dropdown-content bg-base-200 top-14 max-h-96 overflow-auto flex-col rounded-md",children:e("ul",{className:"menu menu-compact ",style:{width:(n=r.current)==null?void 0:n.clientWidth},children:l.map((u,m)=>e("li",{tabIndex:m+1,onClick:()=>{c(u),h(!1)},className:"border-b border-b-base-content/10 w-full bg-white",children:e("button",{children:u})},m))})})]})},j=()=>{const[t,l]=o.exports.useState(""),[a,c]=o.exports.useState([]),[i,r]=o.exports.useState([]);return o.exports.useEffect(()=>{async function s(){const m=(await(await fetch("https://restcountries.com/v3.1/all?fields=name")).json()).map(f=>f.name.common).sort();c(m)}s()},[]),o.exports.useEffect(()=>{if(!t){r(a);return}const s=a.filter(h=>h.toLowerCase().includes(t.toLowerCase())).sort();r(s)},[a,t]),e(A,{items:i,value:t,onChange:l})},D=({data:t})=>{const[l,a]=o.exports.useState("");return d("ul",{"data-theme":"mytheme",className:"menu bg-info text-white w-full h-full",children:[e(w,{data:t,first:!0,currentPage:l,setCurrentPage:a}),e(j,{})]})},w=({data:t,first:l,currentPage:a,setCurrentPage:c})=>{const i=s=>{c(s)},r=t.map(({key:s,children:h,label:n,hidden:u})=>u?null:h?e("li",{children:d("details",{open:!1,children:[e("summary",{children:n}),e(w,{data:h,first:!1,currentPage:a,setCurrentPage:c})]})},s):e("li",{children:e("div",{className:g("focus:bg-transparent",s===a&&"active hover:bg-black "),onClick:()=>i(s),children:n})},s));return l?e(x,{children:r}):e("ul",{children:r})},E=[{key:"/",type:"",hidden:!0,label:"\u9996\u9801"},{key:"/login",type:"",hidden:!1,label:"\u767B\u5165"},{key:"/layout",type:"",hidden:!1,label:"\u63A7\u5236\u53F0",children:[{key:"/layout/user",type:"",hidden:!1,label:"\u76EE\u9304",children:[{key:"/layout/user/user",type:"",hidden:!1,label:"\u4F7F\u7528\u8005"}]},{key:"/layout/control",type:"",hidden:!1,label:"\u6B0A\u9650\u7BA1\u7406"}]},{key:"/blog",type:"",hidden:!1,label:"\u90E8\u843D\u683C",children:[{key:"/blog/1",type:"",hidden:!1,label:"\u6211\u7684\u90E8\u843D\u683C"},{key:"/blog/2",type:"",hidden:!1,label:"\u516C\u958B\u90E8\u843D\u683C"}]}],P=()=>d("div",{className:"flex h-screen","data-theme":"light",children:[e("aside",{className:" w-52 bg-gray-200 h-full",children:e(D,{data:E})}),d("main",{className:"flex-1 flex flex-col",children:[e("header",{className:"bg-gray-300 h-16",children:e(S,{})}),e("div",{className:"overflow-auto flex-1",children:e(N,{})})]})]});export{P as default};
