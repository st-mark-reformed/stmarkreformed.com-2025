export type SortableItem = {
    id: string;
    value: string;
    children: SortableItems;
};

export type SortableItems = Array<SortableItem>;
