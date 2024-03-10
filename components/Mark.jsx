import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { black, primaryColor, white } from '../style/colors';

const Mark = ({ children, fontSize }) => {
  return <Text style={[styles.mark, fontSize && { fontSize }]}>{children}</Text>;
};

const styles = StyleSheet.create({
    mark: {
        // backgroundColor: primaryColor,
        // color: white,
        color: black,
        fontFamily: 'mulish-extrabold',
    },
});

export default Mark;