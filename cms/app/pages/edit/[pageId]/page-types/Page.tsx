// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import WysiwygEditor from '../../../../WysiwygEditor';
import RenderOnMount from '../../../../RenderOnMount';

export default function Page (
    {
        data,
        setData,
    }: {
        data: string;
        setData: (val: string) => void;
    },
) {
    return (
        <RenderOnMount>
            <div>
                <WysiwygEditor data={data} setData={setData} />
            </div>
        </RenderOnMount>
    );
}
