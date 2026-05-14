import React, { useState } from 'react'; 
import { Image, StyleSheet, Text, TouchableOpacity, View, TextInput, Alert } from 'react-native'; 
import { useRouter } from 'expo-router'; // IMPORTAÇÃO DO ROTEADOR

export default function App() {
  const router = useRouter(); // INICIALIZAÇÃO DO ROTEADOR
  const [email, setEmail] = useState(''); 
  const [senha, setSenha] = useState(''); 

  const handleLogin = () => {
    // Validação conforme o desafio
    if (email.includes('@') && senha.length > 6) {
      console.log("✅ Acesso autorizado para:", email);
      
      // NAVEGAÇÃO REAL: Vai para a aba "Explorar" dentro do grupo (tabs)
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

        {/* 1. logo */}
        <Image
          source={require('../assets/images/logo.png')} 
          style={styles.logo}
          resizeMode="contain"
        />

        <Text style={styles.title}>ONG CONNECT</Text>
        <Text style={styles.slogan}>Por um planeta habitável!</Text>

        {/* 2.form*/}
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

        {/* persistencia */}
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
          onPress={() => console.log('Botão Criar Conta pressionado!')}
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
    backgroundColor: '#74c4feff', 
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  logo: {
    width: 130,
    height: 130,
    borderRadius: 65,
    marginBottom: 15,
    borderWidth: 3,
    borderColor: '#FFFFFF',
    backgroundColor: '#FFFFFF',
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
    color: '#25221fff',
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