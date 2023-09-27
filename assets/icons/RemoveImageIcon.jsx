import React from 'react';
import { SvgXml } from 'react-native-svg';

const xml = `
    <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g id="vuesax/outline/add">
        <g id="add">
        <path id="Vector" d="M9.05977 5.5243L5.52424 9.05984C5.40344 9.18064 5.2031 9.18064 5.0823 9.05984C4.9615 8.93904 4.9615 8.73869 5.0823 8.6179L8.61783 5.08236C8.73863 4.96157 8.93898 4.96157 9.05977 5.08236C9.18057 5.20316 9.18057 5.40351 9.05977 5.5243Z" fill="white"/>
        <path id="Vector_2" d="M9.05977 9.06022C8.93898 9.18101 8.73863 9.18101 8.61783 9.06022L5.0823 5.52468C4.9615 5.40388 4.9615 5.20354 5.0823 5.08274C5.2031 4.96194 5.40344 4.96194 5.52424 5.08274L9.05977 8.61827C9.18057 8.73907 9.18057 8.93942 9.05977 9.06022Z" fill="white"/>
        </g>
        </g>
    </svg>
`;

const RemoveImageIcon = () => <SvgXml xml={xml} />;

export default RemoveImageIcon;
