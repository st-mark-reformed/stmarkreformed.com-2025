import React from 'react';
import {
    SimpleTreeItemWrapper,
    SortableTree,
    TreeItemComponentProps,
} from 'dnd-kit-sortable-tree';
import { v4 as uuid } from 'uuid';
import { UrlFieldType, UrlFieldTypeValues } from './UrlFieldType';
import UrlItemWrapper from './UrlItemWrapper';
import Url from './Url';

const TreeItemComponent = React.forwardRef<
HTMLDivElement,
TreeItemComponentProps<UrlFieldType>
>((props, ref) => {
    const value = props.item as UrlFieldType;

    // @ts-expect-error TS2339
    const name = props.name as string;

    // @ts-expect-error TS2339
    const urls = props.urls as Array<UrlFieldType>;

    // @ts-expect-error TS2339
    const {
        setValue,
    }:{
        setValue: (key: string, val: Array<UrlFieldType>) => void;
    } = props;

    const updateUrls = (updatedUrl: UrlFieldType) => {
        // noinspection JSUnusedLocalSymbols
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const urlIndex = urls.findIndex((url) => url.id === value.id);

        const newUrls = [...urls];

        newUrls[urlIndex] = updatedUrl;

        setValue(name, newUrls);
    };

    const trimmedProps = { ...props };
    // @ts-expect-error TS2339
    delete trimmedProps.name;
    // @ts-expect-error TS2339
    delete trimmedProps.urls;
    // @ts-expect-error TS2339
    delete trimmedProps.setValue;

    return (
        <SimpleTreeItemWrapper
            {...trimmedProps}
            ref={ref}
            className="w-full"
        >
            <UrlItemWrapper
                url={value}
                urls={urls}
                setUrls={(val: Array<UrlFieldType>) => {
                    setValue(name, val);
                }}
            >
                <Url value={value} setValue={updateUrls} />
            </UrlItemWrapper>
        </SimpleTreeItemWrapper>
    );
});

export default function Urls (
    {
        label,
        name,
        value,
        setValue,
    }: {
        label: string;
        name: string;
        value: Array<UrlFieldType>;
        setValue: (key: string, val: Array<UrlFieldType>) => void;
    },
) {
    return (
        <div>
            <label
                htmlFor={name}
                className="block text-sm font-semibold leading-6 text-gray-900"
            >
                {label}
            </label>
            <ul className="mt-2">
                <SortableTree
                    items={value.map((block) => ({
                        ...block,
                        canHaveChildren: false,
                    }))}
                    sortableProps={{
                        animateLayoutChanges: () => false,
                    }}
                    dropAnimation={null}
                    onItemsChanged={(changed) => {
                        const newUrls = [] as Array<UrlFieldType>;

                        changed.forEach((item) => {
                            const blockIndex = value.findIndex((block) => block.id === item.id);

                            newUrls.push(value[blockIndex]);
                        });

                        setValue(name, newUrls);
                    }}
                    TreeItemComponent={TreeItemComponent}
                    // @ts-expect-error TS2322
                    name={name}
                    urls={value}
                    setValue={setValue}
                    manualDrag
                />
            </ul>
            <div className="mt-2">
                <button
                    type="button"
                    className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                    onClick={() => {
                        const newValue = [...value];

                        newValue.push({
                            id: uuid(),
                            type: UrlFieldTypeValues.Custom,
                            linkText: '',
                            linkData: '',
                            newWindow: false,
                        });

                        setValue(name, newValue);
                    }}
                >
                    Add CTA
                </button>
            </div>
        </div>
    );
}
