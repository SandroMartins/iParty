import React, { useState, useEffect } from 'react';
import Constants from 'expo-constants';
import { Feather as Icon } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { View, StyleSheet, TouchableOpacity, Text, ScrollView, Image, Alert } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
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

const EventoHome = () => {
    const [eventos, setEventos] = useState<Evento[]>([]);
    const [selectedEvento, setSelectedEvento] = useState<[number, number]>([0, 0]);
    const [initialPosition, setInitialPosition] = useState<[number, number]>([0, 0]);
    const navigation = useNavigation();

    useEffect(() => {
        async function loadPosition() {
            const { status } = await Location.requestPermissionsAsync();

            if (status !== 'granted') {
                Alert.alert('Ooooops....', 'Precisamos de sua permissão para obter a localização');
                return;
            }

            const location = await Location.getCurrentPositionAsync();

            const { latitude, longitude } = location.coords;

            setInitialPosition([latitude, longitude]);
        }

        loadPosition();
    }, []);

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
    function handleNavigateToEventoDetails(id: number) {
        navigation.navigate('EventoDetails', { id_evento: id });
    }

    function handleSelectEvento(latitude: number, longitude: number) {
        setSelectedEvento([latitude, longitude]);
    }

    return (
        <>
            <View style={styles.container}>
                <TouchableOpacity onPress={handleNavigateBack}>
                    <Icon name="arrow-left" size={20} color="#4B78F5" />
                </TouchableOpacity>

                <Text style={styles.title}>Bem vindo</Text>
                <Text style={styles.description}>Encontre no mapa uma balada para curtir.</Text>

                <View style={styles.mapContainer}>
                    {initialPosition[0] !== 0 && (
                        <MapView
                            style={styles.map}
                            initialRegion={{
                                latitude: initialPosition[0],
                                longitude: initialPosition[1],
                                latitudeDelta: 0.014,
                                longitudeDelta: 0.014
                            }}
                        >
                            {eventos.map(evento => (
                                <Marker 
                                    key={String(evento.id)}
                                    style={styles.mapMarker}
                                    onPress={() => handleNavigateToEventoDetails(evento.id)}
                                    coordinate={{
                                        latitude: evento.latitude,
                                        longitude: evento.longitude,
                                    }}
                                >
                                    <View style={styles.mapMarkerContainer}>
                                        <Image
                                            style={styles.mapMarkerImage}
                                            source={{ uri: evento.imagem }}
                                        />
                                        <Text style={styles.mapMarkerTitle}>{evento.titulo}</Text>
                                    </View>
                                </Marker>
                            ))}
                        </MapView>
                    )}
                </View>
            </View>

            <View style={styles.eventoContainer}>
                <Text style={styles.title2}>Eventos</Text>
                <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 20 }}>
                    {eventos.map(evento => (
                        <TouchableOpacity key={String(evento.id)} style={styles.evento} onPress={() => handleNavigateToEventoDetails(evento.id)}>
                            <Text style={styles.eventoTitle}>
                                <Icon name="arrow-right" size={14} color="#FF7401" />
                                {evento.titulo} - {evento.data} - {evento.horario_inicio} até {evento.horario_fim}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </ScrollView>
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 32,
        paddingTop: 20 + Constants.statusBarHeight,
    },

    title: {
        fontSize: 20,
        fontFamily: 'Ubuntu_700Bold',
        marginTop: 24,
        color: '#FF7401',
    },

    title2: {
        fontSize: 16,
        fontFamily: 'Ubuntu_700Bold',
        marginTop: 10,
        color: '#FF7401',
        textAlign: 'center'
    },

    description: {
        color: '#7CADF0',
        fontSize: 16,
        marginTop: 4,
        fontFamily: 'Roboto_400Regular',
    },

    mapContainer: {
        flex: 1,
        width: '100%',
        borderRadius: 10,
        overflow: 'hidden',
        marginTop: 16,
    },

    map: {
        width: '100%',
        height: '100%',
    },

    mapMarker: {
        width: 90,
        height: 80,
    },

    mapMarkerContainer: {
        width: 90,
        height: 70,
        backgroundColor: '#4B78F5',
        flexDirection: 'column',
        borderRadius: 8,
        overflow: 'hidden',
        alignItems: 'center'
    },

    mapMarkerImage: {
        width: 90,
        height: 45,
        resizeMode: 'cover',
    },

    mapMarkerTitle: {
        flex: 1,
        fontFamily: 'Roboto_400Regular',
        color: '#FF7401',
        fontSize: 13,
        lineHeight: 23,
    },

    eventoContainer: {
        flexDirection: 'column',
        marginTop: 16,
        marginBottom: 32,
        height: 200
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

export default EventoHome;