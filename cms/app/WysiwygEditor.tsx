import React, { useRef } from 'react';
import './WysiwygStyles.css';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import {
    ClassicEditor,
    Essentials,
    Paragraph,
    Bold,
    Italic,
    Underline,
    Strikethrough,
    BlockQuote,
    List,
    Indent,
    Link,
    SourceEditing,
} from 'ckeditor5';
import 'ckeditor5/ckeditor5.css';

export default function WysiwygEditor (
    {
        data,
        setData,
    }: {
        data: string;
        setData: (val: string) => void;
    },
) {
    const editorRef = useRef<ClassicEditor>(null);

    return (
        <div className="prose max-w-none">
            <CKEditor
                editor={ClassicEditor}
                config={{
                    licenseKey: 'GPL', // Or 'GPL'.
                    plugins: [
                        SourceEditing,
                        Essentials,
                        Paragraph,
                        Bold,
                        Italic,
                        Underline,
                        Strikethrough,
                        BlockQuote,
                        List,
                        Indent,
                        Link,
                    ],
                    toolbar: [
                        'sourceEditing',
                        'bold',
                        'italic',
                        'underline',
                        'strikethrough',
                        'blockquote',
                        'numberedList',
                        'bulletedList',
                        'indent',
                        'outdent',
                        'link',
                    ],
                    initialData: data,
                }}
                onReady={(editor) => {
                    editorRef.current = editor;
                }}
                onChange={() => {
                    setData(editorRef.current?.getData() ?? '');
                }}
            />
        </div>
    );
}
