import { useState } from "react";
import { StyleSheet } from "react-native";
import SelectDropdown from "react-native-select-dropdown";

import { AntDesign } from "@expo/vector-icons";
import { EvilIcons } from "@expo/vector-icons";
import {
  DropdownDynamicSize,
  DropdownSize,
  DropdownView,
  DynamicDropdownView,
  RequiredField,
  SearchField,
} from "./styles";
import { Product } from "../../services/interfaces";

interface DropdownProps {
  placeholder: string;
  items: Product[];
  setData: (item: number) => void;
  width?: string;
  required?: boolean;
  search?: boolean;
}

export function Dropdown({
  placeholder,
  items,
  setData,
  width,
  required,
  search,
}: DropdownProps) {
  const [wasSelected, setWasSelected] = useState<boolean>(false);

  if (!width)
    return (
      <DropdownView>
        {required && <RequiredField>*</RequiredField>}
        <DropdownSize>
          <SelectDropdown
            defaultButtonText={placeholder}
            buttonStyle={styles.buttonStyle}
            buttonTextStyle={
              wasSelected
                ? styles.selectedButtonTextStyle
                : styles.buttonTextStyle
            }
            data={items}
            onSelect={(selectedItem, index) => {
              setData(selectedItem.id.toString());
              setWasSelected(true);
            }}
            buttonTextAfterSelection={(selectedItem, index) => {
              return selectedItem.name;
            }}
            rowTextForSelection={(item, index) => {
              return item.name;
            }}
            renderDropdownIcon={(isOpened) => {
              return (
                <AntDesign
                  name={isOpened ? "caretup" : "caretdown"}
                  size={18}
                  color="black"
                />
              );
            }}
            rowTextStyle={styles.rowTextStyle}
            rowStyle={styles.rowStyle}
            dropdownStyle={styles.dropdownStyle}
          />
        </DropdownSize>
      </DropdownView>
    );
  else
    return (
      <DynamicDropdownView width={width}>
        {required && <RequiredField>*</RequiredField>}
        {search && (
          <SearchField>
            <EvilIcons name="search" size={22} color="#0A0B0C80" />
          </SearchField>
        )}
        <DropdownDynamicSize>
          <SelectDropdown
            defaultButtonText={placeholder}
            buttonStyle={styles.buttonStyle}
            buttonTextStyle={
              wasSelected
                ? styles.selectedButtonTextStyle
                : styles.buttonTextStyle
            }
            data={items}
            onSelect={(selectedItem, index) => {
              setData(selectedItem.id.toString());
              setWasSelected(true);
            }}
            buttonTextAfterSelection={(selectedItem, index) => {
              return selectedItem.name;
            }}
            rowTextForSelection={(item, index) => {
              return item.name;
            }}
            renderDropdownIcon={(isOpened) => {
              return (
                <AntDesign
                  name={isOpened ? "caretup" : "caretdown"}
                  size={18}
                  color="black"
                />
              );
            }}
            rowTextStyle={styles.rowTextStyle}
            rowStyle={styles.rowStyle}
            dropdownStyle={styles.dropdownStyle}
          />
        </DropdownDynamicSize>
      </DynamicDropdownView>
    );
}

const styles = StyleSheet.create({
  buttonStyle: {
    width: "100%",
    height: 30,
    backgroundColor: "#FAFAF7",
  },
  buttonTextStyle: {
    fontWeight: "300",
    color: "#00000080",
    fontSize: 15,
    textAlign: "left",
    marginLeft: 0,
    paddingLeft: 0,
  },
  selectedButtonTextStyle: {
    fontWeight: "300",
    color: "#000000",
    fontSize: 15,
    textAlign: "left",
    marginLeft: 0,
    paddingLeft: 0,
  },
  rowTextStyle: {
    color: "#FFFFFF",
    fontSize: 15,
  },
  rowStyle: {
    backgroundColor: "#31304fb5",
    height: 55,
    borderBottomWidth: 0,
  },
  dropdownStyle: {
    width: '70%',
    borderRadius: 10,
    backgroundColor: "#313045",
    left: 60,
  },
});