import { Loginhandler } from "./modules/LoginHandler";
import { UserFormHandler } from "./modules/UserFormHandler";
import { showForum } from "./modules/displayHandler";
import { setForum, addMessageToDatabase } from "./modules/eventListeners";

// DOM elements
const forumButtons = document.querySelectorAll(".forum-btn");
const addMessBtn:HTMLButtonElement = document.querySelector("#add-message-btn");

new Loginhandler();
new UserFormHandler();

// When page is loaded show default forum
// When hide / show UI will be fixed, this can be deleted here,
// because this code is also in LoginHandler / when user is logged in
showForum('travel-forum');

// Event listener for sidebar to choose forum-topic
forumButtons.forEach((btn) => {
    btn.addEventListener("click", setForum); 
});

// Event listener for add-message-button
addMessBtn.addEventListener('click', addMessageToDatabase)


// Testing adding image to DOM for GitHub pages
// const imgUrl = new URL('img/conversation_128.png', import.meta.url);
// const img = document.createElement('img');
// img.src = imgUrl.href;
// document.body.append(img);