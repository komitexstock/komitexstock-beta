import React from 'react';
import { SvgXml } from 'react-native-svg';

const xml = `
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M9.99998 15.1663H5.99998C2.37998 15.1663 0.833313 13.6197 0.833313 9.99967V5.99967C0.833313 2.37967 2.37998 0.833008 5.99998 0.833008H9.33331C9.60665 0.833008 9.83331 1.05967 9.83331 1.33301C9.83331 1.60634 9.60665 1.83301 9.33331 1.83301H5.99998C2.92665 1.83301 1.83331 2.92634 1.83331 5.99967V9.99967C1.83331 13.073 2.92665 14.1663 5.99998 14.1663H9.99998C13.0733 14.1663 14.1666 13.073 14.1666 9.99967V6.66634C14.1666 6.39301 14.3933 6.16634 14.6666 6.16634C14.94 6.16634 15.1666 6.39301 15.1666 6.66634V9.99967C15.1666 13.6197 13.62 15.1663 9.99998 15.1663Z" fill="#222222"/>
        <path d="M14.6666 7.16633H12C9.71998 7.16633 8.83331 6.27967 8.83331 3.99967V1.333C8.83331 1.133 8.95331 0.946334 9.13998 0.873C9.32665 0.793 9.53998 0.839667 9.68665 0.979667L15.02 6.313C15.16 6.453 15.2066 6.673 15.1266 6.85967C15.0466 7.04633 14.8666 7.16633 14.6666 7.16633ZM9.83331 2.53967V3.99967C9.83331 5.71967 10.28 6.16633 12 6.16633H13.46L9.83331 2.53967Z" fill="#222222"/>
        <path d="M8.66669 9.16699H4.66669C4.39335 9.16699 4.16669 8.94033 4.16669 8.66699C4.16669 8.39366 4.39335 8.16699 4.66669 8.16699H8.66669C8.94002 8.16699 9.16669 8.39366 9.16669 8.66699C9.16669 8.94033 8.94002 9.16699 8.66669 9.16699Z" fill="#222222"/>
        <path d="M7.33335 11.833H4.66669C4.39335 11.833 4.16669 11.6063 4.16669 11.333C4.16669 11.0597 4.39335 10.833 4.66669 10.833H7.33335C7.60669 10.833 7.83335 11.0597 7.83335 11.333C7.83335 11.6063 7.60669 11.833 7.33335 11.833Z" fill="#222222"/>
    </svg>
`;

const BusinessReportIcon = () => <SvgXml xml={xml} />;

export default BusinessReportIcon;
