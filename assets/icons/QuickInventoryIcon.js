import React from 'react';
import { SvgXml } from 'react-native-svg';

const xml = `
<svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12.75 19.4584H8.25C4.13333 19.4584 2.38333 17.7001 2.38333 13.5918V9.8501C2.38333 9.50843 2.66666 9.2251 3.00833 9.2251C3.35 9.2251 3.63333 9.50843 3.63333 9.8501V13.5918C3.63333 17.0001 4.84166 18.2084 8.25 18.2084H12.7417C16.15 18.2084 17.3583 17.0001 17.3583 13.5918V9.8501C17.3583 9.50843 17.6417 9.2251 17.9833 9.2251C18.325 9.2251 18.6083 9.50843 18.6083 9.8501V13.5918C18.6167 17.7001 16.8583 19.4584 12.75 19.4584Z" fill="#222222"/>
    <path d="M10.5 11.1248C9.58334 11.1248 8.75001 10.7665 8.15834 10.1082C7.56668 9.44984 7.29168 8.5915 7.38334 7.67484L7.94168 2.10817C7.97501 1.7915 8.24168 1.5415 8.56668 1.5415H12.4583C12.7833 1.5415 13.05 1.78317 13.0833 2.10817L13.6417 7.67484C13.7333 8.5915 13.4583 9.44984 12.8667 10.1082C12.25 10.7665 11.4167 11.1248 10.5 11.1248ZM9.12501 2.7915L8.62501 7.79984C8.56668 8.35817 8.73334 8.88317 9.08334 9.2665C9.79168 10.0498 11.2083 10.0498 11.9167 9.2665C12.2667 8.87484 12.4333 8.34984 12.375 7.79984L11.875 2.7915H9.12501Z" fill="#222222"/>
    <path d="M15.7583 11.1248C14.0667 11.1248 12.5583 9.75817 12.3833 8.07484L11.8 2.23317C11.7833 2.05817 11.8417 1.88317 11.9583 1.74984C12.075 1.6165 12.2417 1.5415 12.425 1.5415H14.9667C17.4167 1.5415 18.5583 2.5665 18.9 5.08317L19.1333 7.39984C19.2333 8.38317 18.9333 9.3165 18.2917 10.0248C17.65 10.7332 16.75 11.1248 15.7583 11.1248ZM13.1167 2.7915L13.6333 7.94984C13.7417 8.9915 14.7083 9.87484 15.7583 9.87484C16.3917 9.87484 16.9583 9.63317 17.3667 9.1915C17.7667 8.74984 17.95 8.15817 17.8917 7.52484L17.6583 5.23317C17.4 3.34984 16.7917 2.7915 14.9667 2.7915H13.1167Z" fill="#222222"/>
    <path d="M5.19999 11.1248C4.20832 11.1248 3.30832 10.7332 2.66665 10.0248C2.02499 9.3165 1.72499 8.38317 1.82499 7.39984L2.04999 5.10817C2.39999 2.5665 3.54165 1.5415 5.99165 1.5415H8.53332C8.70832 1.5415 8.87499 1.6165 8.99999 1.74984C9.12499 1.88317 9.17499 2.05817 9.15832 2.23317L8.57499 8.07484C8.39999 9.75817 6.89165 11.1248 5.19999 11.1248ZM5.99165 2.7915C4.16665 2.7915 3.55832 3.3415 3.29165 5.24984L3.06665 7.52484C2.99999 8.15817 3.19165 8.74984 3.59165 9.1915C3.99165 9.63317 4.55832 9.87484 5.19999 9.87484C6.24999 9.87484 7.22499 8.9915 7.32499 7.94984L7.84165 2.7915H5.99165Z" fill="#222222"/>
    <path d="M12.5833 19.4582H8.41666C8.07499 19.4582 7.79166 19.1748 7.79166 18.8332V16.7498C7.79166 14.9998 8.74999 14.0415 10.5 14.0415C12.25 14.0415 13.2083 14.9998 13.2083 16.7498V18.8332C13.2083 19.1748 12.925 19.4582 12.5833 19.4582ZM9.04166 18.2082H11.9583V16.7498C11.9583 15.6998 11.55 15.2915 10.5 15.2915C9.44999 15.2915 9.04166 15.6998 9.04166 16.7498V18.2082Z" fill="#222222"/>
</svg>
`;

const QuickInventoryIcon = () => <SvgXml xml={xml} />;

export default QuickInventoryIcon;
