'use client';

import React, { useState } from 'react';
import {
    SimpleTreeItemWrapper,
    SortableTree,
    TreeItemComponentProps,
} from 'dnd-kit-sortable-tree';
import { CheckIcon } from '@heroicons/react/20/solid';
import PatchPagesOrder from './PatchPagesOrder';
import { SortableItem, SortableItems } from './SortableItem';
import { PageTypeFrontEndNoData, PageTypeFrontEndNoDataArray } from '../PageType';
import RenderOnMount from '../../RenderOnMount';
import PageHeader from '../../layout/PageHeader';
import Message from '../../messaging/Message';

function processPage (page: PageTypeFrontEndNoData): SortableItem {
    return {
        id: page.id,
        value: page.name,
        children: page.children.map((childPage) => processPage(childPage)),
    };
}

const TreeItemComponent = React.forwardRef<
HTMLDivElement,
TreeItemComponentProps<SortableItem>
>((props, ref) => (
    /* you could also use FolderTreeItemWrapper if you want to show vertical lines.  */
    <SimpleTreeItemWrapper {...props} ref={ref} className="w-full">
        <div>{props.item.value}</div>
    </SimpleTreeItemWrapper>
));

export default function Reorder (
    {
        pages,
        children,
    }: {
        pages: PageTypeFrontEndNoDataArray;
        children: React.ReactNode;
    },
) {
    const [items, setItems] = useState<SortableItems>(
        pages.map((page) => processPage(page)),
    );

    const [success, setSuccess] = useState(false);

    const [errorIsVisible, setErrorIsVisible] = useState(false);

    const [errors, setErrors] = useState<Array<string>>([]);

    const renderCustomButton = () => (
        <button
            type="button"
            className="ml-3 inline-flex items-center rounded-md bg-cyan-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-cyan-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-crimson"
            onClick={() => {
                PatchPagesOrder(items).then((result) => {
                    if (result.data.success) {
                        setSuccess(true);

                        setErrorIsVisible(false);

                        setErrors([]);

                        return;
                    }

                    setSuccess(false);

                    setErrors(result.data.messages);

                    setErrorIsVisible(true);
                });
            }}
        >
            <CheckIcon className="h-5 w-5 mr-1" />
            {' '}
            Save Order
        </button>
    );

    return (
        <RenderOnMount>
            <div className="mb-4 ">
                <PageHeader
                    title="Reorder Site Pages"
                    secondaryLink={{
                        content: '« Return to Pages',
                        href: '/pages',
                    }}
                    RenderCustomButton={renderCustomButton}
                />
            </div>
            {children}
            <Message
                type="success"
                isVisible={success}
                setIsVisible={setSuccess}
                heading="Success!"
                body={['Pages have been reordered']}
            />
            <Message
                type="error"
                isVisible={errorIsVisible}
                setIsVisible={setErrorIsVisible}
                heading="Something went wrong"
                body={errors}
            />
            <ul className="mt-4">
                <SortableTree
                    items={items}
                    sortableProps={{
                        animateLayoutChanges: () => false,
                    }}
                    dropAnimation={null}
                    onItemsChanged={setItems}
                    TreeItemComponent={TreeItemComponent}
                />
            </ul>
        </RenderOnMount>
    );
}
