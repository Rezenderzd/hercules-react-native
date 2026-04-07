import { Tabs } from 'expo-router';
import AntDesign from '@expo/vector-icons/AntDesign';
import Entypo from '@expo/vector-icons/Entypo';
import { CarrinhoProvider } from '../context/CarrinhoContext';

export default function Layout() {
  return (
    <CarrinhoProvider>
      <Tabs screenOptions={{ tabBarActiveTintColor: '#2296f3' }}>
        <Tabs.Screen
          name="index"
          options={{
            title: 'Produtos',
            tabBarIcon: ({ color }) => <AntDesign name="product" size={24} color={color} />,
          }}
        />
        <Tabs.Screen
          name="carrinho"
          options={{
            title: 'Carrinho',
            tabBarIcon: ({ color }) => <Entypo name="shopping-cart" size={24} color={color} />
          }}
        />
      </Tabs>
    </CarrinhoProvider>
  );
}