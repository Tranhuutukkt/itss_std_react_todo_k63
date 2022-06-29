import {useEffect, useState} from "react";
import {addFbItems, deleteFbItems, getFbItems, updateFbItems} from "../lib/firebase";


function useFbStorage() {
    const [items, setItems] = useState([]);

    useEffect(() => {
        getItems();
    }, [items]);

    const getItems = async () => {
        const _items = await getFbItems();
        setItems(_items);
    }

    const addItem = async (item) => {
        const newItem = {...item};
        await addFbItems(newItem);
        setItems([...items, newItem]);
    }

    const updateItem = async (checkedItem) => {
        const change = {done: !checkedItem.done};
        await updateFbItems(change, checkedItem.id);
        const updateItems = items.map(i => {
            if (i.id === checkedItem.id)
                i = {...i, change};
            return i;
        });
        setItems(updateItems);
    }

    const clearItems = () => {
        items.map(i => {
            deleteFbItems(i);
        });
        setItems([]);
    };

    return [items, addItem, updateItem, clearItems];
}

export default useFbStorage;