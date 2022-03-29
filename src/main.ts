import { DatabaseReference, onValue, push, ref, update } from "firebase/database";
import { db } from "./modules/firebaseApp";
import { Loginhandler } from "./modules/LoginHandler";
import { UserFormHandler } from "./modules/UserFormHandler";
import { showForum, travelB, sportB, gamingB } from "./modules/displayHandler"

// Created database and template objects
const dbRefTravel = ref(db, '/messages/travel');
const dbRefSport = ref(db, 'messages/sport');
const dbRefGaming = ref(db, 'messages/gaming');
const dbRefUsers = ref(db, '/users');

// DOM elements
const forumButtons = document.querySelectorAll(".forum-btn");
const user:HTMLHeadingElement = document.querySelector('#user');
const messInput:HTMLInputElement = document.querySelector("#message");
const addMessBtn:HTMLButtonElement = document.querySelector("#add-message-btn");

const fetchAllMessagesData = () => {   

    onValue(dbRefTravel, (snapshot) => {
    const messagesData = snapshot.val();
    console.log(messagesData);
    });

    onValue(dbRefSport, (snapshot) => {
        const messagesData = snapshot.val();
        console.log(messagesData);
    });

    onValue(dbRefGaming, (snapshot) => {
        const messagesData = snapshot.val();
        console.log(messagesData);
    });

}
fetchAllMessagesData();

const fetchAllUsersData = () => {   

    onValue(dbRefUsers, (snapshot) => {
    const usersData = snapshot.val();
    console.log(usersData);
    });

}
fetchAllUsersData();

new Loginhandler();
// new UserFormHandler();

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
    console.log(travelB);

    let dbRef:DatabaseReference;
    if (travelB === true) {
        dbRef = dbRefTravel;
    } 
    else if (sportB === true) {
        dbRef = dbRefSport;
    } 
    else if (gamingB === true) {
        dbRef = dbRefGaming;
    }

    // Update database with new message
    const messToAdd = {
        message: messInput.value,
        username: user.innerText
    }

    messInput.value = '';

    const newKey:string = push(dbRef).key;
    const newMessage = {};
    newMessage[newKey] = messToAdd;

    update(dbRef, newMessage);
});