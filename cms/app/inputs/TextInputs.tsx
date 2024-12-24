import React from 'react';
import {
    SimpleTreeItemWrapper,
    SortableTree,
    TreeItemComponentProps,
} from 'dnd-kit-sortable-tree';
import { v4 as uuid } from 'uuid';
import { TextInputsType } from './TextInputsType';
import TextInputsItemWrapper from './TextInputsItemWrapper';
import TextInputsValue from './TextInputsValue';

const TreeItemComponent = React.forwardRef<
HTMLDivElement,
TreeItemComponentProps<TextInputsType>
>((props, ref) => {
    const value = props.item as TextInputsType;

    // @ts-expect-error TS2339
    const name = props.name as string;

    // @ts-expect-error TS2339
    const individualLabels = props.individualLabels as string;

    // @ts-expect-error TS2339
    const values = props.values as Array<TextInputsType>;

    // @ts-expect-error TS2339
    const {
        setValues,
    }: {
        setValues: (key: string, val: Array<TextInputsType>) => void;
    } = props;

    const updateValues = (updatedValue: TextInputsType) => {
        // noinspection JSUnusedLocalSymbols
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const valueIndex = values.findIndex((val) => val.id === value.id);

        const newValues = [...values];

        newValues[valueIndex].id = updatedValue.id;
        newValues[valueIndex].value = updatedValue.value;

        setValues(name, newValues);
    };

    const trimmedProps = { ...props };
    // @ts-expect-error TS2339
    delete trimmedProps.name;
    // @ts-expect-error TS2339
    delete trimmedProps.values;
    // @ts-expect-error TS2339
    delete trimmedProps.setValues;

    return (
        <SimpleTreeItemWrapper
            {...trimmedProps}
            ref={ref}
            className="w-full"
        >
            <TextInputsItemWrapper
                value={value}
                values={values}
                setValues={(val: Array<TextInputsType>) => {
                    setValues(name, val);
                }}
            >
                <TextInputsValue
                    value={value}
                    setValue={updateValues}
                    individualLabels={individualLabels}
                />
            </TextInputsItemWrapper>
        </SimpleTreeItemWrapper>
    );
});

export default function TextInputs (
    {
        label,
        name,
        individualLabels,
        values,
        setValues,
    }: {
        label: string;
        name: string;
        individualLabels: string;
        values: Array<TextInputsType>;
        setValues: (key: string, val: Array<TextInputsType>) => void;
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
                    items={values.map((block) => ({
                        ...block,
                        canHaveChildren: false,
                    }))}
                    sortableProps={{
                        animateLayoutChanges: () => false,
                    }}
                    dropAnimation={null}
                    onItemsChanged={(changed) => {
                        const newUrls = [] as Array<TextInputsType>;

                        changed.forEach((item) => {
                            const blockIndex = values.findIndex((block) => block.id === item.id);

                            newUrls.push(values[blockIndex]);
                        });

                        setValues(name, newUrls);
                    }}
                    TreeItemComponent={TreeItemComponent}
                    // @ts-expect-error TS2322
                    name={name}
                    individualLabels={individualLabels}
                    values={values}
                    setValues={setValues}
                    manualDrag
                />
            </ul>
            <div className="mt-2">
                <button
                    type="button"
                    className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                    onClick={() => {
                        const newValue = [...values];

                        newValue.push({
                            id: uuid(),
                            value: '',
                        });

                        setValues(name, newValue);
                    }}
                >
                    Add Value
                </button>
            </div>
        </div>
    );
}
