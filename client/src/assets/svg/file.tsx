import React from 'react';
import { View } from 'react-native';
import Svg, { Path } from 'react-native-svg';

const FileIcon = () => {
  return (
    <View>
      <Svg
        width={36}
        height={36}
        viewBox="0 0 32 32"
        fill="none"
      >
        <Path
          d="M9.82861 1.5H25.0371L30 5.31763V30.6286H9.82861V1.5Z"
          stroke="#969696"
        />
        <Path
          d="M3.59915 9.79385C3.10109 8.96653 3.38018 7.89147 4.21776 7.41088C5.0352 6.94186 6.0778 7.21666 6.55784 8.02768L14.5286 21.4941L14.5286 24.5455L11.3212 22.6211L3.59915 9.79385Z"
          fill="white"
          stroke="#969696"
        />
        <Path d="M4.44287 10.7715L7.29287 9.14288" stroke="#969696" />
        <Path
          d="M13.4 9.14288L26.4286 9.14288"
          stroke="#969696"
          strokeLinecap="round"
        />
        <Path
          d="M13.4 12.4L26.4286 12.4"
          stroke="#969696"
          strokeLinecap="round"
        />
        <Path
          d="M13.4 15.6572L26.4286 15.6572"
          stroke="#969696"
          strokeLinecap="round"
        />
        <Path
          d="M15.8429 18.9143L26.4286 18.9143"
          stroke="#969696"
          strokeLinecap="round"
        />
        <Path
          d="M16.6571 22.1714L26.4285 22.1714"
          stroke="#969696"
          strokeLinecap="round"
        />
        <Path
          d="M16.6571 25.4286L26.4285 25.4286"
          stroke="#969696"
          strokeLinecap="round"
        />
      </Svg>
    </View>
  );
};

export default FileIcon;
