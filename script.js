const Science = ["0625", "0620", "0610"];

let MCQ = 0;
let ATP = 0;
let THEORY = 0;
let selectedcode = 0;

document.getElementById("start").addEventListener("click", function() {
    selectedcode = document.getElementById("code").value;

    if (!selectedcode) {
        alert("Please select a subject code!");
        return;
    }

    if (Science.includes(selectedcode.toString())) {

        MCQ = parseFloat(prompt("Enter MCQ marks: "));
        while (MCQ > 40 || MCQ < 0) {
            alert("Invalid marks retry");
            MCQ = parseFloat(prompt("Enter MCQ marks: "));
        }

        THEORY = parseFloat(prompt("Enter THEORY marks: "));
        while (THEORY > 80 || THEORY < 0) {
            alert("Invalid marks retry");
            THEORY = parseFloat(prompt("Enter Theory marks: "));
        }

        ATP = parseFloat(prompt("Enter ATP marks: "));
        while (ATP > 40 || ATP < 0) {
            alert("Invalid marks retry");
            ATP = parseFloat(prompt("Enter ATP marks: "));
        }

        let Total = (MCQ * 1.5) + (THEORY * 1.25) + (ATP * 1);
        console.log(`${Total} out of 200`);
        alert(`Total: ${Total} out of 200`);
    } else {
        alert("This subject code is not in Science.");
    }
});