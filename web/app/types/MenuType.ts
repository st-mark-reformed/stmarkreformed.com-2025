export type MenuItemType = {
    name: string;
    link: string;
    children: MenuItemType[];
};

export type MenuItems = Array<MenuItemType>;
