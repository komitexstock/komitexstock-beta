import React from 'react';
import { SvgXml } from 'react-native-svg';

const xml = `
    <svg width="10" height="11" viewBox="0 0 10 11" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g id="vuesax/outline/arrow-down">
        <g id="arrow-down">
        <path id="Vector" d="M8.59721 5.49963C8.59721 5.57352 8.56999 5.64741 8.51166 5.70574L6.1511 8.0663C6.03832 8.17907 5.85166 8.17907 5.73888 8.0663C5.6261 7.95352 5.6261 7.76685 5.73888 7.65407L7.89332 5.49963L5.73888 3.34518C5.6261 3.23241 5.6261 3.04574 5.73888 2.93296C5.85166 2.82019 6.03832 2.82019 6.1511 2.93296L8.51166 5.29352C8.56999 5.35185 8.59721 5.42574 8.59721 5.49963Z" fill="#222222"/>
        <path id="Vector_2" d="M8.53112 5.49935C8.53112 5.65879 8.3989 5.79102 8.23945 5.79102L1.69445 5.79102C1.53501 5.79102 1.40279 5.65879 1.40279 5.49935C1.40279 5.3399 1.53501 5.20768 1.69445 5.20768L8.23945 5.20768C8.3989 5.20768 8.53112 5.3399 8.53112 5.49935Z" fill="#222222"/>
        </g>
        </g>
    </svg>
`;

const StockTransferDirectionIcon = () => <SvgXml xml={xml} />;

export default StockTransferDirectionIcon;
