import drugs from "./drugs.js";

const drugSet = drugs();
const brands = drugSet.quizBrands(0, 20);
console.log(brands);

const generics = drugSet.quizGenerics(0, 20);
console.log(generics);