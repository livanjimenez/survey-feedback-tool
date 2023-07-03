import { createContext } from "react";
import { useFirestore } from "@/app/hooks/useFirestore";

interface FirestoreContextProps {
  documents: any[];
  addDocument: (data: any) => Promise<string>;
  updateDocument: (docId: string, data: any) => Promise<void>;
  deleteDocument: (docId: string) => Promise<void>;
}

export const FirestoreContext = createContext<FirestoreContextProps>({
  documents: [],
  addDocument: async (_data: any) => {
    throw new Error("addDocument function not implemented");
  },
  updateDocument: async (_docId: string, _data: any) => {
    throw new Error("updateDocument function not implemented");
  },
  deleteDocument: async (_docId: string) => {
    throw new Error("deleteDocument function not implemented");
  },
});

export const FirestoreProvider: React.FC<{
  children: React.ReactNode;
  collectionPath: string;
}> = ({ children, collectionPath }) => {
  const firestore = useFirestore(collectionPath);

  return (
    <FirestoreContext.Provider
      value={{
        documents: firestore.documents,
        addDocument: firestore.addDocument,
        updateDocument: firestore.updateDocument,
        deleteDocument: firestore.deleteDocument,
      }}
    >
      {children}
    </FirestoreContext.Provider>
  );
};
