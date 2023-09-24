import styled from "styled-components/native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { RFValue, RFPercentage } from "react-native-responsive-fontsize";

export const Title = styled.Text`
  margin-top: ${RFValue(20)}px;
  font-size: ${RFValue(22)}px;
  font-weight: bold;
  color: #24203B;
`;


export const Container = styled.View`
  flex: 1;
  align-items: center;
  background-color: #FAFAF7;
`;

export const TitleWrapper = styled.View`
  margin-bottom: 30px;
`;

export const AddItemWrapper = styled.View`
  margin-top: 20px;
`;

export const Subtitle = styled.Text`
  font-size: ${RFValue(15.5)}px;
  font-weight: 600;
`;

export const FlatList = styled.FlatList`
  margin-bottom: 20px;
  z-index: 1;
`;

export const BackgroundDark = styled.TouchableOpacity`
  width: ${wp("100%")}px;
  height: ${hp("110%")}px;
  position: absolute;
  z-index: 2;
  background-color: black;
  opacity: 0.3;
`;
