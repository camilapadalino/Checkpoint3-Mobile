import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';

export default function CharacterCard({ character, isFavorite, onToggleFavorite }) {
    return (
        <View style={{ flexDirection: 'row', marginBottom: 10, alignItems: 'center' }}>
            <Image source={{ uri: character.image }} style={{ width: 80, height: 80, borderRadius: 40 }} />
            <View style={{ flex: 1, marginLeft: 10 }}>
                <Text style={{ fontSize: 16 }}>{character.name}</Text>
            </View>
            <TouchableOpacity onPress={onToggleFavorite}>
                <Text style={{ fontSize: 20, color: isFavorite ? 'gold' : 'gray' }}>
                    {isFavorite ? '★' : '☆'}
                </Text>
            </TouchableOpacity>
        </View>
    );
}