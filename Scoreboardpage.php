<?php 

    # Calls the common elements
    include 'Fishnet_Fiasco.php';
    # enters the title of page as arg 
    outputTop("Fishnet Fiasco: Scoreboard");
    outputHeader();
    # enters the current page as arg
    outputNavigation("Scoreboard");
    
?>
<section id = "main-section">

    <h2>Player Stats:</h2><br>

    <table id = "leaderboard">
        <tr>
            <th>Username: </th>
            <th>Best Score: </th>
            <th>Total Fish Caught: </th>
            <th>Total Fish Missed: </th>
        </tr>
    </table>

    <script>
        // Stores the loggedEmail undefined or otherwise
        var logUser = localStorage.getItem("loggedEmail");
        // removes it from local storage so to add all other contents to the scoreboard
        localStorage.removeItem("loggedEmail");
        // to hold users registered in local storage
        var users = [];
        // holds html tag
        var table = document.getElementById("leaderboard");

        // loops through all the reistered accounts in the local storage
        for(i = 0; i < localStorage.length; i++)
        {
            // changes them back to objects and stores them in array 
            users[i] = JSON.parse(localStorage.getItem(localStorage.key(i)));
        }// end for

        /*
        console.log("Array before");
        for(i = 0; i < users.length; i++)
        {
            console.log(users[i].username);
        }*/

        // Bubble sort Will order the array in descending order by best score
        function sortBy(bestscore)
        {
            return function(a, b)
            {
                if(a[bestscore] < b[bestscore])
                {
                    return -1;
                }
                else if(a[bestscore] > b[bestscore])
                {
                    return 1;
                }
                else
                {
                    return 0;   
                }
            }
        }// end sortBy

        // sorts the array by the best score being at the bottom of the array	
		users.sort(sortBy("bestScore"));
        // Will loop through the newly ordered array
        for(i = 0; i < users.length; i++)
        {
            // places each one in a new row 
            placeUser(users[i]);
        }// end for

        // Will create rows for each registered user
        function placeUser(currentuser)
        {
            // holds row
            var row = table.insertRow(1);
            // holds cells foe each attribute
            var cell1 = row.insertCell(0);
            var cell2 = row.insertCell(1);
            var cell3 = row.insertCell(2);
            var cell4 = row.insertCell(3);
            // places attributes of user in args in cells 
            cell1.innerHTML = currentuser.username;
            cell2.innerHTML = currentuser.bestScore;
            cell3.innerHTML = currentuser.totalScore;
            cell4.innerHTML = currentuser.totalMissed;
        }// end placeUser()

        /* once script has finished will restore the legged eamil 
        in local storage so any logged in user will remain that way after
        they leave the scorboard page and navigate the website without forcefully
        signing out 
        */ 
        localStorage.loggedEmail = logUser;
    </script>

</section>

<?php 
    outputFooter();
?>