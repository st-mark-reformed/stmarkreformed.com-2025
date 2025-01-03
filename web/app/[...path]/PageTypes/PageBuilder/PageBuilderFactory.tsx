import React from 'react';
import { PageBaseType } from '../../../types/PageType';
import { PageBuilderBlockBase } from '../../../types/PageBuilder';
import ContentBasicBlock from './ContentBasicBlock/ContentBasicBlock';
import ContentContactForm from './ContentContactForm/ContentContactForm';
import SimpleCta from './SimpleCTA/SimpleCta';
import ImageContentCta from './ImageContentCta/ImageContentCta';

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
            return <ContentBasicBlock key={block.id} blockBase={block} />;
        }

        if (block.type === 'Content_ContactForm') {
            return (
                <ContentContactForm
                    key={block.id}
                    blockBase={block}
                />
            );
        }

        if (block.type === 'CTAs_SimpleCta') {
            return (
                <SimpleCta
                    key={block.id}
                    blockBase={block}
                />
            );
        }

        if (block.type === 'CTAs_ImageContentCta') {
            return (
                <ImageContentCta
                    key={block.id}
                    blockBase={block}
                />
            );
        }

        return <>{block.type}</>;
    });
}
