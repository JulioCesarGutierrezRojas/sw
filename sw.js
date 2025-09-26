function sendMessage(msg) {
    self.clients.matchAll().then(clients => {
        clients.forEach(client => client.postMessage(msg));
    });
}

// 📌 Instalación
self.addEventListener("install", event => {
    sendMessage("Ciclo de vida → Instalación iniciada");
    event.waitUntil(
        (async () => {
            sendMessage("Ciclo de vida → Instalación completada");
            self.skipWaiting();
        })()
    );
});

// 📌 Activación
self.addEventListener("activate", event => {
    sendMessage("Ciclo de vida → Activación en proceso");
    event.waitUntil(
        (async () => {
            sendMessage("Ciclo de vida → Activado correctamente");
            await self.clients.claim();
        })()
    );
});

// 📌 Fetch (despierta al SW desde ocioso)
self.addEventListener("fetch", event => {
    sendMessage("Ciclo de vida → Reanudado desde ocioso (evento fetch)");
});

// 📌 Sync (ejemplo si se usa Background Sync)
self.addEventListener("sync", event => {
    sendMessage(`Ciclo de vida → Reanudado desde ocioso (evento sync: ${event.tag})`);
});

// 📌 Push (si registras push notifications)
self.addEventListener("push", event => {
    sendMessage("Ciclo de vida → Reanudado desde ocioso (evento push)");
});
