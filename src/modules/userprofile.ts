import { db, fetchUsersData } from "./firebaseApp";
import { onValue, ref, get, DataSnapshot } from "firebase/database";
import { User } from "./User";
((): void => {

    get(dbReftoUser).then(
        (snapshot) => {
            usersData = snapshot.val();

            let usernameID = sessionStorage.getItem("user.id");
            let desc = sessionStorage.getItem("desc");
            let ProfileP = sessionStorage.getItem("image");

            const img: HTMLInputElement = document.querySelector('#profil-img')
            console.log(img)
            img.src = ProfileP;

            const namn: HTMLElement = document.querySelector("#user-profile-modal");
            const bio: HTMLElement = document.querySelector("#profil-description");

            bio.innerText = ProfileP;
            namn.innerText = usernameID;
        }
    )
})