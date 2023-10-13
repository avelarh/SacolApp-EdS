import styled from "styled-components/native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { RFValue, RFPercentage } from "react-native-responsive-fontsize";

export const Container = styled.TouchableOpacity`
  width: ${wp("100%")}px;
  border-bottom-width: 0.5px;
  border-bottom-color: #D9D9D9;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 15px 0;
`;

export const Row = styled.View`
  width: ${wp("90%")}px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const Title = styled.Text`
  font-size: ${RFValue(14)}px;
  color: black;
`;

export const Subtitle = styled.Text`
  font-size: ${RFValue(13)}px;
  color: #0A0B0C80;
`;
