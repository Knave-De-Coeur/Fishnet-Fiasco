<?php

    include 'Fishnet_Fiasco.php'; 
    outputTop("Fishnet Fiasco: Game");
    outputHeader();
    outputNavigation("Game");

?>

<section id = "main-section">
    
    <aside id = "statboard">
        <h3>Status Board:</h3>
        <ul id = "userData">
            <li id = "user">User: </li>
            <li id = "FishCaught">Fish Caught: </li>
            <li id = "FishMissed">Fish Missed: </li>
            <li id = "BestScore">Best Score: </li>
            <li id = "Total">Total Fish Caught: </li>
            <li id = "TotalMiss">Total Fish Missed: </li>
        </ul>   
    </aside>

    
    
    <div id = "Game">
        <h3>Fishnet Fiasco:</h3>
        <p id = "prompt">Press the space below to start the game</p>
        
        <canvas id = "myCanvas" width = "850" height = "400" onclick = "startGame()">
            Click here to start the Game!!!
        </canvas>

        <script src = "FFGame_Script.js"></script>
    </div>
    
</section>

<?php

    outputFooter();

?>