import React from 'react';
import { SvgXml } from 'react-native-svg';

const xml = `
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M2.00014 22.7502C1.80014 22.7502 1.61011 22.6702 1.47011 22.5302C1.28011 22.3402 1.20016 22.0602 1.27016 21.8002L2.53017 17.0902C1.69017 15.5302 1.25014 13.7702 1.25014 11.9902C1.25014 6.06023 6.07014 1.24023 12.0001 1.24023C17.9301 1.24023 22.7501 6.06023 22.7501 11.9902C22.7501 17.9202 17.9301 22.7402 12.0001 22.7402C10.1901 22.7402 8.42017 22.2902 6.84017 21.4302L2.20015 22.7202C2.13015 22.7402 2.07014 22.7502 2.00014 22.7502ZM6.94014 19.8802C7.07014 19.8802 7.20015 19.9203 7.32015 19.9803C8.73015 20.8103 10.3501 21.2502 12.0001 21.2502C17.1001 21.2502 21.2501 17.1002 21.2501 12.0002C21.2501 6.90024 17.1001 2.75024 12.0001 2.75024C6.90014 2.75024 2.75014 6.90024 2.75014 12.0002C2.75014 13.6302 3.18013 15.2202 3.99013 16.6202C4.09013 16.7902 4.12015 17.0002 4.07015 17.1902L3.07015 20.9302L6.75014 19.9102C6.81014 19.8902 6.88014 19.8802 6.94014 19.8802Z" fill="#07427C"/>
        <path d="M14.7402 17.7598C14.1202 17.7598 13.4802 17.6198 12.8102 17.3298C12.1802 17.0598 11.5502 16.6998 10.9402 16.2498C10.3402 15.8098 9.75027 15.3098 9.21027 14.7698C8.67027 14.2198 8.17022 13.6398 7.73022 13.0398C7.28022 12.4098 6.92022 11.7898 6.66022 11.1798C6.38022 10.5198 6.24023 9.8698 6.24023 9.2498C6.24023 8.8098 6.32021 8.3898 6.47021 7.9998C6.63021 7.5898 6.89022 7.21979 7.23022 6.89979C7.87022 6.26979 8.79026 6.03981 9.52026 6.38981C9.77026 6.49981 9.98026 6.67981 10.1403 6.91981L11.3002 8.54979C11.4202 8.70979 11.5103 8.87979 11.5803 9.04979C11.6603 9.24979 11.7103 9.44981 11.7103 9.63981C11.7103 9.89981 11.6402 10.1598 11.5002 10.3898C11.4102 10.5398 11.2802 10.7198 11.1102 10.8898L10.9802 11.0298C11.0402 11.1098 11.1102 11.2098 11.2202 11.3298C11.4302 11.5698 11.6602 11.8298 11.9102 12.0798C12.1602 12.3198 12.4102 12.5598 12.6602 12.7698C12.7802 12.8698 12.8803 12.9498 12.9603 12.9998L13.1002 12.8598C13.2802 12.6798 13.4603 12.5398 13.6403 12.4498C13.9703 12.2398 14.4802 12.1898 14.9302 12.3798C15.0902 12.4398 15.2502 12.5298 15.4202 12.6498L17.0903 13.8298C17.3203 13.9898 17.5002 14.2098 17.6202 14.4598C17.7202 14.7098 17.7603 14.9298 17.7603 15.1598C17.7603 15.4598 17.6902 15.7498 17.5602 16.0298C17.4302 16.2898 17.2802 16.5198 17.1002 16.7298C16.7802 17.0798 16.4103 17.3398 16.0103 17.5098C15.6103 17.6798 15.1802 17.7598 14.7402 17.7598ZM8.79022 7.73979C8.73022 7.73979 8.53027 7.73979 8.28027 7.98979C8.09027 8.16979 7.96024 8.35981 7.87024 8.56981C7.78024 8.77981 7.74023 9.01981 7.74023 9.25981C7.74023 9.67981 7.84022 10.1298 8.04022 10.6098C8.25022 11.1098 8.56025 11.6398 8.94025 12.1698C9.33025 12.6998 9.77025 13.2298 10.2603 13.7198C10.7503 14.1998 11.2702 14.6498 11.8102 15.0498C12.3302 15.4298 12.8603 15.7298 13.3903 15.9598C14.1503 16.2898 14.8502 16.3698 15.4202 16.1298C15.6202 16.0498 15.8002 15.9098 15.9802 15.7298C16.0702 15.6298 16.1403 15.5298 16.2003 15.3998C16.2303 15.3298 16.2502 15.2498 16.2502 15.1798C16.2502 15.1598 16.2502 15.1298 16.2202 15.0698L14.5502 13.9098C14.4802 13.8598 14.4102 13.8198 14.3502 13.7998C14.3102 13.8198 14.2503 13.8498 14.1403 13.9598L13.7603 14.3398C13.4703 14.6298 13.0103 14.7098 12.6403 14.5798L12.4603 14.4998C12.2303 14.3798 11.9702 14.1998 11.6802 13.9498C11.4002 13.7098 11.1303 13.4598 10.8403 13.1798C10.5603 12.8898 10.3103 12.6198 10.0703 12.3398C9.81025 12.0298 9.63025 11.7798 9.51025 11.5698L9.40027 11.3098C9.37027 11.2098 9.36023 11.0998 9.36023 10.9998C9.36023 10.7198 9.46027 10.4698 9.65027 10.2698L10.0303 9.8798C10.1403 9.7698 10.1803 9.70981 10.2003 9.66981C10.1703 9.59981 10.1303 9.5398 10.0803 9.4698L8.91022 7.81981L8.79022 7.73979Z" fill="#07427C"/>
    </svg>
`;

const WhatsAppIcon = () => <SvgXml xml={xml} />;

export default WhatsAppIcon;
