(function() {
    let blockCK = true;
    let blockImpero = true;
    let fakeTabEnabled = false;
    let fakeTabImage = "https://jasset.netlify.app/faketab/google.png";
    const password = "robotjxo1!"; // Change this to your desired password

    function setCK(state) {
        blockCK = state === "Disabled";
        console.log(`%cCK.js ${state}!`, `color: ${state === "Disabled" ? "green" : "red"}; font-size: 16px;`);
    }

    function setImpero(state) {
        blockImpero = state === "Disabled";
        console.log(`%cImpero.js ${state}!`, `color: ${state === "Disabled" ? "green" : "red"}; font-size: 16px;`);
    }

    function setFakeTab(state) {
        fakeTabEnabled = state === "Enabled";
        console.log(`%cFakeTab ${state}!`, `color: ${state === "Enabled" ? "green" : "red"}; font-size: 16px;`);

        if (fakeTabEnabled) {
            document.body.innerHTML = `<img src="${fakeTabImage}" style="width:100%; height:100%; position:fixed; top:0; left:0;">`;
        } else {
            location.reload(); // Reload the page to remove FakeTab
        }
    }

    function changeFakeTabImage(image) {
        fakeTabImage = image;
        if (fakeTabEnabled) {
            document.body.innerHTML = `<img src="${fakeTabImage}" style="width:100%; height:100%; position:fixed; top:0; left:0;">`;
        }
    }

    function openGUI() {
        let win = window.open("about:blank", "_blank");
        let doc = win.document;
        doc.open();

        // Injecting a relaxed CSP to allow inline scripts
        doc.write(`
            <html>
            <head>
                <meta http-equiv="Content-Security-Policy" content="script-src 'self' 'unsafe-inline'">
                <title>CK & Impero Control Panel</title>
                <style>
                    body { font-family: Arial, sans-serif; background-color: #0a1931; color: #d1e8ff; text-align: center; margin: 20px; }
                    h1 { color: #1e3a8a; }
                    .container { background: #112d4e; padding: 20px; border-radius: 10px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.5); max-width: 400px; margin: auto; }
                    label { font-size: 18px; margin-right: 10px; }
                    select { font-size: 16px; padding: 8px; border-radius: 5px; border: none; background: #1e3a8a; color: white; cursor: pointer; }
                    select:hover { background: #2a4ea2; }
                    button { font-size: 16px; padding: 8px; border-radius: 5px; border: none; background: #1e3a8a; color: white; cursor: pointer; margin-top: 10px; }
                    button:hover { background: #2a4ea2; }
                    .tabs { display: flex; justify-content: center; margin-top: 20px; }
                    .tab { padding: 10px 20px; background: #1e3a8a; margin: 5px; cursor: pointer; border-radius: 5px; color: white; }
                    .tab:hover { background: #2a4ea2; }
                    .tab-content { display: none; margin-top: 20px; }
                    .active { display: block; }
                    #passwordPrompt { background: #112d4e; padding: 20px; border-radius: 10px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.5); max-width: 300px; margin: auto; }
                    input { font-size: 16px; padding: 8px; border-radius: 5px; border: none; background: #1e3a8a; color: white; text-align: center; }
                </style>
            </head>
            <body>
                <div id="passwordPrompt">
                    <h1>Enter Password</h1>
                    <input type="password" id="passwordInput" placeholder="Enter password">
                    <button onclick="checkPassword()">Submit</button>
                </div>

                <div id="controlPanel" class="container" style="display: none;">
                    <h1>CK & Impero Control</h1>
                    <div class="tabs">
                        <div class="tab" onclick="showTab('blockers')">Blockers</div>
                        <div class="tab" onclick="showTab('faketab')">FakeTab</div>
                    </div>

                    <div id="blockers" class="tab-content active">
                        <label for="ckToggle">CK.js:</label>
                        <select id="ckToggle" onchange="updateCK()">
                            <option>Enabled</option>
                            <option>Disabled</option>
                        </select>
                        <br><br>
                        <label for="imperoToggle">Impero.js:</label>
                        <select id="imperoToggle" onchange="updateImpero()">
                            <option>Enabled</option>
                            <option>Disabled</option>
                        </select>
                    </div>

                    <div id="faketab" class="tab-content">
                        <label for="fakeTabToggle">FakeTab:</label>
                        <select id="fakeTabToggle" onchange="updateFakeTab()">
                            <option>Disabled</option>
                            <option>Enabled</option>
                        </select>
                        <br><br>
                        <label for="fakeTabImage">Select FakeTab Image:</label>
                        <select id="fakeTabImage" onchange="changeFakeTabImage()">
                            <option value="https://jasset.netlify.app/faketab/google.png">Google</option>
                            <option value="https://jasset.netlify.app/faketab/gc.png">Google Classroom</option>
                            <option value="https://jasset.netlify.app/faketab/iready.png">iReady</option>
                            <option value="https://jasset.netlify.app/faketab/studiesweekly.png">Studies Weekly</option>
                        </select>
                    </div>
                </div>

                <script>
                    function checkPassword() {
                        let inputPassword = document.getElementById("passwordInput").value;
                        if (inputPassword === "${password}") {
                            document.getElementById("passwordPrompt").style.display = "none";
                            document.getElementById("controlPanel").style.display = "block";
                        } else {
                            alert("Incorrect password. Access denied.");
                        }
                    }

                    function showTab(tabName) {
                        document.querySelectorAll('.tab-content').forEach(tab => tab.classList.remove('active'));
                        document.getElementById(tabName).classList.add('active');
                    }

                    function updateCK() {
                        let state = document.getElementById("ckToggle").value;
                        window.opener.postMessage({ type: 'setCK', state }, '*');
                    }

                    function updateImpero() {
                        let state = document.getElementById("imperoToggle").value;
                        window.opener.postMessage({ type: 'setImpero', state }, '*');
                    }

                    function updateFakeTab() {
                        let state = document.getElementById("fakeTabToggle").value;
                        window.opener.postMessage({ type: 'setFakeTab', state }, '*');
                    }

                    function changeFakeTabImage() {
                        let image = document.getElementById("fakeTabImage").value;
                        window.opener.postMessage({ type: 'changeFakeTabImage', image }, '*');
                    }
                </script>
            </body>
            </html>
        `);
        doc.close();
    }

    openGUI();

    window.addEventListener("message", (event) => {
        if (event.data.type === "setCK") setCK(event.data.state);
        if (event.data.type === "setImpero") setImpero(event.data.state);
        if (event.data.type === "setFakeTab") setFakeTab(event.data.state);
        if (event.data.type === "changeFakeTabImage") changeFakeTabImage(event.data.image);
    });
})();
