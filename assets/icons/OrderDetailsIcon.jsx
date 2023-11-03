import React from 'react';
import { SvgXml } from 'react-native-svg';

const xml = `
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g id="vuesax/outline/document-text">
        <g id="document-text">
        <path id="Vector" d="M13.3333 18.9582H6.66667C3.625 18.9582 1.875 17.2082 1.875 14.1665V5.83317C1.875 2.7915 3.625 1.0415 6.66667 1.0415H13.3333C16.375 1.0415 18.125 2.7915 18.125 5.83317V14.1665C18.125 17.2082 16.375 18.9582 13.3333 18.9582ZM6.66667 2.2915C4.28333 2.2915 3.125 3.44984 3.125 5.83317V14.1665C3.125 16.5498 4.28333 17.7082 6.66667 17.7082H13.3333C15.7167 17.7082 16.875 16.5498 16.875 14.1665V5.83317C16.875 3.44984 15.7167 2.2915 13.3333 2.2915H6.66667Z" fill="#222222"/>
        <path id="Vector_2" d="M15.4163 7.70833H13.7497C12.483 7.70833 11.458 6.68333 11.458 5.41667V3.75C11.458 3.40833 11.7413 3.125 12.083 3.125C12.4247 3.125 12.708 3.40833 12.708 3.75V5.41667C12.708 5.99167 13.1747 6.45833 13.7497 6.45833H15.4163C15.758 6.45833 16.0413 6.74167 16.0413 7.08333C16.0413 7.425 15.758 7.70833 15.4163 7.70833Z" fill="#222222"/>
        <path id="Vector_3" d="M10.0003 11.4585H6.66699C6.32533 11.4585 6.04199 11.1752 6.04199 10.8335C6.04199 10.4918 6.32533 10.2085 6.66699 10.2085H10.0003C10.342 10.2085 10.6253 10.4918 10.6253 10.8335C10.6253 11.1752 10.342 11.4585 10.0003 11.4585Z" fill="#222222"/>
        <path id="Vector_4" d="M13.3337 14.7915H6.66699C6.32533 14.7915 6.04199 14.5082 6.04199 14.1665C6.04199 13.8248 6.32533 13.5415 6.66699 13.5415H13.3337C13.6753 13.5415 13.9587 13.8248 13.9587 14.1665C13.9587 14.5082 13.6753 14.7915 13.3337 14.7915Z" fill="#222222"/>
        </g>
        </g>
    </svg>
`;

const OrderDetailsIcon = () => <SvgXml xml={xml} />;

export default OrderDetailsIcon;