import React, { useEffect, useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Image, Text, SafeAreaView, Linking } from 'react-native';
import Contants from 'expo-constants';
import { useNavigation, useRoute } from '@react-navigation/native'
import { Feather as Icon, FontAwesome } from '@expo/vector-icons';
import { RectButton } from 'react-native-gesture-handler';
import api from '../../services/api';
import * as MailComposer from 'expo-mail-composer';

interface Params {
    id_evento: number;
}

interface Data {
    evento: {
        titulo: string;
        cidade: string;
        imagem: string;
        uf: string;
        data: string;
        horario_inicio: string;
        horario_fim: string;
        capacidade: number;
        preco: number;
    };
    estabelecimento: {
        nome: string;
        email: string;
        whatsapp: string;
    }[];
}

const EventoDetails = () => {
    const [data, setData] = useState<Data>({} as Data);
    const navigation = useNavigation();
    const route = useRoute();

    const routeParams = route.params as Params;

    useEffect(() => {
        api.get(`eventos/${routeParams.id_evento}`).then(response => {
            setData(response.data);
        })
    },[])

    function handleNavigateBack() {
        navigation.goBack();
    }

    function handleComposeMail() {
        MailComposer.composeAsync({
            subject: `Reserva de mesa da festa ${data.evento.titulo}` ,
            recipients: [String(data.estabelecimento.map(estabelecimento => estabelecimento.email))],
        })
    }

    function handleWhatsapp() {
        const whatsapp = data.estabelecimento.map(estabelecimento => estabelecimento.whatsapp);
        Linking.openURL(`whatsapp://send?phone=${whatsapp}&text=Tenho interesse em reservar uma mesa na festa ${data.evento.titulo}`)
    }

    if (!data.evento) {
        return null;
    }

    return (
        <SafeAreaView style={{flex:1}}>
            <View style={styles.container}>
                <TouchableOpacity onPress={handleNavigateBack}>
                    <Icon name="arrow-left" size={20} color="#4B78F5" />
                </TouchableOpacity>

                <Image
                    style={styles.eventoImage}
                    source={{ uri: data.evento.imagem}}
                />
                <Text style={styles.eventoName}>{data.evento.titulo}</Text>
                <Text style={styles.eventoDetails} >
                    {data.estabelecimento.map(estabelecimento => estabelecimento.nome)}
                </Text>
                <Text style={styles.eventoDetails} >{data.evento.cidade}, {data.evento.uf}</Text>

                <View style={styles.info}>
                    <Text style={styles.infoTitle} >Informações do evento</Text>
                    <Text style={styles.infoContent} >Data: {data.evento.data}</Text>
                    <Text style={styles.infoContent} >Horário: das {data.evento.horario_inicio} às {data.evento.horario_fim} hrs</Text>
                    <Text style={styles.infoContent} >Capacidade: {data.evento.capacidade} pessoas</Text>
                    <Text style={styles.infoContent} >Preço: R$ {data.evento.preco}</Text>
                </View>
            </View>
            <View style={styles.footer}>
                <RectButton style={styles.button} onPress={handleWhatsapp}>
                    <FontAwesome name="whatsapp" size={20} color="#1A191C"/>
                    <Text style={styles.buttonText}>Whatsapp</Text>
                </RectButton>

                <RectButton style={styles.button} onPress={handleComposeMail}>
                    <Icon name="mail" size={20} color="#1A191C"/>
                    <Text style={styles.buttonText}>Email</Text>
                </RectButton>
            </View>
        </SafeAreaView >
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 32,
        paddingTop: 20 + Contants.statusBarHeight,
    },

    eventoImage: {
        width: '100%',
        height: 120,
        resizeMode: 'cover',
        borderRadius: 10,
        marginTop: 32,
    },

    eventoName: {
        color: '#FF7401',
        fontSize: 28,
        fontFamily: 'Ubuntu_700Bold',
        marginTop: 24,
    },

    eventoDetails: {
        fontFamily: 'Roboto_400Regular',
        fontSize: 16,
        lineHeight: 24,
        marginTop: 8,
        color: '#9C9CBA'
    },

    info: {
        marginTop: 32,
    },

    infoTitle: {
        color: '#FF7401',
        fontFamily: 'Roboto_500Medium',
        fontSize: 16,
    },

    infoContent: {
        fontFamily: 'Roboto_400Regular',
        lineHeight: 24,
        marginTop: 8,
        color: '#9C9CBA'
    },

    footer: {
        borderTopWidth: StyleSheet.hairlineWidth,
        borderColor: '#999',
        paddingVertical: 20,
        paddingHorizontal: 32,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },

    button: {
        width: '48%',
        backgroundColor: '#4B78F5',
        borderRadius: 10,
        height: 50,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },

    buttonText: {
        marginLeft: 8,
        color: '#1A191C',
        fontSize: 16,
        fontFamily: 'Roboto_500Medium',
    },
});

export default EventoDetails;