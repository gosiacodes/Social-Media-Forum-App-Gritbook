import { DatabaseReference, onValue, push, ref, update } from "firebase/database";
import { db } from "./modules/firebaseApp";
import { Loginhandler } from "./modules/LoginHandler";
import { UserFormHandler } from "./modules/UserFormHandler";
import { showForum, travelB, sportB, gamingB, displayChat } from "./modules/displayHandler";
import { Message } from "./modules/Message";

// Database references
const dbRefTravel = ref(db, '/messages/travel');
const dbRefSport = ref(db, 'messages/sport');
const dbRefGaming = ref(db, 'messages/gaming');
const dbRefUsers = ref(db, '/users');
let dbRef:DatabaseReference;

// DOM elements
const forumButtons = document.querySelectorAll(".forum-btn");
const user:HTMLHeadingElement = document.querySelector('.user');
const messInput:HTMLInputElement = document.querySelector("#message");
const addMessBtn:HTMLButtonElement = document.querySelector("#add-message-btn");
let messages:Message[] = [];

// Set database reference depend on which forum is used
const setDbRef = () => {
    if (travelB === true) {
        dbRef = dbRefTravel;
    } 
    else if (sportB === true) {
        dbRef = dbRefSport;
    } 
    else if (gamingB === true) {
        dbRef = dbRefGaming;
    }
}

// Function to fetch messages data from database
const fetchMessagesData = () => {  

    setDbRef();
    
    onValue(dbRef, (snapshot) => {
        const messagesData = snapshot.val();
        console.log(messagesData);

        // Remove messages from DOM
        for(const message of messages){
            message.clearChat();
        }
        
        messages = [];
        
        // Add messages from database to messages array
        for(const key in messagesData){
            messages.push(new Message(
                key,
                messagesData[key].username,
                messagesData[key].message,
                messagesData[key].timestamp,
                messagesData[key].userId
            ));
        }
        console.log(messages);

        // Add messages from database to DOM
        for(const message of messages){
            displayChat(message);
        }
    });

}

const fetchUsersData = () => { 
    let usersData;
    onValue(dbRefUsers, (snapshot) => {
    usersData = snapshot.val();
    console.log(usersData);
    });
    return usersData;
}
fetchUsersData();

new Loginhandler();
new UserFormHandler();

// When page is loaded (later when user is logged in) show default forum
showForum('travel-forum');

// Event listener for sidebar to choose forum-topic
forumButtons.forEach((btn) => {
    btn.addEventListener("click", (event:Event) => {
        const target = event.target as HTMLElement;
        const forum:string = target.id;
        showForum(forum);
    });
});

// Event listener for add-message-button
addMessBtn.addEventListener('click', e => {
    e.preventDefault();
    setDbRef();

    // Create timestamp in message
    const timestamp = Date.now();
    const date = new Date(timestamp);
    const pad = (n) => {   
        return n<10 ? '0'+n : n;
    }
    const messTimestamp = pad(date.getDate())+
        "-"+pad(date.getMonth()+1)+
        "-"+date.getFullYear()+
        ", "+pad(date.getHours())+
        ":"+pad(date.getMinutes());

    if (messInput.value == ''){
        alert('Enter text to post!');
    } else {
        // Create new message-object
        const messToAdd = {
            message: messInput.value,
            username: user.innerText,
            timestamp: messTimestamp,
            userId: user.id
        }

        messInput.value = '';

        // Update database with new message
        const newKey:string = push(dbRef).key;
        const newMessage = {};
        newMessage[newKey] = messToAdd;

        update(dbRef, newMessage);
    }
});

export { fetchMessagesData, fetchUsersData };