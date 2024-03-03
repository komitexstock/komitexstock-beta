import React from 'react';
import { SvgXml } from 'react-native-svg';

const xml = `
    <svg width="33" height="32" viewBox="0 0 33 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M20.1666 15.667H12.8333C12.2866 15.667 11.8333 15.2137 11.8333 14.667C11.8333 14.1203 12.2866 13.667 12.8333 13.667H20.1666C20.7133 13.667 21.1666 14.1203 21.1666 14.667C21.1666 15.2137 20.7133 15.667 20.1666 15.667Z" fill="#222222"/>
        <path d="M16.5 19.3333C15.9533 19.3333 15.5 18.88 15.5 18.3333V11C15.5 10.4533 15.9533 10 16.5 10C17.0467 10 17.5 10.4533 17.5 11V18.3333C17.5 18.88 17.0467 19.3333 16.5 19.3333Z" fill="#222222"/>
        <path d="M16.5 30.347C14.5267 30.347 12.54 29.6003 10.9933 28.1203C7.05999 24.3337 2.71332 18.2937 4.35332 11.107C5.83332 4.58699 11.5267 1.66699 16.5 1.66699C16.5 1.66699 16.5 1.66699 16.5133 1.66699C21.4867 1.66699 27.18 4.58699 28.66 11.1203C30.2867 18.307 25.94 24.3337 22.0067 28.1203C20.46 29.6003 18.4733 30.347 16.5 30.347ZM16.5 3.66699C12.62 3.66699 7.63332 5.73366 6.31332 11.547C4.87332 17.827 8.81999 23.2403 12.3933 26.667C14.7 28.8937 18.3133 28.8937 20.62 26.667C24.18 23.2403 28.1267 17.827 26.7133 11.547C25.38 5.73366 20.38 3.66699 16.5 3.66699Z" fill="#222222"/>
    </svg>
`;

const AddLocationIcon = () => <SvgXml xml={xml} />;

export default AddLocationIcon;
