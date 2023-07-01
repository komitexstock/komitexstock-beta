import React from 'react';
import { SvgXml } from 'react-native-svg';

const xml = `
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M15 22.75H9C3.57 22.75 1.25 20.43 1.25 15V9C1.25 3.57 3.57 1.25 9 1.25H15C20.43 1.25 22.75 3.57 22.75 9V15C22.75 20.43 20.43 22.75 15 22.75ZM9 2.75C4.39 2.75 2.75 4.39 2.75 9V15C2.75 19.61 4.39 21.25 9 21.25H15C19.61 21.25 21.25 19.61 21.25 15V9C21.25 4.39 19.61 2.75 15 2.75H9Z" fill="#07427C"/>
        <path d="M9 10.75C7.48 10.75 6.25 9.52 6.25 8C6.25 6.48 7.48 5.25 9 5.25C10.52 5.25 11.75 6.48 11.75 8C11.75 9.52 10.52 10.75 9 10.75ZM9 6.75C8.31 6.75 7.75 7.31 7.75 8C7.75 8.69 8.31 9.25 9 9.25C9.69 9.25 10.25 8.69 10.25 8C10.25 7.31 9.69 6.75 9 6.75Z" fill="#07427C"/>
        <path d="M2.67002 19.6996C2.43002 19.6996 2.19002 19.5796 2.05002 19.3696C1.82002 19.0296 1.91002 18.5596 2.26002 18.3296L7.19002 15.0196C8.27002 14.2896 9.76002 14.3796 10.74 15.2096L11.07 15.4996C11.57 15.9296 12.42 15.9296 12.91 15.4996L17.07 11.9296C18.13 11.0196 19.8 11.0196 20.87 11.9296L22.5 13.3296C22.81 13.5996 22.85 14.0696 22.58 14.3896C22.31 14.6996 21.84 14.7396 21.52 14.4696L19.89 13.0696C19.39 12.6396 18.54 12.6396 18.04 13.0696L13.88 16.6396C12.82 17.5496 11.15 17.5496 10.08 16.6396L9.75002 16.3496C9.29002 15.9596 8.53002 15.9196 8.02002 16.2696L3.09002 19.5796C2.96002 19.6596 2.81002 19.6996 2.67002 19.6996Z" fill="#07427C"/>
    </svg>
`;

const GalleryIcon = () => <SvgXml xml={xml} />;

export default GalleryIcon;
