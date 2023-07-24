import React from 'react';
import { SvgXml } from 'react-native-svg';

const xml = `
    <svg width="34" height="34" viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M21.7152 13.2749L13.241 21.7713C12.9515 22.0615 12.4713 22.0615 12.1817 21.7713C11.8922 21.481 11.8922 20.9995 12.1817 20.7092L20.656 12.2129C20.9455 11.9226 21.4257 11.9226 21.7152 12.2129C22.0048 12.5032 22.0048 12.9847 21.7152 13.2749Z" fill="white"/>
        <path d="M21.7152 21.7715C21.4257 22.0618 20.9455 22.0618 20.656 21.7715L12.1817 13.2752C11.8922 12.9849 11.8922 12.5034 12.1817 12.2131C12.4713 11.9228 12.9515 11.9228 13.241 12.2131L21.7152 20.7094C22.0048 20.9997 22.0048 21.4812 21.7152 21.7715Z" fill="white"/>
    </svg>
`;

const CloseCameraIcon = () => <SvgXml xml={xml} />;

export default CloseCameraIcon;