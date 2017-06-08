
// Ensure username is on the top right corner on every page 
function validateLogin()
{
    var loggin = document.getElementById("account");
    // Goes through the local storage contents
    if(localStorage.leggedEmail != "none")
    { 
        for(i = 0; i < localStorage.length; i ++)
        {
            // checks if the email saved in the loggedEmail key is in local storage
            if(localStorage.loggedEmail == localStorage.key(i))
            {
                // pasrses the located local storage element into a variable
                var user = JSON.parse(localStorage[localStorage.loggedEmail]);
                // Replaces the default form with username and signout button
                loggin.innerHTML = user.username + "&emsp;";
                addButton();
                return true;
            }// end if
        }// end for
    }// end if
}// end validateLogin()


// enables the user to log-out
function signOut()
{
    /* changes the loggedEmail to undefined so when each page reloads 
    the default form will appear instead of the user
    */
    localStorage.setItem("loggedEmail",  "none");
    // reloads the current page
    location.reload();
}


// Enables registered users to log in 
function logIn()
{
    // whatever email user enters
    var email = document.forms.account.email.value;
    // whatever password the user enters
    var password = document.forms.account.password.value;
    // stores form being accessed
    var loggin = document.getElementById("account");

    // alerts user if they pressed signin without entering anything
    if(email == "" || password == "")
    {
        outputMessage("Please fill in BOTH fields above", loggin);
        return false
    }

    //checks if it exists
    // Fist checks that email exists in local storage in order to parse it
    if(localStorage.getItem(email) !== null) 
    {
        
        // pasrses the saved json back into an object
        var user = JSON.parse(localStorage.getItem(email));
        // Condition checks if the password is correct
        if(password == user.password)
        {
            // replaces the form with the username
            loggin.innerHTML = user.username + "&emsp;";
            // adds a button to sign out
            addButton();
            // changes the contents the the local storage key to the email of the currently logged in user
            localStorage.setItem("loggedEmail", user.email);
            // opens game page
            window.location.href = "Gamepage.php";
        }// end if
        // if the password isn't correct
        else
        {
            // creates and adds a p tag to output user that the password entered is wrong
            outputMessage("Password doesn't match the account, please try again", loggin);
            return false;
        }// end else
    }// end if
    // If the email is null, it doesn't exist
    else
    {
        // creates and adds a p tag to output user that the email doesn't exist and they need to register
        outputMessage("Email doesn't exist. If you wish to play, please register.", loggin);
        return false;
    }
}// end logIn()

// will output a message
function outputMessage(output, divid)
{
    var newPara;
    var thisdiv = divid;
    var elementExists = document.getElementById("error");
    var txt = document.createTextNode(output);
    // checks the element has already been created
    // if it hasn't
    if(elementExists == null)
    {
        // new p is created 
        newPara = document.createElement("p");
        // added to error class
        newPara.setAttribute("id","error");
        // text added to div
        newPara.appendChild(txt);
        // div added to the id that is called in parenthesis
        thisdiv.appendChild(newPara);
    }// end if
    else// if it is there 
    {
        // element is replaced
        newPara = elementExists;
        newPara.innerHTML = output;
    }// end else
}// end outputMessage()

// creates a button 
function addButton()
{
    // creates variable to hold button and sets all its attributes
    var btn = document.createElement("input");
    btn.setAttribute("type", "button");
    btn.setAttribute("value", "Sign Out");
    btn.setAttribute("name", "signout");
    // enables the buttons functionality to allow user to sign out
    btn.setAttribute("onclick", "signOut()");
    // adds the button to the top right corner
    document.getElementById("account").appendChild(btn);
}// end addButton()