import React from 'react';
import { SvgXml } from 'react-native-svg';

const xml = `
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M4.12003 15.166C4.05336 15.166 3.98003 15.1593 3.92003 15.1526L2.47336 14.9526C1.78003 14.8593 1.15336 14.2393 1.0467 13.5326L0.846697 12.0726C0.78003 11.606 0.98003 10.9993 1.31336 10.6593L4.24003 7.73263C3.7667 5.8393 4.31336 3.8393 5.7067 2.4593C7.8667 0.305964 11.38 0.299298 13.5467 2.4593C14.5934 3.50596 15.1667 4.8993 15.1667 6.3793C15.1667 7.8593 14.5934 9.25263 13.5467 10.2993C12.1467 11.686 10.1534 12.2326 8.27336 11.7526L5.34003 14.6793C5.06003 14.9726 4.56003 15.166 4.12003 15.166ZM9.62003 1.8393C8.45336 1.8393 7.29336 2.2793 6.4067 3.16596C5.2067 4.3593 4.77336 6.10597 5.27336 7.73263C5.3267 7.91263 5.28003 8.0993 5.1467 8.23263L2.01336 11.366C1.90003 11.4793 1.8067 11.7726 1.8267 11.926L2.0267 13.386C2.0667 13.6393 2.34003 13.926 2.59336 13.9593L4.0467 14.1593C4.2067 14.186 4.50003 14.0926 4.61336 13.9793L7.76003 10.8393C7.89336 10.706 8.0867 10.666 8.26003 10.7193C9.8667 11.226 11.62 10.7926 12.82 9.59263C13.6734 8.7393 14.1467 7.59263 14.1467 6.3793C14.1467 5.1593 13.6734 4.0193 12.82 3.16596C11.9534 2.28596 10.7867 1.8393 9.62003 1.8393Z" fill="#222222"/>
        <path d="M6.12664 13.6938C5.99997 13.6938 5.8733 13.6471 5.7733 13.5471L4.23997 12.0138C4.04664 11.8204 4.04664 11.5004 4.23997 11.3071C4.4333 11.1138 4.7533 11.1138 4.94664 11.3071L6.47997 12.8404C6.6733 13.0338 6.6733 13.3538 6.47997 13.5471C6.37997 13.6471 6.2533 13.6938 6.12664 13.6938Z" fill="#222222"/>
        <path d="M9.66669 7.83398C8.84002 7.83398 8.16669 7.16065 8.16669 6.33398C8.16669 5.50732 8.84002 4.83398 9.66669 4.83398C10.4934 4.83398 11.1667 5.50732 11.1667 6.33398C11.1667 7.16065 10.4934 7.83398 9.66669 7.83398ZM9.66669 5.83398C9.39335 5.83398 9.16669 6.06065 9.16669 6.33398C9.16669 6.60732 9.39335 6.83398 9.66669 6.83398C9.94002 6.83398 10.1667 6.60732 10.1667 6.33398C10.1667 6.06065 9.94002 5.83398 9.66669 5.83398Z" fill="#222222"/>
    </svg>
`;

const KeyIcon = () => <SvgXml xml={xml} />;

export default KeyIcon;