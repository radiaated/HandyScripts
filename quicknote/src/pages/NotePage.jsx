import React, { useState, useEffect, useContext, useRef } from "react";

import { useParams } from "react-router-dom";
import AppContext from "../context/AppContext";
import { Link } from "react-router-dom";
import {
  Editor,
  EditorState,
  RichUtils,
  convertFromRaw,
  convertToRaw,
} from "draft-js";
import "draft-js/dist/Draft.css";

const NotePage = () => {
  const { noteId } = useParams();
  const { notesData, updateNotesData } = useContext(AppContext);

  const getCurrentBlockType = () => {
    const selection = editorState.getSelection();
    const contentState = editorState.getCurrentContent();
    const currentBlock = contentState.getBlockForKey(selection.getStartKey());
    const currentBlockType = currentBlock.getType();
    return currentBlockType;
  };

  const editorRef = useRef();

  const [tb, setTb] = useState(true);

  const [title, setTitle] = useState(
    notesData.notes.find((n) => n.id === Number(noteId))
      ? notesData.notes.find((n) => n.id === Number(noteId)).title
      : ""
  );

  const [editorState, setEditorState] = useState(
    notesData.notes.find((n) => n.id === Number(noteId))
      ? EditorState.createWithContent(
          convertFromRaw(
            notesData.notes.find((n) => n.id === Number(noteId)).desc
          )
        )
      : EditorState.createEmpty()
  );
  const styleMap = {
    "color-#ffffff": { color: "#ffffff" },
    "color-#00ffff": { color: "#00ffff" },
    "color-#FF6347": { color: "#FF6347" },
    "color-#00ff7f": { color: "#00ff7f" },
    "color-#87CEFA": { color: "#87CEFA" },
    "color-#FFB6C1": { color: "#FFB6C1" },
  };

  const handleFormatClick = (e, style) => {
    e.preventDefault();

    const newState = RichUtils.toggleInlineStyle(editorState, style);

    setEditorState(newState);

    const rawData = convertToRaw(newState.getCurrentContent());

    updateNotesData(Number(noteId), {
      title: title,
      desc: rawData,
    });
  };

  const handleBlockTypeClick = (e, style) => {
    e.preventDefault();

    const newState = RichUtils.toggleBlockType(editorState, style);

    setEditorState(newState);

    const rawData = convertToRaw(newState.getCurrentContent());

    updateNotesData(Number(noteId), {
      title: title,
      desc: rawData,
    });
  };

  const handleColorChange = (e, color) => {
    e.preventDefault();

    const newState = RichUtils.toggleInlineStyle(editorState, `color-${color}`);

    setEditorState(newState);

    const rawData = convertToRaw(newState.getCurrentContent());

    updateNotesData(Number(noteId), {
      title: title,
      desc: rawData,
    });

    return newState;
  };

  useEffect(() => {
    setEditorState((state) => {
      let newState = EditorState.moveFocusToEnd(state);
      if (state.getCurrentContent().getPlainText("\u0001").length === 0) {
        newState = RichUtils.toggleInlineStyle(newState, "color-#ffffff");
      }
      return newState;
    });
  }, []);

  return (
    <div className="relative space-y-4">
      <Link
        to="/"
        className="block px-2 py-1 text-xs border border-slate-600 w-fit mb-0 hover:bg-slate-700 hover:text-slate-200"
      >
        Back
      </Link>
      <div className="absolute top-4 left-0 text-xs tracking-widest text-slate-300">
        Title
      </div>
      <input
        className="bg-[#222830] transition-all w-full px-2 pt-3 pb-1 font-semibold outline-none border-b-2 border-slate-500 focus:border-slate-400 focus:text-4xl focus:p-4"
        type="text"
        value={title}
        onChange={(e) => {
          setTitle(e.target.value);

          const rawData = convertToRaw(editorState.getCurrentContent());

          updateNotesData(Number(noteId), {
            title: e.target.value,
            desc: rawData,
          });
        }}
      />

      <div className="relative flex flex-row sm:flex-col justify-between gap-2 sm:gap-0 w-[100%] select-none">
        <div
          className={`fixed justify-between toolbar-scrollable items-center sm:static border overflow-x-hidden overflow-y-scroll h-[60vh] sm:h-fit origin-left border-slate-700 p-3 sm:p-4 toolbar flex flex-col sm:flex-row gap-4 transition-all ease-in-out sm:flex-wrap ${
            tb ? "scale-x-[100%]" : "scale-x-[0%] sm:scale-x-[100%]"
          }`}
        >
          <div className="flex flex-col sm:flex-row divide-y-[1px] sm:divide-x-[1px] divide-slate-500 border border-slate-500">
            <button
              onMouseDown={(e) => handleBlockTypeClick(e, "header-one")}
              className={
                getCurrentBlockType() === "header-one"
                  ? "bg-slate-500 text-slate-900"
                  : ""
              }
            >
              H1
            </button>
            <button
              onMouseDown={(e) => handleBlockTypeClick(e, "header-two")}
              className={
                getCurrentBlockType() === "header-two"
                  ? "bg-slate-500 text-slate-900"
                  : ""
              }
            >
              H2
            </button>
            <button
              onMouseDown={(e) => handleBlockTypeClick(e, "header-three")}
              className={
                getCurrentBlockType() === "header-three"
                  ? "bg-slate-500 text-slate-900"
                  : ""
              }
            >
              H3
            </button>
            <button
              onMouseDown={(e) => handleBlockTypeClick(e, "header-four")}
              className={
                getCurrentBlockType() === "header-four"
                  ? "bg-slate-500 text-slate-900"
                  : ""
              }
            >
              H4
            </button>
            <button
              onMouseDown={(e) => handleBlockTypeClick(e, "header-five")}
              className={
                getCurrentBlockType() === "header-five"
                  ? "bg-slate-500 text-slate-900"
                  : ""
              }
            >
              H5
            </button>
            <button
              onMouseDown={(e) => handleBlockTypeClick(e, "header-six")}
              className={
                getCurrentBlockType() === "header-six"
                  ? "bg-slate-500 text-slate-900"
                  : ""
              }
            >
              H6
            </button>
          </div>

          <div className="flex flex-col sm:flex-row divide-y-[1px] sm:divide-x-[1px] divide-slate-500 border border-slate-500">
            <button
              onMouseDown={(e) => handleFormatClick(e, "BOLD")}
              className={
                editorState.getCurrentInlineStyle().has("BOLD")
                  ? "bg-slate-500 text-slate-900"
                  : ""
              }
            >
              B
            </button>
            <button
              onMouseDown={(e) => handleFormatClick(e, "ITALIC")}
              className={
                editorState.getCurrentInlineStyle().has("ITALIC")
                  ? "bg-slate-500 text-slate-900"
                  : ""
              }
            >
              i
            </button>
            <button
              onMouseDown={(e) => handleFormatClick(e, "UNDERLINE")}
              className={
                editorState.getCurrentInlineStyle().has("UNDERLINE")
                  ? "bg-slate-500 text-slate-900"
                  : ""
              }
            >
              <u>U</u>
            </button>
            <button
              onMouseDown={(e) => handleFormatClick(e, "STRIKETHROUGH")}
              className={
                editorState.getCurrentInlineStyle().has("STRIKETHROUGH")
                  ? "bg-slate-500 text-slate-900 line-through"
                  : "line-through"
              }
            >
              T
            </button>

            <button
              onMouseDown={(e) => handleBlockTypeClick(e, "ordered-list-item")}
              className={
                getCurrentBlockType() === "ordered-list-item"
                  ? "bg-slate-500 text-slate-900"
                  : ""
              }
            >
              1.
            </button>
            <button
              onMouseDown={(e) =>
                handleBlockTypeClick(e, "unordered-list-item")
              }
              className={
                getCurrentBlockType() === "unordered-list-item"
                  ? "bg-slate-500 text-slate-900"
                  : ""
              }
            >
              &diams;
            </button>

            <button
              onMouseDown={(e) => handleBlockTypeClick(e, "blockquote")}
              className={
                getCurrentBlockType() === "blockquote"
                  ? "bg-slate-500 text-slate-900"
                  : ""
              }
            >
              &quot;
            </button>
            <button
              onClick={(e) => handleBlockTypeClick(e, "code-block")}
              className={
                getCurrentBlockType() === "code-block"
                  ? "bg-slate-500 text-slate-900"
                  : ""
              }
            >
              {"</>"}
            </button>
          </div>
          <div className="flex flex-col sm:flex-row divide-y-[1px] sm:divide-x-[1px] divide-slate-500 border border-slate-500 p-2 gap-4">
            {Object.keys(styleMap).map((c, kk) => {
              const styleList = Object.keys(styleMap);
              const colorT = c.match(/^color-(#\w+)$/)[1];

              const temp = editorState
                .getCurrentContent()
                .getBlockForKey(editorState.getSelection().getStartKey())
                .getInlineStyleAt(editorState.getSelection().getStartOffset())
                .toArray();

              const indexList = styleList.map((s) => temp.lastIndexOf(s));

              const ind = Math.max.apply(Math, indexList);

              const selItem = temp[ind];

              const temp1 = editorState
                .getCurrentContent()
                .getBlockForKey(editorState.getSelection().getStartKey())
                .getInlineStyleAt(
                  editorState.getSelection().getStartOffset() - 1
                )
                .toArray();

              const indexLists = styleList.map((s) => temp1.lastIndexOf(s));

              const ind1 = Math.max.apply(Math, indexLists);

              const selItem1 = temp1[ind1];

              const contentState = editorState.getCurrentContent();
              const selectionState = editorState.getSelection();
              return (
                <div
                  key={kk}
                  style={{
                    backgroundColor: colorT,
                    borderRadius: "999%",
                    width: "19px",
                    height: "19px",
                    outline:
                      editorState.getSelection().isCollapsed() === true
                        ? selectionState.getAnchorOffset() !== 0 &&
                          selItem1 === c
                          ? "1px solid rgb(148 163 184)"
                          : selectionState.getAnchorOffset() === 0 &&
                            selItem === c
                          ? "1px solid rgb(148 163 184)"
                          : "none"
                        : selItem === c
                        ? "1px solid rgb(148 163 184)"
                        : "none",
                    outlineOffset: "2px",
                  }}
                  onClick={(e) => {
                    handleColorChange(e, colorT);
                  }}
                  className="cursor-pointer"
                ></div>
              );
            })}
          </div>
        </div>

        <div
          className={`prose prose-invert max-w-[100%] w-full prose-pre:bg-slate-950 prose-pre:border prose-pre:border-slate-800 prose-pre:p-2 prose-pre:m-0 cdedi py-4 tracking-wide marker:text-slate-300 transition-all ${
            tb ? "ml-20 w-[calc(100%-5rem)] sm:ml-0" : "ml-0"
          }`}
          onDoubleClick={() => setTb((state) => !state)}
        >
          <Editor
            customStyleMap={styleMap}
            editorState={editorState}
            onChange={(e) => {
              setEditorState(e);

              if (e.getCurrentContent().getPlainText("\u0001").length === 0) {
                setEditorState(RichUtils.toggleInlineStyle(e, "color-#ffffff"));
              }

              const rawData = convertToRaw(e.getCurrentContent());

              updateNotesData(Number(noteId), {
                title,
                desc: rawData,
              });
            }}
            ref={editorRef}
            placeholder="Write note"
          />
        </div>
      </div>
    </div>
  );
};

export default NotePage;
