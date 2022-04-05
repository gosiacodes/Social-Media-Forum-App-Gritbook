import { initializeApp } from "firebase/app";
import { DatabaseReference, DataSnapshot, getDatabase, onValue, ref } from "firebase/database";
import { travelB, sportB, gamingB } from "./displayHandler";
import { Message } from "./Message";

// Gritbook web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBSQ4EwRXTEF6Rs_3REQTWtcOoBu3HOKEQ",
  authDomain: "gritbook-social-media-app.firebaseapp.com",
  databaseURL: "https://gritbook-social-media-app-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "gritbook-social-media-app",
  storageBucket: "gritbook-social-media-app.appspot.com",
  messagingSenderId: "110931333305",
  appId: "1:110931333305:web:c540e52ab897acade50b68"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Database
const db = getDatabase(app); 

// Database references
const dbRefTravel:DatabaseReference = ref(db, '/messages/travel');
const dbRefSport:DatabaseReference = ref(db, 'messages/sport');
const dbRefGaming:DatabaseReference = ref(db, 'messages/gaming');
const dbRefUsers:DatabaseReference = ref(db, '/users');
let dbRef:DatabaseReference;

let messages:Message[] = [];

// Set database reference depend on which forum is used
const setDbRef = ():void => {
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
const fetchMessagesData = ():void => {  

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
          message.displayChat();
      }
  });
}

// Function to fetch users data from database
const fetchUsersData = () => { 
  let usersData:DataSnapshot;
  
  onValue(dbRefUsers, (snapshot) => {
  usersData = snapshot.val();
  console.log(usersData);
  });
  return usersData;
}
fetchUsersData();

export { db, setDbRef, dbRef, fetchMessagesData, fetchUsersData };