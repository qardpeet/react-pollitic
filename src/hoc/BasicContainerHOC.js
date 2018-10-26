import React from 'react';

const BasicCointainerHOC = (ComponentToWrap) => {
    const BasicContainer = props => (
            <div className='container'>
                <div className="pollitic-item">
                    <ComponentToWrap {...props} />
                </div>
            </div>
    );
    
    return BasicContainer;
}

export default BasicCointainerHOC;