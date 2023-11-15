import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
// components
import SelectInput from './SelectInput'
import Input from './Input'
import CustomButton from './CustomButton'
// icons
import MenuIcon from "../assets/icons/MenuIcon";
import ClearSearch from "../assets/icons/ClearSearch";
import { background, black, bodyText, subText, white } from '../style/colors'

const LocationListItem = ({warehouseId, warehouseName, towns, warehouseInput, warehouseInputActive, chargeInput, updateChargeInput, chargeInputError, setChargeInputError, inactiveSaveButton, openMenu, openStackedModal, handleSaveEditTown, handleWarehouseLayout, handleTownLayout, handleCancelEditTown}) => {
    return (
        <View 
            style={styles.warehouseWrapper}
            onLayout={(e) => handleWarehouseLayout(warehouseId, e)}
        >
            <View style={styles.warehouseInfoWrapper}>
                <Text style={styles.warehouseName}>{warehouseName}</Text>
                <Text style={styles.warehouseLocationCount}>
                    {towns.length} 
                    {towns.length > 1 ? " locations" : " location"} 
                </Text>
            </View>
            {towns.map((town) => {
                if (town?.editing) return (
                    <View key={town.town} style={styles.editTownContainer}>
                        <View 
                            style={
                                [styles.townWrapper, 
                                {
                                    paddingHorizontal: 16,
                                    marginBottom: 4,
                                }
                            ]}
                        >
                            <View style={styles.townDetailsWrapper}>
                                <Text style={styles.townNameBold}>{town.town}</Text>
                                <Text style={styles.townEditInstructions}>
                                    Edit your sub location details
                                </Text>
                            </View>
                            <TouchableOpacity
                                style={styles.optionButton}
                                onPress={handleCancelEditTown}
                            >
                                <ClearSearch />
                            </TouchableOpacity>
                        </View>
                        <SelectInput
                            label={"Select Warehouse"}
                            placeholder={"Select Warehouse"}
                            inputFor={"String"}
                            onPress={openStackedModal}
                            value={warehouseInput?.name}
                            active={warehouseInputActive}
                        />
                        <Input 
                            label={"Charge"}
                            placeholder={"Charge"}
                            value={chargeInput?.toLocaleString()}
                            onChange={updateChargeInput}
                            error={chargeInputError}
                            setError={setChargeInputError}
                            keyboardType={"numeric"}
                        />
                        <CustomButton 
                            name={"Save"}
                            shrinkWrapper={true}
                            buttonStyle={{width: 152}}
                            wrapperStyle={{        
                                justifyContent: "flex-end",
                                padding: 0,
                            }}
                            inactive={inactiveSaveButton || chargeInput === ""}
                            onPress={handleSaveEditTown}
                        />
                    </View>
                )
                return (
                    <View 
                        key={town.town} 
                        style={[
                            styles.townWrapper,
                            town?.disabled && {opacity: 0.5}
                        ]}
                        onLayout={(e) => handleTownLayout(town.id, e)}
                    >
                        <View style={styles.townDetailsWrapper}>
                            <Text style={styles.townName}>{town.town}</Text>
                            <Text style={styles.townCharge}>
                                ₦ {town.charge.toLocaleString()}.
                                <Text style={styles.decimal}>
                                    00
                                </Text>
                            </Text>
                        </View>
                        <TouchableOpacity
                            style={styles.optionButton}
                            onPress={town?.disabled ? () => {} : () => openMenu(warehouseId, town.id)}
                        >
                            <MenuIcon />
                        </TouchableOpacity>
                    </View>
                )
            })}
        </View>
    )
}

export default LocationListItem

const styles = StyleSheet.create({
    
    warehouseWrapper: {
        width: "100%",
        display: "flex",
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        gap: 5,
        padding: 12,
        backgroundColor: white,
        borderRadius: 12,
    },
    warehouseInfoWrapper: {
        marginTop: 3,
        marginBottom: 5,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: "100%",
    },
    warehouseName: {
        fontFamily: 'mulish-semibold',
        fontSize: 12,
        color: subText,
    },  
    warehouseLocationCount: {
        fontFamily: 'mulish-semibold',
        fontSize: 10,
        color: black,
    },  
    townWrapper: {
        width: "100%",
        display: "flex",
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 15,
        paddingLeft: 16,
        paddingRight: 12,
        backgroundColor: background,
        borderRadius: 12,
    },
    editTownContainer: {
        width: "100%",
        display: "flex",
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        gap: 12,
        marginBottom: 15,
    },
    townName: {
        fontSize: 12,
        fontFamily: 'mulish-medium',
        color: bodyText,
        marginBottom: 4,
    },
    townNameBold: {
        fontSize: 12,
        fontFamily: 'mulish-bold',
        color: black,
        marginBottom: 4,
    },
    townEditInstructions: {
        fontSize: 12,
        fontFamily: 'mulish-regular',
        color: bodyText,
    },
    townCharge: {
        fontSize: 12,
        fontFamily: 'mulish-semibold',
        color: black,
    },
    decimal: {
        fontSize: 12,
        fontFamily: 'mulish-semibold',
        color: subText,
    },
    optionButton: {
        transform: [
            {
                rotate: '90deg'
            }
        ]
    },
})