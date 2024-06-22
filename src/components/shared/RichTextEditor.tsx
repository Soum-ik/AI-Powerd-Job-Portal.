"use client";

import { cn } from "@/lib/utils";
import dynamic from "next/dynamic";
import { forwardRef, useState, useEffect } from "react";
import { EditorProps } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { EditorState, convertFromRaw } from "draft-js";

const Editor = dynamic(
  () => import("react-draft-wysiwyg").then((mod) => mod.Editor),
  { ssr: false },
);

const RichTextEditor = forwardRef<Object, EditorProps>(
  function RichTextEditor(props, ref) {
    const [editorState, setEditorState] = useState(() =>
      EditorState.createEmpty()
    );

    useEffect(() => {
      if (props.defaultContentState) {
        setEditorState(EditorState.createWithContent(convertFromRaw(props.defaultContentState)));
      }
    }, [props.defaultContentState]);

    return (
      <Editor
        editorState={editorState}
        onEditorStateChange={setEditorState}
        editorClassName={cn(
          "border rounded-md px-3 min-h-[150px] cursor-text ring-offset-background focus-within:outline-none focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2",
          props.editorClassName,
        )}
        toolbar={{
          options: ["inline", "list", "link", "history"],
          inline: {
            options: ["bold", "italic", "underline"],
          },
        }}
        editorRef={(r) => {
          if (typeof ref === "function") {
            ref(r);
          } else if (ref) {
            ref.current = r;
          }
        }}
        {...props}
      />
    );
  },
);

export default RichTextEditor;
