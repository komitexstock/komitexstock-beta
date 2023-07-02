import React from 'react';
import { SvgXml } from 'react-native-svg';

const xml = `
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M7.99998 15.1673C4.04665 15.1673 0.833313 11.954 0.833313 8.00065C0.833313 4.04732 4.04665 0.833984 7.99998 0.833984C11.9533 0.833984 15.1666 4.04732 15.1666 8.00065C15.1666 11.954 11.9533 15.1673 7.99998 15.1673ZM7.99998 1.83398C4.59998 1.83398 1.83331 4.60065 1.83331 8.00065C1.83331 11.4007 4.59998 14.1673 7.99998 14.1673C11.4 14.1673 14.1666 11.4007 14.1666 8.00065C14.1666 4.60065 11.4 1.83398 7.99998 1.83398Z" fill="#222222"/>
        <path d="M8.00008 10.4209C7.12008 10.4209 6.40009 9.70088 6.40009 8.82088V7.17424C6.40009 6.29423 7.12008 5.57422 8.00008 5.57422C8.88008 5.57422 9.60008 6.29423 9.60008 7.17424V8.82088C9.60008 9.70755 8.88008 10.4209 8.00008 10.4209ZM8.00008 6.58089C7.67341 6.58089 7.40009 6.84757 7.40009 7.18091V8.82756C7.40009 9.16089 7.66675 9.42757 8.00008 9.42757C8.33341 9.42757 8.60008 9.16089 8.60008 8.82756V7.18091C8.60008 6.84757 8.32675 6.58089 8.00008 6.58089Z" fill="#222222"/>
        <path d="M8.00002 12.5465C5.88669 12.5465 4.16669 10.8265 4.16669 8.71313V7.28646C4.16669 5.17312 5.88669 3.45312 8.00002 3.45312C9.97335 3.45312 11.6134 4.93315 11.8134 6.89315C11.84 7.16648 11.64 7.41311 11.3667 7.43978C11.0934 7.47311 10.8467 7.26646 10.82 6.99312C10.6734 5.54646 9.46002 4.45312 8.00002 4.45312C6.44002 4.45312 5.16669 5.72646 5.16669 7.28646V8.71313C5.16669 10.2731 6.44002 11.5465 8.00002 11.5465C9.46669 11.5465 10.7067 10.3998 10.8267 8.93978C10.8467 8.66644 11.0867 8.45978 11.3667 8.47978C11.64 8.49978 11.8467 8.73982 11.8267 9.01982C11.6667 10.9998 9.98669 12.5465 8.00002 12.5465Z" fill="#222222"/>
    </svg>
`;

const ThumbPrintIcon = () => <SvgXml xml={xml} />;

export default ThumbPrintIcon;