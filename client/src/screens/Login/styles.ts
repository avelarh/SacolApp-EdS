import styled from "styled-components/native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { RFValue, RFPercentage } from "react-native-responsive-fontsize";

export const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  background-color: #FAFAF7;
`;

export const Title = styled.Text`
  font-size: ${RFValue(30)}px;
  color: #14145A;
  margin-top: ${RFValue(30)}px;
`;

export const AppTitle = styled.Text`
  margin-top: ${RFValue(-120)}px;
  font-size: ${RFValue(40)}px;
  color: #14145A;
`;

export const TextFieldWrapper = styled.View`
  margin-top: ${RFValue(20)}px;
`;

export const ButtonWrapper = styled.View`
  margin-top: ${RFValue(30)}px;
`;

export const RegisterContainer = styled.TouchableOpacity`
  margin-top: ${RFValue(10)}px;
`;

export const RegisterContent = styled.Text`
  color: #1717BD;
`;