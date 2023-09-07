import styled from "styled-components/native";
import { RFValue, RFPercentage } from "react-native-responsive-fontsize";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

export const HorizontalLine = styled.View`
  width: ${wp("90%")}px;
  border-bottom-width: 0.5px;
  border-bottom-color: black;
  margin-top: 25px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

export const LeftText = styled.Text`
  color: #0A0B0C80;
  font-size: ${RFValue(14)}px;
  font-weight: 600;
  padding-bottom: 8px;
`;

export const RightText = styled.Text`
  color: #0A0B0C80;
  font-size: ${RFValue(14)}px;
  font-weight: 600;
  padding-bottom: 8px;
`;
