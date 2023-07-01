import React from 'react';
import { SvgXml } from 'react-native-svg';

const xml = `
    <svg width="20" height="21" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M10 10.5C12.3012 10.5 14.1667 8.63448 14.1667 6.33329C14.1667 4.03211 12.3012 2.16663 10 2.16663C7.69882 2.16663 5.83334 4.03211 5.83334 6.33329C5.83334 8.63448 7.69882 10.5 10 10.5Z" fill="#07427C"/>
        <path d="M9.99999 12.5834C5.82499 12.5834 2.42499 15.3834 2.42499 18.8334C2.42499 19.0667 2.60832 19.25 2.84165 19.25H17.1583C17.3917 19.25 17.575 19.0667 17.575 18.8334C17.575 15.3834 14.175 12.5834 9.99999 12.5834Z" fill="#07427C"/>
    </svg>
`;

const AccountActiveIcon = () => <SvgXml xml={xml} />;

export default AccountActiveIcon;
