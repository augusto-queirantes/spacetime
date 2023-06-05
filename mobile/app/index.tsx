import * as SecureStore from 'expo-secure-store';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react'
import { styled } from 'nativewind'
import { useRouter } from 'expo-router'
import { ImageBackground, View, Text, TouchableOpacity } from 'react-native';
import { makeRedirectUri, useAuthRequest } from 'expo-auth-session';
import { api } from '../src/lib/api'
import blurBg from '../src/assets/bg-blur.png'
import Stripes from '../src/assets/stripes.svg'
import SpacetimeLogo from '../src/assets/spacetime-logo.svg'

import {
  useFonts,
  Roboto_400Regular,
  Roboto_700Bold
} from '@expo-google-fonts/roboto'

import {
  BaiJamjuree_700Bold
} from '@expo-google-fonts/bai-jamjuree'


const StyledStripts = styled(Stripes)

const discovery = {
  authorizationEndpoint: 'https://github.com/login/oauth/authorize',
  tokenEndpoint: 'https://github.com/login/oauth/access_token',
  revocationEndpoint: 'https://github.com/settings/connections/applications/12a303952da3384c81e2',
};

export default function App() {
	const router = useRouter()

  const [hasLoadedFonts] = useFonts({
    Roboto_400Regular,
    Roboto_700Bold,
    BaiJamjuree_700Bold
  })

  const [_request, response, signInWithGithub] = useAuthRequest(
    {
      clientId: '12a303952da3384c81e2',
      scopes: ['identity'],
      redirectUri: makeRedirectUri({
        scheme: 'spacetime'
      }),
    },
    discovery
  );

	async function handleGithubOAuthCode(code: string) {
		const response = await api.post('/register', {
			code
		})

		const { token } = response.data

		await SecureStore.setItemAsync('token', token)

		router.push('/memories')
	}

  useEffect(() => {
    if (response?.type === 'success') {
      const { code } = response.params;

			handleGithubOAuthCode(code)
    }
  }, [response]);

  if (!hasLoadedFonts) {
    return null
  }

  return (
    <ImageBackground
      source={blurBg}
      className="bg-gray-900 px-8 py-10 flex-1 items-center justify-center relative"
      imageStyle={{ position: 'absolute', left: "-100%" }}
    >
      <StyledStripts className="absolute left-2" />

      <View className="flex-1 items-center justify-center gap-6">
        <SpacetimeLogo />

        <View className="space-y-2">
          <Text className="text-center font-title text-2xl leading-tight text-gray-50">Sua cápsula do tempo</Text>
          <Text className="text-center font-body text-base leading-relaxed text-gray-100">
            Colecione momentos marcantes da sua jornada e compartilhe (se quiser) com o mundo
          </Text>
        </View>

        <TouchableOpacity
          activeOpacity={0.7}
          className="rounded-full bg-green-500 px-5 py-2"
          onPress={() => signInWithGithub()}
        >
          <Text className="font-alt text-sm uppercase text-black">Cadastrar lembrança</Text>
        </TouchableOpacity>
      </View>

      <Text className="text-center font-body text-sm leading-relaxed text-gray-200">
        Feito com 💜 no NLW da Rocketseat
      </Text>

      <StatusBar style="light" translucent />
    </ImageBackground>
  );
}
