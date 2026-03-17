import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useRouter } from 'expo-router';
export default function Home() {
  const router = useRouter();
  return (
    <View style={styles.container}>
        <View style = {styles.foto}>
            <Text style = {styles.letra}>G</Text>
        </View>
      <Text style={styles.titulo}>Guilherme Rezende</Text>
      <TouchableOpacity style={styles.botao} onPress={() => router.push('/sobre')}>
        <Text style={styles.botaoTexto}>Ver meu perfil</Text>
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#f5f5f5' },
  titulo:    { fontSize: 32, fontWeight: 'bold', marginBottom: 24 },
  botao:     { backgroundColor: '#E83D84', padding: 16, borderRadius: 12 },
  botaoTexto:{ color: '#fff', fontSize: 16, fontWeight: '600' },
  foto: {height:100, width:100, borderRadius:50, backgroundColor:'#E83D84', alignItems:'center', justifyContent:'center', marginBottom:30},
  letra: {fontSize:40}
});
