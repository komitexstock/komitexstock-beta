import React from 'react';
import { SvgXml } from 'react-native-svg';

const xml = `
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M5.99998 13.78C6.12665 13.78 6.25331 13.7333 6.35331 13.6333L10.7 9.28668C11.4066 8.58001 11.4066 7.42001 10.7 6.71335L6.35331 2.36668C6.15998 2.17335 5.83998 2.17335 5.64665 2.36668C5.45331 2.56001 5.45331 2.88001 5.64665 3.07335L9.99331 7.42001C10.3133 7.74001 10.3133 8.26001 9.99331 8.58001L5.64665 12.9267C5.45331 13.12 5.45331 13.44 5.64665 13.6333C5.74665 13.7267 5.87331 13.78 5.99998 13.78Z" fill="#292D32"/>
    </svg>
`;

const NextArrowIcon = () => <SvgXml xml={xml} />;

export default NextArrowIcon;
