import styled from "styled-components/native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { RFValue, RFPercentage } from "react-native-responsive-fontsize";

export const TouchableContainer = styled.TouchableOpacity`
  display: flex;
  align-items: center;
  flex-direction: row;
`;

export const BlueText = styled.Text`
  color: #1717BD;
  font-size: ${RFValue(15)}px;
  margin-left: 3px;
`;
