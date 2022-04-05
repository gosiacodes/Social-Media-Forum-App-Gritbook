import { DatabaseReference, push, ref, remove, update } from "firebase/database";
import { forumSelected, showForum } from "./displayHandler";
import { db, dbRef, fetchMessagesData, setDbRef } from "./firebaseApp";
import { Message } from "./Message";

const user:HTMLHeadingElement = document.querySelector('.user');
const messInput:HTMLInputElement = document.querySelector("#message");

// Function to set forum to show depends on forum-button clicked
const setForum = (e:Event):void => {
    e.preventDefault();
    const target = e.target as HTMLElement;
    const forum:string = target.id;
    showForum(forum);
}

// Function to add message to database
const addMessageToDatabase = (e:Event):void => {
    e.preventDefault();
    setDbRef();

    // Create timestamp in message
    const timestamp = Date.now();
    const date = new Date(timestamp);
    const pad = (n) => {   
        return n<10 ? '0'+n : n;
    }
    const messTimestamp:string = pad(date.getDate())+
        "-"+pad(date.getMonth()+1)+
        "-"+date.getFullYear()+
        ", "+pad(date.getHours())+
        ":"+pad(date.getMinutes());

    if (messInput.value == ''){
        alert('Enter text to post!');
    } else {
        // Create new message-object
        const messToAdd:object = {
            message: messInput.value,
            username: user.innerText,
            timestamp: messTimestamp,
            userId: user.id
        }

        // Update database with new message
        const newKey:string = push(dbRef).key;
        const newMessage:object = {};
        newMessage[newKey] = messToAdd;
        update(dbRef, newMessage);

        messInput.value = '';
    }
}

// Function to delete message from database
const deleteMessageFromDatabase = (message:Message):void => {
    const messRef = ref(db, '/messages/'+ forumSelected.id + '/' + message.id);
    remove(messRef);
}

// Function to edit message and update it in database
const editAndUpdateMessage = (message:Message, messEl:HTMLParagraphElement):void => {
    messEl.contentEditable = "true";
        messEl.className = 'mess-edit';
        messEl.focus();
        const newMessage:HTMLParagraphElement = document.querySelector('.mess-edit');

        // Event listener for finishing message editing by pushing enter-key
        messEl.addEventListener('keydown', (event:KeyboardEvent) => {
            if (event.code === "Enter") {
                event.preventDefault();
                messEl.contentEditable = "false";
                message.message = newMessage.innerText;
                
                // Update message in database
                const messRef:DatabaseReference = ref(db, '/messages/'+ forumSelected.id + '/' + message.id);
                const updates:object = {};
                updates['/message'] = message.message;
                update(messRef, updates);
                messEl.classList.remove('mess-edit');
            }
            // If escape-key pushed, don't update message
            else if (event.code === "Escape") {
                event.preventDefault();
                messEl.contentEditable = "false";
                messEl.classList.remove('mess-edit');
                fetchMessagesData();
            }
        });
}

export { setForum, addMessageToDatabase, deleteMessageFromDatabase, editAndUpdateMessage }