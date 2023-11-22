import React, { useContext } from "react";
import { Link } from "react-router-dom";
import AppContext from "../context/AppContext";

const NoteItem = ({ note }) => {
  const { remNote } = useContext(AppContext);

  return (
    <div className="flex relative py-4 hover:bg-slate-700 group h-full w-full">
      <Link className="block w-full h-full " to={`/note/${note.id}`}>
        <div className="text-2xl font-light truncate w-[60%] sm:">
          {note.title === "" ? (
            <span className="text-slate-400 italic font-light ">Untitled</span>
          ) : (
            note.title
          )}
        </div>
      </Link>
      <div className="flex absolute right-0 bottom-0 h-full w-[35%] md:w-[2%] md:group-hover:w-[20%] md:transition-all md:duration-200 overflow-hidden text-xs">
        <button
          onClick={() => remNote(note.id)}
          className="flex justify-center items-center bg-red-800 md:text-opacity-0 md:group-hover:text-opacity-100 transition-opacity  text-red-300 h-full w-[100%] hover:bg-red-700 active:bg-red-800"
        >
          Remove
        </button>
        {/* <button className="flex justify-center items-center bg-zinc-700 text-opacity-0 group-hover:text-opacity-100 transition-opacity  text-zinc-300 h-full w-[50%] hover:bg-zinc-600">
          Preview
        </button> */}
      </div>
    </div>
  );
};

export default NoteItem;
