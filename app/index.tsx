import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, Alert, ActivityIndicator } from 'react-native';
import NetInfo from '@react-native-community/netinfo';
import AsyncStorage from '@react-native-storage/async-storage'; // Instale se não tiver: npx expo install @react-native-async-storage/async-storage

export default function DonationScreen() {
  const [isConnected, setIsConnected] = useState<boolean | null>(false);
  const [photo, setPhoto] = useState<string | null>(null); // Armazena a URI da foto selecionada
  const [isSending, setIsSending] = useState(false);

  // 1. LISTENER DE REDE (Mesma lógica do Observer Pattern do Dashboard)
  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      setIsConnected(state.isConnected);

      // SE MUDAR PARA ONLINE: Tenta enviar fotos salvas localmente automaticamente
      if (state.isConnected) {
        checkAndSyncOfflinePhotos();
      }
    });

    return () => unsubscribe();
  }, []);

  // Simulação de seleção de foto (Substitua pela lógica da sua câmera/galeria)
  const handleSelectPhoto = () => {
    setPhoto("https://picsum.photos"); // Foto mockada para testes
  };

  // 2. FUNÇÃO DE SALVAMENTO OU ENVIO (O coração do Desafio Final)
  const handleSaveDonation = async () => {
    if (!photo) {
      Alert.alert("Erro", "Por favor, selecione ou tire uma foto primeiro.");
      return;
    }

    if (!isConnected) {
      // SE STATUS FOR OFFLINE: Salva localmente de forma persistente
      try {
        setIsSending(true);
        // Busca o que já estava salvo para não sobrescrever
        const existingData = await AsyncStorage.getItem('@offline_photos');
        const photosList = existingData ? JSON.parse(existingData) : [];
        
        // Adiciona a nova foto à fila local
        photosList.push({ id: Date.now().toString(), uri: photo });
        await AsyncStorage.setItem('@offline_photos', JSON.stringify(photosList));

        Alert.alert("Modo Offline", "Sem conexão com a internet. A foto da doação foi salva localmente e será enviada assim que você estiver Online! 🌍");
        setPhoto(null);
      } catch (error) {
        Alert.alert("Erro", "Falha ao salvar dados localmente.");
      } finally {
        setIsSending(false);
      }
    } else {
      // SE STATUS FOR ONLINE: Envia direto para o servidor da ONG
      sendPhotoToServer(photo);
    }
  };

  // 3. FUNÇÃO DE SINCRONIZAÇÃO AUTOMÁTICA AO VOLTAR ONLINE
  const checkAndSyncOfflinePhotos = async () => {
    try {
      const existingData = await AsyncStorage.getItem('@offline_photos');
      if (existingData) {
        const photosList = JSON.parse(existingData);
        
        if (photosList.length > 0) {
          console.log(`🔄 Conexão restaurada! Sincronizando ${photosList.length} foto(s) pendente(s)...`);
          
          // Loop enviando cada foto pendente para o servidor
          for (const item of photosList) {
            await sendPhotoToServer(item.uri, true);
          }

          // Após enviar tudo com sucesso, limpa a fila do armazenamento local
          await AsyncStorage.removeItem('@offline_photos');
          Alert.alert("Sincronização Concluída", "Todas as fotos salvas offline foram enviadas para o servidor com sucesso! 🎉");
        }
      }
    } catch (error) {
      console.log("Erro ao sincronizar dados offline:", error);
    }
  };

  // Função fictícia que representa a sua API/Servidor
  const sendPhotoToServer = async (photoUri: string, isSyncing = false) => {
    setIsSending(true);
    try {
      // Simula uma requisição HTTP POST para o servidor da sua ONG
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      console.log("✅ Foto enviada ao servidor:", photoUri);
      if (!isSyncing) {
        Alert.alert("Sucesso", "Foto da doação enviada diretamente para o servidor da ONG Connect!");
        setPhoto(null);
      }
    } catch (error) {
      if (!isSyncing) Alert.alert("Erro", "Erro ao conectar com o servidor.");
    } finally {
      setIsSending(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Nova Doação</Text>
      
      {/* Indicador visual de status igual ao do Dashboard */}
      <Text style={[styles.statusText, { color: isConnected ? '#16a34a' : '#dc2626' }]}>
        Status: {isConnected ? "🟢 Online" : "🔴 Offline"}
      </Text>

      <TouchableOpacity style={styles.photoButton} onPress={handleSelectPhoto}>
        {photo ? (
          <Image source={{ uri: photo }} style={styles.previewImage} />
        ) : (
          <Text style={styles.photoButtonText}>📸 Capturar Foto da Doação</Text>
        )}
      </TouchableOpacity>

      <TouchableOpacity style={styles.submitButton} onPress={handleSaveDonation} disabled={isSending}>
        {isSending ? <ActivityIndicator color="#FFF" /> : <Text style={styles.submitButtonText}>CONCLUIR DOAÇÃO</Text>}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#74c4fe', padding: 20, justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 24, fontWeight: 'bold', color: '#FFF', marginBottom: 5 },
  statusText: { fontSize: 16, fontWeight: 'bold', marginBottom: 30, backgroundColor: '#FFF', paddingHorizontal: 12, paddingVertical: 4, borderRadius: 10 },
  photoButton: { width: '100%', height: 200, backgroundColor: '#E0E0E0', borderRadius: 15, justifyContent: 'center', alignItems: 'center', marginBottom: 20, overflow: 'hidden' },
  photoButtonText: { color: '#555', fontWeight: 'bold' },
  previewImage: { width: '100%', height: '100%' },
  submitButton: { backgroundColor: '#1E293B', width: '100%', padding: 15, borderRadius: 25, alignItems: 'center' },
  submitButtonText: { color: '#FFF', fontSize: 18, fontWeight: 'bold' }
});
