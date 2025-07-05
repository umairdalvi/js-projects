$(document).ready(function () {
    const size = 10;
    let inputContainer = document.getElementById("input-container")

    for (let i = 1; i <= size; i++) {
        inputContainer.innerHTML += `<input type="number" class="inp" id="inp${i}">`
    }

    $("#inp1").focus();

    $("#randomBtn").on("click", function () {
        for (let i = 1; i <= size; i++) {
            let box = document.getElementById(`inp${i}`)
            box.value = parseInt(Math.random() * 100)
            $(box).removeClass("max-highlight min-highlight")
        }
    })

    $("#clrBtn").on("click", function () {
        for (let i = 1; i <= size; i++) {
            let box = document.getElementById(`inp${i}`)
            box.value = ""
            $(box).removeClass("max-highlight min-highlight")
        }
    })

    $("#maxBtn").on("click", function () {

        for (let i = 1; i <= size; i++) {
            let box = document.getElementById(`inp${i}`)
            if (box.value === "") {
                Swal.fire({
                    icon: "warning",
                    title: "Boxes are empty",
                    text: "Please fill all the boxes.",
                    heightAuto: false,
                });
                return;
            }
        }

        for (let i = 1; i <= size; i++) {
            let box = document.getElementById(`inp${i}`)
            $(box).removeClass("max-highlight")
        }

        let max = -Infinity
        let maxInputField
        for (let i = 1; i <= size; i++) {
            let value = Number(document.getElementById(`inp${i}`).value)
            if (value > max) {
                max = value
                maxInputField = document.getElementById(`inp${i}`)
            }
        }

        $(maxInputField).addClass("max-highlight")
    })

    $("#minBtn").on("click", function () {
        for (let i = 1; i <= size; i++) {
            let box = document.getElementById(`inp${i}`)
            if (box.value === "") {
                Swal.fire({
                    icon: "warning",
                    title: "Boxes are empty",
                    text: "Please fill all the boxes.",
                    heightAuto: false,
                });
                return;
            }
        }

        for (let i = 1; i <= size; i++) {
            let box = document.getElementById(`inp${i}`)
            $(box).removeClass("min-highlight")
        }

        let min = Infinity
        let minInputField
        for (let i = 1; i <= size; i++) {
            let value = Number(document.getElementById(`inp${i}`).value)
            if (value < min) {
                min = value
                minInputField = document.getElementById(`inp${i}`)
            }
        }

        $(minInputField).addClass("min-highlight")
    })

})