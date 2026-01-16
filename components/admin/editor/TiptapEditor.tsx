"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import CodeBlock from "@tiptap/extension-code-block";
import { useEffect } from "react";

interface TiptapEditorProps {
  content: string;
  onChange: (html: string) => void;
}

export default function TiptapEditor({ content, onChange }: TiptapEditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      CodeBlock,
      Image.configure({
        inline: true,
        allowBase64: true, // fallback
      }),
    ],
    immediatelyRender: false,
    content,
    editorProps: {
      attributes: {
        class: "prose prose-invert max-w-none focus:outline-none min-h-[50vh]",
      },
      handlePaste: (view, event, slice) => {
        const items = Array.from(event.clipboardData?.items || []);
        const images = items.filter((item) => item.type.indexOf("image") === 0);

        if (images.length > 0) {
          event.preventDefault();
          images.forEach((item) => {
            const file = item.getAsFile();
            if (file) uploadImage(file, view);
          });
          return true;
        }
        return false;
      },
      handleDrop: (view, event, slice, moved) => {
        if (
          !moved &&
          event.dataTransfer &&
          event.dataTransfer.files &&
          event.dataTransfer.files.length > 0
        ) {
          const files = Array.from(event.dataTransfer.files);
          const images = files.filter(
            (file) => file.type.indexOf("image") === 0
          );

          if (images.length > 0) {
            event.preventDefault();
            images.forEach((file) => uploadImage(file, view));
            return true;
          }
        }
        return false;
      },
    },
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  // Upload Logic
  const uploadImage = async (file: File, view: any) => {
    // Show some loading state? For now just optimist logic or wait
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error("Upload failed");

      const data = await res.json();

      // Insert image at current selection
      const { schema } = view.state;
      const node = schema.nodes.image.create({ src: data.url });
      const transaction = view.state.tr.replaceSelectionWith(node);
      view.dispatch(transaction);
    } catch (e) {
      console.error(e);
      alert("Failed to upload image");
    }
  };

  return (
    <div className="border border-border rounded-xl p-4 bg-surface/30">
      <div className="flex gap-2 mb-4 border-b border-border pb-2 overflow-x-auto text-sm">
        <button
          type="button"
          onClick={() => editor?.chain().focus().toggleBold().run()}
          className="px-2 py-1 hover:bg-white/10 rounded"
        >
          Bold
        </button>
        <button
          type="button"
          onClick={() => editor?.chain().focus().toggleItalic().run()}
          className="px-2 py-1 hover:bg-white/10 rounded"
        >
          Italic
        </button>
        <button
          type="button"
          onClick={() => editor?.chain().focus().toggleCodeBlock().run()}
          className="px-2 py-1 hover:bg-white/10 rounded"
        >
          Code Block
        </button>
        <button
          type="button"
          onClick={() =>
            editor?.chain().focus().toggleHeading({ level: 2 }).run()
          }
          className="px-2 py-1 hover:bg-white/10 rounded"
        >
          H2
        </button>
        <button
          type="button"
          onClick={() => editor?.chain().focus().toggleBulletList().run()}
          className="px-2 py-1 hover:bg-white/10 rounded"
        >
          List
        </button>
      </div>
      <EditorContent editor={editor} />
    </div>
  );
}
