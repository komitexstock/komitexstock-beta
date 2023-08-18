import React from 'react';
import { SvgXml } from 'react-native-svg';

const xml = `
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M9.99979 11.0834C9.89146 11.0834 9.78312 11.0584 9.68312 11.0001L2.3248 6.74175C2.0248 6.56675 1.92478 6.18339 2.09978 5.88339C2.27478 5.58339 2.64978 5.48337 2.95811 5.65837L9.99979 9.73339L16.9998 5.6834C17.2998 5.5084 17.6831 5.61675 17.8581 5.90841C18.0331 6.20841 17.9248 6.59172 17.6331 6.76672L10.3248 11.0001C10.2165 11.0501 10.1081 11.0834 9.99979 11.0834Z" fill="#222222"/>
        <path d="M10 18.6335C9.65833 18.6335 9.375 18.3502 9.375 18.0085V10.4502C9.375 10.1085 9.65833 9.8252 10 9.8252C10.3417 9.8252 10.625 10.1085 10.625 10.4502V18.0085C10.625 18.3502 10.3417 18.6335 10 18.6335Z" fill="#222222"/>
        <path d="M10.0001 18.9582C9.26673 18.9582 8.53339 18.7999 7.96672 18.4749L3.51673 16.0082C2.3084 15.3416 1.3584 13.7332 1.3584 12.3499V7.63318C1.3584 6.24985 2.3084 4.64989 3.51673 3.97489L7.96672 1.5082C9.10006 0.87487 10.8834 0.87487 12.0251 1.5082L16.475 3.97489C17.6834 4.64155 18.6334 6.24985 18.6334 7.63318V12.3499C18.6334 12.4082 18.6334 12.4915 18.6084 12.5999C18.5584 12.8165 18.4 12.9915 18.1917 13.0582C17.9834 13.1249 17.7501 13.0832 17.5834 12.9332C16.6334 12.0999 15.1501 12.0665 14.1334 12.8749C13.4917 13.3832 13.1167 14.1582 13.1167 14.9832C13.1167 15.4749 13.2501 15.9582 13.5084 16.3749C13.5751 16.4916 13.6417 16.5832 13.7167 16.6665C13.8417 16.8082 13.8917 16.9999 13.8584 17.1832C13.8251 17.3665 13.7084 17.5332 13.5417 17.6166L12.0167 18.4582C11.4584 18.7999 10.7334 18.9582 10.0001 18.9582ZM10.0001 2.29154C9.48339 2.29154 8.95838 2.39988 8.58338 2.60821L4.13339 5.07489C3.32505 5.52489 2.62506 6.71652 2.62506 7.63318V12.3499C2.62506 13.2665 3.33339 14.4665 4.13339 14.9082L8.58338 17.3749C9.34172 17.7999 10.6667 17.7999 11.4251 17.3749L12.3584 16.8582C12.05 16.2999 11.8834 15.6499 11.8834 14.9832C11.8834 13.7665 12.4251 12.6416 13.3667 11.8916C14.5084 10.9832 16.1251 10.7915 17.3917 11.3415V7.62489C17.3917 6.70823 16.6834 5.50822 15.8834 5.06655L11.4334 2.59987C11.0417 2.39987 10.5167 2.29154 10.0001 2.29154Z" fill="#222222"/>
        <path d="M15.8333 18.9582C13.65 18.9582 11.875 17.1832 11.875 14.9998C11.875 13.7832 12.4167 12.6582 13.3583 11.9082C14.0583 11.3498 14.9417 11.0415 15.8333 11.0415C18.0167 11.0415 19.7917 12.8165 19.7917 14.9998C19.7917 16.1332 19.3 17.2165 18.4417 17.9665C17.7167 18.6082 16.7917 18.9582 15.8333 18.9582ZM15.8333 12.2915C15.2167 12.2915 14.6333 12.4998 14.1417 12.8915C13.5 13.3998 13.125 14.1748 13.125 14.9998C13.125 16.4915 14.3417 17.7082 15.8333 17.7082C16.4833 17.7082 17.1167 17.4665 17.625 17.0332C18.2083 16.5165 18.5417 15.7832 18.5417 14.9998C18.5417 13.5082 17.325 12.2915 15.8333 12.2915Z" fill="#222222"/>
        <path d="M14.9996 16.4585C14.7913 16.4585 14.5829 16.3502 14.4662 16.1585C14.2912 15.8585 14.3829 15.4752 14.6829 15.3002L15.4246 14.8585V13.9585C15.4246 13.6168 15.7079 13.3335 16.0496 13.3335C16.3913 13.3335 16.6746 13.6168 16.6746 13.9585V15.2085C16.6746 15.4252 16.5579 15.6335 16.3746 15.7418L15.3329 16.3668C15.2162 16.4335 15.1079 16.4585 14.9996 16.4585Z" fill="#222222"/>
    </svg>
`;

const OrderRescheduled = () => <SvgXml xml={xml} />;

export default OrderRescheduled;