import React from 'react';
import { XMarkIcon } from '@heroicons/react/16/solid';
import { PageBuilderBaseType, PageBuilderBaseTypeArray } from './PageBuilderTypes/PageBuilderBaseType';

export default function PageBuilderItemWrapper (
    {
        block,
        blocks,
        setBlocks,
        children,
        blocksAreCollapsed,
    }: {
        block: PageBuilderBaseType;
        blocks: PageBuilderBaseTypeArray;
        setBlocks: (val: PageBuilderBaseTypeArray) => void;
        children: React.ReactNode;
        blocksAreCollapsed: boolean;
    },
) {
    const removeBlock = () => {
        const blockIndex = blocks.findIndex((b) => b.id === block.id);

        if (blockIndex < 0) {
            return;
        }

        const newBlocks = [...blocks];

        newBlocks.splice(blockIndex, 1);

        setBlocks(newBlocks);
    };

    return (
        <div className="w-full relative z-10">
            <div
                className="absolute right-0 -mt-4"
                style={{
                    top: '50%',
                }}
            >
                <button
                    type="button"
                    className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:bg-gray-200 focus:outline-none border border-gray-200"
                    onClick={removeBlock}
                >
                    <span className="sr-only">Remove block</span>
                    <XMarkIcon className="h-4 w-4" />
                </button>
            </div>
            <div className="rounded-md bg-white shadow border border-gray-200 mr-11 ml-2 my-2 text-left overflow-hidden">
                <div className="bg-orange-700 px-6 py-2.5 sm:px-3.5 sm:before:flex-1">
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
                        {(() => {
                            if (!block.internalName) {
                                return null;
                            }

                            return (
                                <p className="text-sm leading-6 text-gray-100">
                                    name:
                                    {' '}
                                    <span className="font-bold">{block.internalName}</span>
                                </p>
                            );
                        })()}
                        <p className="text-sm leading-6 text-gray-100">
                            type:
                            {' '}
                            <span className="font-bold">{block.typeName}</span>
                        </p>
                    </div>
                </div>
                {(() => {
                    if (blocksAreCollapsed) {
                        return null;
                    }

                    return (
                        <div className="p-4">
                            {children}
                        </div>
                    );
                })()}
            </div>
        </div>
    );
}
