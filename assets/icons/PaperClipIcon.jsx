import React from 'react';
import { SvgXml } from 'react-native-svg';

const xml = `
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M10.275 17.7831C9.36662 17.7831 8.45828 17.4415 7.76662 16.7498C6.38328 15.3665 6.38328 13.1248 7.76662 11.7415L9.83328 9.68314C10.075 9.44147 10.475 9.44147 10.7166 9.68314C10.9583 9.92481 10.9583 10.3248 10.7166 10.5665L8.64995 12.6248C7.75828 13.5165 7.75828 14.9748 8.64995 15.8665C9.54162 16.7581 11 16.7581 11.8916 15.8665L15.1333 12.6248C16.1166 11.6415 16.6583 10.3331 16.6583 8.94147C16.6583 7.5498 16.1166 6.24147 15.1333 5.25814C13.0999 3.2248 9.79995 3.2248 7.76662 5.25814L4.23328 8.79147C3.40828 9.61647 2.94995 10.7165 2.94995 11.8831C2.94995 13.0498 3.40828 14.1498 4.23328 14.9748C4.47495 15.2165 4.47495 15.6165 4.23328 15.8581C3.99162 16.0998 3.59162 16.0998 3.34995 15.8581C2.29162 14.7915 1.69995 13.3831 1.69995 11.8831C1.69995 10.3831 2.28328 8.96647 3.34995 7.90814L6.88328 4.3748C9.39995 1.85814 13.5 1.85814 16.0166 4.3748C17.2333 5.59147 17.9083 7.21647 17.9083 8.94147C17.9083 10.6665 17.2333 12.2915 16.0166 13.5081L12.775 16.7498C12.0833 17.4415 11.1833 17.7831 10.275 17.7831Z" fill="#07427C"/>
    </svg>
`;

const PaperClipIcon = () => <SvgXml xml={xml} />;

export default PaperClipIcon;