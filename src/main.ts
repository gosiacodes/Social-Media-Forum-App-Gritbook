import { Loginhandler } from "./modules/LoginHandler";
import { SignupHandler } from "./modules/SignupHandler";
import { showForum, showUserModal } from "./modules/displayHandler";
import { setForum, addMessageToDatabase } from "./modules/eventListeners";

// DOM elements
const forumButtons = document.querySelectorAll(".forum-btn");
const addMessBtn:HTMLButtonElement = document.querySelector("#add-message-btn");
const userProfileButton = document.querySelector(".show-user-profile");

new Loginhandler();
new SignupHandler();

// Event listener for sidebar to choose forum-topic
forumButtons.forEach((btn) => {
    btn.addEventListener('click', setForum); 
});

// Event listener for add-message-button
addMessBtn.addEventListener('click', addMessageToDatabase)

// Event listener for user-profile-button
userProfileButton.addEventListener('click', showUserModal);

// Testing adding image to DOM for GitHub pages
// const imgUrl = new URL('img/conversation_128.png', import.meta.url);
// const img = document.createElement('img');
// img.src = imgUrl.href;
// document.body.append(img);