import{B as l,_ as i}from"./index.27d376f0.js";import{r as a,a as m,h as p,j as r}from"./react-select.esm.0db4585c.js";const d=["5\u975E\u540C\u6B65\u4E0D\u53EF\u6015","6\u624B\u5BEBPromise"],B=()=>{const[s,o]=a.exports.useState(null),[n,u]=a.exports.useState(""),c=async t=>{const e=await i(()=>import("./"+t),[],import.meta.url);o(()=>e.default),u(t)};return m(p,{children:[n,r("div",{className:"flex gap-2",children:d.map((t,e)=>r(l,{onClick:()=>{c(t)},children:t},e))}),s&&r(s,{})]})};export{B as default};