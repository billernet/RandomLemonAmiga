"use strict";

//Support both Chrome and Firefox
var thisBrowser;
if (typeof browser !== "undefined") {
    thisBrowser = browser;
} else if (typeof chrome !== "undefined") {
    thisBrowser = chrome;
}

thisBrowser.runtime.sendMessage({}, function(response) {
    var readyStateCheckInterval = setInterval(function() {
        if (document.readyState === "complete") {
            clearInterval(readyStateCheckInterval);

            randomLemon = identifyWebsite();
            randomLemon.addButton();

            document.addEventListener("keyup", function(event) {
                if (event.altKey && event.ctrlKey && event.which == 82) {
                    goToRandomPage();
                }
            });

        }
    }, 10);
});

var randomLemon;

const lemonAmiga = "www.lemonamiga.com";

const identifyWebsite = function() {
    if (document.location.host.toLowerCase() == lemonAmiga) {
        return new RandomAmiga();
    } else {
        return new RandomC64();
    }
}

class RandomAmiga {

    constructor() {

        var self = this;
        this.gameCount = 0;

        chrome.storage.local.get("lemonamigaTotal", function(value) {

            if (!value || !value.lemonamigaTotal) {

                value = { lemonamigaTotal: 4700 };
                chrome.storage.local.set(value);
            }
            self.gameCount = value.lemonamigaTotal;
        });

    }

    addButton() {
        let navigation = document.querySelector(".top-navigation");
        if (navigation != null) {

            //Only add the button if it hasn't already been added.
            let existingButton = document.getElementById("random");
            if (!existingButton) {
                let menuItem = navigation.querySelector("img[src='/images/navigation/signs/links.gif']");

                if (menuItem != null) {
                    menuItem = menuItem.closest("td");

                    let newMenuItem = menuItem.cloneNode(true);
                    newMenuItem.setAttribute("id", "random");
                    let newImage = newMenuItem.querySelector("img")
                    let link = newMenuItem.querySelector("a");

                    newImage.setAttribute("src", thisBrowser.extension.getURL("images/signz_random.gif"));
                    newImage.style.height = "27px";
                    newImage.style.width = "54px";
                    newImage.setAttribute("alt", "Random game.");
                    newImage.setAttribute("title", "Go to a random game")

                    link.addEventListener("click", function(event) {
                        event.preventDefault();
                        randomLemon.goToRandomPage();
                    });

                    menuItem.parentElement.appendChild(newMenuItem);
                }
            }
        }
    }

    goToRandomPage() {

        let generatedId = Math.floor(Math.random() * this.gameCount) + 1;
        let newUrl = "/games/details.php?id=" + generatedId;
        document.location.href = newUrl;
    }
}

class RandomC64 {

    constructor() {
        this.gameCount = 4197;
    }

    addButton() {

        let frame = document.querySelector("frame[name='menu']");
        if (frame != null) {
            let header = frame.contentDocument.getElementById("hdr");
            let newButton = document.createElement("img");

            let link = document.createElement("a");
            link.setAttribute("href", "javascript:void(0);");
            link.addEventListener("click", function(event) {
                event.preventDefault();
                randomLemon.goToRandomPage();
            });

            newButton.setAttribute("src", thisBrowser.extension.getURL("images/c64_random.gif"));
            newButton.setAttribute("id", "random");
            newButton.style.height = "18px";
            newButton.style.width = "59px";
            newButton.style.top = "41px";
            newButton.style.left = "591px";
            newButton.setAttribute("alt", "Random game.");
            newButton.setAttribute("title", "Go to a random game")

            link.appendChild(newButton);
            header.appendChild(link);
        }
    }

    goToRandomPage() {
        let maincontent = document.querySelector("[name='content']");
        let generatedId = Math.floor(Math.random() * this.gameCount) + 1;
        let newUrl = "https://www.lemon64.com/games/details.php?ID=" + generatedId;

        maincontent.setAttribute("src", newUrl);
    }
}