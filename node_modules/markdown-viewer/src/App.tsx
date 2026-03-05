import { marked } from 'marked';
import DOMPurify from 'dompurify';
import { useEffect, useRef, useState } from 'react';
import { CodeEditor } from '@workerextension/ui'
import { Allotment } from "allotment";
import "allotment/dist/style.css";
import './App.css';
import { editorOptions } from './utils/constants';


const App = () => {
  const sampleContent = `# Hello World

This is a markdown viewer built with React and the marked library.

- It supports **bold** text
- It supports *italic* text
- It supports [links](https://www.example.com)

Enjoy using it!`;
  const htmlParse = marked.parse(sampleContent);
   const contentRef = useRef<HTMLDivElement>(null);
   const editorRef = useRef(null);
   const [markdownContent, setMarkdownContent] = useState(htmlParse);

   const handleEditorMount = (editor: any, monaco: any) => {
    console.log('Editor mounted:', editor);
    console.log('Monaco instance:', monaco);
    editorRef.current = editor;
  }

  const handleEditorChange = (value: any, event: any) => {
    console.log('Editor content changed:', value);
    // You can also update the markdown content here based on the editor input
    setMarkdownContent(marked.parse(value));
  }
   
  useEffect(() => {
    if (contentRef.current) {
      contentRef.current.innerHTML = DOMPurify.sanitize(markdownContent as any);
    }
  }, [markdownContent]);
  return <div className='markdown-viewer-page'>
    <Allotment>
      <Allotment.Pane>
        <div className='markdown-content' ref={contentRef}></div>
      </Allotment.Pane>
      <Allotment.Pane minSize={380}>
        <CodeEditor onMount={handleEditorMount} onChange={handleEditorChange} defaultValue={sampleContent} onValidate={() => {}} language={'Markdown'} options={editorOptions} />
      </Allotment.Pane>
    </Allotment>
  </div>
}

export default App