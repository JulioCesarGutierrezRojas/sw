function sendMessage(msg) {
    self.clients.matchAll().then(clients => {
        clients.forEach(client => client.postMessage(msg));
    });
}

// 📌 Instalación
self.addEventListener("install", event => {
    sendMessage("Ciclo de vida → Instalación");
    event.waitUntil(self.skipWaiting());
});

// 📌 Activación
self.addEventListener("activate", event => {
    sendMessage("Ciclo de vida → Activación");
    event.waitUntil(
        (async () => {
            await self.clients.claim();
            sendMessage("Ciclo de vida → Activado");
        })()
    );
});

// 📌 Eventos que implican salir del estado ocioso
self.addEventListener("fetch", () => {
    sendMessage("Ciclo de vida → Ocioso (despertado por fetch)");
});

self.addEventListener("sync", event => {
    sendMessage(`Ciclo de vida → Ocioso (despertado por sync: ${event.tag})`);
});

self.addEventListener("push", () => {
    sendMessage("Ciclo de vida → Ocioso (despertado por push)");
});
