import React from 'react';
import BasicContainerHOC from '../hoc/BasicContainerHOC';
import illustration1 from '../assets/img/woman_laptop.png';
import illustration2 from '../assets/img/space_man.png';
import illustration3 from '../assets/img/man_stat.png';

const AboutUs = () => {
    const title = 'რატომ POLLITIC?';

    return (
        <div className="row">
            <h1 style={{ marginBottom: '50px' }} className="center">
                {title}
            </h1>
            <div className="col l4 m12 s12 pollitic-bullet">
                <img src={illustration1} alt="სურათი" />
                <h2>სანდო</h2>
                <p>
                    მობილური ვერიფიკაციის სისტემის საშუალებით ნებისმიერი გამოკითხვის შემქმნელს
                    შესაძლებლობა ექნება დაამტკიცოს თითოეული მონაწილის უნიკალურობა.
                </p>
            </div>
            <div className="col l4 m12 s12 pollitic-bullet">
                <img src={illustration2} alt="სურათი" />
                <h2>ანონიმური</h2>
                <p>
                    ჩვენ არ ვინახავთ მომხმარებლების ტელეფონის ნომრებს ან ნებისმიერ სხვა ინფორმაციას
                    რომლითაც მათი იდენტიფიქაცია შეიძლება.
                </p>
            </div>
            <div className="col l4 m12 s12 pollitic-bullet">
                <img src={illustration3} alt="სურათი" />
                <h2>გამჭვირვალე</h2>
                <p>
                    სისტემის კოდი არის საჯაროდ გამოქვეყნებული Github-ზე. ეს ნიშნავს, რომ თქვენ
                    შეგიძლიათ ნახოთ თუ როგორ მუშაობს ჩვენი პლატფორმა და დარწმუნდეთ მის დაცულობაში.
                </p>
                <p style={{ margin: '0px' }}>
                    <a
                        href="https://github.com/lukabuz/pollitic"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Pollitic API
                    </a>
                </p>
                <p style={{ margin: '0px' }}>
                    <a
                        href="https://github.com/qardpeet/react-pollitic"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Pollitic React Application
                    </a>
                </p>
            </div>
        </div>
    );
};

export default BasicContainerHOC(AboutUs);
