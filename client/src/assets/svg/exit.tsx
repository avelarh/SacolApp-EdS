import React from "react";
import { View } from "react-native";
import Svg, { Path } from "react-native-svg";

const ExitIcon = () => {
  return (
    <View>
      <Svg width={40} height={40} viewBox="0 0 32 32" fill="none">
        <Path
          d="M20.5128 10.1111L18.6834 11.9128L22.0308 15.2222H11.2051V17.7778H22.0308L18.6834 21.0744L20.5128 22.8889L27 16.5L20.5128 10.1111ZM7.59487 7.55556H17.9744V5H7.59487C6.16769 5 5 6.15 5 7.55556V25.4444C5 26.85 6.16769 28 7.59487 28H17.9744V25.4444H7.59487V7.55556Z"
          fill="#BDBDBD"
        />
      </Svg>
    </View>
  );
};

export default ExitIcon;
