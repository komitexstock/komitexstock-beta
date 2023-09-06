import React from 'react';
import { SvgXml } from 'react-native-svg';

const xml = `
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g id="Checkbox">
        <rect id="Rectangle 1446" x="0.5" y="0.5" width="15" height="15" rx="3.5" stroke="#828282"/>
        </g>
    </svg>

`;

const CheckBoxUncheckedIcon = () => <SvgXml xml={xml} />;

export default CheckBoxUncheckedIcon;
