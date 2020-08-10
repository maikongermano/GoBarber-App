import React, { useCallback, useEffect, useState } from 'react';
import Icon from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../../hooks/auth';

import {
  Container,
  Header,
  HeaderTitle,
  UserName,
  ProfileButton,
  UserAvatar,
  ProviderList,
  ProviderListTitle,
  ProviderContainer,
  ProviderAvatar,
  ProviderInfo,
  ProviderName,
  ProviderMeta,
  ProviderMetaText,
} from './styles';
import api from '../../services/api';

export interface Provider {
  id: string;
  name: string;
  avatar_url: string;
}

const Dashboard: React.FC = () => {
  const [providers, setProvider] = useState<Provider[]>([]);

  const { signOut, user } = useAuth();
  const { navigate } = useNavigation();

  // buscar dados
  useEffect(() => {
    api.get('providers').then(response => {
      setProvider(response.data);
    });
  }, []);

  // navegação para o profile
  const navigateToProfile = useCallback(() => {
    navigate('Profile'); // rota para o profile
  }, [navigate]);

  // navegação para o agendamento
  const navigateToCreateAppointment = useCallback(
    (providerId: string) => {
      navigate('CreateAppointment', { providerId });
    },
    [navigate],
  );

  return (
    <Container>
      <Header>
        <HeaderTitle>
          Bem vindo, {'\n'}
          <UserName>{user.name}</UserName>
        </HeaderTitle>
        <ProfileButton onPress={navigateToProfile}>
          <UserAvatar
            source={{
              uri:
                user.avatar_url ||
                'https://gravatar.com/avatar/1f3a2926b3ac730ff6c86bfcf98f8338?s=400&d=robohash&r=x',
            }}
          />
        </ProfileButton>
      </Header>
      <ProviderList
        data={providers}
        keyExtractor={provider => provider.id}
        ListHeaderComponent={<ProviderListTitle>Barbeiros</ProviderListTitle>}
        renderItem={({ item: provider }) => (
          <ProviderContainer
            onPress={() => {
              navigateToCreateAppointment(provider.id);
            }}
          >
            <ProviderAvatar
              source={{
                uri:
                  provider.avatar_url ||
                  'https://gravatar.com/avatar/1f3a2926b3ac730ff6c86bfcf98f8338?s=400&d=robohash&r=x',
              }}
            />
            <ProviderInfo>
              <ProviderName>{provider.name}</ProviderName>
              <ProviderMeta>
                <Icon name="calendar" size={14} color="#ff9000" />
                <ProviderMetaText>Segunda à sexta</ProviderMetaText>
              </ProviderMeta>
              <ProviderMeta>
                <Icon name="clock" size={14} color="#ff9000" />
                <ProviderMetaText>8h às 18h</ProviderMetaText>
              </ProviderMeta>
            </ProviderInfo>
          </ProviderContainer>
        )}
      />
    </Container>
  );
};

export default Dashboard;
