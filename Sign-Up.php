<?php

    include 'Fishnet_Fiasco.php';
    outputTop("Fishnet Fiasco: Sign-Up");
    outputHeader();
    outputNavigation("SignUppage"); 
?>

<section id = "main-section">
    <h2>Sign up for Fishnet Fiasco!:</h2><br>
    <article id = "main-art" >
        <form id = "signup" name = "register">
            <h3>Name:</h3> 
            <input type = "text" name = "accName" /><br><br>
            <h3>Surname:</h3>
            <input type = "text" name = "userSurname" /><br><br>
            <h3>email:</h3> 
            <input type = "email" name = "userEmail" /><br><br>
            <h3>Username:</h3> 
            <input type = "text" name = "userName" maxlength = "12" /><br><br>
            <h3>Password:</h3>
            <input type = "password" name = "userPassword" maxlength = "8"/><br><br>

            <input type = "button" value = "Sign Up!" onclick = "registerUser()"/>
        </form>
    </article>
    <script>
        // to store the form
        var signup = document.getElementById("signup");
        // User object created to store attributes
        var user = {};

        // Submits details of a new account
        function registerUser()
        {
            // The following are the attributes of any user that registers they are grabbed from the form id = "signup"
            user.name = document.forms.signup.accName.value;
            user.surname = document.forms.signup.userSurname.value;
            user.email = document.forms.signup.userEmail.value;
            user.username = document.forms.signup.userName.value;
            user.password = document.forms.signup.userPassword.value;
            
            // the email, password and will be checked to see if the users details can be registered 
            if(validateRegistration())
            {
                // if the function returns true more attributes are added to the user
                user.bestScore = 0;// holds the best amount of fish caught from a game
                user.totalScore = 0;// holds the total amount of fish caught form all games
                user.totalMissed = 0;// holds the total amount of fish missed from all games

                // Stores the user object in JSON format under the defining the key as the users's 
                localStorage.setItem(user.email, JSON.stringify(user));
                // Stores the users email in a key called loggedEmail which will be used to ensure the user stays logged in
                localStorage.setItem("loggedEmail", user.email);
                // Opens the game page 
                window.location.href = "Gamepage.php";
            }// end if
        }// end submitDetails()

        // validates the registration of the correct patterns entered
        function validateRegistration()
        {
            
            // first ensures that no field is left bank
            if( (user.name == "") || (user.surname == "") || (user.email == "") || (user.username == "") || (user.password == ""))
            {
                outputMessage("Please fill in all the fields", signup);
                return false
            }// end if

            // removes it from local storage so to add all other contents to the scoreboard
            localStorage.removeItem("loggedEmail");
            // will temp hold each user from local storage 
            var temp;
            
            // will cheks that both name and surname are characters
            if( (validateNames(user.name) == false) || (validateNames(user.surname) == false) )
            {
                return false;
            }// end if

            //validateNames(user.Surname);

            // loop will go through the contents of the local storage
            for(i = 0; i < localStorage.length; i ++)
            {
                // Makes sure email is valid to continue
                if( validateEmail(i) == false)
                {
                    return false;
                }// end if

                // temp will hold each object in the storage at a time
                temp = JSON.parse(localStorage.getItem(localStorage.key(i)));

                // makes sure username and password are valid
                if( (validateUsername(temp) == false) || ( validatePassword(temp) == false ) )
                {
                    return false;
                }// end if
                    
            }// end for

            // when all requirements haven't been met the registration is valid 
            return true;
        }// end validateUsername

        // makes sure name is only characters
        function validateNames(name)
        {
            // unwanted characters
            var patt = new RegExp("^[a-zA-Z]+$");
            // checks if the pattern doesn't match'
            if(!patt.test(name))
            {
                // Alerts user
                outputMessage("Only alphabet characters in name and surename fields!", signup);
                return false
            }// end if
            else
            { 
                return true;
            }// end else
        }// end validateNames

        // makes sure email isn't duplicated and is of correct format
        function validateEmail(i)
        {
            var atpos = user.email.indexOf("@");
            var dotpos = user.email.indexOf(".");
            // first checks if the email has already been registered
            if(user.email == localStorage.key(i))
            {
                // calls method to dsiplay error on form
                outputMessage("This email is already registered!", signup);
                return false;
            }// end if
            else if( ( atpos < 1 ) || (dotpos + 2 >= user.email.length ) )
            {
                outputMessage("Please enter valid email!", signup);
                return false;
            }// end else if
        }// end validateEmail

        // makes sure usrename is unique and up to spec
        function validateUsername(temp)
        {
            var maxlength = 16;
            var minlength = 4;

            var usrnameLength = user.username.length;

            if( ( usrnameLength > maxlength ) || ( usrnameLength < minlength ) || ( usrnameLength == 0) )
            {
                outputMessage("Username must be between 4 and 12 characters long", signup);
                return false;
            }// end if
            // the usernames are compared
            else if(temp.username == user.username)
            {
                // calls method to output on webpage
                outputMessage("User already exists! Please eneter a different username", signup);
                return false;
            }
            else
            {
                return true;
            }// end else
        }// validateUsername

        function validatePassword(temp)
        {
            var maxlength = 8;
            var minlength = 6;

            var passLength = user.password.length;

            if( ( passLength > maxlength ) || ( passLength < minlength ) || ( passLength == 0) )
            {
                outputMessage("Password must be between 4 and 12 characters long", signup);
                return false;
            }// end if

            // passwords are compared
            if(temp.password == user.password)
            {
                // calls method to output on webpage
                outputMessage("Please enter different password", signup);
                return false;
            }// end if
            else
            {
                return true;
            }
        }

    </script>
</section>

<?php 

outputFooter();

?>