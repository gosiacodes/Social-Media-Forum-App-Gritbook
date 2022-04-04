import { ref, remove } from "firebase/database";
import { db, fetchMessagesData } from "./firebaseApp";
import { Message } from "./Message";

// DOM elements
const travelForum:HTMLDivElement = document.querySelector('#travel');
const sportForum:HTMLDivElement = document.querySelector('#sport');
const gamingForum:HTMLDivElement = document.querySelector('#gaming');
const travelChat:HTMLDivElement = document.querySelector('#travel-chat');
const sportChat:HTMLDivElement = document.querySelector('#sport-chat');
const gamingChat:HTMLDivElement = document.querySelector('#gaming-chat');
const userModal:HTMLDivElement = document.querySelector("#user-profile-modal");
const closeProfileBtn = document.querySelector("#profile-close-btn");
const closeUserModal = document.querySelector("#user-close");
// Forum settings
let forumSelected:HTMLDivElement = travelForum;
let chatSelected:HTMLDivElement = travelChat;
let travelB:boolean = true;
let sportB:boolean = false;
let gamingB:boolean = false;
 
// Function to show discussion forum depending on the topic selected
const showForum = (forum:string) => {
    if (forum == 'travel-forum'){
        forumSelected = travelForum;
        chatSelected = travelChat;
        travelForum.style.display = 'flex';
        sportForum.style.display = 'none';
        gamingForum.style.display = 'none';
        travelB = true;
        sportB = false;
        gamingB = false;
        fetchMessagesData();
    }
    else if (forum == 'sport-forum'){
        forumSelected = sportForum;
        chatSelected = sportChat;
        travelForum.style.display = 'none';
        sportForum.style.display = 'flex';
        gamingForum.style.display = 'none';
        travelB = false;
        sportB = true;
        gamingB = false;
        fetchMessagesData();
    }
    else if (forum == 'gaming-forum'){
        forumSelected = gamingForum;
        chatSelected = gamingChat;
        travelForum.style.display = 'none';
        sportForum.style.display = 'none';
        gamingForum.style.display = 'flex';
        travelB = false;
        sportB = false;
        gamingB = true;
        fetchMessagesData();
    }
}

// Function for displaying messages in chat in DOM
const displayMessages = (message:Message) => {
    const user:HTMLHeadingElement = document.querySelector(".user");
    const userDiv:HTMLDivElement = document.createElement('div');
    const messDiv:HTMLDivElement = document.createElement('div');
    const usernameEl:HTMLHeadingElement = document.createElement('h5');
    const dateEl:HTMLHeadingElement = document.createElement('h5');
    const messageEl:HTMLParagraphElement = document.createElement('p');
    const delButton:HTMLButtonElement = document.createElement('button');
    const messContainer:HTMLDivElement = document.createElement('div');

    usernameEl.innerText = message.username;
    usernameEl.className = 'mess-show-profile';
    dateEl.innerText = message.timestamp;
    messageEl.innerText = message.message;
    delButton.innerText = 'X';
    delButton.className = 'delete-btn';
    userDiv.className = 'user-div';
    messDiv.className = 'mess-div';
    messContainer.className = 'message-container';
    messContainer.id = message.id;

    userDiv.append(usernameEl);
    usernameEl.addEventListener('click', (e:Event) => {
        e.preventDefault();
        showUserModal();
    });
    userDiv.append(dateEl);
    messDiv.append(messageEl);
    // Show delete-button in the message only if name and id of the author
    // is the same as the name and id of the logged in user
    if (message.username == user.innerText && message.userId == user.id){
        messDiv.append(delButton);
        // Event listener for delete-button (for own message)
        delButton.addEventListener('click', (e:Event) => {
            e.preventDefault();
            message.deleteMessage();
        })
        // Event listener for message editing by clicking on it (for own message)
        messageEl.addEventListener('click', (e:Event) => {
            e.preventDefault();
            message.editMessage(messageEl);
        })
    }
    messContainer.append(userDiv);
    messContainer.append(messDiv);
    chatSelected.prepend(messContainer);
    forumSelected.append(chatSelected);

}

// Show modal for user profile.
const showUserModal = () => {
    userModal.style.display = "block";

    // Add event listeners for closing user profile
    closeProfileBtn.addEventListener('click', () => {
        userModal.style.display = 'none';
    })
    closeUserModal.addEventListener('click', () => {
        userModal.style.display = 'none';
    })    
    window.onclick = function(event:Event) {
        if (event.target === userModal) {
            userModal.style.display = 'none';
        }
    }
}

export { showForum, displayMessages, travelB, sportB, gamingB, forumSelected, showUserModal};

