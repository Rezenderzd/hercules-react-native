import { useState, useRef, useEffect } from 'react';
import {
  View, Text, TextInput, TouchableOpacity,
  Switch, ScrollView, Alert, StyleSheet,
  KeyboardAvoidingView, Platform,
} from 'react-native';
// --- Funções de máscara ---
const formatarCPF = (v) =>
  v.replace(/\D/g, '')
   .replace(/(\d{3})(\d)/, '$1.$2')
   .replace(/(\d{3})(\d)/, '$1.$2')
   .replace(/(\d{3})(\d{1,2})/, '$1-$2')
   .slice(0, 14);

const formatarTel = (v) =>
  v.replace(/\D/g, '')
   .replace(/(\d{2})(\d)/, '($1) $2')
   .replace(/(\d{5})(\d{1,4})/, '$1-$2')
   .slice(0, 15);

const Campo = ({ label, erro, children }) => (
  <View style={styles.campoWrapper}>
    <Text style={styles.label}>{label}</Text>
    {children}
    {erro ? <Text style={styles.erro}>{erro}</Text> : null}
  </View>
);

   // --- Perfis disponíveis ---
const PERFIS = ['Estudante', 'Profissional', 'Freelancer'];
export default function App() {
  const [preenchido, setPreenchido] = useState(false);
  const [nome, setNome]             = useState('');
  const [email, setEmail]           = useState('');
  const [senha, setSenha]           = useState('');
  const [senhaVisivel, setSenhaVisivel] = useState(false);
  const [cpf, setCpf]               = useState('');
  const [tel, setTel]               = useState('');
  const [perfil, setPerfil]         = useState('');
  const [termos, setTermos]         = useState(false);
  const [erros, setErros]           = useState({});
  const [carregando, setCarregando] = useState(false);
  const emailRef = useRef(null);
  const senhaRef = useRef(null);
  const cpfRef   = useRef(null);
  const telRef   = useRef(null);

  const validar = () => {
    const e = {};
    if (!nome.trim())          e.nome   = 'Nome obrigatório';
    if (!validarEmail(email))  e.email  = 'E-mail inválido';
    if (!senha.trim())          e.senha  = 'Senha obrigatória';
    if (cpf.length < 14)       e.cpf    = 'CPF incompleto';
    if (tel.length < 14)       e.tel    = 'Telefone incompleto';
    if (!perfil)               e.perfil = 'Escolha um perfil';
    if (!termos)               e.termos = 'Aceite os termos para continuar';
    setErros(e);
    return Object.keys(e).length === 0;
  };

  const validarEmail = (email) =>{
    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (regexEmail.test(email)) {
      return true;
    }else{
      return false;
    }
  }

  const handleSubmit = () => {
    if (!validar()) return;
    setCarregando(true);
    setTimeout(() => {
      setCarregando(false);
      Alert.alert('🎉 Cadastro realizado!', `Bem-vindo(a), ${nome}!`);
      setCpf('');
      setEmail('');
      setNome('');
      setSenha('');
      setPerfil('');
      setTel('');
      setTermos(false);
      setSenhaVisivel(false);
    }, 1500);
  };

  const validacaoConstante = () =>{
    if (!nome.trim())          return false;
    if (!validarEmail(email))  return false;
    if (!senha.trim())          return false;
    if (cpf.length < 14)       return false;
    if (tel.length < 14)       return false;
    if (!perfil)               return false;
    if (!termos)               return false;
    return true;
  }

  useEffect(()=>{
    let valido = validacaoConstante();
    setPreenchido(valido);
  },[nome, email, senha, cpf, tel, perfil, termos])

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps="handled"
      >
        <Text style={styles.titulo}>📋 Cadastro</Text>
        {/* Nome */}
        <Campo label="Nome completo" erro={erros.nome}>
          <TextInput
            placeholder="Ex: Maria Silva"
            value={nome}
            onChangeText={setNome}
            returnKeyType="next"
            onSubmitEditing={() => emailRef.current.focus()}
            style={[styles.input, erros.nome && styles.inputErro]}
          />
        </Campo>
        {/* E-mail */}
        <Campo label="E-mail" erro={erros.email}>
          <TextInput
            ref={emailRef}
            placeholder="maria@email.com"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            returnKeyType="next"
            onSubmitEditing={() => senhaRef.current.focus()}
            style={[styles.input, erros.email && styles.inputErro]}
          />
        </Campo>
        {/* Senha */}
        <Campo label="Senha" erro={erros.senha}>
          <TextInput
            ref={senhaRef}
            placeholder="*******"
            value={senha}
            onChangeText={setSenha}
            keyboardType="default"
            returnKeyType="next"
            secureTextEntry = {!senhaVisivel}
            onSubmitEditing={() => cpfRef.current.focus()}
            style={[styles.input, erros.senha && styles.inputErro]}
          />
          <Text onPress={() => setSenhaVisivel(!senhaVisivel)} style={styles.senhaVisivel}>
            {senhaVisivel? '🙈' : '👁️'}
          </Text>
        </Campo>
        {/* CPF */}
        <Campo label="CPF" erro={erros.cpf}>
          <TextInput
            ref={cpfRef}
            placeholder="000.000.000-00"
            value={cpf}
            onChangeText={(v) => setCpf(formatarCPF(v))}
            keyboardType="numeric"
            maxLength={14}
            returnKeyType="next"
            onSubmitEditing={() => telRef.current.focus()}
            style={[styles.input, erros.cpf && styles.inputErro]}
          />
        </Campo>
        {/* Telefone */}
        <Campo label="Telefone" erro={erros.tel}>
          <TextInput
            ref={telRef}
            placeholder="(11) 99999-9999"
            value={tel}
            onChangeText={(v) => setTel(formatarTel(v))}
            keyboardType="phone-pad"
            maxLength={15}
            returnKeyType="done"
            style={[styles.input, erros.tel && styles.inputErro]}
          />
        </Campo>
        {/* Perfil */}
        <Campo label="Perfil" erro={erros.perfil}>
          <View style={styles.chips}>
            {PERFIS.map((op) => (
              <TouchableOpacity
                key={op}
                onPress={() => setPerfil(op)}
                style={[styles.chip, perfil === op && styles.chipAtivo]}
              >
                <Text style={{ color: perfil === op ? '#fff' : '#555' }}>
                  {op}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </Campo>
        {/* Termos */}
        <View style={styles.termosRow}>
          <Switch
            value={termos}
            onValueChange={setTermos}
            trackColor={{ false: '#ccc', true: '#6c47ff' }}
          />
          <Text style={styles.termosText}>Aceito os termos de uso</Text>
        </View>
        {erros.termos ? <Text style={styles.erro}>{erros.termos}</Text> : null}
        {/* Botão */}
        <TouchableOpacity
          style={[styles.botao, {backgroundColor: preenchido ? "#09b63a": "#6c47ff"}, carregando && { opacity: 0.6 }]}
          onPress={handleSubmit}
          disabled={carregando}
        >
          <Text style={styles.botaoTexto}>
            {carregando ? 'Enviando...' : 'Criar conta'}
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
const styles = StyleSheet.create({
  container: {
    padding: 24,
    paddingBottom: 60,
    backgroundColor: '#f5f5f5',
  },
  titulo: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 24,
    color: '#333',
  },
  campoWrapper: { marginBottom: 16 },
  label: { fontSize: 14, fontWeight: '600', color: '#444', marginBottom: 6 },
  input: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    padding: 14,
    fontSize: 16,
  },
  senhaVisivel:{
    position: 'absolute',
    right: 16,
    top: 38,
    fontSize: 18,
  },
  inputErro: { borderColor: 'red' },
  erro: { color: 'red', fontSize: 12, marginTop: 4 },
  chips: { flexDirection: 'row', gap: 8, flexWrap: 'wrap' },
  chip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#eee',
  },
  chipAtivo: { backgroundColor: '#6c47ff' },
  termosRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 4,
  },
  termosText: { fontSize: 15, color: '#333' },
  botao: {
    backgroundColor: '#6c47ff',
    borderRadius: 10,
    padding: 16,
    alignItems: 'center',
    marginTop: 24,
  },
  botaoTexto: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
});