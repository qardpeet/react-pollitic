import React from 'react';

const PaddedContainerHOC = ComponentToWrap => {
    const PaddedContainer = props => (
        <div className="container">
            <div className="pollitic-item padded-white">
                <ComponentToWrap {...props} />
            </div>
        </div>
    );

    return PaddedContainer;
};

export default PaddedContainerHOC;
