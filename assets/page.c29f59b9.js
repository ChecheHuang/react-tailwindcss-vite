import{j as r,h as t,a as e,r as c}from"./react-select.esm.90a3a7d9.js";function p(){return r(t,{children:[r("div",{children:[r("div",{className:"peer/name group/other-name grid h-20 w-20 place-items-center bg-blue-400 transition-colors duration-300 hover:bg-purple-400",children:[e("div",{className:"h-5 w-5 bg-black transition-colors duration-300 group-hover/other-name:bg-red-600"}),e("div",{className:"h-5 w-5 bg-black transition-colors duration-300 group-hover/other-name:bg-red-600"})]}),e("div",{className:"h-20 w-20 bg-green-400 transition-colors duration-300 peer-hover/name:bg-orange-500"})]}),r("div",{className:"grid grid-cols-2  gap-10 p-5 sm:grid-cols-3",children:[e("div",{className:"aspect-video w-full bg-purple-400"}),e("div",{className:"aspect-video w-full bg-purple-400"}),e("div",{className:"aspect-video w-full bg-purple-400"}),e("div",{className:"aspect-video w-full bg-purple-400"}),e("div",{className:"aspect-video w-full bg-purple-400"}),e("div",{className:"aspect-video w-full bg-purple-400"})]}),e(n,{})]})}const n=()=>{const l=["red","green","blue"],[s,o]=c.exports.useState("red");return r("select",{className:`bg-${s}-400`,onChange:a=>o(a.target.value),value:`${s}-400`,children:[e("option",{disabled:!0,value:"",children:"choose"}),l.map((a,i)=>e("option",{value:a,children:a},i))]})};export{p as default};
