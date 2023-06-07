import React from 'react';
import { SvgXml } from 'react-native-svg';

const xml = `
    <svg width="20" height="21" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M11.6667 2.93335V9.85835C11.6667 10.7084 10.975 11.4 10.125 11.4H2.49999C2.04166 11.4 1.66666 11.025 1.66666 10.5667V5.24169C1.66666 3.54169 3.04166 2.16669 4.74166 2.16669H10.8917C11.325 2.16669 11.6667 2.50835 11.6667 2.93335Z" fill="#07427C"/>
        <path d="M17.9167 13.4167C18.15 13.4167 18.3333 13.6 18.3333 13.8334V14.6667C18.3333 16.05 17.2167 17.1667 15.8333 17.1667C15.8333 15.7917 14.7083 14.6667 13.3333 14.6667C11.9583 14.6667 10.8333 15.7917 10.8333 17.1667H9.16666C9.16666 15.7917 8.04166 14.6667 6.66666 14.6667C5.29166 14.6667 4.16666 15.7917 4.16666 17.1667C2.78332 17.1667 1.66666 16.05 1.66666 14.6667V13C1.66666 12.5417 2.04166 12.1667 2.49999 12.1667H10.4167C11.5667 12.1667 12.5 11.2334 12.5 10.0834V5.50002C12.5 5.04169 12.875 4.66669 13.3333 4.66669H14.0333C14.6333 4.66669 15.1833 4.99169 15.4833 5.50835L16.0167 6.44169C16.0917 6.57502 15.9917 6.75002 15.8333 6.75002C14.6833 6.75002 13.75 7.68335 13.75 8.83335V11.3334C13.75 12.4834 14.6833 13.4167 15.8333 13.4167H17.9167Z" fill="#07427C"/>
        <path d="M6.66667 18.8333C7.58714 18.8333 8.33333 18.0871 8.33333 17.1667C8.33333 16.2462 7.58714 15.5 6.66667 15.5C5.74619 15.5 5 16.2462 5 17.1667C5 18.0871 5.74619 18.8333 6.66667 18.8333Z" fill="#07427C"/>
        <path d="M13.3333 18.8333C14.2538 18.8333 15 18.0871 15 17.1667C15 16.2462 14.2538 15.5 13.3333 15.5C12.4128 15.5 11.6667 16.2462 11.6667 17.1667C11.6667 18.0871 12.4128 18.8333 13.3333 18.8333Z" fill="#07427C"/>
        <path d="M18.3333 10.9417V12.1667H15.8333C15.375 12.1667 15 11.7917 15 11.3333V8.83333C15 8.375 15.375 8 15.8333 8H16.9083L18.1167 10.1167C18.2583 10.3667 18.3333 10.65 18.3333 10.9417Z" fill="#07427C"/>
    </svg>
`;

const WaybillActiveIcon = () => <SvgXml xml={xml} />;

export default WaybillActiveIcon;
