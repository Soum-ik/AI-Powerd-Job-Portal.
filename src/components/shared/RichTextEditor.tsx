import React, { forwardRef, useEffect, useState } from "react";
import { EditorState, convertFromHTML, convertToRaw, } from "draft-js";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { cn } from "@/lib/utils";
import dynamic from "next/dynamic";
import { } from "react-dom";


const Editor = dynamic(
  () => import("react-draft-wysiwyg").then((mod) => mod.Editor),
  { ssr: false },
);

interface RichTextEditorProps {
  initialValue?: EditorState; // Allow either HTML string or EditorState for initial value
  editorClassName?: string;
  onChange?: (content: any) => void; // Optional callback for content changes
}


const RichTextEditor = forwardRef<Object, RichTextEditorProps>(
  (props, ref) => {

    const onEditorStateChange = (newState: EditorState) => {
      // setEditorState(newState);
      // Optional: Handle content changes (e.g., call a prop function)
      if (props.onChange) {
        props.onChange(convertToRaw(newState.getCurrentContent()));
      }
    };

    return (
      <Editor
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
        editorRef={(r) => {
          if (typeof ref === "function") {
            ref(r);
          } else if (ref) {
            ref.current = r;
          }
        }}
        {...props}

        
        onEditorStateChange={onEditorStateChange}
 
      />
    );
  }
);

export default RichTextEditor;
