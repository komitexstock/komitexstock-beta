import React from 'react';
import { SvgXml } from 'react-native-svg';

const xml = `
    <svg width="23" height="24" viewBox="0 0 23 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g id="vuesax/outline/add">
        <g id="add">
        <path id="Vector" d="M14.4958 9.52483L8.83898 15.1817C8.6457 15.375 8.32515 15.375 8.13187 15.1817C7.9386 14.9884 7.9386 14.6678 8.13187 14.4746L13.7887 8.81772C13.982 8.62444 14.3026 8.62444 14.4958 8.81772C14.6891 9.01099 14.6891 9.33155 14.4958 9.52483Z" fill="#222222"/>
        <path id="Vector_2" d="M14.4958 15.1823C14.3026 15.3756 13.982 15.3756 13.7887 15.1823L8.13187 9.52543C7.9386 9.33215 7.9386 9.0116 8.13187 8.81832C8.32515 8.62505 8.6457 8.62505 8.83898 8.81832L14.4958 14.4752C14.6891 14.6685 14.6891 14.989 14.4958 15.1823Z" fill="#222222"/>
        </g>
        </g>
    </svg>
`;

const RemoveDocIcon = () => <SvgXml xml={xml} />;

export default RemoveDocIcon;
