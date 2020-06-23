import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Home from './pages/Home';
import EventoHome from './pages/EventoHome';
import EventoDetails from './pages/EventoDetails';
import EstabelecimentoHome from './pages/EstabelecimentoHome';
import CadastroEvento from './pages/CadastroEvento';

const AppStack = createStackNavigator();

const Routes = () => {
    return (
        <NavigationContainer>
            <AppStack.Navigator 
                headerMode="none" 
                screenOptions={{
                    cardStyle: {
                        backgroundColor: '#1A191C'
                    }
                }}
            >
                <AppStack.Screen name="Home" component={Home}/>
                <AppStack.Screen name="EventoHome" component={EventoHome}/>
                <AppStack.Screen name="EventoDetails" component={EventoDetails}/>
                <AppStack.Screen name="EstabelecimentoHome" component={EstabelecimentoHome}/>
                <AppStack.Screen name="CadastroEvento" component={CadastroEvento}/>
            </AppStack.Navigator>
        </NavigationContainer>
    );
};

export default Routes;