/*execute function when document is ready*/
$(document).ready(function(){
    let player = 1;
    let winner = 0;
    let colors = {};
    colors[-1] = "yellow";
    colors[1] = "red"; /*dictionary keys are opposites so the player can be switched by negating the current player*/
    let count = 0;

    /*iterate through each cell (rows then columns) and number them*/
    $(".cell").each(function(){
        $(this).attr("id", count);
        $(this).attr("playerData", 0);
        count++;

        $(this).click(function(){
            if(isValid($(this).attr("id"))){
                $(this).css("background-color", colors[player]); /*place player's color in empty spot*/
                $(this).attr("playerData", player); /*change cell's playerData value from 0 to player number*/

                /*check if current player has won and end game if true*/
                if(playerWon(player)){
                    alert(colors[player] + " has won!");
                    winner = player;
                }

                player *= -1; /*change player*/
            }
        });
    });

    $("#restart").click(function(){
        wipeGrid();
    });

    /*clears gameBoard*/
    function wipeGrid(){
        $(".cell").each(function(){
            $(this).attr("playerData", 0);
            $(this).css("background-color", "white");

            winner = 0;
        });
    }

    /*checks if provided cell id(n) is valid (hasn't been played in already)*/
    function isValid(n){
        let id = parseInt(n);

        /*no cells are valid if a player has already won*/
        if(winner !== 0){
            return false;
        }

        if($("#" + id).attr("playerData") === "0"){
            if(id >= 35){
                return true; /*only valid on the last row (cells 36-42)*/
            }
            if($("#" + (id + 7)).attr("playerData") !== "0"){
                return true; /*valid if the cell below n has already been played in*/
            }
        }
        return false;
    }

    function playerWon(p){
        /*check horizontally*/
        let line = 0;

        for(let i = 0; i < 42; i+=7){
            for(let j = 0; j < 7; j++){
                let cell = $("#" + (i + j));
                if(cell.attr("playerData") == p){
                    line++;
                }else{
                    line = 0;
                }

                if(line >= 4){
                    return true;
                }
            }
            line = 0;
        }

        /*check vertically*/
        line = 0;
        for(let i = 0; i < 7; i++){
            for(let j = 0; j < 42; j+=7){
                let cell = $("#" + (i + j));
                if(cell.attr("playerData") == p){
                    line++;
                }else{
                    line = 0;
                }

                if(line >= 4){
                    return true;
                }
            }
            line = 0;
        }

        /*
        check diagonals
            diagonal win condition for the whole grid is checked by checking the diagonals of every 4x4 grid on the 7x6 board
        */
        let topLeft = 0;
        let topRight = topLeft + 3;
        
        for(let i = 0; i < 3; i++){
            
            /*positive diagonal*/
            for(let j = 0; j < 4; j++){
                if($("#" + topLeft).attr("playerData") == p
                && $("#" + (topLeft + 8)).attr("playerData") == p
                && $("#" + (topLeft + 16)).attr("playerData") == p
                && $("#" + (topLeft + 24)).attr("playerData") == p){
                    return true;
                }
            }

            /* negative diagonal*/
            for(let j = 0; j < 4; j++){
                if($("#" + topRight).attr("playerData") == p
                && $("#" + (topRight + 6)).attr("playerData") == p
                && $("#" + (topRight + 12)).attr("playerData") == p
                && $("#" + (topRight + 18)).attr("playerData") == p){
                    return true;
                }

                topLeft++;
            topRight = topLeft + 3;
            }
            topLeft = i * 7 + 7;
            topRight = topLeft + 3;
        }

        return false
    }
});