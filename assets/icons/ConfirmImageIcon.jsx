import React from 'react';
import { SvgXml } from 'react-native-svg';

const xml = `
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M9.72686 17.4737C9.4067 17.4737 9.10255 17.3457 8.87844 17.1216L4.34817 12.5913C3.88394 12.1271 3.88394 11.3587 4.34817 10.8944C4.81241 10.4302 5.58079 10.4302 6.04502 10.8944L9.72686 14.5763L17.955 6.34817C18.4192 5.88394 19.1876 5.88394 19.6518 6.34817C20.1161 6.81241 20.1161 7.58079 19.6518 8.04502L10.5753 17.1216C10.3512 17.3457 10.047 17.4737 9.72686 17.4737Z" fill="white"/>
    </svg>
`;

const ConfirmImageIcon = () => <SvgXml xml={xml} />;

export default ConfirmImageIcon;
