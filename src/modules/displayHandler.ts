import { ref, remove } from "firebase/database";
import { fetchMessagesData } from "../main";
import { db } from "./firebaseApp";
import { Message } from "./Message";

const travelForum:HTMLDivElement = document.querySelector('#travel');
const sportForum:HTMLDivElement = document.querySelector('#sport');
const gamingForum:HTMLDivElement = document.querySelector('#gaming');
let forumSelected:HTMLDivElement = travelForum;
let travelB:boolean = true;
let sportB:boolean = false;
let gamingB:boolean = false;
 
// Function to show discussion forum depending on the topic selected
const showForum = (forum:string) => {
    if (forum == 'travel-forum'){
        forumSelected = travelForum;
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
        travelForum.style.display = 'none';
        sportForum.style.display = 'none';
        gamingForum.style.display = 'flex';
        travelB = false;
        sportB = false;
        gamingB = true;
        fetchMessagesData();
    }
}

// Function for displaying chat i DOM
const displayChat = (message:Message) => {
    // const user:HTMLHeadingElement = document.querySelector("#user");
    const userDiv:HTMLDivElement = document.createElement('div');
    const messDiv:HTMLDivElement = document.createElement('div');
    const usernameEl:HTMLHeadingElement = document.createElement('h5');
    const dateEl:HTMLHeadingElement = document.createElement('h5');
    const messageEl:HTMLParagraphElement = document.createElement('p');
    const delButton:HTMLButtonElement = document.createElement('button');
    const messContainer:HTMLDivElement = document.createElement('div');

    usernameEl.innerText = message.username;
    dateEl.innerText = message.timestamp;
    messageEl.innerText = message.message;
    delButton.innerText = 'X';
    delButton.className = 'delete-btn';
    userDiv.className = 'user-div';
    messDiv.className = 'mess-div';
    messContainer.className = 'message-container';
    messContainer.id = message.id;

    userDiv.append(usernameEl);
    userDiv.append(dateEl);
    messDiv.append(messageEl);
    messDiv.append(delButton);
    messContainer.append(userDiv);
    messContainer.append(messDiv);
    forumSelected.append(messContainer);

    // Event listener for delete-button 
    delButton.addEventListener('click', () => {
        console.log('delete button clicked');
        console.log(message.id);
        console.log(forumSelected.id);
        const messRef = ref(db, '/messages/'+ forumSelected.id + '/' + message.id);
        console.log(messRef);
        remove(messRef);
    })
}

export { showForum, displayChat, forumSelected, travelB, sportB, gamingB };

