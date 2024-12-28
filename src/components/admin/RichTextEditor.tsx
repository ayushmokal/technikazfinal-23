import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { useEffect, useRef } from 'react';

interface RichTextEditorProps {
  content: string;
  onChange: (content: string) => void;
}

export function RichTextEditor({ content = '', onChange }: RichTextEditorProps) {
  const editorRef = useRef<any>(null);

  useEffect(() => {
    if (editorRef.current && content !== editorRef.current.getData()) {
      try {
        // Ensure content is a string
        const safeContent = typeof content === 'string' ? content : '';
        editorRef.current.setData(safeContent);
      } catch (error) {
        console.error('Error setting editor data:', error);
        editorRef.current?.setData(''); // Fallback to empty string
      }
    }
  }, [content]);

  const handleReady = (editor: any) => {
    editorRef.current = editor;
    try {
      // Ensure initial content is a string
      const safeContent = typeof content === 'string' ? content : '';
      editor.setData(safeContent);
    } catch (error) {
      console.error('Error in editor ready:', error);
      editor.setData(''); // Fallback to empty string
    }
  };

  const handleEditorChange = (_event: any, editor: any) => {
    if (!editor) {
      console.warn('Editor instance not available');
      return;
    }
    
    try {
      const data = editor.getData();
      onChange(data || '');
    } catch (error) {
      console.error('CKEditor error:', error);
      onChange('');
    }
  };

  return (
    <div className="border rounded-md min-h-[400px]">
      <CKEditor
        editor={ClassicEditor}
        data={typeof content === 'string' ? content : ''}
        onReady={handleReady}
        onChange={handleEditorChange}
        config={{
          toolbar: {
            items: [
              'heading',
              '|',
              'bold',
              'italic',
              'link',
              'bulletedList',
              'numberedList',
              '|',
              'outdent',
              'indent',
              '|',
              'imageUpload',
              'blockQuote',
              'insertTable',
              'mediaEmbed',
              'undo',
              'redo'
            ]
          },
          mediaEmbed: {
            previewsInData: true
          }
        }}
      />
    </div>
  );
}