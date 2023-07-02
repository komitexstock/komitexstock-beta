import React from 'react';
import { SvgXml } from 'react-native-svg';

const xml = `
    <svg width="20" height="21" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M10.8333 12.7915H1.66667C1.32501 12.7915 1.04167 12.5082 1.04167 12.1665V5.49984C1.04167 3.3165 2.81667 1.5415 5.00001 1.5415H12.5C12.8417 1.5415 13.125 1.82484 13.125 2.1665V10.4998C13.125 11.7665 12.1 12.7915 10.8333 12.7915ZM2.29167 11.5415H10.8333C11.4083 11.5415 11.875 11.0748 11.875 10.4998V2.7915H5.00001C3.50834 2.7915 2.29167 4.00817 2.29167 5.49984V11.5415Z" fill="#B1B2B2"/>
        <path d="M15.8333 17.7915H15C14.6583 17.7915 14.375 17.5082 14.375 17.1665C14.375 16.5915 13.9083 16.1248 13.3333 16.1248C12.7583 16.1248 12.2917 16.5915 12.2917 17.1665C12.2917 17.5082 12.0083 17.7915 11.6667 17.7915H8.33334C7.99167 17.7915 7.70834 17.5082 7.70834 17.1665C7.70834 16.5915 7.24167 16.1248 6.66667 16.1248C6.09167 16.1248 5.625 16.5915 5.625 17.1665C5.625 17.5082 5.34167 17.7915 5.00001 17.7915H4.16667C2.44167 17.7915 1.04167 16.3915 1.04167 14.6665V12.1665C1.04167 11.8248 1.32501 11.5415 1.66667 11.5415H10.8333C11.4083 11.5415 11.875 11.0748 11.875 10.4998V4.6665C11.875 4.32484 12.1583 4.0415 12.5 4.0415H14.0333C14.8583 4.0415 15.6167 4.48318 16.025 5.19985L17.45 7.69151C17.5583 7.88317 17.5583 8.12484 17.45 8.31651C17.3417 8.50817 17.1333 8.62484 16.9083 8.62484H15.8333C15.7167 8.62484 15.625 8.7165 15.625 8.83317V11.3332C15.625 11.4498 15.7167 11.5415 15.8333 11.5415H18.3333C18.675 11.5415 18.9583 11.8248 18.9583 12.1665V14.6665C18.9583 16.3915 17.5583 17.7915 15.8333 17.7915ZM15.5417 16.5415H15.8333C16.8667 16.5415 17.7083 15.6998 17.7083 14.6665V12.7915H15.8333C15.0333 12.7915 14.375 12.1332 14.375 11.3332V8.83317C14.375 8.03317 15.025 7.37484 15.8333 7.37484L14.9417 5.81651C14.7583 5.49151 14.4083 5.2915 14.0333 5.2915H13.125V10.4998C13.125 11.7665 12.1 12.7915 10.8333 12.7915H2.29167V14.6665C2.29167 15.6998 3.13334 16.5415 4.16667 16.5415H4.45834C4.73334 15.5832 5.61667 14.8748 6.66667 14.8748C7.71667 14.8748 8.6 15.5832 8.875 16.5415H11.1333C11.4083 15.5832 12.2917 14.8748 13.3417 14.8748C14.3917 14.8748 15.2667 15.5832 15.5417 16.5415Z" fill="#B1B2B2"/>
        <path d="M6.66667 19.4583C5.4 19.4583 4.375 18.4333 4.375 17.1667C4.375 15.9 5.4 14.875 6.66667 14.875C7.93333 14.875 8.95833 15.9 8.95833 17.1667C8.95833 18.4333 7.93333 19.4583 6.66667 19.4583ZM6.66667 16.125C6.09167 16.125 5.625 16.5917 5.625 17.1667C5.625 17.7417 6.09167 18.2083 6.66667 18.2083C7.24167 18.2083 7.70833 17.7417 7.70833 17.1667C7.70833 16.5917 7.24167 16.125 6.66667 16.125Z" fill="#B1B2B2"/>
        <path d="M13.3333 19.4583C12.0667 19.4583 11.0417 18.4333 11.0417 17.1667C11.0417 15.9 12.0667 14.875 13.3333 14.875C14.6 14.875 15.625 15.9 15.625 17.1667C15.625 18.4333 14.6 19.4583 13.3333 19.4583ZM13.3333 16.125C12.7583 16.125 12.2917 16.5917 12.2917 17.1667C12.2917 17.7417 12.7583 18.2083 13.3333 18.2083C13.9083 18.2083 14.375 17.7417 14.375 17.1667C14.375 16.5917 13.9083 16.125 13.3333 16.125Z" fill="#B1B2B2"/>
        <path d="M18.3333 12.7917H15.8333C15.0333 12.7917 14.375 12.1333 14.375 11.3333V8.83333C14.375 8.03333 15.0333 7.375 15.8333 7.375H16.9083C17.1333 7.375 17.3417 7.49167 17.45 7.69167L18.875 10.1917C18.925 10.2833 18.9583 10.3917 18.9583 10.5V12.1667C18.9583 12.5083 18.675 12.7917 18.3333 12.7917ZM15.8333 8.625C15.7167 8.625 15.625 8.71667 15.625 8.83333V11.3333C15.625 11.45 15.7167 11.5417 15.8333 11.5417H17.7083V10.6667L16.5417 8.625H15.8333Z" fill="#B1B2B2"/>
    </svg>

`;

const WaybillIcon = () => <SvgXml xml={xml} />;

export default WaybillIcon;