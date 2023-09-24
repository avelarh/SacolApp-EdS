import styled from "styled-components/native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { RFValue, RFPercentage } from "react-native-responsive-fontsize";

interface Props {
  width?: string;
}

export const RequiredField = styled.Text`
  color: red;
  padding-left: 7px;
  align-self: center;
`;

export const SearchField = styled.View`
  align-self: center;
`;

export const DropdownContainer = styled.View`
  align-self: center;
  align-items: center;
  border: 1px solid;

`;

export const DropdownSize = styled.View`
  width: ${wp("85%")}px;
`;

export const DropdownDynamicSize = styled.View`
  width: 95%;
`;

export const DropdownView = styled.View`
  display: flex;
  flex-direction: row;
  border-bottom-width: 0.8px;
  border-bottom-color: #333333;
  background-color: #FAFAF7;
  width: ${wp("88%")}px;
  z-index: 1;
`;

export const DynamicDropdownView = styled.View<Props>`
  display: flex;
  flex-direction: row;
  border-bottom-width: 0.8px;
  border-bottom-color: #333333;
  background-color: #FAFAF7;
  width: ${(props) => wp(props.width!)}px;
  z-index: 1;
`;