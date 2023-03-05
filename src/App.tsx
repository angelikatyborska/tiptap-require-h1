import Document from "@tiptap/extension-document";
import Paragraph from "@tiptap/extension-paragraph";
import Text from "@tiptap/extension-text";
import Heading from "@tiptap/extension-heading";
import Bold from "@tiptap/extension-bold";
import Italic from "@tiptap/extension-italic";
import History from "@tiptap/extension-history";
import Placeholder from "@tiptap/extension-placeholder";
import { EditorContent, useEditor } from "@tiptap/react";
import React from "react";
import "./App.css";

export default () => {
  const editor = useEditor({
    extensions: [
      Document,
      Paragraph,
      Text,
      Heading,
      Bold,
      Italic,
      History,
      Placeholder.configure({
        placeholder: "What's on your mind?",
      }),
    ],
    content: `
    <p></p>
  `,
  });

  if (!editor) {
    return null;
  }

  return (
    <div className="editorWrapper">
      <h1>TipTap Require H1 Demo</h1>
      <div className="editorControls">
        {([1, 2, 3, 4, 5, 6] as const).map((level) => {
          return (
            <button
              key={`h${level}`}
              onClick={() =>
                editor.chain().focus().toggleHeading({ level: level }).run()
              }
              className={
                editor.isActive("heading", { level: level }) ? "is-active" : ""
              }
              disabled={
                (!editor.isActive("heading", { level: level }) &&
                  !editor.can().setHeading({ level: level })) ||
                (editor.isActive("heading", { level: level }) &&
                  !editor.can().toggleHeading({ level: level }))
              }
            >
              h{level}
            </button>
          );
        })}

        <button
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={editor.isActive("bold") ? "is-active" : ""}
          disabled={
            (!editor.isActive("bold") && !editor.can().setBold()) ||
            (editor.isActive("bold") && !editor.can().unsetBold())
          }
        >
          bold
        </button>

        <button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={editor.isActive("italic") ? "is-active" : ""}
          disabled={
            (!editor.isActive("italic") && !editor.can().setItalic()) ||
            (editor.isActive("italic") && !editor.can().unsetItalic())
          }
        >
          italic
        </button>
      </div>
      <EditorContent editor={editor} />
      <h2>HTML Output</h2>
      <pre>{editor.getHTML()}</pre>
    </div>
  );
};
