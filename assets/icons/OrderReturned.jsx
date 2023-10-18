import React from 'react';
import { SvgXml } from 'react-native-svg';

const xml = `
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g id="vuesax/outline/truck-remove">
        <g id="truck-remove">
        <path id="Vector" d="M8.66683 9.83366H1.3335C1.06016 9.83366 0.833496 9.60699 0.833496 9.33366V5.08032C0.833496 4.86699 0.966823 4.68031 1.16016 4.60697C1.36016 4.53364 1.58017 4.59366 1.7135 4.75366C2.1135 5.22699 2.69349 5.49365 3.32682 5.49365C3.34682 5.49365 3.36017 5.49365 3.38017 5.49365C3.9135 5.48032 4.40682 5.28033 4.78015 4.927C4.95349 4.78033 5.09349 4.60699 5.20015 4.41366C5.40682 4.06032 5.50683 3.67365 5.50016 3.28031C5.48683 2.66698 5.22018 2.10698 4.76685 1.70032C4.60685 1.56032 4.5535 1.34031 4.62683 1.14697C4.70016 0.953639 4.88684 0.820312 5.09351 0.820312H10.0002C10.2735 0.820312 10.5002 1.04698 10.5002 1.32031V7.98698C10.5002 9.01365 9.68016 9.83366 8.66683 9.83366ZM1.8335 8.83366H8.66683C9.12683 8.83366 9.50016 8.46033 9.50016 8.00033V1.83366H6.12683C6.36016 2.26699 6.48683 2.75367 6.50016 3.26034C6.5135 3.84034 6.36682 4.41366 6.07349 4.91366C5.91349 5.20032 5.69349 5.47367 5.45349 5.67367C4.92016 6.18033 4.18682 6.48033 3.40682 6.50033C2.85349 6.52033 2.30684 6.38033 1.84017 6.12699V8.83366H1.8335Z" fill="#222222"/>
        <path id="Vector_2" d="M12.6668 13.833H12.0002C11.7268 13.833 11.5002 13.6063 11.5002 13.333C11.5002 12.873 11.1268 12.4997 10.6668 12.4997C10.2068 12.4997 9.8335 12.873 9.8335 13.333C9.8335 13.6063 9.60683 13.833 9.3335 13.833H6.66683C6.3935 13.833 6.16683 13.6063 6.16683 13.333C6.16683 12.873 5.7935 12.4997 5.3335 12.4997C4.8735 12.4997 4.50016 12.873 4.50016 13.333C4.50016 13.6063 4.2735 13.833 4.00016 13.833H3.3335C1.9535 13.833 0.833496 12.713 0.833496 11.333V9.33301C0.833496 9.05967 1.06016 8.83301 1.3335 8.83301H8.66683C9.12683 8.83301 9.50016 8.45967 9.50016 7.99967V3.33301C9.50016 3.05967 9.72683 2.83301 10.0002 2.83301H11.2268C11.8868 2.83301 12.4935 3.18635 12.8202 3.75968L13.9602 5.75301C14.0468 5.90634 14.0468 6.09968 13.9602 6.25301C13.8735 6.40634 13.7068 6.49967 13.5268 6.49967H12.6668C12.5735 6.49967 12.5002 6.57301 12.5002 6.66634V8.66634C12.5002 8.75967 12.5735 8.83301 12.6668 8.83301H14.6668C14.9402 8.83301 15.1668 9.05967 15.1668 9.33301V11.333C15.1668 12.713 14.0468 13.833 12.6668 13.833ZM12.4335 12.833H12.6668C13.4935 12.833 14.1668 12.1597 14.1668 11.333V9.83301H12.6668C12.0268 9.83301 11.5002 9.30634 11.5002 8.66634V6.66634C11.5002 6.02634 12.0202 5.49967 12.6668 5.49967L11.9535 4.25301C11.8068 3.99301 11.5268 3.83301 11.2268 3.83301H10.5002V7.99967C10.5002 9.01301 9.68016 9.83301 8.66683 9.83301H1.8335V11.333C1.8335 12.1597 2.50683 12.833 3.3335 12.833H3.56681C3.78681 12.0663 4.4935 11.4997 5.3335 11.4997C6.1735 11.4997 6.88018 12.0663 7.10018 12.833H8.90682C9.12682 12.0663 9.8335 11.4997 10.6735 11.4997C11.5135 11.4997 12.2135 12.0663 12.4335 12.833Z" fill="#222222"/>
        <path id="Vector_3" d="M5.33333 15.1667C4.32 15.1667 3.5 14.3467 3.5 13.3333C3.5 12.32 4.32 11.5 5.33333 11.5C6.34667 11.5 7.16667 12.32 7.16667 13.3333C7.16667 14.3467 6.34667 15.1667 5.33333 15.1667ZM5.33333 12.5C4.87333 12.5 4.5 12.8733 4.5 13.3333C4.5 13.7933 4.87333 14.1667 5.33333 14.1667C5.79333 14.1667 6.16667 13.7933 6.16667 13.3333C6.16667 12.8733 5.79333 12.5 5.33333 12.5Z" fill="#222222"/>
        <path id="Vector_4" d="M10.6668 15.1667C9.6535 15.1667 8.8335 14.3467 8.8335 13.3333C8.8335 12.32 9.6535 11.5 10.6668 11.5C11.6802 11.5 12.5002 12.32 12.5002 13.3333C12.5002 14.3467 11.6802 15.1667 10.6668 15.1667ZM10.6668 12.5C10.2068 12.5 9.8335 12.8733 9.8335 13.3333C9.8335 13.7933 10.2068 14.1667 10.6668 14.1667C11.1268 14.1667 11.5002 13.7933 11.5002 13.3333C11.5002 12.8733 11.1268 12.5 10.6668 12.5Z" fill="#222222"/>
        <path id="Vector_5" d="M14.6667 9.83333H12.6667C12.0267 9.83333 11.5 9.30667 11.5 8.66667V6.66667C11.5 6.02667 12.0267 5.5 12.6667 5.5H13.5267C13.7067 5.5 13.8733 5.59334 13.96 5.75334L15.1 7.75334C15.14 7.82667 15.1667 7.91333 15.1667 8V9.33333C15.1667 9.60667 14.94 9.83333 14.6667 9.83333ZM12.6667 6.5C12.5733 6.5 12.5 6.57333 12.5 6.66667V8.66667C12.5 8.76 12.5733 8.83333 12.6667 8.83333H14.1667V8.13334L13.2333 6.5H12.6667Z" fill="#222222"/>
        <path id="Vector_6" d="M3.33317 6.50033C2.2265 6.50033 1.18651 5.91366 0.626506 4.96033C0.326506 4.48033 0.166504 3.91366 0.166504 3.33366C0.166504 2.36033 0.599857 1.46031 1.35319 0.860311C1.91319 0.413644 2.61984 0.166992 3.33317 0.166992C5.07984 0.166992 6.49984 1.58699 6.49984 3.33366C6.49984 3.91366 6.33984 4.48033 6.03984 4.967C5.87317 5.247 5.65983 5.50033 5.40649 5.71366C4.85316 6.22033 4.11317 6.50033 3.33317 6.50033ZM3.33317 1.16699C2.83984 1.16699 2.37315 1.33364 1.97982 1.64697C1.46648 2.05364 1.1665 2.67366 1.1665 3.33366C1.1665 3.72699 1.27315 4.11365 1.47982 4.44698C1.86648 5.10031 2.57984 5.50033 3.33317 5.50033C3.85984 5.50033 4.36651 5.30699 4.75317 4.96033C4.92651 4.81366 5.07318 4.64032 5.17985 4.45365C5.39318 4.11365 5.49984 3.72699 5.49984 3.33366C5.49984 2.14033 4.5265 1.16699 3.33317 1.16699Z" fill="#222222"/>
        <path id="Vector_7" d="M4.04661 4.52704C3.91994 4.52704 3.79326 4.48039 3.69326 4.38039L2.2866 2.97374C2.09327 2.7804 2.09327 2.4604 2.2866 2.26707C2.47993 2.07374 2.79993 2.07374 2.99327 2.26707L4.39992 3.67373C4.59326 3.86706 4.59326 4.18706 4.39992 4.38039C4.29992 4.48039 4.17328 4.52704 4.04661 4.52704Z" fill="#222222"/>
        <path id="Vector_8" d="M2.61989 4.54661C2.49323 4.54661 2.36658 4.49992 2.26658 4.39992C2.07325 4.20659 2.07325 3.88659 2.26658 3.69326L3.67324 2.2866C3.86657 2.09327 4.18657 2.09327 4.3799 2.2866C4.57324 2.47993 4.57324 2.79993 4.3799 2.99327L2.97325 4.39992C2.87325 4.49992 2.74656 4.54661 2.61989 4.54661Z" fill="#222222"/>
        </g>
        </g>
    </svg>
`;

const OrderReturned = () => <SvgXml xml={xml} />;

export default OrderReturned;