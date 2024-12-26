import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import Link from '@tiptap/extension-link';
import { Button } from "@/components/ui/button";
import { ImageIcon, Bold, Italic, List, ListOrdered, Link as LinkIcon } from "lucide-react";

interface RichTextEditorProps {
  content: string;
  onChange: (content: string) => void;
}

export function RichTextEditor({ content, onChange }: RichTextEditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Image,
      Link.configure({
        openOnClick: true,
        HTMLAttributes: {
          class: 'text-primary underline',
        },
        protocols: ['http', 'https'],
        autolink: true,
        linkOnPaste: true,
        validate: (url) => {
          // Allow both regular URLs and video URLs
          return true;
        },
      }),
    ],
    content,
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      // Transform video URLs into embeds before saving
      const transformedHtml = html.replace(
        /href="(https?:\/\/)?(www\.)?(youtube\.com\/watch\?v=|youtu\.be\/|vimeo\.com\/)([a-zA-Z0-9_-]+)"/g,
        (match, protocol, www, domain, videoId) => {
          if (domain.includes('youtube')) {
            return `src="https://www.youtube.com/embed/${videoId}"`;
          } else if (domain.includes('vimeo')) {
            return `src="https://player.vimeo.com/video/${videoId}"`;
          }
          return match;
        }
      );
      onChange(transformedHtml);
    },
  });

  const addImage = (e: React.MouseEvent) => {
    e.preventDefault();
    const url = window.prompt('Enter the URL of the image:');
    if (url && editor) {
      editor.chain().focus().setImage({ src: url }).run();
    }
  };

  const addLink = (e: React.MouseEvent) => {
    e.preventDefault();
    const previousUrl = editor?.getAttributes('link').href;
    const url = window.prompt('Enter the URL (supports YouTube and Vimeo):', previousUrl);
    
    if (url === null) {
      return;
    }

    if (url === '') {
      editor?.chain().focus().extendMarkRange('link').unsetLink().run();
      return;
    }

    // Check if it's a video URL and transform it
    const videoMatch = url.match(
      /(youtube\.com\/watch\?v=|youtu\.be\/|vimeo\.com\/)([a-zA-Z0-9_-]+)/
    );

    if (videoMatch) {
      const [, domain, videoId] = videoMatch;
      const embedUrl = domain.includes('youtube')
        ? `https://www.youtube.com/embed/${videoId}`
        : `https://player.vimeo.com/video/${videoId}`;
      
      // Insert iframe for video
      editor?.chain()
        .focus()
        .insertContent(`<iframe src="${embedUrl}" frameborder="0" allowfullscreen></iframe>`)
        .run();
    } else {
      // Regular link
      editor?.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
    }
  };

  if (!editor) {
    return null;
  }

  return (
    <div className="border rounded-md">
      <div className="border-b p-2 flex gap-2 bg-secondary">
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleBold().run();
          }}
          className={editor.isActive('bold') ? 'bg-muted' : ''}
        >
          <Bold className="h-4 w-4" />
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleItalic().run();
          }}
          className={editor.isActive('italic') ? 'bg-muted' : ''}
        >
          <Italic className="h-4 w-4" />
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleBulletList().run();
          }}
          className={editor.isActive('bulletList') ? 'bg-muted' : ''}
        >
          <List className="h-4 w-4" />
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleOrderedList().run();
          }}
          className={editor.isActive('orderedList') ? 'bg-muted' : ''}
        >
          <ListOrdered className="h-4 w-4" />
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={addImage}
        >
          <ImageIcon className="h-4 w-4" />
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={addLink}
          className={editor.isActive('link') ? 'bg-muted' : ''}
        >
          <LinkIcon className="h-4 w-4" />
        </Button>
      </div>
      <EditorContent 
        editor={editor} 
        className="prose max-w-none p-4 min-h-[200px] focus:outline-none"
      />
    </div>
  );
}