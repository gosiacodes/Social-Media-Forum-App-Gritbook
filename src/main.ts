import { onValue, ref } from "firebase/database";
import { db } from "./modules/firebaseApp";

// Created database and template objects
const dbRefMess = ref(db, '/messages');
const dbRefUsers = ref(db, '/users');

onValue(dbRefMess, snapshot => {   
    const messagesData = snapshot.val();
    console.log(messagesData);
});

onValue(dbRefUsers, snapshot => {   
    const usersData = snapshot.val();
    console.log(usersData);
});

