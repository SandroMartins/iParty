import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, ScrollView, Image, Alert, FlatList } from 'react-native';
import { Feather as Icon } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { RectButton } from 'react-native-gesture-handler';
import api from '../../services/api';

interface Evento {
    id: number;
    titulo: string;
    latitude: number;
    longitude: number;
    data: string;
    horario_inicio: string;
    horario_fim: string;
    imagem: string;
}

const EstabelecimentoHome = () => {
    const [eventos, setEventos] = useState<Evento[]>([]);
    const navigation = useNavigation();
    useEffect(() => {
        api.get('eventos', {
            params: {
                cidade: 'Florianópolis',
                uf: 'SC'
            }
        }).then(response => {
            setEventos(response.data);
        });
    }, []);

    function handleNavigateBack() {
        navigation.goBack();
    }

    function handleNavigateToCadastroEvento() {
        navigation.navigate('CadastroEvento');
    }

    return (
        <>
            <View style={styles.container}>
                <TouchableOpacity onPress={handleNavigateBack}>
                    <Icon name="arrow-left" size={20} color="#4B78F5" />
                </TouchableOpacity>

                <Text style={styles.title}>Bem vindo</Text>
                <Text style={styles.description}>Cadastre novos eventos que serão disponibilizados aos usuários.</Text>

                <View style={styles.conteudo}>
                    <RectButton style={styles.button} onPress={handleNavigateToCadastroEvento}>
                        <View style={styles.buttonIcon}>
                            <Text>
                                <Icon name="arrow-right" color="#FFF" size={24} />
                            </Text>
                        </View>
                        <Text style={styles.buttonText}>
                            Novo Evento
                        </Text>
                    </RectButton>
                </View>
                <View style={styles.eventoContainer}>
                    <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 20 }}>
                    {eventos.map(evento => (
                        <View key={String(evento.id)} style={styles.lista}>
                            <Text style={styles.eventoTitle}>
                                {evento.titulo} - {evento.data} - {evento.horario_inicio} até {evento.horario_fim}
                                
                            </Text>
                            <TouchableOpacity>
                                <Icon style={{paddingLeft: 12}} name="edit" size={17} color="#FF7401" />
                            </TouchableOpacity>
                            
                            <Icon style={{paddingLeft: 12}} name="delete" size={17} color="#FF7401" />
                        </View>
                    ))}
                </ScrollView>
                </View>
            </View>
        </>
    );
}
const styles = StyleSheet.create({
    container: {
        backgroundColor: '#1A191C',
        flex: 1,
        padding: 20,
    },

    conteudo: {
        paddingTop: 60
    },

    lista: {
        flexDirection: 'row', 
        padding: 15, 
        backgroundColor: '#232226', 
        marginBottom: 5, 
        borderRadius: 5, 
        height: 50, 
        alignContent: 'flex-end', 
        flex: 1, 
        justifyContent: 'center'
    },


    title: {
        fontSize: 20,
        fontFamily: 'Ubuntu_700Bold',
        marginTop: 24,
        color: '#FF7401',
    },

    description: {
        color: '#7CADF0',
        fontSize: 16,
        marginTop: 4,
        fontFamily: 'Roboto_400Regular',
    },

    button: {
        backgroundColor: '#FF7401',
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
    },

    title2: {
        fontSize: 16,
        fontFamily: 'Ubuntu_700Bold',
        marginTop: 10,
        color: '#FF7401',
        textAlign: 'center'
    },

    eventoContainer: {
        flexDirection: 'column',
        marginTop: 70,
        marginBottom: 32,
        height: '60%'
    },

    evento: {
        backgroundColor: '#1A191C',
        borderBottomWidth: 1,
        borderColor: '#28272B',
        height: 30,
        width: '100%',
        borderRadius: 1,
        paddingHorizontal: 16,
        paddingTop: 20,
        paddingBottom: 16,
        marginRight: 8,
        alignItems: 'center',
        justifyContent: 'space-between',
        textAlign: 'center',
    },
    eventoTitle: {
        fontFamily: 'Roboto_400Regular',
        textAlign: 'center',
        fontSize: 14,
        color: '#7CADF0',
    },
});

export default EstabelecimentoHome;