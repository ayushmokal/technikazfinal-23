import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { useEffect, useRef } from 'react';
import { supabase } from "@/integrations/supabase/client";

interface RichTextEditorProps {
  content: string;
  onChange: (content: string) => void;
}

class UploadAdapter {
  private loader: any;

  constructor(loader: any) {
    this.loader = loader;
  }

  async upload() {
    try {
      const file = await this.loader.file;
      const fileExt = file.name.split(".").pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `${fileName}`;

      const { error: uploadError, data } = await supabase.storage
        .from("blog-images")
        .upload(filePath, file);

      if (uploadError) {
        throw uploadError;
      }

      const { data: publicUrlData } = supabase.storage
        .from("blog-images")
        .getPublicUrl(filePath);

      return {
        default: publicUrlData.publicUrl
      };
    } catch (error) {
      console.error('Upload failed:', error);
      throw error;
    }
  }

  abort() {
    console.log('Upload aborted');
  }
}

export function RichTextEditor({ content = '', onChange }: RichTextEditorProps) {
  const editorRef = useRef<any>(null);

  useEffect(() => {
    if (editorRef.current && content !== editorRef.current.getData()) {
      try {
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
    editor.plugins.get('FileRepository').createUploadAdapter = (loader: any) => {
      return new UploadAdapter(loader);
    };
    
    try {
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