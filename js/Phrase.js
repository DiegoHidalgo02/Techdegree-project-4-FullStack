/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * Phrase.js */

class Phrase {

    constructor(phrase){
        this.phrase = phrase.toLowerCase();
        this.phraseArray = this.phrase.split("");
        this._matchedLetters = [];
    }

    getMatchedLetters(){
        return this._matchedLetters;
    }

    addmatchedLetters(letter) {
        this._matchedLetters.push(letter);
    }

    addPhraseToDisplay(){

        const charactersPhrase = this.phraseArray;

        charactersPhrase.forEach(element => {

            const li = document.createElement("li");

            li.textContent = element;
            if(element !== " "){
                li.classList.add("hide", "letter", `${element}`);
            }else{
                li.classList.add("space");
            }

            document.querySelector("#phrase ul").append(li);
        });

    }

    checkLetter(userInput){
        return this.phraseArray.includes(userInput.toLowerCase());
    }

    showMatchLetter(userInput){

        const letterElements = document.querySelectorAll(`.letter.${userInput.toLowerCase()}`);

        letterElements.forEach(letterElement => {
            letterElement.classList.remove('hide');
            letterElement.classList.add('show');
        })

        this.addmatchedLetters(userInput);

    }

}