const promptBox = document.getElementById('prompt-box');
const sendButton = document.getElementById('send-button');
const chatBoxWrapper = document.getElementById('chatbox_wrapper');
scrollToBottom();

let messages = [];
if (localStorage.getItem('messages')) {
    messages = JSON.parse(localStorage.getItem('messages'));
}

// load chat bubbles
addChatBubbles();

sendButton.addEventListener('click', () => {
    if (promptBox.value) {
        const sentItem = { 'role': "User", 'content': promptBox.value }
        messages.push(sentItem);

        // setting the browser db
        localStorage.setItem('messages', JSON.stringify(messages));

        // clear existing chat bubbles and append new items
        chatBoxWrapper.innerHTML = '';
        addChatBubbles();

        const question = promptBox.value;
        const endPoint = `http://127.0.0.1:5000//get-df-pandas-data?question=${question}`;

        promptBox.value = '';

        var xhr = new XMLHttpRequest();
        xhr.open("GET", endPoint, true);
        xhr.onreadystatechange = async () => {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    const response = await JSON.parse(xhr.responseText);
                    const recivedItem = { 'role': "AI", 'content': response.data };
                    messages.push(recivedItem);
                    localStorage.setItem('messages', JSON.stringify(messages));

                    // load chat bubble
                    addChatBubbles();
                }
                else {
                    console.log("message : " + xhr.status)
                }
            }
        };
        xhr.send();
    }
    else {
        alert("Input field is empty !");
    }
});


function addChatBubbles() {
    chatBoxWrapper.innerHTML = '';
    for (let index = 0; index < messages.length; index++) {
        if (messages[index].role == 'user') {
            chatBoxWrapper.innerHTML = chatBoxWrapper.innerHTML +
                getHTMLChatBubbleElement(messages[index].role, messages[index].content);
        }
        else {
            chatBoxWrapper.innerHTML = chatBoxWrapper.innerHTML +
                getHTMLChatBubbleElement(messages[index].role, messages[index].content);
        }
    }
    scrollToBottom();
}
function getHTMLChatBubbleElement(role, content) {
    const HTMLChatBubbleElement = `
        <div class="chat-bubble">
            <span 
                style="
                    font-size: 14px; 
                    opacity: .5; 
                    font-weight: 300;
                    text-transform: none;">${role}</span> 
            <br />
            <span>${content}</span>
        </div>
        `
    return HTMLChatBubbleElement
}

// scrolls to the bottom of the chat history/wrapper
function scrollToBottom() {
    chatBoxWrapper.scrollTop = chatBoxWrapper.scrollHeight;
}
