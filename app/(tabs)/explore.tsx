import React, { useState, useEffect } from 'react';
import { FlatList, ActivityIndicator, StyleSheet, View, Text, TouchableOpacity, Alert, Platform } from 'react-native';
import { Accelerometer } from 'expo-sensors'; // Importa o Acelerômetro
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import ONGCard from '@/components/ONGCard';

// 1. IMPORTA A LISTA COMPARTILHADA DA STORE
import { listaCausas } from '@/constants/CausasStore';

export default function ExploreScreen() {
  const [loading, setLoading] = useState(true);
  const [ongs, setOngs] = useState<any[]>([]);
  const [selecionada, setSelecionada] = useState<any>(null); // Estado para a ONG clicada

  // --- REQUISITO 2: SHAKE TO REFRESH ---
  useEffect(() => {
    if (Platform.OS === 'web') return;

    Accelerometer.setUpdateInterval(100);

    const subscription = Accelerometer.addListener(({ x, y, z }) => {
      const totalForce = Math.abs(x) + Math.abs(y) + Math.abs(z);

      // Limiar de força para detectar o chacoalhão
      if (totalForce > 3.5) {
        Alert.alert(
          "🔄 Sincronizando...",
          "Buscando novas doações e causas sociais no servidor!"
        );
      }
    });

    return () => subscription.remove();
  }, []);

  // --- CARREGAMENTO DAS ONGS DA STORE COMPARTILHADA ---
  useEffect(() => {
    const timer = setTimeout(() => {
      // 2. AQUI: Em vez dos dados simulados fixos, usamos a listaCausas
      setOngs([...listaCausas]);
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, [ongs]); // Atualiza se a lista mudar

  if (loading) {
    return (
      <ThemedView style={styles.center}>
        <ActivityIndicator size="large" color="#74c4fe" />
        <ThemedText style={{ marginTop: 10 }}>Carregando ONGs...</ThemedText>
      </ThemedView>
    );
  }

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title" style={styles.title}>Explorar Causas</ThemedText>

      {/* DETALHE DA ONG (Substitui o Alerta que não abre) */}
      {selecionada && (
        <View style={styles.detailBox}>
          <Text style={styles.detailTitle}>📍 {selecionada.nome}</Text>
          <Text style={styles.detailText}>Causa: {selecionada.causa}</Text>
          <TouchableOpacity onPress={() => setSelecionada(null)}>
            <Text style={styles.closeText}>Fechar detalhe [X]</Text>
          </TouchableOpacity>
        </View>
      )}

      <FlatList
        data={ongs}
        keyExtractor={(item: any) => item.id}
        renderItem={({ item }: any) => (
          <ONGCard 
            nome={item.nome} 
            causa={item.causa} 
            imagem={item.imagem} 
            onPress={() => setSelecionada(item)} // Salva a ONG clicada no estado
          />
        )}
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, paddingTop: 60 },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  title: { marginBottom: 20 },
  detailBox: {
    backgroundColor: '#e3f2fd',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
    borderLeftWidth: 5,
    borderLeftColor: '#74c4fe',
  },
  detailTitle: { fontWeight: 'bold', fontSize: 16 },
  detailText: { color: '#555', marginVertical: 5 },
  closeText: { color: '#ff4444', fontSize: 12, fontWeight: 'bold', marginTop: 5 }
});