"use client";
import React from "react";
import "@blocknote/core/fonts/inter.css";
import { useCreateBlockNote } from "@blocknote/react";
import { BlockNoteView } from "@blocknote/mantine";
import "@blocknote/mantine/style.css";

export default function RichTextEditor({ markdown, handleUpdate }) {
  // No need for useState here as we are now receiving markdown from props

  const editor = useCreateBlockNote({
    initialContent: [
      {
        type: "paragraph",
        content: [
          "Hello, ",
          {
            type: "text",
            text: "world!",
            styles: {
              bold: true,
            },
          },
        ],
      },
    ],
  });

  const onChange = async () => {
    const updatedMarkdown = await editor.blocksToMarkdownLossy(editor.document);
    handleUpdate(updatedMarkdown); // Call the update function passed from parent
  };

  return (
    <div className="border rounded-md py-2 min-h-40">
      <BlockNoteView editor={editor} onChange={onChange} />
    </div>
  );
}
