import React from 'react';

const Footer = () => {
    const textLeft = '© SLASH';
    const textRight = 'დოკუმენტაცია';

    return (
        <React.Fragment>
            <div className="pollitic-footer">
                <div className="row">
                    <div className="col s6 push-m2">
                        <p className="left-align" style={{ fontSize: '14px', color: 'grey' }}>
                            {textLeft}
                        </p>
                    </div>
                    <div className="col s6 pull-m2">
                        <p className="right-align" style={{ fontSize: '14px', color: 'grey' }}>
                            <a
                                href="https://github.com/lukabuz/pollitic"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                {textRight}
                            </a>
                        </p>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
};

export default Footer;
