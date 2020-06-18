import React, { useState } from 'react';
import { DropdownButton, Dropdown } from 'react-bootstrap';
import { IntlProvider, FormattedMessage } from 'react-intl';

// import Languages
import English from '../translation/en.json';
import German from '../translation/de.json';


export default function LanguageProvider(props) {
    // state functions 
    const [locale, setLocale] = useState('en');
    const [lang, setLang] = useState(English);


    // change Langauage files
    const changeLang = (getLang) => {
        setLocale(getLang);
        switch (getLang) {
            case 'en':
                setLang(English);
                break;
            case 'de':
                setLang(German);
                break;
            default:
                setLang(English);
        }
    };

    return (
        <IntlProvider locale={locale} messages={lang}>
            <div className="container mr-auto pl-5" >
            <DropdownButton id="dropdown-item-button" variant="success" title="Language">
                        <Dropdown.Item 
                        onClick={() => changeLang('en')} 
                        as="button" title="en">EN</Dropdown.Item>
                        <Dropdown.Item 
                        onClick={() => changeLang('de')} 
                        as="button" title="de">DE</Dropdown.Item>
                    </DropdownButton>
            </div>
            <div>
                {props.children}
            </div>
        </IntlProvider>
    );
}
