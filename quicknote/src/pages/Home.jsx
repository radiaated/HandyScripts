import React, { useContext } from "react";
import NoteItem from "../components/NoteItem";

import { Link } from "react-router-dom";
import AppContext from "../context/AppContext";

const Home = () => {
  const { notesData } = useContext(AppContext);

  return (
    <div>
      <h2 className="text-3xl font-extrabold py-8 border-b-4 border-slate-400 ">
        <code>Notes</code>
      </h2>
      <Link
        to={`/note/${notesData.currId}`}
        className="flex justify-center items-center text-4xl font-medium fixed bottom-8 right-8 border bg-slate-600 border-slate-700 p-8 w-16 h-16 rounded-[900%] hover:bg-slate-500 hover:border-slate-700"
      >
        +
      </Link>
      <div className="divide-y divide-slate-700">
        {notesData ? (
          notesData.notes.length > 0 ? (
            notesData.notes.map((note) => (
              <NoteItem note={note} key={note.id} />
            ))
          ) : (
            <div className="py-4 text-slate-500 tracking-wider text-sm">
              Notes appear here.
            </div>
          )
        ) : (
          <div className="py-4 text-sm tracking-wider text-slate-500">...</div>
        )}
      </div>
    </div>
  );
};

export default Home;
