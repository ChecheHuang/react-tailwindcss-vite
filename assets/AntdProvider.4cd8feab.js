import{j as s,Z as n,r,aN as u,aO as c,aP as l,aQ as g,a as h}from"./react-select.esm.a50d4ee6.js";const x=["primary","dashed","link","text","default"],m=new Map([["info","bg-orange-400 text-white hover:!bg-orange-300 hover:!text-white hover:!border-transparent"],["success","bg-green-600 text-white hover:!bg-green-600/80 hover:!text-white hover:!border-transparent"],["warning",""]]),p=({type:e="default",...t})=>v(e)?s(n,{type:e,...t}):s(n,{className:m.get(e),...t});function v(e){return x.includes(e)}const o=r.exports.createContext(null);function b(){const e=r.exports.useContext(o);if(!e)throw new Error("useAntd must be used within a AntdProvider");return e}function w({children:e}){const[t,a]=u.useMessage(),[d,i]=c.useModal();return s(l,{locale:g,theme:{token:{colorSuccess:"#00b96b"}},children:h(o.Provider,{value:{message:t,modal:d},children:[e,a,i]})})}export{w as A,p as E,b as u};