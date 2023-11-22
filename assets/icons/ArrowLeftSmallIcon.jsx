import React from 'react';
import { SvgXml } from 'react-native-svg';

const xml = `
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g id="vuesax/outline/arrow-left">
        <g id="arrow-left">
        <path id="Vector" d="M7.9752 15.6829C7.81686 15.6829 7.65853 15.6246 7.53353 15.4996L2.4752 10.4413C2.23353 10.1996 2.23353 9.79961 2.4752 9.55794L7.53353 4.49961C7.7752 4.25794 8.1752 4.25794 8.41686 4.49961C8.65853 4.74128 8.65853 5.14128 8.41686 5.38294L3.8002 9.99961L8.41686 14.6163C8.65853 14.8579 8.65853 15.2579 8.41686 15.4996C8.3002 15.6246 8.13353 15.6829 7.9752 15.6829Z" fill="#222222"/>
        <path id="Vector_2" d="M17.0831 10.625H3.05811C2.71644 10.625 2.43311 10.3417 2.43311 10C2.43311 9.65833 2.71644 9.375 3.05811 9.375H17.0831C17.4248 9.375 17.7081 9.65833 17.7081 10C17.7081 10.3417 17.4248 10.625 17.0831 10.625Z" fill="#222222"/>
        </g>
        </g>
    </svg>
`;

const ArrowLeftSmallIcon = () => <SvgXml xml={xml} />;

export default ArrowLeftSmallIcon;
