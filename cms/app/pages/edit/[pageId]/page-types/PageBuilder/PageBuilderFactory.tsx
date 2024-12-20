// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { SimpleTreeItemWrapper, SortableTree, TreeItemComponentProps } from 'dnd-kit-sortable-tree';
import {
    PageBuilderBaseType,
    PageBuilderBaseTypeArray,
    PageBuilderBaseTypeArraySchema,
    PageBuilderType,
} from './PageBuilderTypes/PageBuilderBaseType';
import PageBuilderItemWrapper from './PageBuilderItemWrapper';
import { BasicBlockType, BasicBlockTypeSchema } from './PageBuilderTypes/BasicBlockType';
import BasicBlock from './BlockTypes/BasicBlock';
import { ContactFormType, ContactFormTypeSchema } from './PageBuilderTypes/ContactFormType';
import ContactForm from './BlockTypes/ContactForm';
import { StripePaymentFormType, StripePaymentFormTypeSchema } from './PageBuilderTypes/StripePaymentFormType';
import StripePaymentForm from './BlockTypes/StripePaymentForm';
import { SimpleCtaType, SimpleCtaTypeSchema } from './PageBuilderTypes/SimpleCtaType';
import SimpleCta from './BlockTypes/SimpleCta';
import { ImageContentCtaType, ImageContentCtaTypeSchema } from './PageBuilderTypes/ImageContentCtaType';
import ImageContentCta from './BlockTypes/ImageContentCta';
import { UpcomingEventsType, UpcomingEventsTypeSchema } from './PageBuilderTypes/UpcomingEventsType';
import UpcomingEvents from './BlockTypes/UpcomingEvents';
import { LatestGalleriesType, LatestGalleriesTypeSchema } from './PageBuilderTypes/LatestGalleriesType';
import LatestGalleries from './BlockTypes/LatestGalleries';
import { LatestNewsType, LatestNewsTypeSchema } from './PageBuilderTypes/LatestNewsType';
import LatestNews from './BlockTypes/LatestNews';
import { FeaturedSermonSeriesType, FeaturedSermonSeriesTypeSchema } from './PageBuilderTypes/FeaturedSermonSeriesType';
import FeaturedSermonSeries from './BlockTypes/FeaturedSermonSeries';
import { LeadershipType, LeadershipTypeSchema } from './PageBuilderTypes/LeadershipType';
import Leadership from './BlockTypes/Leadership';

const TreeItemComponent = React.forwardRef<
HTMLDivElement,
TreeItemComponentProps<PageBuilderBaseType>
>((props, ref) => {
    // @ts-expect-error TS2339
    const blocksAreCollapsed = props.blocksAreCollapsed as boolean;

    // @ts-expect-error TS2339
    const blocks = props.blocks as PageBuilderBaseTypeArray;

    // @ts-expect-error TS2339
    const {
        setBlocks,
    }:{
        setBlocks: (val: PageBuilderBaseTypeArray) => void;
    } = props;

    const block = props.item as PageBuilderBaseType;

    const updateBlock = (updatedBlock: PageBuilderBaseType) => {
        const blockIndex = blocks.findIndex((b) => b.id === block.id);

        const newBlocks = [...blocks];

        newBlocks[blockIndex] = updatedBlock;

        setBlocks(newBlocks);
    };

    const trimmedProps = { ...props };
    // @ts-expect-error TS2339
    delete trimmedProps.blocks;
    // @ts-expect-error TS2339
    delete trimmedProps.setBlocks;
    // @ts-expect-error TS2339
    delete trimmedProps.blocksAreCollapsed;

    return (
        <SimpleTreeItemWrapper
            {...trimmedProps}
            ref={ref}
            className="w-full"
        >
            <PageBuilderItemWrapper
                block={block}
                blocks={blocks}
                setBlocks={setBlocks}
                blocksAreCollapsed={blocksAreCollapsed}
            >
                {(() => {
                    if (block.type === PageBuilderType.Content_BasicBlock) {
                        BasicBlockTypeSchema.parse(block);
                        const typedBlock = block as BasicBlockType;

                        return <BasicBlock block={typedBlock} updateBlock={updateBlock} />;
                    }

                    if (block.type === PageBuilderType.Content_ContactForm) {
                        ContactFormTypeSchema.parse(block);
                        const typedBlock = block as ContactFormType;

                        return <ContactForm block={typedBlock} updateBlock={updateBlock} />;
                    }

                    if (block.type === PageBuilderType.Content_StripePaymentForm) {
                        StripePaymentFormTypeSchema.parse(block);
                        const typedBlock = block as StripePaymentFormType;

                        return <StripePaymentForm block={typedBlock} updateBlock={updateBlock} />;
                    }

                    if (block.type === PageBuilderType.CTAs_SimpleCta) {
                        SimpleCtaTypeSchema.parse(block);
                        const typedBlock = block as SimpleCtaType;

                        return <SimpleCta block={typedBlock} updateBlock={updateBlock} />;
                    }

                    if (block.type === PageBuilderType.CTAs_ImageContentCta) {
                        ImageContentCtaTypeSchema.parse(block);
                        const typedBlock = block as ImageContentCtaType;

                        return <ImageContentCta block={typedBlock} updateBlock={updateBlock} />;
                    }

                    if (block.type === PageBuilderType.Features_UpcomingEvents) {
                        UpcomingEventsTypeSchema.parse(block);
                        const typedBlock = block as UpcomingEventsType;

                        return <UpcomingEvents block={typedBlock} updateBlock={updateBlock} />;
                    }

                    if (block.type === PageBuilderType.Features_LatestGalleries) {
                        LatestGalleriesTypeSchema.parse(block);
                        const typedBlock = block as LatestGalleriesType;

                        return <LatestGalleries block={typedBlock} updateBlock={updateBlock} />;
                    }

                    if (block.type === PageBuilderType.Features_LatestNews) {
                        LatestNewsTypeSchema.parse(block);
                        const typedBlock = block as LatestNewsType;

                        return <LatestNews block={typedBlock} updateBlock={updateBlock} />;
                    }

                    if (block.type === PageBuilderType['Pre-defined_FeaturedSermonSeries']) {
                        FeaturedSermonSeriesTypeSchema.parse(block);
                        const typedBlock = block as FeaturedSermonSeriesType;

                        return <FeaturedSermonSeries block={typedBlock} updateBlock={updateBlock} />;
                    }

                    if (block.type === PageBuilderType['Pre-defined_Leadership']) {
                        LeadershipTypeSchema.parse(block);
                        const typedBlock = block as LeadershipType;

                        return <Leadership block={typedBlock} updateBlock={updateBlock} />;
                    }

                    return null;
                })()}
            </PageBuilderItemWrapper>
        </SimpleTreeItemWrapper>
    );
});

export default function PageBuilderFactory (
    {
        blocks,
        setBlocks,
        blocksAreCollapsed,
    }: {
        blocks: PageBuilderBaseTypeArray;
        setBlocks: (val: PageBuilderBaseTypeArray) => void;
        blocksAreCollapsed: boolean;
    },
) {
    PageBuilderBaseTypeArraySchema.parse(blocks);

    blocks = blocks as PageBuilderBaseTypeArray;

    return (
        <SortableTree
            items={blocks.map((block) => ({
                ...block,
                canHaveChildren: false,
            }))}
            sortableProps={{
                animateLayoutChanges: () => false,
            }}
            dropAnimation={null}
            onItemsChanged={(changed) => {
                const newBlocks = [] as PageBuilderBaseTypeArray;

                changed.forEach((item) => {
                    const blockIndex = blocks.findIndex((block) => block.id === item.id);

                    newBlocks.push(blocks[blockIndex]);
                });

                setBlocks(newBlocks);
            }}
            TreeItemComponent={TreeItemComponent}
            // @ts-expect-error TS2322
            blocks={blocks}
            setBlocks={setBlocks}
            blocksAreCollapsed={blocksAreCollapsed}
            manualDrag
        />
    );
}
