// components/shared/RichTextEditor.js
"use client";
import { cn } from "@/lib/utils";
import dynamic from "next/dynamic";
import { forwardRef, useState, useImperativeHandle } from "react";
import { EditorState, convertToRaw, convertFromRaw } from "draft-js";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

const Editor = dynamic(
  () => import("react-draft-wysiwyg").then((mod) => mod.Editor),
  { ssr: false }
);

const RichTextEditor = forwardRef(function RichTextEditor(props, ref) {
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );

  useImperativeHandle(ref, () => ({
    getEditorContent: () => {
      const contentState = editorState.getCurrentContent();
      return JSON.stringify(convertToRaw(contentState));
    },
    setEditorContent: (rawContent) => {
      const contentState = convertFromRaw(JSON.parse(rawContent));
      setEditorState(EditorState.createWithContent(contentState));
    },
  }));

  return (
    <Editor
      editorState={editorState}
      onEditorStateChange={setEditorState}
      editorClassName={cn(
        "border rounded-md px-3 min-h-[150px] cursor-text ring-offset-background focus-within:outline-none focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2",
        props.editorClassName
      )}
      toolbar={{
        options: ["inline", "list", "link", "history"],
        inline: {
          options: ["bold", "italic", "underline"],
        },
      }}
      {...props}
    />
  );
});

export default RichTextEditor;
