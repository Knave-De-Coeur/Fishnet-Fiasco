<?php
    # takes the name of the page calling the file as parameters to output the comman elements
    function outputTop($title)
    {
        echo '<!doctype html>';
        echo '<html lang = "en">';
        echo '<head>';
        echo '<meta charset = "utf-8">';
        echo '<title>', $title, '</title>';# Var in parenthesis is used in the title
        echo '<link href = "FF_Style.css" rel = "stylesheet" type ="text/css"/>';
        echo '<script src = "FF_Script.js"></script>';
        echo '</head>';
        echo '<body onload = "validateLogin()">';
        echo '<div id = "wholepage">';
    }# end outputTop()

    # This function will output the header and its contents
    function outputHeader()
    {
        echo '<header id = "top-header">';
        echo '<img src = "Logo.png" alt = "Company_Logo" width = "150px" height = "75px"/>';
        echo '<form id = "account">';
        echo 'Email: <input type = "email" name = "email"/> &nbsp;';
        echo 'Password: <input type = "password" name = "password"/> &nbsp;';
        echo '<input type = "button" value = "Log In" onclick = "logIn()" />';
        echo ' &nbsp; OR &nbsp;';
        echo '<input type = "button" value = "Sign-Up!" onclick="location.href = \'Sign-Up.php\';"/>';
        echo '</form>';
        echo '</header>';
    }# end outptHeader()

    # Outputs the navigation of each page taking the page name as args
    function outputNavigation($page)
    {
        echo '<nav id = "main-nav">';
        echo '<ul>';

        # stores link names
        $linkNames = array("Home", "Game", "Scoreboard");

        # stores links
        $links = array("Index.php", "Gamepage.php", "Scoreboardpage.php");

        # loops through the links
        for($x = 0; $x < count($linkNames); $x++)
        {
            echo '<li><a';
            # checks if the current link is equal to the one in the args
            if($linkNames[$x] == $page)
            {
                # Will add a class attribute if it is true
                echo ' class = "selected"';
            }
            # will add the link and corresponding name to the a tag 
            echo ' href = "'.$links[$x].'">'.$linkNames[$x].'</a></li>';
        }
        echo  '</ul>';
        echo  '</nav>';
    }# end outputNavigation()

    # common elements for the footer
    function outputFooter()
    {
        echo '<div class="container-fluid">';
        echo '<footer id = "main-footer">';
        echo '<h2>© Copyight FishnetFiasco 2016</h2>';
        echo '</footer>';
        echo '</div>';
        echo '</div>';
        echo '</body>';    
        echo '</html>';
    }
?>