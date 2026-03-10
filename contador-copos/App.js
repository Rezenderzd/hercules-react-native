import { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
export default function App() {
  const [count, setCount] = useState(0);
  const [msg, setMsg] = useState('Toque para registar quantos copos de água tomou!');
  useEffect(() => {
    if (count >= 8) setMsg('🏆 Meta do dia atingida!');
    else setMsg(`Continue bebendo água, ainda não atingiu a meta. Faltam ${8-count} copos.`);
  }, [count]);
  return (
      <View style={styles.container}>
        <Text style={styles.msg}>{msg}</Text>
        <Text style={styles.counter}>{count}</Text>
        <View style={styles.btnField}>
          <TouchableOpacity style={styles.btn} onPress={() => setCount(count + 1)}>
            <Text style={styles.btnText}>Adicionar!</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btnReset} onPress={() => setCount(0)}>
            <Text style={styles.btnResetText}>Reset!</Text>
          </TouchableOpacity>
        </View>
      </View>
  );
}
const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#0f0f0f'},
  msg:       { color: '#aaa', fontSize: 22, marginBottom: 12, width: 300, textAlign:'center' },
  counter:   { color: '#fff', fontSize: 72, fontWeight: 'bold' },
  btnField:  { flexDirection:'row', gap:20},
  btn:       { marginTop: 24, backgroundColor: '#4f772d', paddingHorizontal: 40, paddingVertical: 16, borderRadius: 50 },
  btnText:   { color: '#fff', fontSize: 20, fontWeight: 'bold' },
  btnReset:  { marginTop: 24, backgroundColor: '#bf0603', paddingHorizontal: 40, paddingVertical: 16, borderRadius: 50 },
  btnResetText: { color: '#fff', fontSize:20},
});
