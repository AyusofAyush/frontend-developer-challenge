import React from 'react';
import { FormattedMessage } from 'react-intl';

export default function Translator(id, msg) {
    return <FormattedMessage id={id} defaultMessage={msg} />
}