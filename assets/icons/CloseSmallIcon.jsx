import React from 'react';
import { SvgXml } from 'react-native-svg';

const xml = `
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g id="vuesax/outline/add">
        <g id="add">
        <path id="Vector" d="M11.8198 7.14356L7.57715 11.3862C7.4322 11.5312 7.19199 11.5309 7.04728 11.3857C6.90258 11.2405 6.90279 10.9999 7.04774 10.855L11.2904 6.61231C11.4353 6.46735 11.6755 6.46756 11.8203 6.61277C11.965 6.75798 11.9648 6.9986 11.8198 7.14356Z" fill="#292D32"/>
        <path id="Vector_2" d="M11.8161 11.3901C11.6712 11.5351 11.4309 11.5348 11.2862 11.3896L7.05096 7.13965C6.90625 6.99444 6.90646 6.75382 7.05142 6.60886C7.19638 6.4639 7.43658 6.46411 7.58129 6.60932L11.8166 10.8593C11.9613 11.0045 11.9611 11.2451 11.8161 11.3901Z" fill="#292D32"/>
        </g>
        </g>
    </svg>
`;

const CloseSmallIcon = () => <SvgXml xml={xml} />;

export default CloseSmallIcon;
