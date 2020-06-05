"use strict";

chrome.extension.sendMessage({}, function (response) {
	var readyStateCheckInterval = setInterval(function () {
		if (document.readyState === "complete") {
			clearInterval(readyStateCheckInterval);

			randomLemon = identifyWebsite();

			randomLemon.addButton();

			document.addEventListener("keyup", function (event) {
				if (event.altKey && event.ctrlKey && event.which == 82) {
					goToRandomPage();
				}
			});

		}
	}, 10);
});

var randomLemon;

const lemonAmiga = "www.lemonamiga.com";

const identifyWebsite = function () {
	if (document.location.host.toLowerCase() == "www.lemonamiga.com") {
		return new RandomAmiga();
	} else {
		return new RandomC64();
	}
}

class RandomAmiga {

	constructor() {
		this.gameCount = 4445;
	}

	addButton() {
		let frame = document.querySelector("frame[name='menu']");
		if (frame != null) {
			let menuItem = frame.contentDocument.querySelector("img[src='images/menu/signz_links.gif']");
			if (menuItem != null) {
				menuItem = menuItem.closest("td");

				let newMenuItem = menuItem.cloneNode(true);
				newMenuItem.setAttribute("id", "random");
				let newImage = newMenuItem.querySelector("img")
				let link = newMenuItem.querySelector("a");

				newImage.setAttribute("src", chrome.extension.getURL("images/signz_random.gif"));
				newImage.style.height = "27px";
				newImage.style.width = "54px";
				newImage.setAttribute("alt", "Random game.");
				newImage.setAttribute("title", "Go to a random game")

				link.addEventListener("click", function (event) {
					event.preventDefault();
					randomLemon.goToRandomPage();
				});

				menuItem.parentElement.appendChild(newMenuItem);
			}
		}
	}

	goToRandomPage() {
		let maincontent = document.querySelector("[name='maincontent'");

		let generatedId = Math.floor(Math.random() * this.gameCount) + 1;
		let newUrl = "/games/details.php?id=" + generatedId;

		maincontent.setAttribute("src", newUrl);
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
			link.addEventListener("click", function (event) {
				event.preventDefault();
				randomLemon.goToRandomPage();
			});

			newButton.setAttribute("src", chrome.extension.getURL("images/c64_random.gif"));
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