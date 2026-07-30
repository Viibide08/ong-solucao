import React, { useState } from 'react'; 
import { Image, StyleSheet, Text, TouchableOpacity, View, TextInput, Alert } from 'react-native'; 
import { useRouter } from 'expo-router'; 

export default function IndexScreen() {
  const router = useRouter(); 
  const [email, setEmail] = useState(''); 
  const [senha, setSenha] = useState(''); 

  const handleLogin = () => {
    // Validação do desafio
    if (email.includes('@') && senha.length > 6) {
      console.log("✅ Acesso autorizado para:", email);
      
      // Navega para as abas
      router.replace('/(tabs)/explore'); 
    } else {
      console.log("❌ Falha no login: E-mail inválido ou senha muito curta.");
      Alert.alert(
        "Erro no Login", 
        "E-mail inválido ou senha muito curta (mínimo 7 caracteres)."
      );
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>

        {/* 1. Logo com tratamento de fallback */}
        <View style={styles.logoContainer}>
          <Text style={{ fontSize: 40 }}>🌍</Text>
        </View>

        <Text style={styles.title}>ONG CONNECT</Text>
        <Text style={styles.slogan}>Por um planeta habitável!</Text>

        {/* 2. Formulário */}
        <TextInput
          style={styles.input}
          placeholder="Digite seu e-mail"
          placeholderTextColor="#E0E0E0"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address" 
          autoCapitalize="none"        
        />

        <TextInput
          style={styles.input}
          placeholder="Digite sua senha"
          placeholderTextColor="#E0E0E0"
          value={senha}
          onChangeText={setSenha}
          secureTextEntry={true}
        />

        {/* Persistência / Feedback */}
        <Text style={styles.helperText}>
          Logando como: {email || "..."}
        </Text>

        {/* 3. Botões */}
        <TouchableOpacity
          style={styles.button}
          onPress={handleLogin} 
        >
          <Text style={styles.buttonText}>ENTRAR</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.secondaryButton}
          onPress={() => Alert.alert("Criar Conta", "Funcionalidade em desenvolvimento!")}
        >
          <Text style={styles.secondaryButtonText}>CRIAR CONTA</Text>
        </TouchableOpacity>

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#74c4fe', 
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  logoContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 15,
    borderWidth: 3,
    borderColor: '#FFFFFF',
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 5,
    textAlign: 'center',
  },
  slogan: {
    fontSize: 16,
    fontStyle: 'italic',
    color: '#E0E0E0',
    textAlign: 'center',
    marginBottom: 30,
  },
  input: {
    width: '100%',
    height: 50,
    borderBottomWidth: 1,
    borderBottomColor: '#FFFFFF',
    color: '#FFFFFF',
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  helperText: {
    color: '#FFFFFF',
    fontSize: 12,
    marginBottom: 20,
    fontStyle: 'italic',
  },
  button: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 12,
    paddingHorizontal: 60,
    borderRadius: 25,
    elevation: 3,
    marginTop: 10,
  },
  buttonText: {
    color: '#25221f',
    fontSize: 18,
    fontWeight: 'bold',
  },
  secondaryButton: {
    marginTop: 20,
    backgroundColor: 'transparent',
  },
  secondaryButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    textDecorationLine: 'underline',
  },
});