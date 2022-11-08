//HTML set up:
//span with an id="score" that will be populated via DOM manipulation
//div with a class "grid-container" that will contain the grid images, the gameboard, that will be created via DOM manipulation

//place an eventListener on the document so that when it is opened the content will load immediatly, and this eventListener will house the entire game's functions
document.addEventListener("DOMContentLoaded", (event) => {
  //Creat an array of double objects containing the images and their names (and border colors for styling).  Name will be used to compare two images when clicked.

  const cardImageArray = [
    {
      name: "Boletus",
      img: "Images/BoletusFungi.jpg",
      border: "8px solid #10F0FC",
    },
    {
      name: "Chanterelle",
      img: "Images/Chanterelle.jpg",
      border: "8px solid #06F985",
    },
    {
      name: "EmeticRussula",
      img: "Images/EmeticRussula.jpg",
      border: "8px solid #C907C8",
    },
    {
      name: "MeadowWaxCap",
      img: "Images/MeadowWaxCap.jpg",
      border: "8px solid #8929E2",
    },
    {
      name: "ParasolMushroom",
      img: "Images/ParasolMushroom.jpg",
      border: "8px solid #FF3131",
    },
    {
      name: "FlyAgaric",
      img: "Images/PoisunusFlyAgaric.jpg",
      border: "8px solid #FE5E00",
    },
    {
      name: "Poplar",
      img: "Images/PoplarMushroom.jpg",
      border: "8px solid #FF00FA",
    },
    {
      name: "FlyWheel",
      img: "Images/XerocomusFlywheel.jpg",
      border: "8px solid #FDE803",
    },
    {
      name: "Boletus",
      img: "Images/BoletusFungi.jpg",
      border: "8px solid #10F0FC",
    },
    {
      name: "Chanterelle",
      img: "Images/Chanterelle.jpg",
      border: "8px solid #06F985",
    },
    {
      name: "EmeticRussula",
      img: "Images/EmeticRussula.jpg",
      border: "8px solid #C907C8",
    },
    {
      name: "MeadowWaxCap",
      img: "Images/MeadowWaxCap.jpg",
      border: "8px solid #8929E2",
    },
    {
      name: "ParasolMushroom",
      img: "Images/ParasolMushroom.jpg",
      border: "8px solid #FF3131",
    },
    {
      name: "FlyAgaric",
      img: "Images/PoisunusFlyAgaric.jpg",
      border: "8px solid #FE5E00",
    },
    {
      name: "Poplar",
      img: "Images/PoplarMushroom.jpg",
      border: "8px solid #FF00FA",
    },
    {
      name: "FlyWheel",
      img: "Images/XerocomusFlywheel.jpg",
      border: "8px solid #FDE803",
    },
  ];

  // Select DOM elements and define variables

  const gridContainer = document.querySelector(".grid-container");
  const score = document.querySelector("#score");
  const sound = new Audio("sounds/mixkit-mouse-click-close-1113.wav");
  let cardsSelected = [];
  let cardsSelectedId = [];
  let cardsMatch = [];

  //create flipSound function

  function flipSound() {
    sound.play();
    sound.volume = 0.7;
  }

  // create the function to randomly sort the cards each time for player difficulty

  function sortCards() {
    cardImageArray.sort(() => 0.5 - Math.random());
  }

  //create the function to set the cards on the game board (starting grid displaying the back-side images of each card).  Loop over the cardImageArray and for each object, creat an image element, set the source attribute to the jpg file  with the back-side image, add the class list for styling, set the data attribute to be the index position.  Added two eventListeners and on click  event to flip the card  and to make a clicking noise.  Append to display in browser.

  function gridBack() {
    for (let i = 0; i < cardImageArray.length; i++) {
      const image = document.createElement("img");
      image.setAttribute("src", "Images/micelia.jpg");
      image.classList = "grid-item";
      image.setAttribute("data-id", i);
      image.addEventListener("click", flipCard);
      image.addEventListener("click", flipSound);
      gridContainer.appendChild(image);
    }
  }

  //create flipcard function (once an image is clicked, this function is called per the event listener added to image above in the gridBack function)

  function flipCard() {
    let selected = this.dataset.id; //create and define a variable ("selected") for clicked image's data identification number (the id number will be used in the checkForMatch function to ensure that the player did not click  on the same exact card twice)
    cardsSelected.push(cardImageArray[selected].name); //the variable's ("selected") id number indicates the index position of the cardImageArray object whose name value will be pushed into the newly created cardsSelected array
    cardsSelectedId.push(selected); // takes the data id from the clicked image and pushes that number into the newly created cardsSelectedID array
    this.classList.add("flip"); // add class to create the flip action
    this.setAttribute("src", cardImageArray[selected].img); //set the source attribute to the jpg file  with the front-side image
    this.style.border = cardImageArray[selected].border; // style border
    //once two cards have been selected then we check for a match:
    if (cardsSelected.length === 2) {
      setTimeout(checkForMatch, 600);
    }
  }

  //Creat check for matches function

  function checkForMatch() {
    const cards = document.querySelectorAll("img");
    if (cardsSelectedId[0] == cardsSelectedId[1]) {
      cards[cardsSelectedId[0]].setAttribute("src", "Images/micelia.jpg");
      cards[cardsSelectedId[0]].style.border = "8px solid #4F248C";
      cards[cardsSelectedId[1]].setAttribute("src", "Images/micelia.jpg");
      cards[cardsSelectedId[1]].style.border = "8px solid #4F248C";
      //Player picked the same card twice so card turns back to back-side image and player moves on to next click guess
    } else if (
      cardsSelected[0] === cardsSelected[1] &&
      cardsSelectedId[0] !== cardsSelectedId[1] //if the names are the same (and the id numbers are different - in order to make  sure you did not click on the same card  twice as in the first if conditional) the player found a pair and the match should stay face up and become unclickable and the 2 selected images should be pushed into the cardsWon array below
    ) {
      //if the names are the same (and the id numbers are different - in order to make  sure you did not click on the same card  twice as in the first if conditional) the player found a pair and the match should stay face up and become unclickable and the 2 selected images should be pushed into the cardsWon array below
      cards[cardsSelectedId[0]].removeEventListener("click", flipCard);
      cards[cardsSelectedId[1]].removeEventListener("click", flipCard);
      cardsMatch.push(cardsSelected); // pushing the cardsSelected into the end of the cardsMatch array and returns cardsMatch new length to be compared to in the last if conditional statement to check for a winner
    } else {
      cards[cardsSelectedId[0]].setAttribute("src", "Images/micelia.jpg");
      cards[cardsSelectedId[0]].style.border = "8px solid #4F248C";
      cards[cardsSelectedId[1]].setAttribute("src", "Images/micelia.jpg");
      cards[cardsSelectedId[1]].style.border = "8px solid #4F248C"; // if the 2 cards selected are not matches then they get turned back over to display the back-side image and they remain clickable to try again.
    }
    //Check for winner
    //if the following condition is true then the player won and the score will display the winner's message
    cardsSelected = [];
    cardsSelectedId = [];
    score.textContent = cardsMatch.length;
    if (cardsMatch.length === cardImageArray.length / 2) {
      score.textContent = "Mighty Mycological Memory!";
    }
  }

  // Start the game by invoking the gridBack function and randomly sorting the cards by invoking the sortCards function; all other functions will run from gridBack function as click will invoke flipCard function whitch will invoke checkforMatch function
  gridBack();
  sortCards();
});

//reset button is created and defined in HTML file with an onClick for functionality
