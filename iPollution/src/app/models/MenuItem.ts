export interface MenuItem {
    title: string;
    icon: string;
    url: string;
    subPages?: MenuItem[];
    open?: boolean;
}
