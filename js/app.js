const startButton = document.querySelector("#btn__reset");
const qwerty = document.querySelector("#qwerty");
let game;
let generatedPhrases = [];
const urlP = 'https://api.quotable.io/random?maxLength=30&minLength=15';

function cleanPhrases(string){//Delete punctuation elements

     return string.replace(/[,.'";:]/g, "");//To eliminate all punctuation elements I use the replace function which replaces all those elements with an empty string
}

async function fetchRandomPhrases(url){

    try {

        for(let i = 0; i < 5; i++){
            
            const response = await fetch(url);
            
            const phrasesConverted = await response.json();//covert in json

            generatedPhrases.push(new Phrase(cleanPhrases(phrasesConverted.content)));

        }

        return generatedPhrases;

    }catch (error){

        console.error(`Error to retrive phrases: ${error}`);

        //If there is an error in retrieving the sentences I return an array with phrases created by me
        return [
            new Phrase("Carpe diem"),
            new Phrase("Less is more"),
            new Phrase("Still I rise"),
            new Phrase("Actions speak louder than words"),
            new Phrase("Time flies"),
        ];

    }

}

startButton.addEventListener("click", async event =>{
    game = new Game();//Create new game instace
    game.phrases = await fetchRandomPhrases(urlP);//get phrases from API or local array
    game.startGame(); //game start
})


qwerty.addEventListener("click", event => {

    if(event.target.tagName === "BUTTON" && event.target.disabled === false){//I manage the user's input, if he has actually clicked a keyboard button and if that button is not disabled

        if(game){
            game.handleIteration(event.target, event.target.textContent);
        }

    }

})




