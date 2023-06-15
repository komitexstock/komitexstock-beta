import React from 'react';
import { SvgXml } from 'react-native-svg';

const xml = `
<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M5.33331 14.8793C5.14665 14.8793 4.9533 14.8326 4.77997 14.7393C4.39997 14.5393 4.16665 14.1393 4.16665 13.7126V12.766C2.15331 12.5593 0.833313 11.0793 0.833313 8.95927V4.95931C0.833313 2.66598 2.37331 1.12598 4.66665 1.12598H11.3333C13.6266 1.12598 15.1666 2.66598 15.1666 4.95931V8.95927C15.1666 11.2526 13.6266 12.7926 11.3333 12.7926H8.81997L5.97996 14.686C5.78663 14.8127 5.55998 14.8793 5.33331 14.8793ZM4.66665 2.1193C2.94665 2.1193 1.83331 3.23264 1.83331 4.95264V8.95268C1.83331 10.6727 2.94665 11.786 4.66665 11.786C4.93998 11.786 5.16665 12.0127 5.16665 12.286V13.706C5.16665 13.7927 5.21998 13.8327 5.25332 13.8527C5.28665 13.8727 5.35332 13.8927 5.42666 13.846L8.39333 11.8727C8.47333 11.8193 8.57332 11.786 8.67332 11.786H11.34C13.06 11.786 14.1733 10.6727 14.1733 8.95268V4.95264C14.1733 3.23264 13.06 2.1193 11.34 2.1193H4.66665Z" fill="#222222"/>
<path d="M7.9999 8.07324C7.72657 8.07324 7.4999 7.84658 7.4999 7.57324V7.43327C7.4999 6.65993 8.06655 6.27993 8.27989 6.13326C8.52655 5.96659 8.60655 5.85327 8.60655 5.67993C8.60655 5.3466 8.33323 5.07324 7.9999 5.07324C7.66656 5.07324 7.39325 5.3466 7.39325 5.67993C7.39325 5.95327 7.16658 6.17993 6.89325 6.17993C6.61992 6.17993 6.39325 5.95327 6.39325 5.67993C6.39325 4.79326 7.11323 4.07324 7.9999 4.07324C8.88656 4.07324 9.60655 4.79326 9.60655 5.67993C9.60655 6.43993 9.04657 6.81992 8.8399 6.95992C8.5799 7.13325 8.4999 7.2466 8.4999 7.43327V7.57324C8.4999 7.85324 8.27323 8.07324 7.9999 8.07324Z" fill="#222222"/>
<path d="M8 9.7334C7.72 9.7334 7.5 9.50673 7.5 9.2334C7.5 8.96007 7.72667 8.7334 8 8.7334C8.27333 8.7334 8.5 8.96007 8.5 9.2334C8.5 9.50673 8.28 9.7334 8 9.7334Z" fill="#222222"/>
</svg>
`;

const HelpIcon = () => <SvgXml xml={xml} />;

export default HelpIcon;
