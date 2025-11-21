chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
    if (msg.type === "GENERATE_EMAIL") {
        fetch("http://localhost:8080/api/email/generate", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(msg.payload)
        })
        .then(res => res.text())
        .then(reply => sendResponse({ reply }))
        .catch(err => sendResponse({ error: err.toString() }));

        return true; // IMPORTANT
    }
});
