import React from 'react';
import { SvgXml } from 'react-native-svg';

const xml = `
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
        <path d="M10.0863 12.7067H4.75293C4.4796 12.7067 4.25293 12.48 4.25293 12.2067C4.25293 11.9334 4.4796 11.7067 4.75293 11.7067H10.0863C11.6463 11.7067 12.9196 10.4334 12.9196 8.87337C12.9196 7.31337 11.6463 6.04004 10.0863 6.04004H2.75293C2.4796 6.04004 2.25293 5.81337 2.25293 5.54004C2.25293 5.26671 2.4796 5.04004 2.75293 5.04004H10.0863C12.1996 5.04004 13.9196 6.76004 13.9196 8.87337C13.9196 10.9867 12.1996 12.7067 10.0863 12.7067Z" fill="#222222"/>
        <path d="M4.28703 7.70659C4.16036 7.70659 4.0337 7.65992 3.9337 7.55992L2.22703 5.85326C2.0337 5.65992 2.0337 5.33992 2.22703 5.14659L3.9337 3.43992C4.12703 3.24659 4.44703 3.24659 4.64036 3.43992C4.8337 3.63326 4.8337 3.95326 4.64036 4.14659L3.28703 5.49992L4.64036 6.85326C4.8337 7.04659 4.8337 7.36659 4.64036 7.55992C4.54703 7.65992 4.4137 7.70659 4.28703 7.70659Z" fill="#222222"/>
    </svg>
`;

const ReplyIcon = () => <SvgXml xml={xml} />;

export default ReplyIcon;
