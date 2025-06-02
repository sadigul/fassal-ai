import { useRef, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Bold,
  Italic,
  List,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Link as LinkIcon,
  Image as ImageIcon,
} from "lucide-react";

interface RichTextEditorProps {
  id: string;
  value: string;
  onChange: (e: { target: { id: string; value: string } }) => void;
  rows?: number;
}

// Preserve only safe, styled HTML
const filterRefinedContent = (html: string) => {
  const wrapper = document.createElement("div");
  wrapper.innerHTML = html;

  const allowedTags = ["B", "I", "U", "STRONG", "EM", "A", "IMG", "UL", "LI", "DIV", "P"];

  const walk = (node: Node) => {
    if (node.nodeType === Node.ELEMENT_NODE) {
      const el = node as HTMLElement;

      if (!allowedTags.includes(el.tagName)) {
        const parent = el.parentElement;
        if (parent) {
          while (el.firstChild) parent.insertBefore(el.firstChild, el);
          parent.removeChild(el);
        }
      } else {
        [...el.attributes].forEach((attr) => {
          if (!["href", "src", "alt", "target", "rel"].includes(attr.name)) {
            el.removeAttribute(attr.name);
          }
        });

        if (el.tagName === "IMG") {
          el.style.cursor = "pointer";
          el.title = "Click to remove image";
          el.onclick = () => el.remove();
        }
      }
    }

    for (let child = node.firstChild; child; child = child.nextSibling) {
      walk(child);
    }
  };

  walk(wrapper);

  return wrapper.innerHTML.replace(/(<br\s*\/?>\s*){2,}/g, "<br>");
};

const RichTextEditor = ({ id, value, onChange, rows = 10 }: RichTextEditorProps) => {
  const editorRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [fontSize, setFontSize] = useState(14); // default 14px

  useEffect(() => {
    if (editorRef.current && document.activeElement !== editorRef.current) {
      editorRef.current.innerHTML = value;
    }
  }, [value]);

  const syncContent = () => {
    const html = editorRef.current?.innerHTML || "";
    const refined = filterRefinedContent(html);
    onChange({ target: { id, value: refined } });
  };

  const toggleInlineTag = (tag: string) => {
    const sel = window.getSelection();
    if (!sel || sel.rangeCount === 0) return;
    document.execCommand(tag.toLowerCase(), false);
    syncContent();
  };

  const applyLink = () => {
    const sel = window.getSelection();
    if (!sel || sel.rangeCount === 0) return;

    const range = sel.getRangeAt(0);
    const url = prompt("Enter URL:");
    if (!url) return;

    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.target = "_blank";
    anchor.rel = "noopener noreferrer";
    anchor.textContent = url;
    anchor.style.textDecoration = "underline";
    anchor.style.color = "#3b82f6";
    range.deleteContents();
    range.insertNode(anchor);
    sel.removeAllRanges();
    sel.addRange(range);
    syncContent();
  };

  const insertImage = (file: File) => {
    const reader = new FileReader();
    reader.onload = () => {
      const img = document.createElement("img");
      img.src = reader.result as string;
      img.alt = "Uploaded image";
      img.className = "my-4 rounded max-w-full h-auto";
      img.title = "Click to remove image";
      img.style.cursor = "pointer";
      img.onclick = () => img.remove();
      insertNodeAtCursor(img);
      syncContent();
    };
    reader.readAsDataURL(file);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      insertImage(file);
    }
  };

  const insertNodeAtCursor = (node: Node) => {
    const sel = window.getSelection();
    if (!sel || sel.rangeCount === 0) return;
    const range = sel.getRangeAt(0);
    range.deleteContents();
    range.insertNode(node);
    range.setStartAfter(node);
    range.setEndAfter(node);
    sel.removeAllRanges();
    sel.addRange(range);
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLDivElement>) => {
    e.preventDefault();
    const clipboard = e.clipboardData;
    const items = clipboard?.items;

    for (const item of items) {
      if (item.type.includes("image")) {
        const file = item.getAsFile();
        if (file) {
          insertImage(file);
          return;
        }
      }
    }

    const html = clipboard?.getData("text/html");
    const text = clipboard?.getData("text/plain");

    if (html) {
      document.execCommand("insertHTML", false, html);
    } else if (text) {
      document.execCommand("insertText", false, text);
    }

    syncContent();
  };

  const applyAlignment = (alignment: "left" | "center" | "right") => {
    if (!editorRef.current) return;
    document.execCommand(`justify${alignment.charAt(0).toUpperCase() + alignment.slice(1)}`);
    syncContent();
  };

  const insertBulletList = () => {
    document.execCommand("insertUnorderedList", false);
    syncContent();
  };

  return (
    <div className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
      <div className="bg-gray-50 dark:bg-gray-800 p-2 border-b border-gray-200 dark:border-gray-700 flex gap-1 flex-wrap">
        <Button type="button" variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={() => toggleInlineTag("bold")}>
          <Bold className="h-4 w-4" />
        </Button>
        <Button type="button" variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={() => toggleInlineTag("italic")}>
          <Italic className="h-4 w-4" />
        </Button>
        <Button type="button" variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={insertBulletList}>
          <List className="h-4 w-4" />
        </Button>
        <Button type="button" variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={() => applyAlignment("left")}>
          <AlignLeft className="h-4 w-4" />
        </Button>
        <Button type="button" variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={() => applyAlignment("center")}>
          <AlignCenter className="h-4 w-4" />
        </Button>
        <Button type="button" variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={() => applyAlignment("right")}>
          <AlignRight className="h-4 w-4" />
        </Button>
        <Button type="button" variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={applyLink}>
          <LinkIcon className="h-4 w-4" />
        </Button>
        <Button type="button" variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={() => fileInputRef.current?.click()}>
          <ImageIcon className="h-4 w-4" />
        </Button>
        <input
          type="file"
          accept="image/*"
          className="hidden"
          ref={fileInputRef}
          onChange={handleImageUpload}
        />
        <Button type="button" variant="ghost" size="sm" className="h-8 px-2" onClick={() => setFontSize((s) => Math.max(10, s - 1))}>
          A-
        </Button>
        <Button type="button" variant="ghost" size="sm" className="h-8 px-2" onClick={() => setFontSize((s) => Math.min(36, s + 1))}>
          A+
        </Button>
      </div>

      <div
        ref={editorRef}
        contentEditable
        onInput={syncContent}
        onPaste={handlePaste}
        className="p-3 text-black min-h-[200px] outline-none border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
        style={{ whiteSpace: "pre-wrap", fontSize: `${fontSize}px` }}
      />
    </div>
  );
};

export default RichTextEditor;
