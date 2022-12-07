import { Layout, Text, Toggle } from '@ui-kitten/components';
import { useContext } from 'react';
import { useState } from 'react';
import { AppDataContext } from '../contexts';

export default function Settings() {
  const { darkMode, setDarkMode } = useContext(AppDataContext);

  return (
    <Layout style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Toggle
        checked={darkMode}
        onChange={setDarkMode}>
        Dark Mode
      </Toggle>
    </Layout>
  );
}
