import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

// O segredo está em receber o onPress aqui nas propriedades...
export default function ONGCard({ nome, causa, imagem, onPress }: any) {
  return (
    // ...e colocar ele aqui no TouchableOpacity!
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.7}>
      <Image source={{ uri: imagem }} style={styles.image} />
      <View style={styles.info}>
        <Text style={styles.nome}>{nome}</Text>
        <Text style={styles.causa}>{causa}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 10,
    marginBottom: 15,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  image: { width: 60, height: 60, borderRadius: 30 },
  info: { marginLeft: 15, justifyContent: 'center' },
  nome: { fontSize: 18, fontWeight: 'bold', color: '#333' },
  causa: { fontSize: 14, color: '#666' }
});