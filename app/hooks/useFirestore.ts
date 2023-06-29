import { useEffect, useState } from "react";
import { db } from "@/app/firebase/firebaseClient";
import {
  collection,
  query,
  getDocs,
  addDoc,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";

type CollectionPath = string;

export const useFirestore = (collectionPath: CollectionPath) => {
  const [documents, setDocuments] = useState<any[]>([]);

  // Get documents
  const getDocuments = async () => {
    const q = query(collection(db, collectionPath));
    const querySnapshot = await getDocs(q);
    setDocuments(
      querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
    );
  };

  // Add document
  const addDocument = async (data: any) => {
    const docRef = await addDoc(collection(db, collectionPath), data);
    return docRef.id;
  };

  // Update document
  const updateDocument = async (docId: string, data: any) => {
    const docRef = doc(db, collectionPath, docId);
    await updateDoc(docRef, data);
  };

  // Delete document
  const deleteDocument = async (docId: string) => {
    const docRef = doc(db, collectionPath, docId);
    await deleteDoc(docRef);
  };

  useEffect(() => {
    getDocuments();
  }, [collectionPath]);

  return { documents, addDocument, updateDocument, deleteDocument };
};
