import { View, Text, Image, StyleSheet, TouchableOpacity,Linking } from 'react-native';

export default function App() {
  const usuario = {
    nome: "Guilherme Rezende",
    bio: "FIAP - Ciências da computação - 3º semestre",
    frase: "Enquanto houver 1% de chance, haverá 99% de fé",
    avatar: "https://media.licdn.com/dms/image/v2/D4E03AQFnrgvOp6Gv6A/profile-displayphoto-scale_200_200/B4EZlABYeVKkAY-/0/1757715730021?e=1773878400&v=beta&t=8zq2vZSdwtqgMbg-ci8G1ls6AKp_IpbvhYqtVBuqDpc",
  };
  return (
    <View style={styles.container}>
      {/* Avatar */}
      <Image
        source={{ uri: usuario.avatar }}
        style={styles.avatar}
      />
      {/* Nome */}
      <Text style={styles.nome}>{usuario.nome}</Text>
      {/* Bio */}
      <Text style={styles.bio}>{usuario.bio}</Text>
      {/* Stats */}
      <View style={styles.stats}>
        <Text style={styles.stat}>{usuario.frase}</Text>
      </View>
      <View style={styles.logos}>
        <TouchableOpacity onPress = {()=>{Linking.openURL('https://github.com/Rezenderzd')}}>
          <Image
            source={{uri: "https://cdn-icons-png.flaticon.com/256/25/25231.png"}}
            style = {styles.logo}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress = {()=>Linking.openURL('https://www.linkedin.com/in/guilherme-rezende-24407b373/')}>
          <Image
            source={{uri: "https://www.gov.br/observatorio/pt-br/assuntos/programas-academicos/pos-graduacao-em-geofisica/documentos/icones/linkedin.png"}}
            style = {styles.logo}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#8c7a6b',
    padding: 20,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 0,
    borderColor: '#90323d',
    marginBottom: 16,
  },
  nome: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#90323d',
    marginBottom: 8,
  },
  bio: {
    fontSize: 14,
    color: '#90323d',
    textAlign: 'center',
    marginBottom: 16,
  },
  stats: {
    backgroundColor: '#7f5539',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
  },
  stat: {
    color: '#ede0d4',
    fontSize: 14,
  },
  logos:{
    display:'flex',
    flexDirection:'row',
    gap:20,
    marginTop:20,
  },
  logo:{
    width:100,
    height:100,
    borderRadius: 50,
  },
});