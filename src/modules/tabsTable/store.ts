import {create} from "zustand";
import {devtools} from "zustand/middleware";
import {immer} from "zustand/middleware/immer";
import {ITab} from "../../components/types";


export const useItemsStore = create<ITab>()(devtools(immer((set) => ({
    tabs: [],
    selectedTabs: [],
    setTabs: tabs => set({tabs: tabs}),
    clearSelected: () => set(state => ({
        filteredTags: state.filteredTags.filter(tab => {
            let isOk = true;
            state.selectedTabs.some(selTab => {
                if (selTab.id === tab.id) {
                    isOk = false;
                    return true;
                }
                return false;
            })

            if (isOk) {
                return tab;
            }
        })
    })),
    total: '0',
    calcTotal: () => set(state => {
        let sum = 0;
        state.selectedTabs.forEach(tab => sum = sum + parseFloat(tab.value.toString()))
        console.log(sum)
        state.total = sum;
    }),
    selectTab: tab => set(state => ({
        selectedTabs: [...state.selectedTabs, tab]
    })),
    filteredTags: [],
    getFoundTags: name => set(state => (
        {
            filteredTags: state.tabs.filter(tab => {
                let isSelected = false;

                state.selectedTabs.some(selTab => {
                    if (selTab.id === tab.id) {
                        isSelected = true;
                        return true;
                    }
                    return false;
                })

                if (tab.name.includes(name) && !isSelected) {
                    return tab;
                }
            })
        }
    )),
    removeSelected: removingTab => set(state => (
        {
            selectedTabs: state.selectedTabs.filter(tab => {
                if (tab.id !== removingTab.id) {
                    return tab;
                }
            })
        }
    )),
    editingTab: null,
    editTab: (tabId: string) => set(state => (
        {}
    )),
    isLoad: false,
    errors: []
}))))