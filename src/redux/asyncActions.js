import { createAsyncThunk } from '@reduxjs/toolkit';
import { nanoid } from 'nanoid';
import { collection, getDocs, setDoc, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { db } from '../firebase';

export const getTodos = createAsyncThunk('getTodos', async (uid) => {
  const collectionRef = collection(db, uid);
  const data = await getDocs(collectionRef);
  const structuredData = data.docs.map((doc) => ({ ...doc.data(), docId: doc.id }));

  return structuredData;
});

export const addTodos = createAsyncThunk('addTodo', async ({ uid, todoData }) => {
  const collectionId = uid;
  const documentId = nanoid();
  const value = { ...todoData, docId: documentId };
  await setDoc(doc(db, collectionId, documentId), value);

  return value;
});

export const editTodos = createAsyncThunk('editTodos', async ({ todoData, uid, docId }) => {
  const docRef = doc(db, uid, docId);
  await updateDoc(docRef, todoData);
});

export const deleteTodos = createAsyncThunk(
  'deleteTodos',
  async ({ uid, deleteDocIds, amount }) => {
    let deleted = 0;
    const deleteAmount = () => {
      deleteDoc(doc(db, uid, deleteDocIds[deleted])).then(() => {
        deleted++;
        if (deleted !== amount) {
          deleteAmount();
        }
      });
    };
    deleteAmount();

    return deleteDocIds;
  },
);
