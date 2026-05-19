import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity,  ActivityIndicator } from 'react-native';
import { Image } from 'expo-image';
import { Text, View } from '@/components/Themed';

// Definindo a interface para organizar o retorno da API
interface LogoData {
  name: string;
  url: string;
}

export default function TabOneScreen() {
  // Estados para armazenar os dados do logo e controlar o loading
  const [logo, setLogo] = useState<LogoData | null>(null);
  const [loading, setLoading] = useState(false);

  // Função assíncrona para buscar os dados na API
  const fetchRandomLogo = async () => {
    setLoading(true);
    try {
      // Certifique-se de usar https:// para requisições seguras no mobile
      const response = await fetch('https://www.logotypes.dev/random/data');
      const data = await response.json();
        console.log("RETORNO DA API:", JSON.stringify(data, null, 2));
      
      // Atualiza o estado. Nota: Ajuste 'data.name' e 'data.url' conforme o JSON real da sua API
      setLogo({
          name: data.name || 'Nome indisponível',
                    url: data.logo || '',
      });
    } catch (error) {
      console.error("Erro ao buscar o logo:", error);
      alert("Ops! Não foi possível carregar o logotipo no momento.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Gerador de Logotipos</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />

      {/* Área de exibição do Logo ou do Loading */}
      <View style={styles.contentArea}>
        {loading ? (
          <ActivityIndicator size="large" color="#007BFF" />
        ) : (
          logo && (
            <View style={styles.logoContainer}>
              {logo.url ? (
                <Image
                  source={{ uri: logo.url }}
                  style={styles.logoImage}
                           contentFit="contain"
                           transition={500}
                />
              ) : null}
              <Text style={styles.logoName}>{logo.name}</Text>
            </View>
          )
        )}
      </View>

      {/* Botão de Ação */}
      <TouchableOpacity style={styles.button} onPress={fetchRandomLogo} activeOpacity={0.8}>
        <Text style={styles.buttonText}>Sorteie</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24, // Aumentei um pouco para dar mais destaque
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 20,
    height: 1,
    width: '80%',
  },
  contentArea: {
    height: 250, // Mantém um espaço fixo para a UI não "pular" quando a imagem carregar
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  logoContainer: {
    alignItems: 'center',
  },
  logoImage: {
    width: 200,
    height: 150,
    marginBottom: 15,
  },
  logoName: {
    fontSize: 18,
    fontWeight: '500',
    color: '#333',
  },
  button: {
    backgroundColor: '#007BFF', // Azul solicitado
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 25, // Cantos bem arredondados
    marginTop: 20,
    // Adicionando uma sombra sutil para melhor UX e refinamento visual
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
    textTransform: 'uppercase', // Dá uma cara mais de botão de "Call to Action"
  },
});
