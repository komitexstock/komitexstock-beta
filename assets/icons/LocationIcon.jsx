import React from 'react';
import { SvgXml } from 'react-native-svg';

const xml = `
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M7.99998 9.4463C6.57998 9.4463 5.41998 8.29297 5.41998 6.8663C5.41998 5.43964 6.57998 4.29297 7.99998 4.29297C9.41998 4.29297 10.58 5.4463 10.58 6.87297C10.58 8.29964 9.41998 9.4463 7.99998 9.4463ZM7.99998 5.29297C7.13332 5.29297 6.41998 5.99964 6.41998 6.87297C6.41998 7.7463 7.12665 8.45297 7.99998 8.45297C8.87332 8.45297 9.57998 7.7463 9.57998 6.87297C9.57998 5.99964 8.86665 5.29297 7.99998 5.29297Z" fill="#222222"/>
        <path d="M8 15.173C7.01333 15.173 6.01999 14.7997 5.24666 14.0597C3.28 12.1663 1.10666 9.14634 1.92666 5.55301C2.66666 2.29301 5.51333 0.833008 8 0.833008C8 0.833008 8 0.833008 8.00666 0.833008C10.4933 0.833008 13.34 2.29301 14.08 5.55967C14.8933 9.15301 12.72 12.1663 10.7533 14.0597C9.97999 14.7997 8.98666 15.173 8 15.173ZM8 1.83301C6.06 1.83301 3.56666 2.86634 2.90666 5.77301C2.18666 8.91301 4.16 11.6197 5.94666 13.333C7.1 14.4463 8.90666 14.4463 10.06 13.333C11.84 11.6197 13.8133 8.91301 13.1067 5.77301C12.44 2.86634 9.93999 1.83301 8 1.83301Z" fill="#222222"/>
    </svg>
`;

const LocationIcon = () => <SvgXml xml={xml} />;

export default LocationIcon;