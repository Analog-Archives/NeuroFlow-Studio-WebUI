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
        const endPoint = `http://127.0.0.1:5000/get-df-pandas-data?question=${question}`;

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
// function getHTMLChatBubbleElement(role, content) {
//     const HTMLChatBubbleElement = `
//         <div class="chat-bubble">
//             <span 
//                 style="
//                     font-size: 14px; 
//                     opacity: .5; 
//                     font-weight: 300;
//                     text-transform: none;">${role}</span> 
//             <br />
//             <span>${content}</span>
//         </div>
//         `
//     return HTMLChatBubbleElement
// }

// scrolls to the bottom of the chat history/wrapper
function scrollToBottom() {
    chatBoxWrapper.scrollTop = chatBoxWrapper.scrollHeight;
}


// right panel scripts
const promptBox2 = document.getElementById('prompt-box2');
const sendButton2 = document.getElementById('send-button2');
const chatBoxWrapper2 = document.getElementById('chatbox_wrapper2');
scrollToBottom2();

let messages2 = [];
if (localStorage.getItem('messages2')) {
    messages2 = JSON.parse(localStorage.getItem('messages2'));
}

// load chat bubbles
addChatBubbles2();

sendButton2.addEventListener('click', () => {
    if (promptBox2.value) {
        const sentItem = { 'role': "User", 'content': promptBox2.value }
        messages2.push(sentItem);

        // setting the browser db
        localStorage.setItem('messages2', JSON.stringify(messages2));

        // clear existing chat bubbles and append new items
        chatBoxWrapper2.innerHTML = '';
        addChatBubbles();

        const question = promptBox2.value;
        console.log(question)
        const endPoint = `http://127.0.0.1:5000/get-ai-assistant?question=${question}`;

        promptBox2.value = '';

        var xhr = new XMLHttpRequest();
        xhr.open("GET", endPoint, true);
        xhr.onreadystatechange = async () => {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    const response = await JSON.parse(xhr.responseText);
                    console.log(response.data)
                    const recivedItem = { 'role': "AI", 'content': response.data };
                    messages2.push(recivedItem);
                    localStorage.setItem('messages2', JSON.stringify(messages2));

                    // load chat bubble
                    addChatBubbles2();
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

function addChatBubbles2() {
    chatBoxWrapper2.innerHTML = '';
    for (let index = 0; index < messages2.length; index++) {
        if (messages2[index].role == 'user') {
            chatBoxWrapper2.innerHTML = chatBoxWrapper2.innerHTML +
                getHTMLChatBubbleElement(messages2[index].role, messages2[index].content);
        }
        else {
            chatBoxWrapper2.innerHTML = chatBoxWrapper2.innerHTML +
                getHTMLChatBubbleElement(messages2[index].role, messages2[index].content);
        }
    }
    scrollToBottom2();
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

function scrollToBottom2() {
    chatBoxWrapper2.scrollTop = chatBoxWrapper2.scrollHeight;
}