
const messageInput = document.getElementById('messageInput');
const sendButton = document.getElementById('sendButton');
const messagesDiv = document.getElementById('messages');

sendButton.addEventListener('click', () => {
    sendMessage(messageInput.value.trim());
    messageInput.value = '';
});

messageInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter' && !event.shiftKey) {
        event.preventDefault();
        const inputMessage = messageInput.value.trim();

        if (inputMessage.startsWith('/')) {
            if (inputMessage === '/help') {
                const guidanceMessage =
                    "Welcome to the chat app!\n\n" +
                    "To send a message, type your text and press Enter.\n" +
                    "You can also use the following commands:\n" +
                    "/help - Display this help message\n" +
                    "/clear - Clear all messages\n\n" +
                    "Feel free to use these keywords to automatically add emojis:\n" +
                    "react - 👨‍💻\n" +
                    "woah - 🤩\n" +
                    "hey - 👋\n" +
                    "lol - 😂\n" +
                    "like - 💖\n" +
                    "congrats - 🎉";
                sendMessage(guidanceMessage, true, 'right');
            } else if (inputMessage === '/clear') {
                // Clear all messages
                messagesDiv.innerHTML = '';
            } else {
                const replacedMessage = replaceKeywordsWithEmojis(inputMessage.slice(1));
                sendMessage(replacedMessage, false, 'right');
            }
        } else {
            const replacedMessage = replaceKeywordsWithEmojis(inputMessage);
            sendMessage(replacedMessage);
        }

        messageInput.value = '';
    }
});

function sendMessage(message, isSystemMessage, alignment) {
    const messageDiv = document.createElement('div');
    messageDiv.className = isSystemMessage ? 'system-message' : 'message';
    if (alignment === 'right') {
        messageDiv.classList.add('message-right');
    }

    const contentDiv = document.createElement('div');
    contentDiv.textContent = message;

    const timestampSpan = document.createElement('span');
    const now = new Date();
    const formattedTime = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    timestampSpan.textContent = formattedTime;

    messageDiv.appendChild(contentDiv);
    messageDiv.appendChild(timestampSpan);

    messagesDiv.appendChild(messageDiv);
    scrollToBottom();
}

function replaceKeywordsWithEmojis(message) {
    const keywordMap = {
        'react': '👨‍💻',
        'woah': '🤩',
        'hey': '👋',
        'lol': '😂',
        'like': '💖',
        'congrats': '🎉'
    };

    // Replace keywords with emojis using regex
    const regex = new RegExp(Object.keys(keywordMap).join('|'), 'gi');
    return message.replace(regex, match => keywordMap[match.toLowerCase()]);
}

function scrollToBottom() {
    messagesDiv.scrollTop = messagesDiv.scrollHeight;
}







