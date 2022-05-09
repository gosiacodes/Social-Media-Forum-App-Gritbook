import { fetchMessagesData, fetchUsersData } from "./firebaseApp";
import { Message } from "./Message";

// DOM elements
const travelForum:HTMLDivElement = document.querySelector('#travel');
const sportForum:HTMLDivElement = document.querySelector('#sport');
const gamingForum:HTMLDivElement = document.querySelector('#gaming');
const travelChat:HTMLDivElement = document.querySelector('#travel-chat');
const sportChat:HTMLDivElement = document.querySelector('#sport-chat');
const gamingChat:HTMLDivElement = document.querySelector('#gaming-chat');
const travelBtn:HTMLButtonElement = document.querySelector('#travel-forum');
const sportBtn:HTMLButtonElement = document.querySelector('#sport-forum');
const gamingBtn:HTMLButtonElement = document.querySelector('#gaming-forum');
const user:HTMLHeadingElement = document.querySelector(".user");
const desc:HTMLHeadingElement = document.querySelector("#profil-description");
const userProfileBtn = document.querySelector(".show-user-profile");
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
const showForum = (forum:string):void => {
    if (forum == 'travel-forum'){
        forumSelected = travelForum;
        chatSelected = travelChat;
        travelForum.style.display = 'flex';
        sportForum.style.display = 'none';
        gamingForum.style.display = 'none';
        travelBtn.classList.add('active');
        sportBtn.classList.remove('active');
        gamingBtn.classList.remove('active');
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
        travelBtn.classList.remove('active');
        sportBtn.classList.add('active');
        gamingBtn.classList.remove('active');
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
        travelBtn.classList.remove('active');
        sportBtn.classList.remove('active');
        gamingBtn.classList.add('active');
        travelB = false;
        sportB = false;
        gamingB = true;
        fetchMessagesData();
    }
}

// Function for displaying messages in chat in DOM
const displayMessages = (message:Message):void => {
    const userDiv:HTMLDivElement = document.createElement('div');
    const messDiv:HTMLDivElement = document.createElement('div');
    const usernameEl:HTMLHeadingElement = document.createElement('h5');
    const dateEl:HTMLHeadingElement = document.createElement('h5');
    const messageEl:HTMLParagraphElement = document.createElement('p');
    const delButton:HTMLButtonElement = document.createElement('button');
    const messContainer:HTMLDivElement = document.createElement('div');

    usernameEl.innerText = message.username;
    usernameEl.className = 'mess-show-profile';
    usernameEl.id = message.userId;
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
        showUserModal(e);
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

// Function to show modal for user profile
const showUserModal = (e:Event):void => {
    e.preventDefault();
    const userinfo = fetchUsersData();
    const target = e.target as HTMLElement;
    const usernameEl:HTMLHeadingElement = document.querySelector("#profil-username");
    const descEl:HTMLHeadingElement = document.querySelector("#profil-description");
    let userId:string;
    let descid:string;

    if (target === userProfileBtn) {
        userId = user.id;
        descid = desc.id;
        userProfileBtn.id = user.id;
        userProfileBtn.id = desc.id
        descEl.innerText = user.innerText;
        usernameEl.innerText = user.innerText;
    }
    else {
        userId = target.id;
        descid = target.id
        usernameEl.innerText = target.innerText;
        descEl.innerText = target.innerText;
    }
    console.log(userId);
    console.log(descEl);

    // Show user profile modal
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

