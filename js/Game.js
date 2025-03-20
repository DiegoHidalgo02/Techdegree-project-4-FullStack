class Game{
    constructor(){
        this.missed = 0;
        this.attempts = 5;
        this.phrases = [];
        this.activePhrase = null;
        this.pressedKeys = new Set();
        this.lives = document.querySelectorAll("li.tries");
        this.boundHandleKeyboard = this.heandleKeyBoard.bind(this);
    }

    getRandomPhrase(){
        return this.phrases[Math.floor(Math.random() * this.phrases.length)]
    }

    startGame(){
        document.querySelector("#overlay").style.display = "none";
        this.activePhrase = this.getRandomPhrase();
        this.activePhrase.addPhraseToDisplay();

        document.addEventListener("keydown", this.boundHandleKeyboard);
    }

    removeLife(){

        if(this.missed < this.attempts){

            this.missed = this.missed + 1;
            this.lives[this.missed - 1].firstElementChild.src = "images/lostHeart.png";
            
            if(this.missed === this.attempts){

                this.gameOver(false);

            }
        }

    }

    heandleKeyBoard(event){

        const key = event.key.toLowerCase();

        //only letters and not pressed key
        if(/^[a-z]$/.test(key) && !this.pressedKeys.has(key)){

            this.pressedKeys.add(key);

            const buttons = document.querySelectorAll("#qwerty button");

            const matchButton = Array.from(buttons).find(button => button.textContent.toLowerCase() === key);

            if(matchButton && !matchButton.disabled){

                matchButton.disabled = true;

                this.handleIteration(matchButton, matchButton.textContent);

            }

        }

    }


    handleIteration(userInputElement, userInputText){

        if(this.activePhrase.checkLetter(userInputText)){

            this.activePhrase.showMatchLetter(userInputText);

            if(userInputElement){
                userInputElement.classList.add("chosen");
                userInputElement.disabled = true;
            }

            this.checkWin();

        }else{

            if(userInputElement){
                userInputElement.classList.add("wrong");
                userInputElement.disabled = true;
            }

            if(!this.checkWin()){
                
                this.removeLife();

            }
        }

    }


    checkWin(){

        const letters = document.querySelectorAll("#phrase li:not(li.space)");

        const controll = Array.from(letters).every(letter => letter.classList.contains("show"));

        if(controll){

            this.gameOver(controll);

        }

        return controll;

    }

    cleanUp(){

        const phraseHTML = document.querySelector("#phrase ul");
        const qwertyButtons = document.querySelectorAll("#qwerty button");
        const hearts = document.querySelectorAll("li.tries img");

        phraseHTML.innerHTML = "";

        qwertyButtons.forEach(button => { button.classList.remove("wrong", "chosen"); button.disabled = false});

        hearts.forEach(hearts => { hearts.src = "images/liveHeart.png" });

        this.activePhrase = null;

        document.removeEventListener("keydown", this.boundHandleKeyboard);
    }


    gameOver(result){

        const title = document.querySelector("h2.title");
        const overlay = document.querySelector("#overlay");
        const button = document.querySelector("#btn__reset");
        
        if(result){

            title.textContent = "You Win 🎉🎉";
            button.textContent = "Play Again";
            overlay.className = "win";

        }else{

            title.textContent = "You Lose ❌"
            button.textContent = "Play Again";
            overlay.className = "lose";

        }
        
        overlay.style.display = "flex";

        this.cleanUp();
        game = null;
    }
}