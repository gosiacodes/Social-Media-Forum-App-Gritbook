import { onValue, ref } from "firebase/database";
import { db } from "./modules/firebaseApp";
import { Loginhandler } from "./modules/LoginHandler";
import { UserFormHandler } from "./modules/UserFormHandler";
import { showForum } from "./modules/displayHandler"

// Created database and template objects
const dbRefMess = ref(db, '/messages');
const dbRefUsers = ref(db, '/users');
const forumButtons = document.querySelectorAll(".forum-btn");

onValue(dbRefMess, (snapshot) => {
  const messagesData = snapshot.val();
  console.log(messagesData);
});

onValue(dbRefUsers, (snapshot) => {
  const usersData = snapshot.val();
  console.log(usersData);
});

new Loginhandler();

forumButtons.forEach((btn) => {
    btn.addEventListener("click", (event:Event) => {
        console.log('forum button clicked');
        const target = event.target as HTMLElement;
        const forum:string = target.id;
        showForum(forum);
    });
});

new UserFormHandler();
