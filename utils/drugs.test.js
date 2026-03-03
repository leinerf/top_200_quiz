import drugs from "./drugs.js";

const drugSet = drugs();
const brands = drugSet.quizBrands(0, 20);
console.log(brands);

const generics = drugSet.quizGenerics(0, 20);
console.log(generics);

const classifications = drugSet.quizClassifications(0, 20);
console.log(classifications);

const indications = drugSet.quizIndication(0, 20);
console.log(indications)