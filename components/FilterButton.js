import { View, Text, StyleSheet, Pressable } from "react-native";
import { useState } from "react";

function FilterButton({ selectedFilter, onFilterSelect }) {
    const filters = ["All Tasks", "Done Tasks", "Open Tasks"];

    return (
        <View style={styles.container}>
            {filters.map((filter) => (
                <Pressable
                    key={filter}
                    onPress={() => onFilterSelect(filter)}
                    style={[
                        styles.filterContainer,
                        selectedFilter === filter && styles.selectedFilter,
                    ]}
                >
                    <Text
                        style={[
                            styles.textStyle,
                            selectedFilter === filter && styles.selectedTextStyle // Schriftfarbe für ausgewählten Filter
                        ]}
                    >
                        {filter}
                    </Text>
                </Pressable>
            ))}
        </View>
    );
}

export default FilterButton;

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        gap: 20,
    },
    filterContainer: {
        borderWidth: 2,
        borderRadius: 24,
        paddingVertical: 8,
        paddingHorizontal: 16,
        alignItems: 'center',
        borderColor: '#545F71',
    },
    selectedFilter: {
        backgroundColor: '#545F71',
        borderColor: '#545F71',
        color: 'white',
    },
    textStyle: {
        fontSize: 14,
        color: '#545F71',
    },
    selectedTextStyle: {
        color: 'white', // Schriftfarbe für ausgewählten Filter
    },
});