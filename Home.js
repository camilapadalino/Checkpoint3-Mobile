import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import { Button, FlatList, TextInput, View } from 'react-native';
import CharacterCard from './Personagem';

export default function HomeScreen({ navigation }) {
    const [characters, setCharacters] = useState([]);
    const [page, setPage] = useState(1);
    const [inputPage, setInputPage] = useState('');
    const [favorites, setFavorites] = useState([]);

    useEffect(() => {
        fetchCharacters();
        loadFavorites();
    }, [page]);

    const fetchCharacters = async () => {
        try {
            const res = await fetch(`https://rickandmortyapi.com/api/character?page=${page}`);
            const json = await res.json();
            setCharacters(json.results);
        } catch (error) {
            console.error('Erro ao buscar personagens:', error);
        }
    };

    const loadFavorites = async () => {
        try {
            const favs = await AsyncStorage.getItem('favorites');
            setFavorites(favs ? JSON.parse(favs) : []);
        } catch (error) {
            console.error('Erro ao carregar favoritos:', error);
        }
    };

    const toggleFavorite = async (character) => {
        let updatedFavorites;
        if (favorites.some(f => f.id === character.id)) {
            updatedFavorites = favorites.filter(f => f.id !== character.id);
        } else {
            updatedFavorites = [...favorites, character];
        }
        setFavorites(updatedFavorites);
        await AsyncStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    };

    return (
        <View style={{ flex: 1, padding: 10, backgroundColor: 'pink' }}>
            <Button title="Ver Favoritos" color="purple" onPress={() => navigation.navigate('Favoritos')} />
            <FlatList
                data={characters}
                keyExtractor={item => item.id.toString()}
                renderItem={({ item }) => (
                    <CharacterCard
                        character={item}
                        isFavorite={favorites.some(f => f.id === item.id)}
                        onToggleFavorite={() => toggleFavorite(item)}
                    />
                )}
            />
            <TextInput
                placeholder="Ir para página"
                value={inputPage}
                onChangeText={setInputPage}
                keyboardType="numeric"
                style={{ borderWidth: 1, marginVertical: 10, padding: 5 }}
            />
            <Button title="Ir" color="purple" onPress={() => {
                const num = Number(inputPage);
                if (num >= 1) setPage(num);
            }} />
        </View>
    );
}