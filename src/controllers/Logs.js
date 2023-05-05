import { db } from "../configs/firebase.config.js";
import { generateCode } from "../services/generateCode.js";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  where,
} from "firebase/firestore";