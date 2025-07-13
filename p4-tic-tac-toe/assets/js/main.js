let counter = 0;
let xWinCount = 0;
let oWinCount = 0;
let startNewGame = false;
let player1, player2;

const xIcon = `<img src="./assets/images/x-mark.svg" alt="x-symbol" class="x-icon">`;
const oIcon = `<img src="./assets/images/o-mark.svg" alt="o-symbol" class="o-icon">`;

function checkWin(player) {
    function combinationCheck(start, end, increment) {
        let strike = 0;

        for (let i = start; i <= end; i += increment) {
            let box = document.getElementById(`box${i}`);
            if (box.innerHTML === player) {
                strike++;
            }
        }
        if (strike === 3) return true;

        return false;
    }

    if (combinationCheck(1, 3, 1)) return true;
    if (combinationCheck(4, 6, 1)) return true;
    if (combinationCheck(7, 9, 1)) return true;
    if (combinationCheck(1, 7, 3)) return true;
    if (combinationCheck(2, 8, 3)) return true;
    if (combinationCheck(3, 9, 3)) return true;
    if (combinationCheck(1, 9, 4)) return true;
    if (combinationCheck(3, 7, 2)) return true;

    return false;
}

function choosePlayer() {
    $("#turn").html("").css("display", "flex");

    $("#player-x").on("click", function () {
        player1 = xIcon;
        player2 = oIcon;
        $(".choose-player").css("display", "none");
        $(".game-wrapper").css("display", "flex");
        $("#turn").html(`${player1}'s turn`);
    });

    $("#player-o").on("click", function () {
        player1 = oIcon;
        player2 = xIcon;
        $(".choose-player").css("display", "none");
        $(".game-wrapper").css("display", "flex");
        $("#turn").html(`${player1}'s turn`);
    });
}

function winAlert(player) {
    Swal.fire({
        heightAuto: false,
        title: `🎊 ${player} wins 🎊`,
        text: `Please start a new game`,
        padding: "3em",
        backdrop: `
                rgba(125, 125, 125, 0.3)
                url("./assets/images/download.gif")
                left top
                no-repeat                
        `
    });
}

function scoreCounter(player) {
    if (player === xIcon) {
        xWinCount++;
        $(".xScore").html(`${xIcon} ${xWinCount}`);
    } else {
        oWinCount++;
        $(".oScore").html(`${oIcon} ${oWinCount}`);
    }
}

function winner(player) {
    winAlert(player);
    scoreCounter(player);
    startNewGame = true;
}

$(document).ready(function () {
    $(".xScore").html(`${xIcon} ${xWinCount}`);
    $(".oScore").html(`${oIcon} ${oWinCount}`);

    choosePlayer();

    $("#newGame").on("click", function () {
        $(".box").html("");
        startNewGame = false;
        counter = 0;
        $(".game-wrapper").css("display", "none");
        $(".choose-player").css("display", "flex");

        choosePlayer();
    });

    $(".box").on("click", function () {
        if (startNewGame) {
            Swal.fire({
                icon: "info",
                title: "Game Over",
                html: "Please start a new game.",
                timer: 2000,
                timerProgressBar: true,
                heightAuto: false,
            });
            return;
        }

        let box = this;

        if (box.innerHTML === "") {
            if (counter % 2 === 0) {
                box.innerHTML = player1;
                counter++;

                if (counter >= 5 && checkWin(player1)) {
                    winner(player1);
                    $("#turn").html("").css("display", "none");
                    return;
                }

                $("#turn").html(`${player2}'s turn`);

            } else {
                box.innerHTML = player2;
                counter++;

                if (counter >= 5 && checkWin(player2)) {
                    winner(player2);
                    $("#turn").html("").css("display", "none");
                    return;
                }

                $("#turn").html(`${player1}'s turn`);
            }
        } else {
            Swal.fire({
                icon: "warning",
                title: "Cannot override previous move!",
                html: "Please click on an empty box.",
                timer: 2000,
                timerProgressBar: true,
                heightAuto: false,
            });
        }

        if (counter === 9) {
            Swal.fire({
                title: "Draw",
                html: "Please start a new game",
                timer: 2000,
                timerProgressBar: true,
                heightAuto: false,
            });

            $("#turn").html("").css("display", "none");
        }
    });
});