import React from 'react';
import { SvgXml } from 'react-native-svg';

const xml = `
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g id="Frame 313884" clip-path="url(#clip0_2786_12563)">
        <circle id="Ellipse 173" cx="8" cy="8" r="7.5" fill="#027A48" stroke="white"/>
        <path id="Vector" d="M6.86343 10.7369C6.70335 10.7369 6.55128 10.6728 6.43922 10.5608L4.17409 8.29565C3.94197 8.06353 3.94197 7.67934 4.17409 7.44722C4.4062 7.21511 4.7904 7.21511 5.02251 7.44722L6.86343 9.28814L10.9775 5.17409C11.2096 4.94197 11.5938 4.94197 11.8259 5.17409C12.058 5.4062 12.058 5.79039 11.8259 6.02251L7.28764 10.5608C7.17559 10.6728 7.02351 10.7369 6.86343 10.7369Z" fill="white"/>
        </g>
        <defs>
        <clipPath id="clip0_2786_12563">
        <rect width="16" height="16" fill="white"/>
        </clipPath>
        </defs>
    </svg>
`;

const SelectedOrderIcon = () => <SvgXml xml={xml} />;

export default SelectedOrderIcon;
