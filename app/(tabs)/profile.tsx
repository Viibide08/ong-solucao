import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function ProfileScreen() {
  // Estado para controlar se as opções aparecem ou não
  const [showOptions, setShowOptions] = useState(false);
  const [interesse, setInteresse] = useState('Nenhum selecionado');

  const selecionarCausa = (causa: string) => {
    setInteresse(causa);
    setShowOptions(false); // Fecha as opções após selecionar
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Perfil do Voluntário</Text>
      
      <View style={styles.card}>
        <Text style={styles.userName}>👤 Bem-vindo, Voluntário!</Text>
        <Text style={styles.label}>Causa de interesse:</Text>
        <Text style={styles.interesseText}>{interesse}</Text>
      </View>

      {/* Se showOptions for verdadeiro, mostra os botões de causas */}
      {showOptions ? (
        <View style={styles.optionsBox}>
          <Text style={styles.optionsTitle}>Escolha uma causa:</Text>
          <TouchableOpacity style={styles.optBtn} onPress={() => selecionarCausa("Educação")}>
            <Text style={styles.optText}>📚 Educação</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.optBtn} onPress={() => selecionarCausa("Meio Ambiente")}>
            <Text style={styles.optText}>🌳 Meio Ambiente</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.optBtn, { backgroundColor: '#ffcccc' }]} onPress={() => setShowOptions(false)}>
            <Text style={[styles.optText, { color: '#ff4444' }]}>Cancelar</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <TouchableOpacity 
          style={styles.button} 
          onPress={() => setShowOptions(true)}
        >
          <Text style={styles.buttonText}>EDITAR INTERESSES</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#f5f5f5', padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, color: '#333' },
  card: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 15,
    width: '100%',
    alignItems: 'center',
    marginBottom: 20,
    elevation: 3,
  },
  userName: { fontSize: 18, fontWeight: '600' },
  label: { fontSize: 12, color: '#999', marginTop: 10 },
  interesseText: { fontSize: 18, color: '#74c4fe', fontWeight: 'bold' },
  button: { backgroundColor: '#74c4fe', padding: 15, width: '100%', borderRadius: 10, alignItems: 'center' },
  buttonText: { color: '#fff', fontWeight: 'bold' },
  // Estilos da caixa de opções (que substitui o Alert)
  optionsBox: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 15,
    width: '100%',
    borderWidth: 1,
    borderColor: '#74c4fe',
  },
  optionsTitle: { textAlign: 'center', marginBottom: 10, fontWeight: 'bold' },
  optBtn: { padding: 12, backgroundColor: '#f0f8ff', borderRadius: 8, marginBottom: 8 },
  optText: { textAlign: 'center', color: '#007bff', fontWeight: '500' }
});