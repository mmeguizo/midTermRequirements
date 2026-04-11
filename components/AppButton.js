import React from 'react';
import { Button } from 'react-native-paper';

export default function AppButton({ title, onPress, icon, mode = 'contained' }) {
  return (
    <Button mode={mode} onPress={onPress} icon={icon}>
      {title}
    </Button>
  );
}
