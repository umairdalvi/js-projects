document.addEventListener("DOMContentLoaded", function () {
    const startBtn = document.getElementById("startBtn");
    const resetBtn = document.getElementById("resetBtn");
    const pauseBtn = document.getElementById("pauseBtn");
    const hourField = document.getElementById("hours");
    const minField = document.getElementById("minutes");
    const secField = document.getElementById("seconds");
    const timerDisplay = document.getElementById("display");
    const quote = document.getElementById("quote");
    const alarm = document.getElementById("endSound");
    let totalSeconds = 0;
    let timerInterval = null;

    const quotes = [
        { quote: "Any sufficiently advanced technology is indistinguishable from magic.", author: "Arthur C. Clarke" },
        { quote: "Programs must be written for people to read, and only incidentally for machines to execute.", author: "Harold Abelson" },
        { quote: "The best way to predict the future is to invent it.", author: "Alan Kay" },
        { quote: "First, solve the problem. Then, write the code.", author: "John Johnson" },
        { quote: "Simplicity is the soul of efficiency.", author: "Austin Freeman" },
        { quote: "Your most unhappy customers are your greatest source of learning.", author: "Bill Gates    " },
        { quote: "The question of whether a computer can think is no more interesting than the question of whether a submarine can swim.", author: "Edsger Dijkstra" },
        { quote: "Move fast and break things. Unless you are breaking stuff, you are not moving fast enough.", author: "Mark Zuckerberg" },
        { quote: "Technology should do the hard work so people can do the things that make them happiest.", author: " Larry Page" },
        { quote: "In a startup, absolutely nothing happens unless you make it happen.", author: "Marc Andreessen" },
        { quote: "Code is like humor. When you have to explain it, it's bad.", author: "Cory House" },
        { quote: "Don't worry about people stealing your design work. Worry about the day they stop.", author: "Jeffrey Zeldman" },
        { quote: "The purpose of computing is insight, not numbers.", author: "Richard Hamming" },
        { quote: "Stay hungry, stay foolish.", author: "Steve Jobs" },
    ];

    function quotePicker() {
        let idx = parseInt(Math.random() * 14)
        document.getElementById("quote").innerHTML = `
                 <div class="quote-text" id="quote-text">${quotes[idx].quote}
                    <span class="author"> - ${quotes[idx].author}</span> 
                    </div>
            `
    }

    function formatTime(totalSeconds) {
        let hour = parseInt(totalSeconds / 3600);
        totalSeconds %= 3600;
        let min = parseInt(totalSeconds / 60);
        totalSeconds %= 60;
        let sec = parseInt(totalSeconds);

        return `${hour.toString().padStart(2, "0")}:${min.toString().padStart(2, "0")}:${sec.toString().padStart(2, "0")}`
    }

    function initTimer() {
        clearInterval(timerInterval);
        timerInterval = null;

        let hour = hourField.value || 0;
        let min = minField.value || 0;
        let sec = secField.value || 0;

        totalSeconds = (hour * 3600) + (min * 60) + parseInt(sec);
        timerDisplay.innerText = formatTime(totalSeconds);
    }

    function validateTime(hour, min, sec) {

        if (hour < 0 || min < 0 || sec < 0) return false;
        if (hour === 0 && min === 0 && sec === 0) return false;
        if (min < 0 || min > 59 || sec < 0 || sec > 59) return false;

        return true;
    }

    function startTimer() {
        alarm.pause();
        alarm.currentTime = 0;

        let hour = parseInt(hourField.value) || 0;
        let min = parseInt(minField.value) || 0;
        let sec = parseInt(secField.value) || 0;

        if (!validateTime(hour, min, sec)) {
            Swal.fire({
                icon: "warning",
                text: "Please enter a valid time before starting the countdown",
                timer: 2200,
                timerProgressBar: true
            })
            return;
        };

        if (timerInterval) return;

        quote.classList.remove("visible");

        if (totalSeconds === 0) initTimer();
        clearInterval(confettiInterval);

        timerInterval = setInterval(() => {
            if (totalSeconds > 0) {
                totalSeconds--;
                timerDisplay.innerText = formatTime(totalSeconds);
            } else {
                clearInterval(timerInterval);
                timerInterval = null;
                quote.classList.add("visible")
                quotePicker();
                fireworks();
                alarm.play();
                alarm.loop = true;
            }
        }, 1000);
    }

    function resetTimer() {
        clearInterval(timerInterval);
        clearInterval(confettiInterval);
        timerInterval = null;
        totalSeconds = 0;

        alarm.pause();
        alarm.currentTime = 0;
        quote.classList.remove("visible");

        hourField.value = "";
        minField.value = "";
        secField.value = "";
        timerDisplay.innerText = "00:00:00"
    }

    function pauseTimer() {
        clearInterval(timerInterval);
        timerInterval = null;
        alarm.pause();
    }

    startBtn.addEventListener("click", startTimer);
    resetBtn.addEventListener("click", resetTimer);
    pauseBtn.addEventListener("click", pauseTimer);
    document.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            startTimer();
        }
    });

    //=============================== CONFETTI ================================================
    let confettiInterval = null;

    function fireworks() {
        const duration = 10 * 1000,
            animationEnd = Date.now() + duration,
            defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

        function randomInRange(min, max) {
            return Math.random() * (max - min) + min;
        }

        confettiInterval = setInterval(function () {
            const timeLeft = animationEnd - Date.now();

            if (timeLeft <= 0) {
                return clearInterval(confettiInterval);
            }

            const particleCount = 50 * (timeLeft / duration);

            confetti(
                Object.assign({}, defaults, {
                    particleCount,
                    origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
                })
            );
            confetti(
                Object.assign({}, defaults, {
                    particleCount,
                    origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
                })
            );
        }, 250);
    }
})