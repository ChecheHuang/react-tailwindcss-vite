import{bH as b,bI as g,bJ as f,bK as x,j as t,a as o,bL as v,bM as N,bN as k}from"./index.4ccdf36a.js";import{c}from"./index.04d90be8.js";var n=(e=>(e.small="small",e.middle="middle",e.large="large",e))(n||{});const C={theme:"dark",size:"middle"},d=b({name:"theme",initialState:C,reducers:{changeTheme(e){e.theme=e.theme==="dark"?"light":"dark"},changeSize(e,a){e.size=a.payload}}}),{changeTheme:S,changeSize:p}=d.actions,w=d.reducer,j=g({reducer:{theme:w}}),z=j,m=f,M=()=>x();function D(){const e=m(a=>a.theme.theme);return console.log("rerender"),t("div",{className:c("flex-1 w-full",e==="dark"?" bg-slate-800 text-white":"bg-white text-slate-800")})}function R(){const e=M(),a=m(i=>i.theme),{size:s,theme:h}=a,l=i=>()=>{e(p(i))},u=()=>{e(S())},r=new Map([[n.small,"btn-sm"],[n.middle,""],[n.large,"btn-lg"]]);return o("div",{className:"w-full h-20 bg-slate-300 flex justify-center items-center",children:[t("button",{onClick:u,className:"btn btn-sm btn-ghost",children:h==="dark"?t(v,{}):t(N,{})}),o("div",{className:"btn-group w-52 flex justify-center ",children:[t("button",{onClick:l(n.small),className:c("btn",r.get(s),s===n.small&&"btn-active"),children:"\u5C0F"}),t("button",{onClick:l(n.middle),className:c("btn",r.get(s),s===n.middle&&"btn-active"),children:"\u4E2D"}),t("button",{onClick:l(n.large),className:c("btn",r.get(s),s===n.large&&"btn-active"),children:"\u5927"})]})]})}function $(){return o("div",{className:"flex flex-col h-screen",children:[t(R,{}),t(D,{})]})}function y(){return t(k,{store:z,children:t($,{})})}export{y as default};