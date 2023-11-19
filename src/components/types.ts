
export interface ITabItem {
    name: string;
    category: string;
    value: number;
    id: string;
}

export interface ITab {
    selectedTabs: ITabItem[],
    tabs: ITabItem[];
    setTabs: (tabs: ITabItem[]) => void;
    filteredTags: ITabItem[];
    getFoundTags: (name: string) => void;
    clearSelected: () => void;
    selectTab: (tab: ITabItem) => void;
    total: any;
    removeSelected: (tab: ITabItem) => void;
    isLoad: boolean;
    errors: []
}