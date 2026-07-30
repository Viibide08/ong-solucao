import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  StyleSheet, 
  Image, 
  Alert, 
  TextInput, 
  ScrollView, 
  KeyboardAvoidingView, 
  Platform 
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';

// IMPORTA A FUNÇÃO PARA ADICIONAR NA STORE COMPARTILHADA
import { adicionarCausaNaLista } from '@/constants/CausasStore';

export default function ProfileScreen() {
  // Estados do Formulário de Cadastro da Causa
  const [titulo, setTitulo] = useState('');
  const [descricao, setDescricao] = useState('');
  const [interesse, setInteresse] = useState('Educação');
  const [showOptions, setShowOptions] = useState(false);
  
  // Estado para a Foto da Causa (Requisito 1 e 3)
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const selecionarCausa = (causa: string) => {
    setInteresse(causa);
    setShowOptions(false);
  };

  // --- 1. TIRAR FOTO (CÂMERA) ---
  const takePhoto = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();

    if (status !== 'granted') {
      Alert.alert('Permissão Negada', 'Precisamos de permissão para usar a câmera!');
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [16, 9],
      quality: 0.7,
    });

    // Se cancelou a operação, limpa o estado (Requisito 3)
    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
    } else {
      setSelectedImage(null);
    }
  };

  // --- 2. ESCOLHER DA GALERIA ---
  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (status !== 'granted') {
      Alert.alert('Permissão Negada', 'Precisamos de acesso às suas fotos!');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [16, 9],
      quality: 0.7,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
    } else {
      setSelectedImage(null);
    }
  };

  // --- 3. SALVAR FORMULÁRIO ---
  const handleCadastrarCausa = () => {
    if (!titulo.trim()) {
      Alert.alert('Campo Obrigatório', 'Por favor, informe o título da causa.');
      return;
    }

    if (!selectedImage) {
      Alert.alert('Foto Obrigatória', 'Por favor, adicione uma foto para a causa.');
      return;
    }

    // ADICIONA A CAUSA CRIADA NA LISTA COMPARTILHADA
    adicionarCausaNaLista({
      id: Date.now().toString(),
      nome: titulo,
      causa: interesse,
      descricao: descricao,
      imagem: selectedImage,
    });

    Alert.alert('Sucesso! 🎉', 'Nova Causa Cadastrada com Sucesso!');
    
    // Limpa o formulário após salvar
    setTitulo('');
    setDescricao('');
    setSelectedImage(null);
  };

  return (
    <KeyboardAvoidingView 
      style={{ flex: 1 }} 
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Cadastrar Nova Causa 🚀</Text>

        <View style={styles.card}>
          {/* Campo Título */}
          <Text style={styles.label}>Título da Causa:</Text>
          <TextInput
            style={styles.input}
            placeholder="Ex: Resgate de Animais"
            value={titulo}
            onChangeText={setTitulo}
          />

          {/* Campo Categoria / Interesse */}
          <Text style={styles.label}>Categoria:</Text>
          <Text style={styles.interesseText}>{interesse}</Text>

          {/* Opções de Categoria */}
          {showOptions ? (
            <View style={styles.optionsBox}>
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
              style={styles.btnSelect} 
              onPress={() => setShowOptions(true)}
            >
              <Text style={styles.btnSelectText}>Alterar Categoria</Text>
            </TouchableOpacity>
          )}

          {/* Campo Descrição */}
          <Text style={styles.label}>Descrição da Causa:</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="Conte um pouco sobre essa causa..."
            value={descricao}
            onChangeText={setDescricao}
            multiline
            numberOfLines={3}
          />

          {/* Área e Preview da Foto */}
          <Text style={styles.label}>Foto da Causa:</Text>
          <View style={styles.imageContainer}>
            {selectedImage ? (
              <Image source={{ uri: selectedImage }} style={styles.previewImage} />
            ) : (
              <Text style={styles.placeholderText}>Nenhuma foto selecionada</Text>
            )}
          </View>

          {/* Botões Câmera / Galeria */}
          <View style={styles.imageButtonRow}>
            <TouchableOpacity style={styles.photoBtn} onPress={takePhoto}>
              <Text style={styles.photoBtnText}>Câmera 📷</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.photoBtn, { backgroundColor: '#2ecc71' }]} onPress={pickImage}>
              <Text style={styles.photoBtnText}>Galeria 🖼️</Text>
            </TouchableOpacity>
          </View>

          {/* Botão para Submeter o Formulário */}
          <TouchableOpacity style={styles.submitBtn} onPress={handleCadastrarCausa}>
            <Text style={styles.submitBtnText}>SALVAR CAUSA</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { 
    padding: 20, 
    backgroundColor: '#f5f5f5',
    flexGrow: 1,
    paddingTop: 50,
  },
  title: { 
    fontSize: 24, 
    fontWeight: 'bold', 
    marginBottom: 15, 
    color: '#333', 
    textAlign: 'center' 
  },
  card: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 15,
    width: '100%',
    elevation: 3,
  },
  label: { 
    fontSize: 14, 
    fontWeight: 'bold', 
    color: '#555', 
    marginTop: 10,
    marginBottom: 5 
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 10,
    fontSize: 14,
    backgroundColor: '#fafafa',
  },
  textArea: {
    height: 70,
    textAlignVertical: 'top',
  },
  interesseText: { 
    fontSize: 16, 
    color: '#74c4fe', 
    fontWeight: 'bold',
    marginBottom: 5 
  },
  btnSelect: {
    backgroundColor: '#e0f0ff',
    padding: 8,
    borderRadius: 6,
    alignItems: 'center',
    marginBottom: 10,
  },
  btnSelectText: {
    color: '#007bff',
    fontWeight: 'bold',
    fontSize: 12,
  },
  optionsBox: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#74c4fe',
    marginBottom: 10,
  },
  optBtn: { padding: 8, backgroundColor: '#f0f8ff', borderRadius: 6, marginBottom: 5 },
  optText: { textAlign: 'center', color: '#007bff', fontSize: 13 },
  imageContainer: {
    height: 150,
    borderRadius: 10,
    backgroundColor: '#eee',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 5,
    marginBottom: 10,
    overflow: 'hidden',
  },
  previewImage: { width: '100%', height: '100%' },
  placeholderText: { color: '#aaa', fontSize: 13 },
  imageButtonRow: { flexDirection: 'row', gap: 10, marginBottom: 20 },
  photoBtn: { 
    flex: 1, 
    backgroundColor: '#74c4fe', 
    paddingVertical: 10, 
    borderRadius: 8, 
    alignItems: 'center' 
  },
  photoBtnText: { color: '#fff', fontSize: 13, fontWeight: 'bold' },
  submitBtn: {
    backgroundColor: '#333',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 5,
  },
  submitBtnText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 15,
  }
});