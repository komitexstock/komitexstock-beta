import React from 'react';
import { SvgXml } from 'react-native-svg';

const xml = `
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g id="vuesax/outline/shop">
        <g id="shop">
        <path id="Vector" d="M9.8 15.1671H6.2C2.90667 15.1671 1.50667 13.7605 1.50667 10.4738V7.48047C1.50667 7.20714 1.73333 6.98047 2.00667 6.98047C2.28 6.98047 2.50667 7.20714 2.50667 7.48047V10.4738C2.50667 13.2005 3.47333 14.1671 6.2 14.1671H9.79333C12.52 14.1671 13.4867 13.2005 13.4867 10.4738V7.48047C13.4867 7.20714 13.7133 6.98047 13.9867 6.98047C14.26 6.98047 14.4867 7.20714 14.4867 7.48047V10.4738C14.4933 13.7605 13.0867 15.1671 9.8 15.1671Z" fill="#222222"/>
        <path id="Vector_2" d="M8.00001 8.49967C7.26667 8.49967 6.60001 8.21301 6.12667 7.68634C5.65334 7.15967 5.43334 6.47301 5.50667 5.73967L5.95334 1.28634C5.98001 1.03301 6.19334 0.833008 6.45334 0.833008H9.56667C9.82667 0.833008 10.04 1.02634 10.0667 1.28634L10.5133 5.73967C10.5867 6.47301 10.3667 7.15967 9.89334 7.68634C9.40001 8.21301 8.73334 8.49967 8.00001 8.49967ZM6.90001 1.83301L6.50001 5.83967C6.45334 6.28634 6.58667 6.70634 6.86667 7.01301C7.43334 7.63967 8.56667 7.63967 9.13334 7.01301C9.41334 6.69967 9.54667 6.27967 9.50001 5.83967L9.10001 1.83301H6.90001Z" fill="#222222"/>
        <path id="Vector_3" d="M12.2067 8.49967C10.8533 8.49967 9.64667 7.40634 9.50667 6.05967L9.04001 1.38634C9.02667 1.24634 9.07334 1.10634 9.16667 0.999674C9.26001 0.893008 9.39334 0.833008 9.54001 0.833008H11.5733C13.5333 0.833008 14.4467 1.65301 14.72 3.66634L14.9067 5.51967C14.9867 6.30634 14.7467 7.05301 14.2333 7.61967C13.72 8.18634 13 8.49967 12.2067 8.49967ZM10.0933 1.83301L10.5067 5.95967C10.5933 6.79301 11.3667 7.49967 12.2067 7.49967C12.7133 7.49967 13.1667 7.30634 13.4933 6.95301C13.8133 6.59967 13.96 6.12634 13.9133 5.61967L13.7267 3.78634C13.52 2.27967 13.0333 1.83301 11.5733 1.83301H10.0933Z" fill="#222222"/>
        <path id="Vector_4" d="M3.76 8.49967C2.96667 8.49967 2.24667 8.18634 1.73333 7.61967C1.22 7.05301 0.979999 6.30634 1.06 5.51967L1.24 3.68634C1.52 1.65301 2.43333 0.833008 4.39333 0.833008H6.42667C6.56667 0.833008 6.7 0.893008 6.8 0.999674C6.9 1.10634 6.94 1.24634 6.92667 1.38634L6.46 6.05967C6.32 7.40634 5.11333 8.49967 3.76 8.49967ZM4.39333 1.83301C2.93333 1.83301 2.44667 2.27301 2.23333 3.79967L2.05333 5.61967C2 6.12634 2.15333 6.59967 2.47333 6.95301C2.79333 7.30634 3.24667 7.49967 3.76 7.49967C4.6 7.49967 5.38 6.79301 5.46 5.95967L5.87333 1.83301H4.39333Z" fill="#222222"/>
        <path id="Vector_5" d="M9.66666 15.1663H6.33333C6.05999 15.1663 5.83333 14.9397 5.83333 14.6663V12.9997C5.83333 11.5997 6.6 10.833 7.99999 10.833C9.39999 10.833 10.1667 11.5997 10.1667 12.9997V14.6663C10.1667 14.9397 9.93999 15.1663 9.66666 15.1663ZM6.83333 14.1663H9.16666V12.9997C9.16666 12.1597 8.83999 11.833 7.99999 11.833C7.15999 11.833 6.83333 12.1597 6.83333 12.9997V14.1663Z" fill="#222222"/>
        </g>
        </g>
    </svg>
`;

const MerchantsIcon = () => <SvgXml xml={xml} />;

export default MerchantsIcon;
