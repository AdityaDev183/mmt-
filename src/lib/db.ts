import {
  doc,
  getDoc,
  setDoc,
  updateDoc,
  increment,
  collection,
  addDoc,
  query,
  where,
  orderBy,
  limit,
  getDocs
} from "firebase/firestore";
import { db } from "./firebase";

export interface UserProfile {
  uid: string;
  email: string;
  displayName?: string;
  photoURL?: string;
  isPro: boolean;
  dailyUsageCount: number;
  totalGenerations: number;
  lastUsageDate: string;
  subscriptionStatus: 'free' | 'pro';
  createdAt: any;
}

export const getUserProfile = async (uid: string): Promise<UserProfile | null> => {
  const docRef = doc(db, "users", uid);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return docSnap.data() as UserProfile;
  }
  return null;
};

export const createUserProfile = async (user: any) => {
  const userRef = doc(db, "users", user.uid);
  const profile: UserProfile = {
    uid: user.uid,
    email: user.email,
    displayName: user.displayName || "",
    photoURL: user.photoURL || "",
    isPro: false,
    dailyUsageCount: 0,
    totalGenerations: 0,
    lastUsageDate: new Date().toISOString().split('T')[0],
    subscriptionStatus: 'free',
    createdAt: new Date(),
  };
  await setDoc(userRef, profile, { merge: true });
  return profile;
};

export const trackUsage = async (uid: string) => {
  const userRef = doc(db, "users", uid);
  const today = new Date().toISOString().split('T')[0];

  const userSnap = await getDoc(userRef);
  if (!userSnap.exists()) return;

  const userData = userSnap.data() as UserProfile;

  if (userData.lastUsageDate !== today) {
    await updateDoc(userRef, {
      dailyUsageCount: 1,
      totalGenerations: increment(1),
      lastUsageDate: today
    });
  } else {
    await updateDoc(userRef, {
      dailyUsageCount: increment(1),
      totalGenerations: increment(1)
    });
  }
};

export const saveGeneration = async (uid: string, type: string, input: any, output: any) => {
  const generationsRef = collection(db, "generations");
  await addDoc(generationsRef, {
    uid,
    type,
    input,
    output,
    createdAt: new Date()
  });
};

export const getHistory = async (uid: string, type?: string, limitCount: number = 10) => {
  const generationsRef = collection(db, "generations");
  let q;
  if (type) {
    q = query(
      generationsRef,
      where("uid", "==", uid),
      where("type", "==", type),
      orderBy("createdAt", "desc"),
      limit(limitCount)
    );
  } else {
    q = query(
      generationsRef,
      where("uid", "==", uid),
      orderBy("createdAt", "desc"),
      limit(limitCount)
    );
  }

  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};
