import React from 'react';
import { SvgXml } from 'react-native-svg';

const xml = `
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g id="vuesax/outline/truck-fast">
        <g id="truck-fast">
        <path id="Vector" d="M8.66648 9.83301H7.99981C7.72648 9.83301 7.49981 9.60634 7.49981 9.33301C7.49981 9.05967 7.72648 8.83301 7.99981 8.83301H8.66648C9.12648 8.83301 9.49981 8.45967 9.49981 7.99967V1.83301H3.99981C3.21314 1.83301 2.49313 2.25966 2.10646 2.94633C1.97313 3.18633 1.66649 3.27302 1.42649 3.13969C1.18649 3.00636 1.09979 2.69968 1.23313 2.45968C1.79313 1.45968 2.85314 0.833008 3.99981 0.833008H9.99981C10.2731 0.833008 10.4998 1.05967 10.4998 1.33301V7.99967C10.4998 9.01301 9.67981 9.83301 8.66648 9.83301Z" fill="#07427C"/>
        <path id="Vector_2" d="M12.6667 13.833H12C11.7267 13.833 11.5 13.6063 11.5 13.333C11.5 12.873 11.1267 12.4997 10.6667 12.4997C10.2067 12.4997 9.83337 12.873 9.83337 13.333C9.83337 13.6063 9.60671 13.833 9.33337 13.833H6.66671C6.39337 13.833 6.16671 13.6063 6.16671 13.333C6.16671 12.873 5.79337 12.4997 5.33337 12.4997C4.87337 12.4997 4.50004 12.873 4.50004 13.333C4.50004 13.6063 4.27337 13.833 4.00004 13.833H3.33337C1.95337 13.833 0.833374 12.713 0.833374 11.333C0.833374 11.0597 1.06004 10.833 1.33337 10.833C1.60671 10.833 1.83337 11.0597 1.83337 11.333C1.83337 12.1597 2.50671 12.833 3.33337 12.833H3.56669C3.78669 12.0663 4.49337 11.4997 5.33337 11.4997C6.17337 11.4997 6.88006 12.0663 7.10006 12.833H8.9067C9.1267 12.0663 9.83338 11.4997 10.6734 11.4997C11.5134 11.4997 12.22 12.0663 12.44 12.833H12.6667C13.4934 12.833 14.1667 12.1597 14.1667 11.333V9.83301H12.6667C12.0267 9.83301 11.5 9.30634 11.5 8.66634V6.66634C11.5 6.02634 12.02 5.49967 12.6667 5.49967L11.9534 4.25301C11.8067 3.99301 11.5267 3.83301 11.2267 3.83301H10.5V7.99967C10.5 9.01301 9.68004 9.83301 8.66671 9.83301H8.00004C7.72671 9.83301 7.50004 9.60634 7.50004 9.33301C7.50004 9.05967 7.72671 8.83301 8.00004 8.83301H8.66671C9.12671 8.83301 9.50004 8.45967 9.50004 7.99967V3.33301C9.50004 3.05967 9.72671 2.83301 10 2.83301H11.2267C11.8867 2.83301 12.4934 3.18635 12.82 3.75968L13.96 5.75301C14.0467 5.90634 14.0467 6.09968 13.96 6.25301C13.8734 6.40634 13.7067 6.49967 13.5267 6.49967H12.6667C12.5734 6.49967 12.5 6.57301 12.5 6.66634V8.66634C12.5 8.75967 12.5734 8.83301 12.6667 8.83301H14.6667C14.94 8.83301 15.1667 9.05967 15.1667 9.33301V11.333C15.1667 12.713 14.0467 13.833 12.6667 13.833Z" fill="#07427C"/>
        <path id="Vector_3" d="M5.33333 15.1667C4.32 15.1667 3.5 14.3467 3.5 13.3333C3.5 12.32 4.32 11.5 5.33333 11.5C6.34667 11.5 7.16667 12.32 7.16667 13.3333C7.16667 14.3467 6.34667 15.1667 5.33333 15.1667ZM5.33333 12.5C4.87333 12.5 4.5 12.8733 4.5 13.3333C4.5 13.7933 4.87333 14.1667 5.33333 14.1667C5.79333 14.1667 6.16667 13.7933 6.16667 13.3333C6.16667 12.8733 5.79333 12.5 5.33333 12.5Z" fill="#07427C"/>
        <path id="Vector_4" d="M10.6667 15.1667C9.65337 15.1667 8.83337 14.3467 8.83337 13.3333C8.83337 12.32 9.65337 11.5 10.6667 11.5C11.68 11.5 12.5 12.32 12.5 13.3333C12.5 14.3467 11.68 15.1667 10.6667 15.1667ZM10.6667 12.5C10.2067 12.5 9.83337 12.8733 9.83337 13.3333C9.83337 13.7933 10.2067 14.1667 10.6667 14.1667C11.1267 14.1667 11.5 13.7933 11.5 13.3333C11.5 12.8733 11.1267 12.5 10.6667 12.5Z" fill="#07427C"/>
        <path id="Vector_5" d="M14.6667 9.83333H12.6667C12.0267 9.83333 11.5 9.30667 11.5 8.66667V6.66667C11.5 6.02667 12.0267 5.5 12.6667 5.5H13.5267C13.7067 5.5 13.8733 5.59334 13.96 5.75334L15.1 7.75334C15.14 7.82667 15.1667 7.91333 15.1667 8V9.33333C15.1667 9.60667 14.94 9.83333 14.6667 9.83333ZM12.6667 6.5C12.5733 6.5 12.5 6.57333 12.5 6.66667V8.66667C12.5 8.76 12.5733 8.83333 12.6667 8.83333H14.1667V8.13334L13.2333 6.5H12.6667Z" fill="#07427C"/>
        <path id="Vector_6" d="M5.33337 5.83301H1.33337C1.06004 5.83301 0.833374 5.60634 0.833374 5.33301C0.833374 5.05967 1.06004 4.83301 1.33337 4.83301H5.33337C5.60671 4.83301 5.83337 5.05967 5.83337 5.33301C5.83337 5.60634 5.60671 5.83301 5.33337 5.83301Z" fill="#07427C"/>
        <path id="Vector_7" d="M4.00004 7.83301H1.33337C1.06004 7.83301 0.833374 7.60634 0.833374 7.33301C0.833374 7.05967 1.06004 6.83301 1.33337 6.83301H4.00004C4.27337 6.83301 4.50004 7.05967 4.50004 7.33301C4.50004 7.60634 4.27337 7.83301 4.00004 7.83301Z" fill="#07427C"/>
        <path id="Vector_8" d="M2.66671 9.83301H1.33337C1.06004 9.83301 0.833374 9.60634 0.833374 9.33301C0.833374 9.05967 1.06004 8.83301 1.33337 8.83301H2.66671C2.94004 8.83301 3.16671 9.05967 3.16671 9.33301C3.16671 9.60634 2.94004 9.83301 2.66671 9.83301Z" fill="#07427C"/>
        </g>
        </g>
    </svg>
`;

const OrderDispatched = () => <SvgXml xml={xml} />;

export default OrderDispatched;