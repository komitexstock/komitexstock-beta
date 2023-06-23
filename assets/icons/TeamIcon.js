import React from 'react';
import { SvgXml } from 'react-native-svg';

const xml = `
<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M11.9999 5.27318C11.9799 5.27318 11.9665 5.27318 11.9465 5.27318H11.9132C10.6532 5.23318 9.7132 4.25985 9.7132 3.05984C9.7132 1.83318 10.7132 0.839844 11.9332 0.839844C13.1532 0.839844 14.1532 1.83984 14.1532 3.05984C14.1465 4.26651 13.2065 5.23985 12.0065 5.27985C12.0065 5.27318 12.0065 5.27318 11.9999 5.27318ZM11.9332 1.83318C11.2599 1.83318 10.7132 2.37985 10.7132 3.05318C10.7132 3.71318 11.2265 4.24652 11.8865 4.27318C11.8932 4.26652 11.9465 4.26652 12.0065 4.27318C12.6532 4.23985 13.1532 3.70652 13.1599 3.05318C13.1599 2.37985 12.6132 1.83318 11.9332 1.83318Z" fill="#222222"/>
    <path d="M12.0067 10.1871C11.7467 10.1871 11.4867 10.1671 11.2267 10.1204C10.9534 10.0738 10.7734 9.81376 10.82 9.54042C10.8667 9.26709 11.1267 9.08709 11.4 9.13376C12.22 9.27376 13.0867 9.12043 13.6667 8.73376C13.98 8.5271 14.1467 8.26709 14.1467 8.00709C14.1467 7.74709 13.9734 7.49375 13.6667 7.28709C13.0867 6.90042 12.2067 6.74709 11.38 6.89376C11.1067 6.94709 10.8467 6.76042 10.8 6.48709C10.7534 6.21376 10.9334 5.95376 11.2067 5.90709C12.2934 5.71376 13.42 5.92042 14.22 6.45375C14.8067 6.84709 15.1467 7.40709 15.1467 8.00709C15.1467 8.60042 14.8134 9.1671 14.22 9.5671C13.6134 9.9671 12.8267 10.1871 12.0067 10.1871Z" fill="#222222"/>
    <path d="M3.98001 5.27301C3.97334 5.27301 3.96667 5.27301 3.96667 5.27301C2.76667 5.23301 1.82667 4.25967 1.82001 3.05967C1.82001 1.83301 2.82001 0.833008 4.04001 0.833008C5.26001 0.833008 6.26001 1.83301 6.26001 3.05301C6.26001 4.25968 5.32001 5.23301 4.12001 5.27301L3.98001 4.77301L4.02667 5.27301C4.01334 5.27301 3.99334 5.27301 3.98001 5.27301ZM4.04667 4.27301C4.08667 4.27301 4.12001 4.27301 4.16001 4.27967C4.75334 4.25301 5.27334 3.71967 5.27334 3.05967C5.27334 2.38634 4.72668 1.83967 4.05334 1.83967C3.38001 1.83967 2.83334 2.38634 2.83334 3.05967C2.83334 3.71301 3.34001 4.23967 3.98667 4.27967C3.99334 4.27301 4.02001 4.27301 4.04667 4.27301Z" fill="#222222"/>
    <path d="M3.97331 10.1871C3.15331 10.1871 2.36665 9.9671 1.75998 9.5671C1.17331 9.17376 0.833313 8.60709 0.833313 8.00709C0.833313 7.41376 1.17331 6.84709 1.75998 6.45375C2.55998 5.92042 3.68665 5.71376 4.77331 5.90709C5.04665 5.95376 5.22665 6.21376 5.17998 6.48709C5.13331 6.76042 4.87331 6.94709 4.59998 6.89376C3.77331 6.74709 2.89998 6.90042 2.31331 7.28709C1.99998 7.49375 1.83331 7.74709 1.83331 8.00709C1.83331 8.26709 2.00665 8.5271 2.31331 8.73376C2.89331 9.12043 3.75998 9.27376 4.57998 9.13376C4.85331 9.08709 5.11331 9.27376 5.15998 9.54042C5.20665 9.81376 5.02665 10.0738 4.75331 10.1204C4.49331 10.1671 4.23331 10.1871 3.97331 10.1871Z" fill="#222222"/>
    <path d="M7.99986 10.2537C7.97986 10.2537 7.96653 10.2537 7.94653 10.2537H7.9132C6.6532 10.2137 5.7132 9.24031 5.7132 8.04031C5.7132 6.81365 6.7132 5.82031 7.9332 5.82031C9.1532 5.82031 10.1532 6.82031 10.1532 8.04031C10.1465 9.24698 9.20653 10.2203 8.00653 10.2603C8.00653 10.2536 8.00653 10.2537 7.99986 10.2537ZM7.9332 6.81365C7.25986 6.81365 6.7132 7.36032 6.7132 8.03365C6.7132 8.69365 7.22653 9.22699 7.88653 9.25365C7.8932 9.24699 7.94653 9.24699 8.00653 9.25365C8.65319 9.22032 9.1532 8.68698 9.15986 8.03365C9.15986 7.36698 8.6132 6.81365 7.9332 6.81365Z" fill="#222222"/>
    <path d="M7.99988 15.1735C7.19988 15.1735 6.39988 14.9668 5.77988 14.5468C5.19321 14.1535 4.85321 13.5935 4.85321 12.9935C4.85321 12.4002 5.18654 11.8268 5.77988 11.4335C7.02654 10.6068 8.97988 10.6068 10.2199 11.4335C10.8065 11.8268 11.1465 12.3868 11.1465 12.9868C11.1465 13.5801 10.8132 14.1535 10.2199 14.5468C9.59988 14.9602 8.79988 15.1735 7.99988 15.1735ZM6.33321 12.2735C6.01988 12.4801 5.85321 12.7401 5.85321 13.0001C5.85321 13.2601 6.02654 13.5135 6.33321 13.7201C7.23321 14.3268 8.75988 14.3268 9.65988 13.7201C9.97321 13.5135 10.1399 13.2535 10.1399 12.9935C10.1399 12.7335 9.96655 12.4801 9.65988 12.2735C8.76655 11.6668 7.23988 11.6735 6.33321 12.2735Z" fill="#222222"/>
</svg>
`;

const TeamIcon = () => <SvgXml xml={xml} />;

export default TeamIcon;