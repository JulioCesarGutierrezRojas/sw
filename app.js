function logEvent(msg) {
    const li = document.createElement("li");
    const now = new Date();
    const timestamp = now.toLocaleString("es-MX", { hour12: false }) + "." + now.getMilliseconds();
    li.innerHTML = `<span class="check">✔</span> [${timestamp}] ${msg}`;
    document.getElementById("log-list").appendChild(li);
}

if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
        navigator.serviceWorker.register("./sw.js")
            .then(reg => logEvent("Service Worker registrado"))
            .catch(err => logEvent("Error en el registro: " + err));
    });

    navigator.serviceWorker.addEventListener("message", event => {
        logEvent(event.data);
    });
}
