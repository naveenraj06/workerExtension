import Editor from '@monaco-editor/react';
import { useRef } from 'react';

interface CodeEditorProps {
  onChange?: (value: string | undefined, event: any) => void;
  onMount?: (editor: any, monaco: any) => void;
  onValidate?: (markers: any) => void;
  language?: string;
  defaultValue?: string;
  options?: any;
}

const CodeEditor = ({
  onChange,
  onMount,
  onValidate,
  language,
  defaultValue,
  options
}: CodeEditorProps ) => {

  const editorRef = useRef(null);

  const handleEditorChange = (value: any, event: any) => {
    // here is the current value
    console.log(value, event);
    if (onChange) {
      onChange(value, event);
    }
  }

  const handleEditorDidMount = (editor: any, monaco: any) => {
    console.log('onMount: the editor instance:', editor);
    console.log('onMount: the monaco instance:', monaco);
    editorRef.current = editor;
    if (onMount) {
      onMount(editor, monaco);
    }
  }

  const handleEditorValidation = (markers: any) => {
    // model markers
    // markers.forEach(marker => console.log('onValidate:', marker.message));
    console.log(markers);
    if (onValidate) {
      onValidate(markers);
    }
    
  }

  return <Editor height="100%" width="100%" defaultValue={defaultValue || "// some comment"} onChange={handleEditorChange} onMount={handleEditorDidMount} onValidate={handleEditorValidation} language={language || 'markdown'} defaultLanguage={'Markdown'} options={options} />
}

export default CodeEditor