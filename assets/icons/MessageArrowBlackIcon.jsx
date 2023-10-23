import React from 'react';
import { SvgXml } from 'react-native-svg';

const xml = `
    <svg width="11" height="9" viewBox="0 0 11 9" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path id="Line 417" d="M10.3536 4.85355C10.5488 4.65829 10.5488 4.34171 10.3536 4.14645L7.17157 0.964466C6.97631 0.769204 6.65973 0.769204 6.46447 0.964466C6.2692 1.15973 6.2692 1.47631 6.46447 1.67157L9.29289 4.5L6.46447 7.32843C6.2692 7.52369 6.2692 7.84027 6.46447 8.03553C6.65973 8.2308 6.97631 8.2308 7.17157 8.03553L10.3536 4.85355ZM0 5H10V4H0V5Z" fill="#222222"/>
    </svg>
`;

const MessageArrowBlackIcon = () => <SvgXml xml={xml} />;

export default MessageArrowBlackIcon;
