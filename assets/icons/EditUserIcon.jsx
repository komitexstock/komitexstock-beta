import React from 'react';
import { SvgXml } from 'react-native-svg';

const xml = `
    <svg width="20" height="21" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M9.99998 11.1253C7.35831 11.1253 5.20831 8.97533 5.20831 6.33366C5.20831 3.69199 7.35831 1.54199 9.99998 1.54199C12.6416 1.54199 14.7916 3.69199 14.7916 6.33366C14.7916 8.97533 12.6416 11.1253 9.99998 11.1253ZM9.99998 2.79199C8.04998 2.79199 6.45831 4.38366 6.45831 6.33366C6.45831 8.28366 8.04998 9.87533 9.99998 9.87533C11.95 9.87533 13.5416 8.28366 13.5416 6.33366C13.5416 4.38366 11.95 2.79199 9.99998 2.79199Z" fill="#222222"/>
        <path d="M13.1834 19.4588C12.8667 19.4588 12.5667 19.3421 12.35 19.1254C12.0917 18.8671 11.975 18.4921 12.0334 18.1005L12.1917 16.9755C12.2334 16.6838 12.4084 16.3421 12.6167 16.1255L15.5667 13.1755C16.75 11.9922 17.7917 12.6672 18.3 13.1755C18.7334 13.6088 18.9584 14.0754 18.9584 14.5421C18.9584 15.0171 18.7417 15.4588 18.3 15.9005L15.35 18.8505C15.1417 19.0588 14.7917 19.2338 14.5 19.2755L13.375 19.4338C13.3083 19.4504 13.25 19.4588 13.1834 19.4588ZM16.925 13.7671C16.775 13.7671 16.6417 13.8672 16.45 14.0588L13.5 17.0088C13.475 17.0338 13.4334 17.1171 13.4334 17.1505L13.2834 18.1921L14.325 18.0421C14.3584 18.0338 14.4417 17.9922 14.4667 17.9672L17.4167 15.0171C17.55 14.8838 17.7084 14.6921 17.7084 14.5421C17.7084 14.4171 17.6084 14.2422 17.4167 14.0588C17.2167 13.8588 17.0667 13.7671 16.925 13.7671Z" fill="#222222"/>
        <path d="M17.4334 16.5168C17.3751 16.5168 17.3167 16.5085 17.2667 16.4918C16.1667 16.1835 15.2917 15.3085 14.9834 14.2085C14.8917 13.8751 15.0834 13.5335 15.4167 13.4418C15.7501 13.3502 16.0917 13.5418 16.1834 13.8751C16.3751 14.5585 16.9167 15.1001 17.6001 15.2918C17.9334 15.3835 18.1251 15.7335 18.0334 16.0585C17.9584 16.3335 17.7084 16.5168 17.4334 16.5168Z" fill="#222222"/>
        <path d="M2.8418 19.4583C2.50013 19.4583 2.2168 19.175 2.2168 18.8333C2.2168 15.275 5.70849 12.375 10.0002 12.375C10.9085 12.375 11.8085 12.5084 12.6501 12.7584C12.9835 12.8584 13.1668 13.2083 13.0668 13.5333C12.9668 13.8667 12.6168 14.05 12.2918 13.95C11.5585 13.7333 10.7918 13.6167 10.0002 13.6167C6.40015 13.6167 3.4668 15.95 3.4668 18.825C3.4668 19.175 3.18346 19.4583 2.8418 19.4583Z" fill="#222222"/>
    </svg>
`;

const EditUserIcon = () => <SvgXml xml={xml} />;

export default EditUserIcon;