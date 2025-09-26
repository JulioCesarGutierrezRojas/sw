function sendMessage(msg) {
    self.clients.matchAll().then(clients => {
        clients.forEach(client => {
            client.postMessage(msg);
        });
    });
}

// Instalación
self.addEventListener("install", event => {
    sendMessage("Instalación iniciada");
    event.waitUntil(
        new Promise(resolve => {
            setTimeout(() => {
                sendMessage("Instalación completada");
                resolve();
            }, 1000);
        })
    );
});

// Activación
self.addEventListener("activate", event => {
    sendMessage("Activando Service Worker...");
    event.waitUntil(
        new Promise(resolve => {
            setTimeout(() => {
                sendMessage("Activado correctamente");
                resolve();
            }, 1000);
        })
    );
});

// Ciclo de vida - Ocioso simulado
let idleCount = 0;
function simulateIdle() {
    idleCount++;
    sendMessage(`Ocioso #${idleCount} encolado`);
    setTimeout(simulateIdle, 5000);
}
simulateIdle();
