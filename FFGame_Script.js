//JavaScript Code here

// Global Variables

// object to hold background image
var background;

// Dimensions of canvas
var canvasWidth = 850;
var canvasHeight = 400;
var intervalscds = 10;

// Holds keycodes
var leftKey = 37;
var rightKey = 39;

//object the player will control
var fishnet;
// Dimensions of the fishnet
var fishnetWidth = 100;
var fishnetHeight = 86;
// Location of the fishnet
var fishnetX = canvasWidth/2;
var fishnetY = canvasHeight-fishnetHeight;
var netSpeed = 4;

//Arrays to hold multiple fish
var regFish = [];
var regFishspeed = 1;
var poisonFish = [];
var poisonFishspeed = 2;
// Dimensions of fish
var fishWidth = 40;
var fishHeight = 60;

// Player scores
var score = 0;
var fishmissed = 0;

// Validation to make sure a fish isn't spawned outside the canvas
var maxRight = canvasWidth - fishWidth;
var maxFishmiss = 5;

// holds the current logged in user
var user;

//holds the lists to be altered as the game goes
var scoreboard = document.getElementById("userData");
var items = scoreboard.getElementsByTagName("li");

// variable to hold particular html tag which will be overriden
var stat;
// var to hold text to add to html tag 
var newTxt;

// will setUp the user and display their Username on the stat board
function setUpUsrBoard()
{
    // validates loggedEmail isn't undefined hence no user is logged in 
    for(i = 0; i < localStorage.length; i ++)
    {
        if(localStorage.loggedEmail == localStorage.key(i))
        {
            // user that is stored in loggedEmail is parsed and stored  
            user = JSON.parse(localStorage[localStorage.loggedEmail]);
            // will create a new li tag to replace the default one
            var newElement = document.createElement("li");
            // stores username
            var textNode = document.createTextNode(user.username + " : ");
            // adds it to the tag
            newElement.appendChild(textNode);
            // tag to be rplaced is stored and changed
            var statBoard = document.getElementById("userData");
            // replaces the current tag thus, displaying the username
            statBoard.replaceChild(newElement, statBoard.childNodes[1]);
            usrStatBoard();
        }// end if
        // No else is used as if this condition isn't met then default html wil be in place identifying no user is logged in
    }
}// end setUpUsrBoard()


// Will output the users details on status board 
function usrStatBoard()
{
    // goes through each element in the list and adds the users details depending on the loop thats in
    for(i = 2; i <= items.length; i++)
    {
        if(i == 2)
        { 
            newTxt = document.createTextNode(score);
            stat = document.getElementById("FishCaught");
            // Users current score is added which is by default 0
            stat.appendChild(newTxt);
        }// end if 2
        else if(i == 3)
        {
            newTxt = document.createTextNode(fishmissed);
            stat = document.getElementById("FishMissed");
            // Users current misses is added which is by default 0
            stat.appendChild(newTxt);
        }// end if 3
        else if(i == 4)
        {
            newTxt = document.createTextNode(user.bestScore);
            stat = document.getElementById("BestScore");
            // Users best score saved & parsed from local storage, is added
            stat.appendChild(newTxt);
        }// end if 4
        else if(i == 5)
        {
            newTxt = document.createTextNode(user.totalScore);
            stat = document.getElementById("Total");
            // Users total score saved & parsed from local storage, is added
            stat.appendChild(newTxt);
        }// end if 5
        else if(i == 6)
        {
            newTxt = document.createTextNode(user.totalMissed);
            stat = document.getElementById("TotalMiss");
            // Users total misses saved & parsed from local storage, is added
            stat.appendChild(newTxt);
        }// end if 6 and else if
    }// end for
}// end usrStatBoard()

// once script is called will call these functions to setup the user stat on the stat board
setUpUsrBoard();


//Will load all the game elements and functionality
function startGame()
{
    // Validates if a user is logged in
    if(  localStorage.loggedEmail !== "none"  )
    {
        // Simply removes the prompt to click the screen to start the game 
        var prompt = document.getElementById("prompt");
        prompt.parentNode.removeChild(prompt);
        // componenets set up and game started
        background = new component("water", canvasWidth, canvasHeight, "waterbackground.png", 0, 0, "image");
        fishnet = new component("net", fishnetWidth, fishnetHeight, "Fishnet.gif", fishnetX, fishnetY, "image");
        thePond.start();
    }// end if
    // will validate if a user tries to play before logging in
    else 
    {
        // when user isn't logged in 
        outputGameMessage("Please log in or register to play!");
    }
}// end startGame()

// Replaces the game with a message so no unregistered user can log in
function outputGameMessage(msg)
{
    // creates new html tag to place instead of game
    var gameOutput = document.createElement("h3");
    // message to user
    var node = document.createTextNode(msg);
    gameOutput.appendChild(node);
    gameOutput.setAttribute("id", "gameover");

    var myCanvas = document.getElementById("myCanvas");
    // replaces the game with the message to user
    myCanvas.parentNode.removeChild(myCanvas);

    var game = document.getElementById("Game");
    game.appendChild(gameOutput);
    
}//  end outputMessage()

// holds the game area
var thePond = {
    // Canvas element is stored in attribute 
    canvas: document.getElementById("myCanvas"),
    //start function of the object creates the canvas and interval rates
    start : function()
    {
        //this.canvas.width = canvas.getAttribute("width");
        //this.canvas.height = canvas.getAttribute("Height");
        this.context = this.canvas.getContext("2d");
        //document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        // Variable to count frames
        this.frameNo = 0;
        // will constantly clean and build every 10 miliseconds, 100 times a second
        this.interval = setInterval(updatePond, intervalscds);
        // adds controllers to keys
        window.addEventListener('keydown', function(e){
            // key property of the thePond is set to the key code
            thePond.key = e.keyCode;
        })
        window.addEventListener('keyup', function(e){
            // de-sets the key property
            thePond.key = false;
        })
    }, // end start()

    // when called upon will clear the entire canvas of contents
    clear: function()
    {
        this.context.clearRect(0, 0, canvasWidth, canvasHeight);
    }, // end clear()

    // When called upon will freeze the game in its current state and display the users accolades
    stop : function() 
    {
        clearInterval(this.interval);
        // clears canvas of background
        this.context.clearRect(0, 0, canvasWidth, canvasHeight);
        // updates user details based on performance
        updateUser();
        outputGameMessage("Game Over!");
        // saves details in local storage under the emial
        localStorage.setItem(user.email, JSON.stringify(user));
        retryButton();
    }// end stop()
}// end thePond object

function retryButton()
{
    // creates variable to hold button and sets all its attributes
    var btn = document.createElement("input");
    btn.setAttribute("type", "button");
    btn.setAttribute("value", "Retry?");
    btn.setAttribute("name", "retry");
    btn.setAttribute("id", "retry");
    // enables the buttons functionality to allow user to sign out
    btn.setAttribute("onclick", "location.reload()");
    // adds the button to the top right corner
    document.getElementById("Game").appendChild(btn);
}

/*Returns true when a given framerate divided by the element in the parenthethisis has no remainder
  hence, function will return true if the current framenumber corresponds with the interval in the parenthesis
*/
function everyInterval(n)
{
    if((thePond.frameNo / n) % 1 == 0)
    {
    return true;
    }
    return false;
}// end everyInterval()

// Constructor to add sprites to game
function component(name, width, height, color, x, y, type)
{
    //setting the elements on variables with the ones in the args 
    this.name = name;
    this.type = type;
    // sets the image passed
    this.image = new Image();
    this.image.src = color;
    // sets the sprites' dimensions,locations and speed
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;
    this.speedX = 0;
    this.speedY = 0;

    // handles drawing of the componenet using parameters set when constructed
    this.draw = function()
    {
        ctx = thePond.context;
        ctx.drawImage(this.image,
        this.x,
        this.y,
        this.width, this.height);
    }// end draw()

    // Function is used for setting values for keys pressed
    this.newLocation = function()
    {
        // Speed determines location 
        this.x += this.speedX;
        this.y += this.speedY;
        // Makes sure not to go over the edges of the canvas
        this.hitSides();
    }// end newLocation()

    // Validation to make sure sprite doesn't go out of the canvas from either side
    this.hitSides = function()
    {
        // Variable to hold the length of the canvas minus the length of the rod
        var maxSide = thePond.canvas.width - this.width;
        if(this.x > maxSide)
        {
            this.x = maxSide;
        }
        else if(this.x < 0)
        {
            this.x = 0;
        }
    }// end hitSides

    // Detects weather the fish is right in the middle of the net 
    this.Catch = function(otherobj) 
    {
        // first, the middle of the net is determined
        var heightcenter = (Math.floor((this.height/4)*3)) + this.y;
        // the second limiter is defined, the 1st being, this.x
        var myright = this.x + this.width;
        // the other object in the parenthesis' max right is calculated
        var otherright = otherobj.x + (otherobj.width);
        // the other object in the parebthesis' max bottom is calculated
        var otherbottom = otherobj.y + (otherobj.height);
        //boolean to determine weather the net has caught anything is set to false
        var caught = false;
        /*
            First the condition checks that the center of the net is equal to the bottom of the fish
            then the condition checks if the far right of the fish is in the same area taken up as the net 
            BOTH of these conditions need to be true in order for a fish to be caught
        */
        if((heightcenter == otherbottom)&&((otherright > this.x)&&(otherright < myright)))
        {
            // only when somehing is caught will it be change to true
            caught = true;
        }// end if
        return caught;
    }// end collide()

    // removes this sprite from the canvas
    this.clear = function()
    {
        ctx.thePond.getContext;
        ctx.clearRect(this.width, this.height, this.x, this.y);
    }

    // following code outputs what component was created except for background
    if (name == "fish")
    {
        console.log("Fish was created");
    }
    else if (name == "poisonfish")
    {
        console.log("Poison fish was created be careful!!!!");
    }
    else if (name == "net")
    {
        console.log("net was made");
    }// end of else if

}// end of component object

// Adds Fish object to the associated Arrays
function addFish()
{
    // Coordinates of the fishes location, randomly spawnning on the top of the canvas
    var randomX = Math.floor(Math.random()*(maxRight-1)+1);
    var y = 0;
    // Variable will hold value to determine what kind of fish is created
    var whatFish = Math.floor(Math.random()*2);
    // Validation to see if there is one of each type ON the game in the beginning set to false as there are none
    // Condition will check either if the ponds frame number is 1 or everyInterval returns true
    if(thePond.frameNo == 1 || everyInterval(150))
    {
        // next consition will determine what was randomly generated and will hence generate the associated fish
        if(whatFish == 0)
        {
            poisonFish.push(new component("poisonfish", fishWidth, fishHeight, "PoisonFish.gif", randomX, y, "image"));
        }// end if
        else
        {
            regFish.push(new component("fish", fishWidth, fishHeight, "Fish.gif", randomX, y, "image"));
        }// end else
    }// end if
}

// Will loop through all the regular fish in the array updating them in the process
function setRegfish()
{
    for(i = 0; i < regFish.length; i += 1)
    {
        // Condition will check if the fish was caught by the net 
        if (fishnet.Catch(regFish[i])) 
        {
            // If this fish is caught clear it from the canvas
            regFish[i].clear;
            // Remove it from the array
            regFish.splice(i,1);
            // Increase the score
            score += 1;
            // updates the user's stat 
            updateFishcaught();
        }// end if

        //If the fish wasn't caught it is simply updated
        else
        {
            regFish[i].draw();
            regFish[i].newLocation();
            regFish[i].y += regFishspeed;
            // will increase the missed fish stat
            fishMissed();
        }// end
    }// end for
}// end setRegfish

// Outputs the fish caught 
function updateFishcaught()
{
    // get element to change
    var caughtFish = document.getElementById("FishCaught");
    // changes contents
    caughtFish.innerHTML = "Fish Caught: " + score;
}// end updateFishcaught()

// Will check and set the fishmissed variables
function fishMissed()
{
    /* Will check if the fish passes the threshold where it can't be caught and will hence increase the players 
        missed fish. Validates if its caught or not 
    */
    if(regFish[i].y == (fishnet.y+fishnet.height))
    {
        // updates the fish missed stat of the game 
        fishmissed += 1;
        // displays it 
        updateMissedFish();
    }// end if
    // validates that if 5 fish are missed the game ends 
    if(fishmissed >= maxFishmiss)
    {
        // ends game
        thePond.stop();
    }// end if 
}// ends fishMissed()

// Outputs fish missed
function updateMissedFish()
{
    // gets element to change
    var missedFish = document.getElementById("FishMissed");
    // changes contents 
    missedFish.innerHTML = "Fish Missed: " + fishmissed;
}// end updateMissedFish
    
// Will loop through all the regular fish in the array updating them in the process
function setPoisonFish()
{
    for(i = 0; i < poisonFish.length; i += 1)
    {
        // Condition will check if the fish was caught by the net
        if (fishnet.Catch(poisonFish[i])) 
        {
            // if true the game stops
            thePond.stop();
        }// end if

        // If the poson fish was missed then it is updated and the game goes on 
        else
        {
            poisonFish[i].draw();
            poisonFish[i].newLocation();
            poisonFish[i].y += poisonFishspeed;
        }// end else
    }//end for
}// end setPoisonFish

// Will update the net and set its controllers
function setFishNet()
{
    // Makes sure the net doesn't continue to go in the last direction assigned
    fishnet.speedX = 0;
    fishnet.speedY = 0;

    // Sets the speed and hence direction of the left key
    if (thePond.key && thePond.key == leftKey) 
    {
        fishnet.speedX = -netSpeed; 
    }// end if

    // Sets the speed and hence direction of the right key
    if (thePond.key && thePond.key == rightKey) 
    {
        fishnet.speedX = netSpeed; 
    }// end if

    // sets and draws new location
    fishnet.newLocation();
    fishnet.draw();
}

function updatePond()
{
    // Clears the entire canvas so it can be redrawn later without sprites covering the space they have been in
    thePond.clear();
    // Draws the background first so other elements appear over it
    background.newLocation();
    background.draw();
    // Each time method is called, it will increment the frame number of the Pond object
    thePond.frameNo += 1;

    // places fish for player to avoid or capture
    addFish();

    // When condition is true it will update the regular fish 
    if(regFish.length > 0)
    {
        setRegfish();
    }// end if

    // When condition is true will update the poisonous fish
    if(poisonFish.length > 0)
    {
        setPoisonFish();
    }// end if

    //Fishnet update
    setFishNet();
}// end updatePond

// Updates the users attributes 
function updateUser()
{
    // total score is increased then outputted
    user.totalScore += score;
    var totSc = document.getElementById("Total");
    totSc.innerHTML = "Total Fish Caught: " + user.totalScore;

    //total missed is increased the outputted
    user.totalMissed += fishmissed;
    var totSc = document.getElementById("TotalMiss");
    totSc.innerHTML = "Total Fish Missed: " + user.totalMissed;

    // checks is the users best score has been beat by the score of the game
    if(score > user.bestScore)
    {
        // the users best score is set to the score of the game 
        user.bestScore = score;
        // outputted
        var highsc = document.getElementById("BestScore");
        highsc.innerHTML = "Best Score: " + user.bestScore
    }// end if 
    // no else is needed since the score will remain the same unless beaten
}