chrome.extension.sendMessage({}, function(response) {
	var readyStateCheckInterval = setInterval(function() {
	if (document.readyState === "complete") {
		clearInterval(readyStateCheckInterval);

		addRandomButton();

	}
	}, 10);
});

document.addEventListener("keyup", function (event) {
	if (event.altKey && event.ctrlKey && event.which == 82) {
		goToRandomPage();
	}
});

const addRandomButton = function () {
	var menuItem = document.querySelector("frame[name='menu']").contentDocument.querySelector("img[src='images/menu/signz_links.gif']");
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
			goToRandomPage();
		});

		menuItem.parentElement.appendChild(newMenuItem);
	}
}

const goToRandomPage = function() {
	let maincontent = document.querySelector("[name='maincontent'");

	let generatedId = Math.floor(Math.random() * 4445) + 1;
	let newUrl = "/games/details.php?id=" + generatedId;

	maincontent.setAttribute("src", newUrl);
}