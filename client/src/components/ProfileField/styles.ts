import styled from "styled-components/native";
import { RFValue, RFPercentage } from "react-native-responsive-fontsize";

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

export const ProfileFieldWrapper = styled.View`
  display: flex;
  flex-direction: row;
  width: 90%;
  /* width: ${wp("90%")}px; */
  padding: 15px 5px;
  border-bottom-width: 0.5px;
  border-bottom-color: #c5bcbc;
  align-items: center;
  justify-content: space-between;
`;

export const InputAndIconWrapper = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const Label = styled.Text`
  color: black;
  font-size: ${RFValue(14)}px;
  text-align: left;
`;

export const SmallLabel = styled.Text`
  color: black;
  font-size: ${RFValue(13)}px;
  text-align: left;
`;

export const HiddenIcon = styled.View`
  opacity: 0;
`;

export const TouchableIconWrapper = styled.TouchableOpacity``;
