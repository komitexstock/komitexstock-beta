import React from 'react';
import { SvgXml } from 'react-native-svg';

const xml = `
    <svg width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M11.7433 15.1663H4.75668C2.89001 15.1663 1.70335 14.053 1.59668 12.193L1.25001 6.69301C1.19668 5.85967 1.48335 5.05967 2.05668 4.45301C2.62335 3.84634 3.42335 3.49967 4.25001 3.49967C4.46335 3.49967 4.67001 3.37301 4.77001 3.17301L5.25001 2.21967C5.64335 1.43967 6.63001 0.833008 7.49001 0.833008H9.01668C9.87668 0.833008 10.8567 1.43967 11.25 2.21301L11.73 3.18634C11.83 3.37301 12.03 3.49967 12.25 3.49967C13.0767 3.49967 13.8767 3.84634 14.4433 4.45301C15.0167 5.06634 15.3033 5.85967 15.25 6.69301L14.9033 12.1997C14.7833 14.0863 13.63 15.1663 11.7433 15.1663ZM7.49001 1.83301C6.99668 1.83301 6.37001 2.21967 6.14335 2.66634L5.66335 3.62634C5.38335 4.16634 4.84335 4.49967 4.25001 4.49967C3.69001 4.49967 3.17001 4.72634 2.78335 5.13301C2.40335 5.53967 2.21001 6.07301 2.25001 6.62634L2.59668 12.133C2.67668 13.4797 3.40335 14.1663 4.75668 14.1663H11.7433C13.09 14.1663 13.8167 13.4797 13.9033 12.133L14.25 6.62634C14.2833 6.07301 14.0967 5.53967 13.7167 5.13301C13.33 4.72634 12.81 4.49967 12.25 4.49967C11.6567 4.49967 11.1167 4.16634 10.8367 3.63967L10.35 2.66634C10.13 2.22634 9.50335 1.83967 9.01001 1.83967H7.49001V1.83301Z" fill="#222222"/>
        <path d="M9.25 5.83301H7.25C6.97667 5.83301 6.75 5.60634 6.75 5.33301C6.75 5.05967 6.97667 4.83301 7.25 4.83301H9.25C9.52333 4.83301 9.75 5.05967 9.75 5.33301C9.75 5.60634 9.52333 5.83301 9.25 5.83301Z" fill="#222222"/>
        <path d="M8.24998 12.5003C6.77665 12.5003 5.58331 11.307 5.58331 9.83366C5.58331 8.36033 6.77665 7.16699 8.24998 7.16699C9.72331 7.16699 10.9166 8.36033 10.9166 9.83366C10.9166 11.307 9.72331 12.5003 8.24998 12.5003ZM8.24998 8.16699C7.32998 8.16699 6.58331 8.91366 6.58331 9.83366C6.58331 10.7537 7.32998 11.5003 8.24998 11.5003C9.16998 11.5003 9.91665 10.7537 9.91665 9.83366C9.91665 8.91366 9.16998 8.16699 8.24998 8.16699Z" fill="#222222"/>
    </svg>
`;

const CameraBlackIcon = () => <SvgXml xml={xml} />;

export default CameraBlackIcon;

