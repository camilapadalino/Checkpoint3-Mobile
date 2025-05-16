import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import { FlatList, View } from 'react-native';
import CharacterCard from './Personagem';

export default function FavoritesScreen() {
    const [favorites, setFavorites] = useState([]);

    useEffect(() => {
        const load = async () => {
            try {
                const favs = await AsyncStorage.getItem('favorites');
                setFavorites(favs ? JSON.parse(favs) : []);
            } catch (error) {
                console.error('Erro ao carregar favoritos:', error);
            }
        };
        load();
    }, []);

    const removeFavorite = async (id) => {
        const updated = favorites.filter(f => f.id !== id);
        setFavorites(updated);
        await AsyncStorage.setItem('favorites', JSON.stringify(updated));
    };

    return (
        <View style={{ flex: 1, padding: 10 }}>
            <FlatList
                data={favorites}
                keyExtractor={item => item.id.toString()}
                renderItem={({ item }) => (
                    <CharacterCard
                        character={item}
                        isFavorite={true}
                        onToggleFavorite={() => removeFavorite(item.id)}
                    />
                )}
            />
        </View>
    );
}