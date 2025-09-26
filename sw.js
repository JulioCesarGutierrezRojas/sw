function sendMessage(msg) {
    self.clients.matchAll().then(clients => {
        clients.forEach(client => {
            client.postMessage(msg);
        });
    });
}

// 📌 Instalación
self.addEventListener("install", event => {
    sendMessage("Instalación iniciada");
    event.waitUntil(
        (async () => {
            await new Promise(resolve => setTimeout(resolve, 1000));
            sendMessage("Instalación completada");
            self.skipWaiting();
        })()
    );
});

// 📌 Activación
self.addEventListener("activate", event => {
    sendMessage("Activando Service Worker...");
    event.waitUntil(
        (async () => {
            await new Promise(resolve => setTimeout(resolve, 1000));
            sendMessage("Activado correctamente");
            await self.clients.claim();
        })()
    );
});

// 📌 Ciclo de vida - Ocioso simulado
let idleCount = 0;
function simulateIdle() {
    idleCount++;
    sendMessage(`Ocioso #${idleCount} encolado`);
    setTimeout(simulateIdle, 5000);
}
simulateIdle();
