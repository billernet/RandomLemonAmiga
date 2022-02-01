document.addEventListener("DOMContentLoaded", function() {

    chrome.storage.local.get("lemonamigaTotal", function(value) {

        if (!value || !value.lemonamigaTotal) {

            value = { lemonamigaTotal: 4700 };
            chrome.storage.local.set(value);
        }
        document.getElementById("lemonamiga-total").value = value.lemonamigaTotal;
    });

    chrome.storage.local.get("lemon64Total", function(value) {

        if (!value || !value.lemon64Total) {

            value = { lemon64Total: 4197 };
            chrome.storage.local.set(value);
        }
        document.getElementById("lemon64-total").value = value.lemon64Total;
    });

    const inputs = document.querySelectorAll(".input-value input")
    for (let i = 0; i < inputs.length; i++) {
        inputs[i].addEventListener("change", function() {
            document.getElementById("status-message").innerText = "";
        });
    }

    document.getElementById("cancel").addEventListener("click", function() {
        window.close();
    });

    document.getElementById("close").addEventListener("click", function() {
        window.close();
    });

    var validateOptions = function() {
        let newLemonAmiga = document.getElementById("lemonamiga-total");
        let newLemon64 = document.getElementById("lemon64-total");
        let isValid = true;

        let inputs = [newLemonAmiga, newLemon64];
        for (let i = 0; i < inputs.length; i++) {
            inputs[i].classList.remove("invalid");

            let min = parseInt(inputs[i].getAttribute("min"));
            let max = parseInt(inputs[i].getAttribute("max"));
            let value = parseInt(inputs[i].value);
            if (value < min || value > max) {
                isValid = false;
                inputs[i].classList.add("invalid");
            }
        }
        return isValid;
    }

    document.getElementById("save").addEventListener("click", function() {
        let statusElement = document.getElementById("status-message");
        let formIsValid = validateOptions();
        if (formIsValid) {
            let newLemonAmigaValue = document.getElementById("lemonamiga-total").value;
            let newLemon64Value = document.getElementById("lemon64-total").value;
            chrome.storage.local.set({ lemonamigaTotal: parseInt(newLemonAmigaValue) });
            chrome.storage.local.set({ lemon64Total: parseInt(newLemon64Value) });
            statusElement.classList.remove("invalid");
            statusElement.innerText = "The new values have been saved.";
        } else {

            statusElement.classList.add("invalid");
            statusElement.innerText = "Please enter a valid number.";
        }
    })
});