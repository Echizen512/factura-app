import * as ImagePicker from 'expo-image-picker';
import * as DocumentPicker from 'expo-document-picker';

import { useRouter } from 'expo-router';
import { useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  TouchableHighlight,
  View,
} from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import {
  Appbar,
  Button,
  Text,
  IconButton,
  useTheme,
  List,
} from 'react-native-paper';
import { Image } from 'expo-image';
import { TailwindPallete } from '@/constants/TailwindColors';

export default function CompanyDocumentScreen() {
  const router = useRouter();
  const theme = useTheme();

  //states
  const [companyLogo, setCompanyLogo] = useState<string | null>(null);
  const [rfc, setRfc] = useState<string | null>(null);
  const [key, setKey] = useState<{ uri: string; name: string } | null>(null);
  const [cer, setCer] = useState<{ uri: string; name: string } | null>(null);

  //functions
  const handleUploadLogo = async () => {
    const res: ImagePicker.ImagePickerResult =
      await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        aspect: [3, 3],
        quality: 1,
        allowsMultipleSelection: false,
      });

    res.assets !== null && setCompanyLogo(res.assets[0].uri);
  };

  const handleUploadRfc = async () => {
    const res: ImagePicker.ImagePickerResult =
      await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        aspect: [6, 4],
        quality: 1,
        allowsMultipleSelection: false,
      });

    res.assets !== null && setRfc(res.assets[0].uri);
  };

  const handleUploadKey = async () => {
    const res = await DocumentPicker.getDocumentAsync({
      multiple: false,
      type: 'application/octet-stream',
    });

    res.assets !== null &&
      setKey({
        name: res.assets[0].name,
        uri: res.assets[0].uri,
      });
  };

  const handleUploadCer = async () => {
    const res = await DocumentPicker.getDocumentAsync({
      multiple: false,
      type: ['application/x-x509-ca-cert', 'application/octet-stream'],
    });

    res.assets !== null &&
      setCer({
        name: res.assets[0].name,
        uri: res.assets[0].uri,
      });
  };

  return (
    <SafeAreaProvider>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => router.back()} />
        <Appbar.Content title='Registro de Empresa' />
      </Appbar.Header>

      <SafeAreaView style={styles.container}>
        <ScrollView>
          <View style={styles.scrollContainer}>
            {/* Company Logo  */}
            <View>
              <Text variant='titleMedium' style={{ textAlign: 'center' }}>
                {companyLogo === null ? 'Cargar' : 'Cambiar'} Logo de la empresa
              </Text>

              {companyLogo === null ? (
                <IconButton
                  icon={'image'}
                  onPress={handleUploadLogo}
                  containerColor={theme.colors.primary}
                  size={30}
                  style={styles.iconButton}
                />
              ) : (
                <TouchableHighlight onPress={handleUploadLogo}>
                  <Image
                    source={{ uri: companyLogo }}
                    contentFit='cover'
                    style={styles.logo}
                  />
                </TouchableHighlight>
              )}
            </View>

            {/* RFC */}
            <View>
              <View style={styles.containerTitle}>
                <Text variant='titleMedium'>
                  {companyLogo === null ? 'Cargar' : 'Cambiar'} RFC
                </Text>
                <Text
                  variant='titleMedium'
                  style={{
                    color: TailwindPallete.red500,
                  }}
                >
                  *
                </Text>
              </View>
              {rfc === null ? (
                <IconButton
                  icon={'image'}
                  onPress={handleUploadRfc}
                  containerColor={theme.colors.primary}
                  size={30}
                  style={styles.iconButton}
                />
              ) : (
                <TouchableHighlight onPress={handleUploadRfc}>
                  <Image
                    source={{ uri: rfc }}
                    contentFit='cover'
                    style={styles.rfcImage}
                  />
                </TouchableHighlight>
              )}
            </View>

            {/* .KEY */}
            <View>
              <View style={styles.containerTitle}>
                <Text variant='titleMedium' style={{ textAlign: 'center' }}>
                  {companyLogo === null ? 'Cargar' : 'Cambiar'} documento .KEY
                </Text>
                <Text
                  variant='titleMedium'
                  style={{
                    color: TailwindPallete.red500,
                  }}
                >
                  *
                </Text>
              </View>
              {key === null ? (
                <IconButton
                  icon={'folder'}
                  onPress={handleUploadKey}
                  containerColor={theme.colors.primary}
                  size={30}
                  style={styles.iconButton}
                />
              ) : (
                <List.Item
                  title={key.name}
                  style={{ marginHorizontal: 50 }}
                  left={(props) => <List.Icon {...props} icon='key' />}
                  onPress={handleUploadKey}
                />
              )}
            </View>

            {/* .CER */}
            <View>
              <View style={styles.containerTitle}>
                <Text variant='titleMedium' style={{ textAlign: 'center' }}>
                  {companyLogo === null ? 'Cargar' : 'Cambiar'} documento .CER
                </Text>
                <Text
                  variant='titleMedium'
                  style={{
                    color: TailwindPallete.red500,
                  }}
                >
                  *
                </Text>
              </View>
              {cer === null ? (
                <IconButton
                  icon={'folder'}
                  onPress={handleUploadCer}
                  containerColor={theme.colors.primary}
                  size={30}
                  style={styles.iconButton}
                />
              ) : (
                <List.Item
                  title={cer.name}
                  style={{ marginHorizontal: 50 }}
                  left={(props) => <List.Icon {...props} icon='key' />}
                  onPress={handleUploadCer}
                />
              )}
            </View>

            <Button
              style={styles.buttonSend}
              mode='contained'
              onPress={() => router.navigate('/screens/register/companyInfo')}
              icon={'arrow-right'}
              contentStyle={{ flexDirection: 'row-reverse' }}
              disabled={rfc === null || key === null || cer === null}
            >
              Continuar
            </Button>
            <Text variant='bodySmall' style={{ textAlign: 'center' }}>
              Los campos marcados con * son obligatorios
            </Text>
          </View>
        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 16,
  },
  scrollContainer: {
    gap: 20,
    marginBottom: 20,
  },
  containerTitle: {
    flexDirection: 'row',
    marginHorizontal: 'auto',
    gap: 5,
  },
  iconButton: {
    marginHorizontal: 'auto',
    width: 55,
    height: 55,
  },
  logo: {
    width: 150,
    height: 150,
    borderRadius: 10,
    marginHorizontal: 'auto',
  },
  rfcImage: {
    width: '100%',
    height: 180,
  },
  buttonSend: {
    marginHorizontal: 20,
  },
});
