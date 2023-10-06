const socket = io()
let username = ""
let userId = "" // Unique identifier for the user

alert("Try commands : '/random' and '/clear'")

function setUsername() {
	const input = document.getElementById("username")
	const name = input.value.trim()
	if (name !== "") {
		username = name
		userId = socket.id // Assign the socket ID as the unique user identifier
		document.getElementById("username-container").style.display = "none"
		document.getElementById("chat-header").textContent = "Chatting as " + username
		document.getElementById("input-container").style.display = "flex"
	}
}

function sendMessage() {
	const messageInput = document.getElementById("m")
	let message = messageInput.value.trim()

	const emojiMap = {
		react: "⚛️",
		woah: "😯",
		hey: "👋",
		lol: "😂",
		like: "💓",
		congratulations: "🎉",
	}

	// Replace keywords with emojis
	Object.keys(emojiMap).forEach((keyword) => {
		const regex = new RegExp("\\b" + keyword + "\\b", "gi") // Match whole word, case-insensitive
		message = message.replace(regex, emojiMap[keyword])
	})

	if (message.startsWith("/")) {
		if (message.startsWith("/random")) {
			const randomNumber = Math.floor(Math.random() * 11) // Generate random number between 0 and 10
			alert("Random Number between 0 and 10 ==> " + randomNumber)
		} else if (message === "/clear") {
			// Clear messages from the message container
			const messagesContainer = document.getElementById("messages")
			messagesContainer.innerHTML = ""
		} else {
			alert("Invalid command: " + message)
		}
	} else if (message !== "") {
		// Send regular chat messages
		socket.emit("chat message", { userId: userId, username: username, message: message })
	}

	messageInput.value = ""

	return false
}

socket.on("chat message", (data) => {
	const ul = document.getElementById("messages")
	const li = document.createElement("li")
	const message =
		data.userId === userId ? "You: " + data.message : data.username + ": " + data.message
	li.appendChild(document.createTextNode(message))
	li.classList.add(data.userId === userId ? "own-message" : "other-message")
	ul.appendChild(li)
})
