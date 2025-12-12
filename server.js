import App from "./src/app.js";

async function startServer() {
    try {
        const server = new App();
        await server.serverStart();
        
        console.log("__________________________________");
        console.log("Server is ready to receive requests");
        console.log("__________________________________");
    } catch (error) {
        console.error("Failed to start server:", error);
        process.exit(1);
    }
}

startServer();