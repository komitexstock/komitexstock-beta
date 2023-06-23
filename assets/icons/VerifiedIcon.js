import React from 'react';
import { SvgXml } from 'react-native-svg';

const xml = `
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M21.56 10.7396L20.2 9.15957C19.94 8.85957 19.73 8.29957 19.73 7.89957V6.19957C19.73 5.13957 18.86 4.26957 17.8 4.26957H16.1C15.71 4.26957 15.14 4.05957 14.84 3.79957L13.26 2.43957C12.57 1.84957 11.44 1.84957 10.74 2.43957L9.17 3.80957C8.87 4.05957 8.3 4.26957 7.91 4.26957H6.18C5.12 4.26957 4.25 5.13957 4.25 6.19957V7.90957C4.25 8.29957 4.04 8.85957 3.79 9.15957L2.44 10.7496C1.86 11.4396 1.86 12.5596 2.44 13.2496L3.79 14.8396C4.04 15.1396 4.25 15.6996 4.25 16.0896V17.7996C4.25 18.8596 5.12 19.7296 6.18 19.7296H7.91C8.3 19.7296 8.87 19.9396 9.17 20.1996L10.75 21.5596C11.44 22.1496 12.57 22.1496 13.27 21.5596L14.85 20.1996C15.15 19.9396 15.71 19.7296 16.11 19.7296H17.81C18.87 19.7296 19.74 18.8596 19.74 17.7996V16.0996C19.74 15.7096 19.95 15.1396 20.21 14.8396L21.57 13.2596C22.15 12.5696 22.15 11.4296 21.56 10.7396ZM16.16 10.1096L11.33 14.9396C11.19 15.0796 11 15.1596 10.8 15.1596C10.6 15.1596 10.41 15.0796 10.27 14.9396L7.85 12.5196C7.56 12.2296 7.56 11.7496 7.85 11.4596C8.14 11.1696 8.62 11.1696 8.91 11.4596L10.8 13.3496L15.1 9.04957C15.39 8.75957 15.87 8.75957 16.16 9.04957C16.45 9.33957 16.45 9.81957 16.16 10.1096Z" fill="#07427C"/>
    </svg>
`;

const VerifiedIcon = () => <SvgXml xml={xml} />;

export default VerifiedIcon;