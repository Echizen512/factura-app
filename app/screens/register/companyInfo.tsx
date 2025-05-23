import { useRouter } from 'expo-router';
import { useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Appbar, Button, Text, TextInput } from 'react-native-paper';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

export default function CompanyInfoScreen() {
  const router = useRouter();

  //states
  const [companyName, setCompanyName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [web, setWeb] = useState<string>('');

  return (
    <SafeAreaProvider>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => router.back()} />
        <Appbar.Content title='Registro' />
      </Appbar.Header>

      <SafeAreaView style={styles.container}>
        <ScrollView>
          <View style={[styles.container, styles.containerScroll]}>
            <Text variant='headlineSmall' style={{ textAlign: 'center' }}>
              Datos de la empresa
            </Text>

            <TextInput
              label='Nombre de la Empresa'
              value={companyName}
              mode='outlined'
              onChangeText={setCompanyName}
            />

            <TextInput
              label='Correo Electrónico'
              value={email}
              mode='outlined'
              onChangeText={setEmail}
            />

            <TextInput
              label='Sitio Web'
              value={web}
              mode='outlined'
              onChangeText={setWeb}
            />

            <Button
              style={styles.buttonSend}
              mode='contained'
              onPress={() => router.navigate('/screens/login')}
              icon={'arrow-right'}
              contentStyle={{ flexDirection: 'row-reverse' }}
            >
              Continuar
            </Button>
          </View>
        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    gap: 20,
  },
  containerScroll: {
    marginHorizontal: 16,
  },
  containerLogo: {
    alignItems: 'center',
    marginBottom: 40,
  },
  buttonSend: {
    marginTop: 30,
    marginHorizontal: 20,
  },
});
