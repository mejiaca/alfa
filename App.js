import React from 'react';
import Router from './src/navigators/Router';
import { AppProvider } from './src/context/State';

console.disableYellowBox = true;

export default () => (
    <AppProvider>
        <Router />
    </AppProvider>
);