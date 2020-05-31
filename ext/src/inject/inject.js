chrome.extension.sendMessage({}, function(response) {
	var readyStateCheckInterval = setInterval(function() {
	if (document.readyState === "complete") {
		clearInterval(readyStateCheckInterval);

		var menuItem = window.frames[0].document.querySelector("img[src='images/menu/signz_links.gif']");
		if (menuItem != null) {
            menuItem = menuItem.closest("td");		

			let newMenuItem = menuItem.cloneNode(true);
			let newImage = newMenuItem.querySelector("img")
			let link = newMenuItem.querySelector("a");

			newImage.setAttribute("src", chrome.extension.getURL("images/signz_random.gif"));
			newImage.style.height = "27px";
			newImage.style.width = "49px";

			link.addEventListener("click", function (event) {
				event.preventDefault();
				let maincontent = document.querySelector("[name='maincontent'");
				let generatedId = Math.floor(Math.random() * 4445) + 1;

				maincontent.setAttribute("src", "/games/details.php?id=" + generatedId);
			});

			menuItem.parentElement.appendChild(newMenuItem);
		}

	}
	}, 10);
});