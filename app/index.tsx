// import React from 'react';
// import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

// export default function App() {
//   return (
//     <View style={styles.container}>
//       <View style={styles.content}>

//         {/* 2. Logo da Empresa (Placeholder) */}
//         <Image
//           source={require('../assets/images/logo.png')} // Certifique-se de ter um logo.png na pasta assets
//           style={styles.logo}
//           resizeMode="contain" // Isso faz a imagem caber dentro do espaço sem cortar
//         />

//         {/* 3. Nome e Slogan */}
//         <Text style={styles.title}>ONG CONNECT</Text>
//         <Text style={styles.slogan}>Por um planeta habitável!</Text>

//         {/* BOTÃO ADICIONADO ABAIXO */}
//         <TouchableOpacity
//           style={styles.button}
//           onPress={() => console.log('Botão Login pressionado!')}
//         >
//           <Text style={styles.buttonText}>ENTRAR</Text>
//         </TouchableOpacity>
//       </View>
//     </View>
//   );
// }

// // 4. Desafio de Autonomia: Criando o StyleSheet e definindo a identidade visual
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     // Laranja para Beleza (Representando energia e rejuvenescimento)
//     backgroundColor: '#74c4feff',
//   },
//   content: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//     padding: 20,
//   },
//   logo: {
//     width: 150,
//     height: 150,
//     borderRadius: 75, // Deixa o logo circular
//     marginBottom: 20,
//     borderWidth: 3,
//     borderColor: '#FFFFFF',
//     backgroundColor: '#FFFFFF', // Adicionei fundo branco para o logo aparecer melhor no círculo
//   },
//   title: {
//     fontSize: 28,
//     fontWeight: 'bold',
//     color: '#FFFFFF',
//     marginBottom: 10,
//     textAlign: 'center',
//   },
//   slogan: {
//     fontSize: 18,
//     fontStyle: 'italic',
//     color: '#E0E0E0',
//     textAlign: 'center',
//     paddingHorizontal: 10,
//     marginBottom: 30, // Dei um espaço para o botão não colar no texto
//   },
//   // ESTILOS DO BOTÃO
//   button: {
//     backgroundColor: '#FFFFFF',
//     paddingVertical: 12,
//     paddingHorizontal: 40,
//     borderRadius: 25,
//     elevation: 3, // Sombrinha no Android
//     shadowColor: '#000', // Sombrinha no iOS
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.2,
//   },
//   buttonText: {
//     color: '#25221fff',
//     fontSize: 18,
//     fontWeight: 'bold',
//   },
// });
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <View style={styles.content}>

        {/* 2. Logo da Empresa (Placeholder) */}
        <Image
          source={require('../assets/images/logo.png')} 
          style={styles.logo}
          resizeMode="contain" // pra imagem caber sem cortar
        />

        {/* 3. Nome e Slogan */}
        <Text style={styles.title}>ONG CONNECT</Text>
        <Text style={styles.slogan}>Por um planeta habitável!</Text>

        {/* BOTÃO ADICIONADO ABAIXO */}
        <TouchableOpacity
          style={styles.button}
          onPress={() => console.log('Botão Login pressionado!')}
        >
          <Text style={styles.buttonText}>ENTRAR</Text>
        </TouchableOpacity>

        {/* NOVO BOTÃO SUBLINHADO ABAIXO */}
        <TouchableOpacity
          style={styles.secondaryButton}
          onPress={() => console.log('Botão Criar Conta pressionado!')}
        >
          <Text style={styles.secondaryButtonText}>LOGIN</Text>
        </TouchableOpacity>

      </View>
    </View>
  );
}

// 4. Desafio de Autonomia
const styles = StyleSheet.create({
  container: {
    flex: 1,
    //cor azul da ong aqui embaixo
    backgroundColor: '#74c4feff',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  logo: {
    width: 150,
    height: 150,
    borderRadius: 75, // deixa a borda redondinha
    marginBottom: 20,
    borderWidth: 3,
    borderColor: '#FFFFFF',
    backgroundColor: '#FFFFFF', // Adicionei fundo branco para o logo aparecer melhor no círculo
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 10,
    textAlign: 'center',
  },
  slogan: {
    fontSize: 18,
    fontStyle: 'italic',
    color: '#E0E0E0',
    textAlign: 'center',
    paddingHorizontal: 10,
    marginBottom: 30, // Dei um espaço para o botão não colar no texto
  },
  // ESTILOS DO BOTÃO
  button: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 25,
    elevation: 3, // Sombrinha no Android
    shadowColor: '#000', // Sombrinha no iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
  },
  buttonText: {
    color: '#25221fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  // ESTILOS DO NOVO BOTÃO SUBLINHADO
  secondaryButton: {
    marginTop: 20, // Espaço entre os dois botões
    backgroundColor: 'transparent',
  },
  secondaryButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    textDecorationLine: 'underline', // Faz o sublinhado
  },
});