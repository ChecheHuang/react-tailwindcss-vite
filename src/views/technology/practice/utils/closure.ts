

const wallet = (money:number)=>{
    let value = money
    return (add: number) => {
        value = add + value;
        return value
    };
}
const wallet1= wallet(20)
const wallet2 = wallet(30)
// console.log(
//     wallet1(10)
// )
// console.log(
//     wallet1(10)
// )
