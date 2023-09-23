import styled from "styled-components/native";
import { RFValue, RFPercentage } from "react-native-responsive-fontsize";

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

interface ScrollViewWrapperProps {
  admin: boolean;
}

export const Container = styled.View`
  align-items: center;
  height: 100%;
  justify-content: space-around;
  background-color: #FAFAF7;
`;

export const ScrollViewWrapper = styled.View`
  height: 78%;
  margin-top: ${RFValue(20)}px;
`;

export const FieldsContainer = styled.View`
  background-color: #F6F6F6;
  width: ${wp("100%")}px;
  align-items: center;
`;

export const ButtonWrapper = styled.View`
  padding-top: 10px;
  padding-bottom: 10px;
`;
