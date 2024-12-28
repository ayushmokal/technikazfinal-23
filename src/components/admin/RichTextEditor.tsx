import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

interface RichTextEditorProps {
  content: string;
  onChange: (content: string) => void;
}

export function RichTextEditor({ content = '', onChange }: RichTextEditorProps) {
  console.log('RichTextEditor rendering with content:', content);

  return (
    <div className="min-h-[400px] border rounded-md">
      <CKEditor
        editor={ClassicEditor}
        data={content}
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
              'undo',
              'redo'
            ]
          },
          placeholder: 'Start typing your content here...',
        }}
        onReady={(editor) => {
          console.log('Editor is ready to use!', editor);
        }}
        onChange={(_event, editor) => {
          const data = editor.getData();
          console.log('Editor content changed:', data);
          onChange(data);
        }}
        onError={(error, { willEditorRestart }) => {
          console.error('Editor error:', error);
          if (willEditorRestart) {
            console.log('Editor will restart');
          }
        }}
      />
    </div>
  );
}