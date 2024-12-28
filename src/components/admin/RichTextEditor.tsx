import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

interface RichTextEditorProps {
  content: string;
  onChange: (content: string) => void;
}

export function RichTextEditor({ content, onChange }: RichTextEditorProps) {
  return (
    <div className="min-h-[400px] border rounded-md">
      <CKEditor
        editor={ClassicEditor}
        data={content}
        onChange={(event, editor) => {
          const data = editor.getData();
          onChange(data);
        }}
        onError={(error, { phase }) => {
          console.error('Editor error:', error);
          console.log('Phase:', phase);
        }}
        config={{
          toolbar: ['heading', '|', 'bold', 'italic', 'link', 'bulletedList', 'numberedList'],
          placeholder: 'Type your content here...',
          removePlugins: ['MediaEmbed', 'ImageUpload']
        }}
      />
    </div>
  );
}