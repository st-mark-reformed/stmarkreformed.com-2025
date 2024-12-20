// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import Toggle from '../../../../../inputs/Toggle';
import RenderOnMount from '../../../../../RenderOnMount';
import BlockChooser from './BlockChooser';
import PageBuilderFactory from './PageBuilderFactory';

export default function PageBuilder (
    {
        blocks,
        setBlocks,
    }: {
        blocks: Array<any>;
        setBlocks: (val: Array<any>) => void;
    },
) {
    const [blocksAreCollapsed, setBlocksAreCollapsed] = useState(false);

    return (
        <RenderOnMount>
            <div style={{
                minHeight: 'calc(100vh - 10rem)',
            }}
            >
                <div className="space-y-6">
                    <Toggle
                        label="Collapse Blocks?"
                        name="collapseBlocks"
                        value={blocksAreCollapsed}
                        setState={setBlocksAreCollapsed}
                    />
                    <ul className="mb-4">
                        <PageBuilderFactory
                            blocks={blocks}
                            setBlocks={setBlocks}
                            blocksAreCollapsed={blocksAreCollapsed}
                        />
                    </ul>
                    <BlockChooser blocks={blocks} setBlocks={setBlocks} />
                </div>
            </div>
        </RenderOnMount>
    );
}
