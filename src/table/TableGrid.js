import React from 'react';
import {useQuery} from "react-query";
import axios from "axios";
import {useItemsStore} from "../modules/tabsTable/store";
import {UnControlled as CodeMirror} from 'react-codemirror2'
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/material.css';


const getTableItems = async (setTabs) => {
    const {data} = await axios.get(
        "https://652f91320b8d8ddac0b2b62b.mockapi.io/autocomplete"
    );
    setTabs(data);
    return data;
}

const TableGrid = () => {
    const {
        removeSelected,
        clearSelected,
        setTabs,
        selectedTabs,
        filteredTags,
        getFoundTags,
        selectTab,
        total,
        calcTotal
    } = useItemsStore();
    const {isLoading, error, data} = useQuery("repoData", () => getTableItems((tabs) => setTabs(tabs)));

    const searchInputRef = React.createRef();

    if (isLoading) {
        return (
            <h3>
                Loading..
            </h3>
        );
    }
    if (error) {
        return (
            <h3>
                Error while fetching data
            </h3>
        );
    }
    if (!data) {
        return (
            <h3>
                No data
            </h3>
        );
    }

    const doKeypress = (name) => {
        getFoundTags(name);
    }

    const tt = () => {
        let tes = [];

        selectedTabs.forEach(selTab =>
            tes.push(
                <span className={'selTab'}>
                        {selTab.name}<span onclick='' class={'x-icon'}>[X]</span>
                    </span>)
        )
    }

    return (
        <div className={'table'}>
            <div className={'table_input'}>
                <div>
                    {selectedTabs.map(selTab => <span className={'selTab'}>
                        {selTab.name}<span onClick={_ => {
                            removeSelected(selTab);
                            getFoundTags(searchInputRef.current.value);
                        calcTotal();

                    }} className={'x-icon'}>[X]</span>
                    </span>)}
                </div>

                {/*<CodeMirror*/}
                {/*    replacedWith={<span className={'x-icon'}>[X]</span>}*/}
                {/*    value={''}*/}
                {/*    options={{*/}
                {/*        mode: 'jsx',*/}
                {/*        theme: 'material',*/}
                {/*        lineNumbers: true*/}
                {/*    }}*/}
                {/*    onFocus={_ => setIsEditing(true)}*/}
                {/*    onChange={(editor, data, value) => {*/}
                {/*        console.log(editor)*/}
                {/*        console.log(data)*/}
                {/*        doKeypress(value)*/}
                {/*    }}*/}
                {/*/>*/}

                <input
                    // value={value}
                    ref={searchInputRef}
                    onChange={e => doKeypress(e.target.value)}
                />

                <div className={'table_auto-items'}>
                    {filteredTags.map(tag =>
                        <div className={'auto-item'} onClick={_ => {
                            selectTab(tag);
                            clearSelected();
                            calcTotal();
                        }}>{tag.name}</div>
                    )}
                </div>

                <b>Total: {total}</b>
            </div>
        </div>
    );
};

export default TableGrid;