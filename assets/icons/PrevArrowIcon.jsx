import React from 'react';
import { SvgXml } from 'react-native-svg';

const xml = `
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M10 13.78C9.87335 13.78 9.74669 13.7333 9.64669 13.6333L5.30002 9.28668C4.59335 8.58001 4.59335 7.42001 5.30002 6.71335L9.64669 2.36668C9.84002 2.17335 10.16 2.17335 10.3534 2.36668C10.5467 2.56001 10.5467 2.88001 10.3534 3.07335L6.00669 7.42001C5.68669 7.74001 5.68669 8.26001 6.00669 8.58001L10.3534 12.9267C10.5467 13.12 10.5467 13.44 10.3534 13.6333C10.2534 13.7267 10.1267 13.78 10 13.78Z" fill="#292D32"/>
    </svg>

`;

const PrevArrowIcon = () => <SvgXml xml={xml} />;

export default PrevArrowIcon;
