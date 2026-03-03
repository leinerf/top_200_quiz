import { readFileSync } from "fs";
import ps from "prompt-sync";


class Drugs {
    drugs = [];
    constructor() {
        const file = readFileSync('top_200_drugs.txt', "utf-8");
        const lines = file.split("\n");
        for (let i = 1; i < lines.length; i++) {
            const line = lines[i].split(";");
            this.drugs.push({
                "id": i,
                "brand": line[0],
                "generic": line[1],
                "classification": line[2],
                "indication": line[3]
            });
        }
    }
    getDrugs() {
        return this.drugs;
    }
    getTotalDrugs() {
        return this.drugs.length;
    }
    quizBrands(offset, limit) {
        return this._quiz(offset, limit, "brand", "generic")
    }
    quizGenerics(offset, limit) {
        return this._quiz(offset, limit, "generic", "brand");
    }
    quizClassifications(offset, limit, drug = "brand") {
        return this._quiz(offset, limit, drug, "classification");
    }
    quizIndications(offset, limit, drug = "brand") {
        return this._quiz(offset, limit, drug, "indication");
    }
    _quiz(offset, limit, drug, attribute) {
        const result = [];
        const drugs = this.drugs.slice(offset, offset + limit);
        const attributesSet = new Set(this.drugs.map((drug) => { return drug[attribute] }));
        const attributes = [...attributesSet];

        for (let i = 0; i < drugs.length; i++) {
            const item = {}
            item.drug = drugs[i][drug];
            item.attribute = drugs[i][attribute]
            item.randomAttributes = new Set([item.attribute]);
            while (item.randomAttributes.size < 4) {
                const randIndex = Math.floor(Math.random() * attributes.length);
                item.randomAttributes.add(attributes[randIndex])
            }
            item.randomAttributes = [...item.randomAttributes];
            shuffle(item.randomAttributes);
            result.push(item);
        }
        shuffle(result);
        return result
    }
}

function drugs() {
    return new Drugs();
}

function createGenericDrugQuestions(offset, limit) {
    const drugSet = drugs.slice(offset, offset + limit);
    const result = []
    for (let i = 0; i < drugSet.length; i++) {
        const drug = drugSet[i];
        const brandChoices = [drug["brand"]];
        const genericChoices = [drug["generic"]];
        while (brandChoices.length < 4) {
            const randomIndex = Math.floor(Math.random() * drugSet.length);
            if (randomIndex === i) {
                continue;
            }
            brandChoices.push(drugSet[randomIndex]["brand"]);
            genericChoices.push(drugSet[randomIndex]["generic"]);
        }

        shuffle(brandChoices);
        shuffle(genericChoices);

        result.push({
            "brand": drug["brand"],
            "generic": drug["generic"],
            "brand_choices": brandChoices,
            "generic_choices": genericChoices
        })
    }
    shuffle(result);
    return result;
}

function shuffle(array) {
    let currentIndex = array.length;

    // While there remain elements to shuffle...
    while (currentIndex != 0) {

        // Pick a remaining element...
        let randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        // And swap it with the current element.
        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]
        ];
    }
}

export default drugs;