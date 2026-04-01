import { useState, useEffect } from 'react';
import { View, TextInput, Button, FlatList, StyleSheet, Switch } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import TarefaItem from './components/tarefas';

export default function App() {
  const [tarefas, setTarefas] = useState([]);
  const [texto, setTexto] = useState('');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const toogleSwitchDarkMode = () => setIsDarkMode(previousState => !previousState);
  //const [completed, setCompleted] = useState(false);
  //const toggleSwitch = () => setCompleted(previousState => !previousState);

  // 📖 Carregar ao abrir o app
  useEffect(() => {
    //AsyncStorage.clear(); // DESCOMENTE ESTA LINHA UMA VEZ, SALVE E RODE O APP
    carregarTarefas();
  }, []);

  const carregarTarefas = async () => {
    const dados = await AsyncStorage.getItem('tarefas');
    if (dados) setTarefas(JSON.parse(dados));
  };

  const salvarTarefas = async (lista) => {
    await AsyncStorage.setItem('tarefas', JSON.stringify(lista));
  };

  const adicionarTarefa = () => {
    if (!texto.trim()) return;
    const nova = { id: Date.now().toString(), texto, completed: false};
    const novaLista = [...tarefas, nova];
    setTarefas(novaLista);
    salvarTarefas(novaLista);
    setTexto('');
  };

  const removerTarefa = (id) => {
    const novaLista = tarefas.filter((t) => t.id !== id);
    setTarefas(novaLista);
    salvarTarefas(novaLista);
  };

  const concluirTarefa = (id) => {
    const novaLista = tarefas.map((t) =>{
      if(t.id === id){
        return { ...t, completed: true };
      }
      return t
    });
    setTarefas(novaLista);
    salvarTarefas(novaLista);
  };

  return (
    <View style={[styles.container, {backgroundColor: isDarkMode? "#333":  "fff"}]}>
      <Switch
        value = {isDarkMode}
        onValueChange={toogleSwitchDarkMode}
      />
      <TextInput
        value={texto}
        onChangeText={setTexto}
        placeholder="Nova tarefa..."
        style={styles.input}
      />
      <Button title="Adicionar ➕" onPress={adicionarTarefa} />
      <FlatList
        data={tarefas}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TarefaItem tarefa={item} onRemover={removerTarefa} onConcluir={concluirTarefa} isDarkMode={isDarkMode}/>
        )}
      />
      <Button 
        title='Limpar Tarefas'
        onPress={()=>{
          setTarefas([]) 
          salvarTarefas([])
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 40, paddingTop: 60 },
  input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 8,
           padding: 10, marginBottom: 10, fontSize: 16 },
});