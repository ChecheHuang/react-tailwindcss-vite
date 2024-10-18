import{C as z,M as H,d as U,g as W}from"./store_list.d1e98cff.js";import{r as E,a as t,h as k,x as F,y as $,u as j,aQ as S,j as C,ap as A,aR as V,aS as X,aT as G,N as J,aI as T,a1 as Z,av as P,aw as L,aC as ee,aU as I,aV as te,aq as B,aW as _,aX as ne,au as ae}from"./react-select.esm.90a3a7d9.js";import{E as h,u as ue}from"./AntdProvider.69a49074.js";import{u as oe}from"./useHook.fa0474e9.js";import"./index.f6e68809.js";const se=({data:n=[],handleExport:o})=>{const[a,s]=E.exports.useState(!1);function i(){s(!0);const u=F.book_new(),e=F.json_to_sheet(n);F.book_append_sheet(u,e,"excel"),$(u,"Excel.xlsx"),s(!1)}return t(k,{children:t(h,{className:"bg-green-800 hover:!bg-green-700",type:"primary",onClick:o||i,loading:a,children:"\u4E0B\u8F09Excel"})})},ie=({data:n,columns:o,templateTableProps:a,onPaginate:s,onSort:i,onFilter:r,onSelect:u,onExport:e,onSearch:d,searchLayoutArray:l,...m})=>{const p=(a==null?void 0:a.width)||60,O=(a==null?void 0:a.align)||"center",{windowHeight:M}=oe(),K=j(),[y]=S.useForm(),Q=(c,g,f,D)=>{const{action:x}=D,v=new Map([["paginate",()=>s&&s(c)],["sort",()=>i&&i(f)],["filter",()=>r&&r(g)]]).get(x)||(()=>console.log("no action"));v==null||v.call(void 0)},R=()=>{K("create")},b=o.map(c=>({key:c.key?c.key:c.dataIndex?c.dataIndex:c.title,align:O,width:p,...c})),q=b.reduce((c,g)=>(c+=g.width,c),0),Y=()=>{y.resetFields()};return t(z,{children:C(H,{children:[l&&(l==null?void 0:l.length)!==0&&t(S,{className:"mb-3",layout:"vertical",form:y,onFinish:d,children:C("div",{className:"relative grid gap-x-3",children:[l==null?void 0:l.map(({label:c,name:g,content:f,className:D,rules:x,...N})=>t(S.Item,{className:D,label:c,name:g,rules:x,...N,children:f||t(A,{placeholder:`\u8ACB\u8F38\u5165${c}`})},g)),C("div",{className:" col-span-4 flex items-center justify-end gap-2  ",children:[t(h,{onClick:Y,danger:!0,children:"\u6E05\u9664"}),t(h,{htmlType:"submit",children:"\u67E5\u8A62"})]})]})}),C("div",{className:" flex justify-end gap-2 ",children:[t(se,{handleExport:e,data:n}),t(h,{onClick:R,children:"\u65B0\u589E"})]}),t(V,{size:"small",onChange:Q,scroll:{x:q,y:M-200},columns:b,dataSource:le(n),pagination:{position:["bottomCenter"]},rowSelection:u?{type:"checkbox",onChange:(c,g)=>{u(g)}}:void 0,...m})]})})};function le(n,o){let a=1;return s(n,o||"");function s(i,r){if(Array.isArray(i))return i.map(u=>s(u,r));if(typeof i=="object"&&i!==null){const u={...i};return u.key=u[r]!==void 0?String(u[r]):String(a++),u.children&&(u.children=s(u.children,r).map(e=>(e.key=`${u.key}-${e.key}`,e))),u}else return i}}function re(n){const[o,a]=E.exports.useState(n),[s,i]=X(),r=E.exports.useMemo(()=>{const u={};for(const[e,d]of s)u[e]=d;return u},[s]);return E.exports.useEffect(()=>{a(r)},[]),G(()=>{i(o)},[o]),[o,a]}const ce=({children:n,content:o})=>{const a=[{key:J(),label:t("div",{className:"flex flex-col gap-1",children:n})}];return t(k,{children:t(T,{menu:{items:a},placement:"bottom",children:o||t(Z,{children:"\u64CD\u4F5C"})})})},de=()=>{const{modal:n,message:o}=ue(),a=j(),s=P(),{mutate:i}=L({mutationFn:U,onSuccess:()=>{o.success("\u522A\u9664\u6210\u529F"),s.invalidateQueries(["store_list"])},onError:e=>{o==null||o.error("\u522A\u9664\u5931\u6557!!"+(e==null?void 0:e.message)||"")}}),r=e=>{a(e)},u=e=>{n==null||n.confirm({title:t("div",{children:"\u64CD\u4F5C\u6709\u5371\u96AA"}),icon:t(te,{}),content:"\u522A\u9664\u8CC7\u6599\u4E0D\u53EF\u56DE\u5FA9\uFF0C\u78BA\u8A8D\u522A\u9664?",okText:"\u78BA\u8A8D",cancelText:"\u53D6\u6D88",onOk:()=>{i(e.id)}})};return[{title:"id",dataIndex:"id"},{title:"\u6848\u4EF6\u7DE8\u865F",render:e=>t(ee,{to:e.id,children:e.caseNo})},{title:"\u7279\u5E97\u7DE8\u865F",width:140,dataIndex:"specialStoreNo",filterDropdown:ge,filterIcon:me},{title:"\u7279\u5E97\u540D\u7A31",dataIndex:"specialStoreName"},{title:"\u7D71\u4E00\u7DE8\u865F",dataIndex:"uniformNo",width:140},{title:"\u62DB\u652C\u55AE\u4F4D",dataIndex:"solicitationUnit"},{title:"\u72C0\u614B",render:e=>t("div",{children:e.status==="normal"?"\u6B63\u5E38":"\u7570\u5E38"})},{title:"\u64CD\u4F5C",fixed:"right",width:90,key:"operation",render:e=>C(ce,{children:[t(h,{onClick:()=>{r(e.id)},children:"\u7DE8\u8F2F"}),t(h,{onClick:()=>{u(e)},type:"primary",danger:!0,disabled:!1,children:"\u522A\u9664"})]})}]},me=n=>t(I,{style:{color:n?"#1677ff":void 0}}),ge=n=>{const{selectedKeys:o,setSelectedKeys:a,confirm:s,clearFilters:i}=n,r=()=>{i==null||i(),s({closeDropdown:!0})};return C("div",{className:"p-2",children:[t(A,{onChange:u=>a(u.target.value?[u.target.value]:[]),onPressEnter:()=>s(),value:o[0]}),C("div",{className:"mt-2 flex justify-around gap-2",children:[t(h,{type:"primary",icon:t(I,{}),onClick:()=>s(),children:"\u641C\u5C0B"}),t(h,{onClick:r,children:"\u91CD\u7F6E"}),t(h,{danger:!0,onClick:()=>s({closeDropdown:!0}),children:"\u53D6\u6D88"})]})]})},{RangePicker:he}=ne,w="YYYY\u5E74MM\u6708DD\u65E5",Ce=()=>[{label:"\u6848\u4EF6\u7DE8\u865F",name:"caseNo",content:t(B,{placeholder:"\u9078\u64C7\u6848\u4EF6\u7DE8\u865F",options:[{value:"S_1734452021",label:"S_1734452021"},{value:"S_3472126016",label:"S_3472126016"},{value:"S_0672575620",label:"S_0672575620"}]})},{label:"\u7279\u5E97\u7DE8\u865F",name:"specialStoreNo"},{label:"\u72C0\u614B",name:"status",className:"col-span-2",content:t(B,{className:"w-full",placeholder:"\u9078\u64C7\u72C0\u614B",options:[{value:"normal",label:"\u6B63\u5E38"},{value:"abnormal",label:"\u7570\u5E38"}]})},{label:"\u62DB\u652C\u6642\u9593",name:"\u62DB\u652C\u6642\u9593",content:t(he,{className:"w-full",format:w}),className:"col-span-4",initialValue:[_("2015/01/01",w),_("2015/01/01",w)]}],pe={_page:"1",_limit:"10"},Fe=()=>{const[n,o]=re(pe),{data:a,isLoading:s}=ae({queryKey:["store_list",{filterInfo:n}],keepPreviousData:!0,queryFn:()=>W(n)}),i=e=>{var m,p;const d=(m=e.current)==null?void 0:m.toString(),l=(p=e.pageSize)==null?void 0:p.toString();o({...n,_page:d,_limit:l})},r=e=>{const d={};for(const l in e)e[l]!==void 0&&l!=="\u62DB\u652C\u6642\u9593"&&(d[l]=e[l]);o({...n,...d})},u=e=>{var l;const d={...n};for(const m in e)e[m]===null?delete d[m]:d[m]=(l=e[m])==null?void 0:l.toString();o(d)};return t(k,{children:t(ie,{data:(a==null?void 0:a.data)||[],columns:de(),searchLayoutArray:Ce(),loading:s,rowClassName:e=>e.status!=="abnormal"?"":"bg-slate-300",templateTableProps:{width:100,align:"center"},onSearch:r,onPaginate:i,onSort:e=>console.log(e),onFilter:u,pagination:{position:["bottomCenter"],pageSize:parseInt((n==null?void 0:n._limit)||"10"),total:(a==null?void 0:a.total)||0,current:parseInt((n==null?void 0:n._page)||"1")}})})};export{Fe as default};
