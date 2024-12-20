import React from 'react';
import ReactQuill, { Quill } from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import htmlEditButton from 'quill-html-edit-button';
import './WysiwygStyles.css';

Quill.register('modules/htmlEditButton', htmlEditButton);

export default function WysiwygEditor (
    {
        data,
        setData,
    }: {
        data: string;
        setData: (val: string) => void;
    },
) {
    return (
        <ReactQuill
            theme="snow"
            value={data}
            onChange={setData}
            modules={{
                toolbar: [
                    [{ header: [1, 2, 3, false] }],
                    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
                    [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
                    ['link', 'image'],
                ],
                htmlEditButton: {
                    msg: ' ',
                    okText: 'Submit',
                    cancelText: 'Cancel',
                    buttonHTML: '<div class="ql-source-button"><></div>',
                    buttonTitle: 'Show HTML source',
                    syntax: false,
                    prependSelector: 'div#myelement',
                    editorModules: {},
                },
            }}
        />
    );
}
