import React from 'react';
import { SvgXml } from 'react-native-svg';

const xml = `
    <svg width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g id="Group 9">
        <circle id="Ellipse 1" cx="50" cy="50" r="50" fill="#D1FADF"/>
        <path id="Vector 1" d="M31 48.5L42.5 60L69.5 39" stroke="#1DA466" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>
        </g>
    </svg>
`;

const SignupCompleteIcon = () => <SvgXml xml={xml} />;

export default SignupCompleteIcon;
