"use client";

import {
  MDXEditor,
  MDXEditorMethods,
  headingsPlugin,
  listsPlugin,
  quotePlugin,
  thematicBreakPlugin,
  markdownShortcutPlugin,
  toolbarPlugin,
  UndoRedo,
  BoldItalicUnderlineToggles,
  ListsToggle,
  Separator,
  BlockTypeSelect,
  CreateLink,
  InsertTable,
  InsertThematicBreak,
  InsertCodeBlock,
  codeBlockPlugin,
  codeMirrorPlugin,
  tablePlugin,
  linkPlugin,
  linkDialogPlugin,
} from "@mdxeditor/editor";
import "@mdxeditor/editor/style.css";
import React, { forwardRef } from "react";

interface MDXEditorProps {
  markdown: string;
  onChange?: (markdown: string) => void;
  placeholder?: string;
}

const ForwardRefEditor = forwardRef<MDXEditorMethods, MDXEditorProps>(({ markdown, onChange, placeholder }, ref) => {
  return (
    <div className="mdx-editor-container border rounded-xl overflow-hidden bg-background">
      <MDXEditor
        ref={ref}
        markdown={markdown}
        onChange={onChange}
        placeholder={placeholder}
        className="prose max-w-none min-h-[400px]"
        contentEditableClassName="outline-none min-h-[400px] p-4 font-sans leading-relaxed"
        plugins={[
          headingsPlugin(),
          listsPlugin(),
          quotePlugin(),
          thematicBreakPlugin(),
          markdownShortcutPlugin(),
          tablePlugin(),
          linkPlugin(),
          linkDialogPlugin(),
          codeBlockPlugin({ defaultCodeBlockLanguage: "js" }),
          codeMirrorPlugin({
            codeBlockLanguages: {
              js: "JavaScript",
              ts: "TypeScript",
              tsx: "React",
              css: "CSS",
              html: "HTML",
              json: "JSON",
            },
          }),
          toolbarPlugin({
            toolbarContents: () => (
              <div className="flex flex-wrap items-center gap-1 p-1 border-b bg-muted/30">
                <UndoRedo />
                <Separator />
                <BlockTypeSelect />
                <Separator />
                <BoldItalicUnderlineToggles />
                <Separator />
                <ListsToggle />
                <Separator />
                <CreateLink />
                <InsertTable />
                <InsertThematicBreak />
                <InsertCodeBlock />
              </div>
            ),
          }),
        ]}
      />
      <style jsx global>{`
        .mdx-editor-container .mdxeditor {
          --mdxeditor-toolbar-background: transparent;
        }
        .mdx-editor-container .prose :where(h1, h2, h3, h4, h5, h6) {
          margin-top: 1.5rem;
          margin-bottom: 0.5rem;
        }
        .mdx-editor-container .prose :where(p) {
          margin-top: 1rem;
          margin-bottom: 1rem;
        }
      `}</style>
    </div>
  );
});

ForwardRefEditor.displayName = "ForwardRefEditor";

export default ForwardRefEditor;
