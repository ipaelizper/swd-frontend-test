// store/personSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Person {
  id: string;
  title: string;
  firstname: string;
  lastname: string;
  birthday: string;
  nationality: string;
  citizenID: string;
  gender: string;
  mobilePhone: string;
  passportNo: string;
  expectedSalary: string;
}

interface PersonState {
  data: Person[];
}

const loadFromLocalStorage = (): Person[] => {
  if (typeof window === 'undefined') return [];
  const data = localStorage.getItem('persons');
  return data ? JSON.parse(data) : [];
};

const saveToLocalStorage = (data: Person[]) => {
  localStorage.setItem('persons', JSON.stringify(data));
};

const initialState: PersonState = {
  data: loadFromLocalStorage(),
};

const personSlice = createSlice({
  name: 'person',
  initialState,
  reducers: {
    addPerson: (state, action: PayloadAction<Person>) => {
      state.data.push(action.payload);
      saveToLocalStorage(state.data);
    },
    updatePerson: (state, action: PayloadAction<Person>) => {
      const index = state.data.findIndex(p => p.id === action.payload.id);
      if (index !== -1) {
        state.data[index] = action.payload;
        saveToLocalStorage(state.data);
      }
    },
    deletePersons: (state, action: PayloadAction<string[]>) => {
      state.data = state.data.filter(p => !action.payload.includes(p.id));
      saveToLocalStorage(state.data);
    },
  },
});

export const { addPerson, updatePerson, deletePersons } = personSlice.actions;
export default personSlice.reducer;