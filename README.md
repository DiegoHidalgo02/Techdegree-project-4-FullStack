# CSS Enhancements for Phrase Hunter Game

This document highlights the custom CSS enhancements I've added to the Phrase Hunter game to improve visual feedback and user experience.

## Interactive Button Effects

I've implemented responsive visual feedback for the on-screen keyboard buttons:

```css
/* Hover effect - changes background color when mouse hovers over available buttons */
#qwerty button:hover:not(button.chosen, button.wrong){
  background-color: #c2cce3;
}

/* Active effect - creates a "press down" visual when buttons are clicked */
#qwerty button:active:not(button.chosen, button.wrong){
  transform: scale(.95);
}

/* Keyframes definition for the pulse animation */
@keyframes pulse {
  0% {
    transform: scale(1);
    margin: 0px;
  }
  50% {
    transform: scale(1.1);
    margin: 2.5px;
  }
  75% {
    transform: scale(1);
    margin: 3px;
  }
  100% {
    margin: 0px;
  }
}

/* Applied to letters when they're revealed */
.show {
  animation: pulse 1s;
}

