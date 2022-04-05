import { showUserModal } from "./displayHandler";
import { db, fetchUsersData } from "./firebaseApp";
import { onValue, ref, get } from "firebase/database";
import { User } from "./User";

