import Document from '@tiptap/extension-document'
import Paragraph from '@tiptap/extension-paragraph'
import Text from '@tiptap/extension-text'
import Heading from '@tiptap/extension-heading'
import Bold from '@tiptap/extension-bold'
import Italic from '@tiptap/extension-italic'
import History from '@tiptap/extension-history'
import Placeholder from '@tiptap/extension-placeholder'
import { EditorContent, useEditor } from '@tiptap/react'
import React from 'react'
import './App.css'

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
        placeholder: 'What\'s on your mind?'
      })
    ],
    content: `
    <p></p>
  `,
  })

  if (!editor) { return null }

  return (
    <div className="editorWrapper">
      <h1>TipTap Require H1 Demo</h1>
      <EditorContent editor={editor} />
      <h2>HTML Output</h2>
      <pre>
        {editor.getHTML()}
      </pre>
    </div>
  )
}
