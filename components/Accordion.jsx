import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  LayoutAnimation,
  UIManager,
  StyleSheet,
} from 'react-native';
// icons
import ArrowDownSmall from '../assets/icons/ArrowDownSmall';
import { black, bodyText, subText } from '../style/colors';
// import react hook
import { useEffect } from 'react';

// Enable LayoutAnimation for Android
if (Platform.OS === 'android') {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const Accordion = ({state, locations, opened}) => {
    const [expanded, setExpanded] = useState(opened);

    const toggleAccordion = () => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        setExpanded(!expanded);
    };
    
    useEffect(() => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        setExpanded(opened);
    }, [opened])

    const accordionStyle = expanded ? style.expanded : style.collapsed;

    const getMaxCharge = (locationsArray) => {
        let maxCharge = -Infinity;
        for (let i = 0; i < locationsArray.length; i++) {
            const charge = locationsArray[i].charge;
            if (charge > maxCharge) {
            maxCharge = charge;
            }
        }
        return maxCharge.toLocaleString();
    };
        
    const getMinCharge = (locationsArray) => {
        let minCharge = Infinity;
        for (let i = 0; i < locationsArray.length; i++) {
            const charge = locationsArray[i].charge;
            if (charge < minCharge) {
            minCharge = charge;
            }
        }
        return minCharge.toLocaleString();
    };

    const maxCharge = getMaxCharge(locations);
    const minCharge = getMinCharge(locations);

    return (
        <View style={style.container}>
            <TouchableOpacity style={style.header} onPress={toggleAccordion}>
                <Text style={style.title}>{state}</Text>
                <View style={style.priceRangeWrapper}>
                    <Text style={style.priceRangeText}>₦{minCharge} - ₦{maxCharge}</Text>
                    <View style={expanded && {transform: [{rotate: '180deg'}]}}>
                        <ArrowDownSmall />
                    </View>
                </View>
            </TouchableOpacity>

            <View style={[style.content, accordionStyle]}>
                {locations.map((location) => (
                    <View key={location.id} style={style.locationsItems}>
                        <Text style={style.locationsText}>{location.location}</Text>
                        <Text style={style.locationsPrice}>
                            ₦{location.charge.toLocaleString()}
                            <Text style={style.decimal}>.00</Text>    
                        </Text>
                    </View>
                ))}
            </View>
        </View>
    );
};

const style = StyleSheet.create({
    container: {
        width: "100%",
    },
    header: {
        width: "100%",
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    priceRangeWrapper: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        gap: 4,
    },
    priceRangeText: {
        fontFamily: 'mulish-medium',
        color: black,
        fontSize: 12,
    },
    title: {
        fontFamily: 'mulish-medium',
        color: bodyText,
        fontSize: 12,
    },
    icon: {
        fontSize: 18,
    },
    content: {
        display: 'flex',
        flexDirection: 'column',
        gap: 10,
        width: '100%',
    },
    expanded: {
        padding: 10,
        height: 'auto',
    },
    collapsed: {
        height: 0,
    },
    contentText: {
        color: 'black',
    },
    locationsItems: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: "100%",
    },
    locationsText: {
        fontFamily: 'mulish-regular',
        color: bodyText,
        fontSize: 12,
    },
    locationsPrice: {
        fontFamily: 'mulish-regular',
        color: black,
        fontSize: 12,
    },
    decimal: {
        color: subText,
        fontSize: 12,
    }
});

export default Accordion;
