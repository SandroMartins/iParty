import React from 'react';
import { Feather as Icon } from '@expo/vector-icons';
import { View, Image, Text, StyleSheet } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';

const Home = () => {
    const navigation = useNavigation();

    function handleNavigateToEventoHome() {
        navigation.navigate('EventoHome');
    }

    function handleNavigateToEstabecimentoHome() {
        navigation.navigate('EstabelecimentoHome');
    }

    return (
        <View style={styles.container}>
            <View style={styles.main}>
                <View style={{flexDirection:'row'}}>
                    <Image source={require('../../assets/logo-festa.png')} />
                    <Text style={styles.text_party}>iParty</Text>
                </View>
                
                <Text style={styles.title}>A busca da diversão na palma da sua mão.</Text>
                <Text style={styles.description}>Ajudamos pessoas a encontrar baladas para se divertirem de forma rápida e objetiva</Text>
            </View>

            <View style={styles.footer}>
                <RectButton style={styles.button} onPress={handleNavigateToEventoHome}>
                    <View style={styles.buttonIcon}>
                        <Text> 
                            <Icon name="arrow-right" color="#FFF" size={24}/>
                        </Text>
                    </View>
                    <Text style={styles.buttonText}>
                        Usuário
                    </Text>
                </RectButton>
                <RectButton style={styles.button} onPress={handleNavigateToEstabecimentoHome}>
                    <View style={styles.buttonIcon}>
                        <Text> 
                            <Icon name="arrow-right" color="#FFF" size={24}/>
                        </Text>
                    </View>
                    <Text style={styles.buttonText}>
                        Estabelecimento
                    </Text>
                </RectButton>
            </View>
        </View>
    )
};
const styles = StyleSheet.create({
    container: {
        backgroundColor: '#1A191C',
        flex: 1,
        padding: 32,
    },

    text_party: {
        color: '#FF7401', 
        fontSize: 52, 
        fontFamily: 'Ubuntu_700Bold',
        paddingLeft: 30,
        paddingBottom:15
    },

    main: {
        flex: 1,
        justifyContent: 'center',
    },

    title: {
        color: '#FF7401',
        fontSize: 26,
        fontFamily: 'Ubuntu_700Bold',
        maxWidth: 320,
        marginTop: 80,
    },

    description: {
        color: '#7CADF0',
        fontSize: 14,
        marginTop: 16,
        fontFamily: 'Roboto_400Regular',
        maxWidth: 320,
        lineHeight: 24,
    },

    footer: {},

    select: {},

    input: {
        height: 60,
        backgroundColor: '#FFF',
        borderRadius: 10,
        marginBottom: 8,
        paddingHorizontal: 24,
        fontSize: 16,
    },

    button: {
        backgroundColor: '#4B78F5',
        height: 60,
        flexDirection: 'row',
        borderRadius: 10,
        overflow: 'hidden',
        alignItems: 'center',
        marginTop: 8,
    },

    buttonIcon: {
        height: 60,
        width: 60,
        backgroundColor: 'rgba(0, 0, 0, 0.1)',
        justifyContent: 'center',
        alignItems: 'center'
    },

    buttonText: {
        flex: 1,
        justifyContent: 'center',
        textAlign: 'center',
        color: '#FFF',
        fontFamily: 'Roboto_500Medium',
        fontSize: 16,
    }
});

export default Home;

