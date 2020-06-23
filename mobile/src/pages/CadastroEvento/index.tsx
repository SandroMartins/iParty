import React, { useState, useCallback } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import Constants from 'expo-constants';
import { Feather as Icon } from '@expo/vector-icons';

import { RectButton } from 'react-native-gesture-handler';
import api from '../../services/api';
import { useNavigation } from '@react-navigation/native';

const CadastroEvento = () => {
    const [titulo, setTitulo] = useState('');
    const [cidade, setCidade] = useState('');
    const [uf, setUf] = useState('');
    const [data, setData] = useState('');
    const [horarioInicio, setHorarioInicio] = useState('');
    const [horarioFim, setHorarioFim] = useState('');
    const [capacidade, setCapacidade] = useState(0);
    const [preco, setPreco] = useState(0);

    const navigation = useNavigation();

    function handleNavigateBack() {
        navigation.navigate('EstabecimentoHome');
    }

    const handleSubmit = useCallback(() => {
        try {
            const dataForm = new FormData();

            dataForm.append('id_estabelecimento', '1');
            dataForm.append('titulo', titulo);
            dataForm.append('cidade', cidade);
            dataForm.append('uf', uf);
            dataForm.append('latitude', "-27.3946848");
            dataForm.append('longitude', "-48.4316465");
            dataForm.append('data', data);
            dataForm.append('horario_inicio', horarioInicio);
            dataForm.append('horario_fim', horarioFim);
            dataForm.append('capacidade', String(capacidade));
            dataForm.append('preco', String(preco));


            api.post('eventos', dataForm).then((response) => {
                console.log(response);
                Alert.alert('Cadastro', 'Cadastro efetuado com sucesso!');
                navigation.navigate('EstabelecimentoHome');
            })

        } catch (err) {
            console.log(err)
            Alert.alert('Erro', 'Houve um problema ao cadastrar o evento. Tente novamente!');

        }


    }, [titulo, cidade, uf, data, horarioInicio, horarioFim, capacidade, preco])

    return (
        <>
            <View style={styles.container}>
                <TouchableOpacity onPress={handleNavigateBack}>
                    <Icon name="arrow-left" size={20} color="#4B78F5" />
                </TouchableOpacity>

                <Text style={styles.title}>Cadastro de Evento</Text>


                <View style={styles.conteudo}>
                    <TextInput placeholder="Título" onChangeText={text => setTitulo(text)} style={styles.inputForm}>
                    </TextInput>
                    <TextInput placeholder="Cidade" onChangeText={text => setCidade(text)} style={styles.inputForm}>
                    </TextInput>
                    <TextInput placeholder="uf" onChangeText={text => setUf(text)} style={styles.inputForm}>
                    </TextInput>
                    <TextInput placeholder="data" onChangeText={text => setData(text)} style={styles.inputForm}>
                    </TextInput>
                    <TextInput placeholder="horário início" onChangeText={text => setHorarioInicio(text)} style={styles.inputForm}>
                    </TextInput>
                    <TextInput placeholder="horário fim" onChangeText={text => setHorarioFim(text)} style={styles.inputForm}>
                    </TextInput>
                    <TextInput placeholder="capacidade" onChangeText={text => setCapacidade(Number(text))} style={styles.inputForm}>
                    </TextInput>
                    <TextInput placeholder="preço" onChangeText={text => setPreco(Number(text))} style={styles.inputForm}>
                    </TextInput>
                    <RectButton style={styles.button} onPress={handleSubmit}>
                        <View style={styles.buttonIcon}>
                            <Text>
                                <Icon name="save" color="#FFF" size={24} />
                            </Text>
                        </View>
                        <Text style={styles.buttonText}>
                            Novo Evento
                </Text>
                    </RectButton>
                </View>

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

    conteudo: {
        paddingTop: 60
    },

    title: {
        fontSize: 30,
        textAlign: 'center',
        fontFamily: 'Ubuntu_700Bold',
        marginTop: 24,
        color: '#FF7401',
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
    inputForm: {
        backgroundColor: '#EBEBEB',
        marginBottom: 10,
        height: 50,
        padding: 10,
        borderRadius: 10,
        fontSize: 15,
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

});
export default CadastroEvento;