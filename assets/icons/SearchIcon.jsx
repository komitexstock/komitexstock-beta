import React from 'react';
import { SvgXml } from 'react-native-svg';

const xml = `
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M7.66665 14.5002C3.89998 14.5002 0.833313 11.4335 0.833313 7.66683C0.833313 3.90016 3.89998 0.833496 7.66665 0.833496C11.4333 0.833496 14.5 3.90016 14.5 7.66683C14.5 11.4335 11.4333 14.5002 7.66665 14.5002ZM7.66665 1.8335C4.44665 1.8335 1.83331 4.4535 1.83331 7.66683C1.83331 10.8802 4.44665 13.5002 7.66665 13.5002C10.8866 13.5002 13.5 10.8802 13.5 7.66683C13.5 4.4535 10.8866 1.8335 7.66665 1.8335Z" fill="#222222"/>
        <path d="M14.6667 15.1666C14.54 15.1666 14.4134 15.12 14.3134 15.02L12.98 13.6866C12.7867 13.4933 12.7867 13.1733 12.98 12.98C13.1734 12.7866 13.4934 12.7866 13.6867 12.98L15.02 14.3133C15.2134 14.5066 15.2134 14.8266 15.02 15.02C14.92 15.12 14.7934 15.1666 14.6667 15.1666Z" fill="#222222"/>
    </svg>
`;

const SearchIcon = () => <SvgXml xml={xml} />;

export default SearchIcon;