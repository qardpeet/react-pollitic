import React from 'react';

const ArrayToList = ({ items, removeItem, itemKey }) => {
    const list = items.map((item, index) => {
        return (
            <li onClick={e => removeItem(e, itemKey)} key={index}>
                {item}
            </li>
        );
    });

    return (
        <React.Fragment>
            <ul className="pollitic-cs-list">{list}</ul>
        </React.Fragment>
    );
};

export default ArrayToList;
