import React from 'react';
import { SvgXml } from 'react-native-svg';

const xml = `
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g id="vuesax/outline/arrow-down">
        <g id="arrow-down">
        <path id="Vector" d="M8.00008 14.1666C7.87341 14.1666 7.74675 14.1199 7.64675 14.0199L3.60008 9.97325C3.40674 9.77992 3.40674 9.45992 3.60008 9.26658C3.79341 9.07325 4.11341 9.07325 4.30674 9.26658L8.00008 12.9599L11.6934 9.26658C11.8867 9.07325 12.2067 9.07325 12.4001 9.26658C12.5934 9.45992 12.5934 9.77992 12.4001 9.97325L8.35341 14.0199C8.25341 14.1199 8.12675 14.1666 8.00008 14.1666Z" fill="#222222"/>
        <path id="Vector_2" d="M8 14.0535C7.72667 14.0535 7.5 13.8268 7.5 13.5535V2.3335C7.5 2.06016 7.72667 1.8335 8 1.8335C8.27333 1.8335 8.5 2.06016 8.5 2.3335V13.5535C8.5 13.8268 8.27333 14.0535 8 14.0535Z" fill="#222222"/>
        </g>
        </g>
    </svg>
`;

const WarehouseDirectionArrowIcon = () => <SvgXml xml={xml} />;

export default WarehouseDirectionArrowIcon;
