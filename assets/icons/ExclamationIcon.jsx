import React from 'react';
import { SvgXml } from 'react-native-svg';

const xml = `
    <svg width="8" height="53" viewBox="0 0 8 53" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M4 39C1.81333 39 0 36.96 0 34.5V4.5C0 2.04 1.81333 0 4 0C6.18667 0 8 2.04 8 4.5V34.5C8 36.96 6.18667 39 4 39Z" fill="#DC6803"/>
        <path d="M4 53C3.48 53 2.96 52.8797 2.48 52.6792C2 52.4787 1.56 52.198 1.16 51.8371C0.8 51.4361 0.52 51.0351 0.32 50.5138C0.12 50.0326 0 49.5113 0 48.99C0 48.4687 0.12 47.9474 0.32 47.4662C0.52 46.985 0.8 46.5439 1.16 46.1429C1.56 45.782 2 45.5013 2.48 45.3008C3.44 44.8997 4.56 44.8997 5.52 45.3008C6 45.5013 6.44 45.782 6.84 46.1429C7.2 46.5439 7.48 46.985 7.68 47.4662C7.88 47.9474 8 48.4687 8 48.99C8 49.5113 7.88 50.0326 7.68 50.5138C7.48 51.0351 7.2 51.4361 6.84 51.8371C6.44 52.198 6 52.4787 5.52 52.6792C5.04 52.8797 4.52 53 4 53Z" fill="#DC6803"/>
    </svg>
`;

const ExclamationIcon = () => <SvgXml xml={xml} />;

export default ExclamationIcon;