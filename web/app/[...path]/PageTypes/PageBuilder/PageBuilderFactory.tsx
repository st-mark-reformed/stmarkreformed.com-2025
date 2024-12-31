import React from 'react';
import { PageBaseType } from '../../../types/PageType';
import { PageBuilderBlockBase } from '../../../types/PageBuilder';
import ContentBasicBlock from './ContentBasicBlock/ContentBasicBlock';

export default function PageBuilderFactory (
    {
        pageData,
    }: {
        pageData: PageBaseType;
    },
) {
    const blocks = pageData.json as Array<PageBuilderBlockBase>;

    return blocks.map((block) => {
        if (block.isDisabled) {
            return null;
        }

        if (block.type === 'Content_BasicBlock') {
            return <ContentBasicBlock blockBase={block} />;
        }

        if (block.type === 'Content_ContactForm') {
            return 'TODO';
        }

        return <>{block.type}</>;
    });
}
