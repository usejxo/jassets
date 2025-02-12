(function () {
    const correctPassword = "robotjxo1!";

    document.getElementById("submitPassword").addEventListener("click", function () {
        const passwordInput = document.getElementById("passwordInput").value;

        if (passwordInput === correctPassword) {
            document.getElementById("auth").style.display = "none";
            document.getElementById("panel").style.display = "block";
        } else {
            alert("Incorrect password. Access denied.");
            window.close();
        }
    });

    document.getElementById("ckControl").addEventListener("change", function () {
        const status = this.value;
        if (status === "enabled") {
            console.log("CK.js enabled");
        } else {
            console.log("CK.js disabled");
        }
    });

    document.getElementById("imperoControl").addEventListener("change", function () {
        const status = this.value;
        if (status === "enabled") {
            console.log("Impero.js enabled");
        } else {
            console.log("Impero.js disabled");
        }
    });

    document.getElementById("fakeTabControl").addEventListener("change", function () {
        const tabValue = this.value;
        const imageUrl = {
            "google": "https://jasset.netlify.app/faketab/google.png",
            "gc": "https://jasset.netlify.app/faketab/gc.png",
            "iready": "https://jasset.netlify.app/faketab/iready.png",
            "studiesweekly": "https://jasset.netlify.app/faketab/studiesweekly.png"
        };

        const imageSrc = imageUrl[tabValue] || imageUrl["google"];
        document.body.style.backgroundImage = `url(${imageSrc})`;
    });
})();
