import React from 'react';
import { SvgXml } from 'react-native-svg';

const xml = `
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g id="vuesax/outline/truck-tick">
        <g id="truck-tick">
        <path id="Vector" d="M8.66659 9.83366H1.33325C1.05992 9.83366 0.833252 9.60699 0.833252 9.33366V5.08032C0.833252 4.86699 0.966579 4.68031 1.15991 4.60697C1.35991 4.53364 1.57992 4.59366 1.71326 4.75366C2.11992 5.24033 2.75326 5.51365 3.37992 5.49365C3.91326 5.48032 4.40657 5.28033 4.77991 4.927C4.95324 4.78033 5.09324 4.60699 5.19991 4.41366C5.40658 4.06032 5.50659 3.67365 5.49992 3.28031C5.48659 2.66698 5.21993 2.10698 4.7666 1.70032C4.6066 1.56032 4.55325 1.34031 4.62659 1.14697C4.69992 0.953639 4.8866 0.820312 5.09326 0.820312H9.99992C10.2733 0.820312 10.4999 1.04698 10.4999 1.32031V7.98698C10.4999 9.01365 9.67992 9.83366 8.66659 9.83366ZM1.83325 8.83366H8.66659C9.12659 8.83366 9.49992 8.46033 9.49992 8.00033V1.83366H6.12659C6.35992 2.26699 6.48659 2.75367 6.49992 3.26034C6.51325 3.84034 6.36658 4.41366 6.07324 4.91366C5.91324 5.20032 5.69325 5.47367 5.45325 5.67367C4.91991 6.18033 4.18658 6.48033 3.40658 6.50033C2.84658 6.52033 2.30659 6.38033 1.83993 6.12699V8.83366H1.83325Z" fill="#027A48"/>
        <path id="Vector_2" d="M12.6666 13.833H11.9999C11.7266 13.833 11.4999 13.6063 11.4999 13.333C11.4999 12.873 11.1266 12.4997 10.6666 12.4997C10.2066 12.4997 9.83325 12.873 9.83325 13.333C9.83325 13.6063 9.60659 13.833 9.33325 13.833H6.66659C6.39325 13.833 6.16659 13.6063 6.16659 13.333C6.16659 12.873 5.79325 12.4997 5.33325 12.4997C4.87325 12.4997 4.49992 12.873 4.49992 13.333C4.49992 13.6063 4.27325 13.833 3.99992 13.833H3.33325C1.95325 13.833 0.833252 12.713 0.833252 11.333V9.33301C0.833252 9.05967 1.05992 8.83301 1.33325 8.83301H8.66659C9.12659 8.83301 9.49992 8.45967 9.49992 7.99967V3.33301C9.49992 3.05967 9.72659 2.83301 9.99992 2.83301H11.2266C11.8866 2.83301 12.4932 3.18635 12.8199 3.75968L13.9599 5.75301C14.0466 5.90634 14.0466 6.09968 13.9599 6.25301C13.8733 6.40634 13.7066 6.49967 13.5266 6.49967H12.6666C12.5733 6.49967 12.4999 6.57301 12.4999 6.66634V8.66634C12.4999 8.75967 12.5733 8.83301 12.6666 8.83301H14.6666C14.9399 8.83301 15.1666 9.05967 15.1666 9.33301V11.333C15.1666 12.713 14.0466 13.833 12.6666 13.833ZM12.4333 12.833H12.6666C13.4933 12.833 14.1666 12.1597 14.1666 11.333V9.83301H12.6666C12.0266 9.83301 11.4999 9.30634 11.4999 8.66634V6.66634C11.4999 6.02634 12.0199 5.49967 12.6666 5.49967L11.9532 4.25301C11.8066 3.99301 11.5266 3.83301 11.2266 3.83301H10.4999V7.99967C10.4999 9.01301 9.67992 9.83301 8.66659 9.83301H1.83325V11.333C1.83325 12.1597 2.50659 12.833 3.33325 12.833H3.56657C3.78657 12.0663 4.49325 11.4997 5.33325 11.4997C6.17325 11.4997 6.87994 12.0663 7.09994 12.833H8.90658C9.12658 12.0663 9.83326 11.4997 10.6733 11.4997C11.5133 11.4997 12.2133 12.0663 12.4333 12.833Z" fill="#027A48"/>
        <path id="Vector_3" d="M5.33333 15.1667C4.32 15.1667 3.5 14.3467 3.5 13.3333C3.5 12.32 4.32 11.5 5.33333 11.5C6.34667 11.5 7.16667 12.32 7.16667 13.3333C7.16667 14.3467 6.34667 15.1667 5.33333 15.1667ZM5.33333 12.5C4.87333 12.5 4.5 12.8733 4.5 13.3333C4.5 13.7933 4.87333 14.1667 5.33333 14.1667C5.79333 14.1667 6.16667 13.7933 6.16667 13.3333C6.16667 12.8733 5.79333 12.5 5.33333 12.5Z" fill="#027A48"/>
        <path id="Vector_4" d="M10.6666 15.1667C9.65325 15.1667 8.83325 14.3467 8.83325 13.3333C8.83325 12.32 9.65325 11.5 10.6666 11.5C11.6799 11.5 12.4999 12.32 12.4999 13.3333C12.4999 14.3467 11.6799 15.1667 10.6666 15.1667ZM10.6666 12.5C10.2066 12.5 9.83325 12.8733 9.83325 13.3333C9.83325 13.7933 10.2066 14.1667 10.6666 14.1667C11.1266 14.1667 11.4999 13.7933 11.4999 13.3333C11.4999 12.8733 11.1266 12.5 10.6666 12.5Z" fill="#027A48"/>
        <path id="Vector_5" d="M14.6667 9.83333H12.6667C12.0267 9.83333 11.5 9.30667 11.5 8.66667V6.66667C11.5 6.02667 12.0267 5.5 12.6667 5.5H13.5267C13.7067 5.5 13.8733 5.59334 13.96 5.75334L15.1 7.75334C15.14 7.82667 15.1667 7.91333 15.1667 8V9.33333C15.1667 9.60667 14.94 9.83333 14.6667 9.83333ZM12.6667 6.5C12.5733 6.5 12.5 6.57333 12.5 6.66667V8.66667C12.5 8.76 12.5733 8.83333 12.6667 8.83333H14.1667V8.13334L13.2333 6.5H12.6667Z" fill="#027A48"/>
        <path id="Vector_6" d="M3.32665 6.50033C2.40665 6.50033 1.53999 6.10031 0.953323 5.40031C0.85999 5.30031 0.760001 5.16031 0.673334 5.02698C0.360001 4.55364 0.186668 3.99365 0.173334 3.40698C0.146668 2.43365 0.560009 1.52031 1.30668 0.900309C1.87334 0.433643 2.55331 0.180326 3.27331 0.166992C4.05998 0.173659 4.84668 0.43366 5.43334 0.960327C6.10001 1.54699 6.48667 2.367 6.50667 3.26034C6.52 3.84034 6.37332 4.41366 6.07999 4.91366C5.91999 5.20032 5.7 5.47367 5.46 5.67367C4.92666 6.18033 4.19332 6.48033 3.41332 6.50033C3.37999 6.50033 3.35332 6.50033 3.32665 6.50033ZM3.32665 1.16699C3.31332 1.16699 3.29999 1.16699 3.28666 1.16699C2.79999 1.17366 2.33331 1.35367 1.93998 1.67367C1.43331 2.09367 1.15333 2.72033 1.16666 3.38033C1.17999 3.78033 1.29333 4.16034 1.50667 4.47367C1.56667 4.56701 1.62665 4.65364 1.69999 4.73364C2.12665 5.24031 2.76 5.50699 3.38 5.49365C3.91333 5.48032 4.40665 5.28034 4.77998 4.927C4.95332 4.78034 5.09332 4.60699 5.19999 4.41366C5.40665 4.06032 5.50666 3.67365 5.49999 3.28031C5.48666 2.66698 5.22001 2.10698 4.76668 1.70032C4.36668 1.36032 3.85999 1.16699 3.32665 1.16699Z" fill="#027A48"/>
        <path id="Vector_7" d="M2.9665 4.50011C2.83984 4.50011 2.71982 4.45343 2.61982 4.3601L1.94648 3.72013C1.74648 3.52679 1.73984 3.21346 1.93318 3.01346C2.12651 2.81346 2.43984 2.80678 2.63984 3.00011L2.9665 3.31343L4.01318 2.30012C4.21318 2.10679 4.52651 2.11343 4.71984 2.31343C4.91317 2.51343 4.90649 2.8268 4.70649 3.02013L3.31314 4.36677C3.21314 4.45344 3.0865 4.50011 2.9665 4.50011Z" fill="#027A48"/>
        </g>
        </g>
    </svg>
`;

const OrderDelivered = () => <SvgXml xml={xml} />;

export default OrderDelivered;