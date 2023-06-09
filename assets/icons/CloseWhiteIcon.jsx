import React from 'react';
import { SvgXml } from 'react-native-svg';

const xml = `
    <svg width="34" height="34" viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M21.7153 13.2754L13.241 21.7717C12.9515 22.062 12.4713 22.062 12.1817 21.7717C11.8922 21.4815 11.8922 21 12.1817 20.7097L20.656 12.2134C20.9455 11.9231 21.4257 11.9231 21.7153 12.2134C22.0048 12.5037 22.0048 12.9851 21.7153 13.2754Z" fill="#ffffff"/>
        <path d="M21.7153 21.772C21.4257 22.0622 20.9455 22.0622 20.656 21.772L12.1817 13.2756C11.8922 12.9854 11.8922 12.5039 12.1817 12.2136C12.4713 11.9233 12.9515 11.9233 13.241 12.2136L21.7153 20.7099C22.0048 21.0002 22.0048 21.4817 21.7153 21.772Z" fill="#ffffff"/>
    </svg>
`;

const CloseWhiteIcon = () => <SvgXml xml={xml} />;

export default CloseWhiteIcon;
