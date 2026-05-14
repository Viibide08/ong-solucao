import React, { useState, useEffect } from 'react';
import { FlatList, ActivityIndicator, StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import ONGCard from '@/components/ONGCard';

export default function ExploreScreen() {
  const [loading, setLoading] = useState(true);
  const [ongs, setOngs] = useState<any[]>([]);
  const [selecionada, setSelecionada] = useState<any>(null); // Estado para a ONG clicada

  useEffect(() => {
    const timer = setTimeout(() => {
      const dadosSimulados = [
        { id: '1', nome: 'Patinhas Livres', causa: 'Proteção Animal', imagem: 'https://picsum.photos/200' },
        { id: '2', nome: 'Verde Infinito', causa: 'Meio Ambiente', imagem: 'https://picsum.photos/201' },
        { id: '3', nome: 'Educa Mais', causa: 'Educação', imagem: 'https://picsum.photos/202' },
      ];
      setOngs(dadosSimulados);
      setLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

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