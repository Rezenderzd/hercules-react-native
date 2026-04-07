import { View, Text, StyleSheet, TouchableOpacity, FlatList } from "react-native"
import {useCarrinho} from "../context/CarrinhoContext"


export default function Carrinho(){
    const {carrinho, setCarrinho} = useCarrinho()
    let total = 0
    carrinho.forEach(produto => {
        total+=produto.preco
    });

    const limparCarrinho = () =>{
        setCarrinho([])
        total = 0
    }

    const pagar = () =>{
        if(total<=0){
            alert("Seu carrinho está vazio! Adicione produtos para realizar o pagamento.")
            return
        }
        alert(`Pagamento realizado no valor de R$ ${total.toFixed(2)}!`)
        limparCarrinho()
    }

    return(
        <View style={styles.container}>
            <Text style = {styles.title}>Seu carrinho atual:</Text>


            <FlatList
                data={carrinho}
                keyExtractor={item => item.id}
                renderItem={({ item }) => (
                  <View style={styles.productContainer}>
                    <Text>{item.nome}</Text>
                    <Text>R$ {item.preco.toFixed(2)}</Text>
                  </View>
                )}
            />

            <Text style = {styles.totalText}> Total: R$ {total.toFixed(2)}</Text>
            <View style={styles.btnField}>
                <TouchableOpacity style={styles.pay} onPress={()=> pagar()}>
                    <Text>Pagar</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.cleanCarBtn} onPress={()=> limparCarrinho()}>
                    <Text>Limpar carrinho</Text>
                </TouchableOpacity>
            </View>
            
        </View>
    )
}

const styles = StyleSheet.create({
    container:{flex:1, padding:20},
    title: {fontSize:22, marginBottom:10},
    productContainer: {
        backgroundColor: '#2296f3',
        padding: 20,
        marginVertical:10,
        borderRadius: 10,
        flexDirection:'row',
        justifyContent:'space-between'
    },
    totalText:{ fontSize:18, fontWeight:'bold', marginTop:20},
    btnField:{flexDirection:'row', justifyContent:'space-around', width:'100%'},
    pay:{backgroundColor:'#2296f3', alignItems:'center', padding:15, borderRadius:10, marginTop:20, width:'40%'},
    cleanCarBtn:{backgroundColor:'#f12e2e', alignItems:'center', padding:15, borderRadius:10, marginTop:20, width:'40%'}
})
