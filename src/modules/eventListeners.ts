import { push, update } from "firebase/database";
import { showForum } from "./displayHandler";
import { dbRef, setDbRef } from "./firebaseApp";

const user:HTMLHeadingElement = document.querySelector('.user');
const messInput:HTMLInputElement = document.querySelector("#message");

// Function to set forum to show depends on forum-button clicked
const setForum = (event:Event) => {
    event.preventDefault();
    const target = event.target as HTMLElement;
    const forum:string = target.id;
    showForum(forum);
}

// Function to add message to database
const addMessageToDatabase = (e:Event) => {
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

        // Update database with new message
        const newKey:string = push(dbRef).key;
        const newMessage = {};
        newMessage[newKey] = messToAdd;

        update(dbRef, newMessage);

        messInput.value = '';
    }
}

export { setForum, addMessageToDatabase }