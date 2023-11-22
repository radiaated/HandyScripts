import React from "react";
import { createContext, useState, useEffect } from "react";

const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
  const [notesData, setNotesData] = useState(
    localStorage.getItem("notesData")
      ? JSON.parse(localStorage.getItem("notesData"))
      : { currId: 0, notes: [] }
  );

  const updateNotesData = (noteId, newNote) => {
    const indexOfNote = notesData.notes.findIndex((x) => x.id === noteId);

    setNotesData((state) => {
      const newNotesData = {
        currId: indexOfNote === -1 ? state.currId + 1 : state.currId,
        notes:
          indexOfNote === -1
            ? [...state.notes, { id: state.currId, ...newNote }]
            : state.notes.map((n) =>
                n.id === noteId ? { id: noteId, ...newNote } : n
              ),
      };

      localStorage.setItem("notesData", JSON.stringify(newNotesData));

      return newNotesData;
    });
  };
  const remNote = (noteId) => {
    setNotesData((state) => {
      const newNotes = notesData.notes.filter((n) => n.id !== noteId);
      const newNotesData = { ...state, notes: newNotes };
      localStorage.setItem("notesData", JSON.stringify(newNotesData));

      return newNotesData;
    });
  };

  useEffect(() => {
    if (!localStorage.getItem("notesData")) {
      localStorage.setItem(
        "notesData",
        JSON.stringify({ currId: 0, notes: [] })
      );
    }
  }, []);

  let data = {
    notesData,
    updateNotesData,
    remNote,
  };

  return <AppContext.Provider value={data}>{children}</AppContext.Provider>;
};

export default AppContext;
