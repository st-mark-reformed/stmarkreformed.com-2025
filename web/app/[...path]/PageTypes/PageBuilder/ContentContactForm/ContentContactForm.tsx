import React from 'react';
import { PageBuilderBlockBase } from '../../../../types/PageBuilder';
import { ContentContactFormType } from './ContentContactFormType';
import typography from '../../../../typography/typography';
import ContentContactFormClientSide from './ContentContactFormClientSide';

export default function ContentContactForm (
    {
        blockBase,
    }: {
        blockBase: PageBuilderBlockBase;
    },
) {
    const block = blockBase as ContentContactFormType;

    block.content = typography(block.content);

    return <ContentContactFormClientSide block={block} />;
}
