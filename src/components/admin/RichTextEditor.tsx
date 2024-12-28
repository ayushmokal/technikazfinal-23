import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

interface RichTextEditorProps {
  content: string;
  onChange: (content: string) => void;
}

export function RichTextEditor({ content = '', onChange }: RichTextEditorProps) {
  return (
    <div className="min-h-[400px] border rounded-md">
      <CKEditor
        editor={ClassicEditor}
        data={content}
        config={{
          toolbar: ['heading', '|', 'bold', 'italic', 'link', 'bulletedList', 'numberedList'],
          placeholder: 'Type your content here...',
          removePlugins: ['CKFinderUploadAdapter', 'CKFinder', 'EasyImage', 'Image', 'ImageCaption', 'ImageStyle', 'ImageToolbar', 'ImageUpload', 'MediaEmbed'],
        }}
        onReady={(editor) => {
          console.log('Editor is ready to use!', editor);
        }}
        onChange={(_event, editor) => {
          const data = editor.getData();
          console.log('Editor content changed:', data);
          onChange(data);
        }}
        onError={(error) => {
          console.error('Editor error:', error);
        }}
      />
    </div>
  );
}