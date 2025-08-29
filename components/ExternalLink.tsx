// @ts-ignore
declare const window: any;
import { Linking, Platform, TouchableOpacity, Text } from 'react-native';
import { openBrowserAsync } from 'expo-web-browser';
import React from 'react';

type Props = {
  href: string;
  children: React.ReactNode;
  style?: any;
};

export function ExternalLink({ href, children, style }: Props) {
  const handlePress = async () => {
    if (Platform.OS === 'web') {
      window.open(href, '_blank');
    } else {
      await openBrowserAsync(href);
    }
  };
  return (
    <TouchableOpacity onPress={handlePress} style={style}>
      <Text style={{ color: '#2d7be5' }}>{children}</Text>
    </TouchableOpacity>
  );
}
