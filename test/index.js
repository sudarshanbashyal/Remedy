import socket from "socket.io-client";

const io = socket("http://192.168.1.66:3000", {
	forceNew: true,
});

io.emit("userConnected", () => {
	console.log("connected to server");
});

io.on("connect_error", (err) => {
	console.log(err);
});
