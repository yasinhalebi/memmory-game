// Get a reference to the element
var element = document.getElementById('linkedin');

// Add a click event listener
element.addEventListener('click', function() {
  // Open a new page
  window.open('https://www.linkedin.com/in/yasinhalebi/', '_blank');
});

let duration=500;

let boxes =document.querySelector(".boxes .container");

let boxesArray = Array.from(boxes.children);

let orderRange = [...Array(boxesArray.length).keys()];

shuffle(orderRange);

boxesArray.forEach((element, index ) => {

  element.style.order=orderRange[index];

  element.addEventListener('click',function(){
    flip(element);
  });

});

var flippedCards = [];

function flip(box){

  box.classList.add('is-flipped');

  let flippedboxes= boxesArray.filter(flippedbox => flippedbox.classList.contains('is-flipped'));

  if(flippedboxes.length === 2){

    stopClicking();

    setTimeout(() =>{

      boxes.classList.remove('no-clicking');

    }, duration)

    checkMatchedBoxes(flippedboxes[0],flippedboxes[1]);

  }
  

}


document.getElementById('fail').volume -= 0.95;

function checkMatchedBoxes(firstBox, secondBox){

  if(firstBox.dataset.technology === secondBox.dataset.technology){
    firstBox.classList.remove('is-flipped');
    secondBox.classList.remove('is-flipped');

    firstBox.classList.add('has-match');
    secondBox.classList.add('has-match');
    firstBox.classList.add('has-match');
    secondBox.classList.add('has-match');
    document.getElementById('success').play();
    flippedCards.push(firstBox,secondBox);
    setTimeout(() =>{

      checkAllCardsFlipped(flippedCards,boxesArray);
      
      }, duration)
  }else{
    setTimeout(() =>{

      
    firstBox.classList.remove('is-flipped');
    secondBox.classList.remove('is-flipped');
    document.getElementById('fail').play();
    }, duration)
  }

}

function stopClicking(){
  boxes.classList.add('no-clicking');
}

function shuffle(array){
  let current=array.length,
      temp,
      random;

  while(current > 0){
    random=Math.floor(Math.random()*current);
    current--;
    temp=array[current];
    array[current]=array[random];
    array[random]=temp;
  }
  return array;
}

// Function to flip the boxes
function flipBoxes() {

  boxesArray.forEach(box => {
    box.classList.add('is-flipped');
  });

  setTimeout(() => {
    boxesArray.forEach(box => {
      box.classList.remove('is-flipped');
    });
  }, 2500);
}

// Call flipBoxes() when the page finishes loading
window.addEventListener('load', flipBoxes);


function checkAllCardsFlipped(flippedboxes,boxesArray) {
  // Check if the number of flipped cards is equal to the total number of cards
  if (flippedboxes.length === boxesArray.length) {
    // Reload the page
    location.reload();
  }
}
