import React, { useCallback, useMemo } from 'react';
import Icon from 'react-native-vector-icons/Feather';
import { format } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';

import { useNavigation, useRoute } from '@react-navigation/native';
import {
  Container,
  Title,
  Description,
  OkButton,
  OkButtonText,
} from './styles';

// params
interface RouteParams {
  date: number;
}

const AppointmentCreated: React.FC = () => {
  // pegar os parametros passado da tela anterior
  const { params } = useRoute();
  const routeParams = params as RouteParams;
  // reset => reseta as rotas e leva para nova rota
  const { reset } = useNavigation();
  const handleOkPressed = useCallback(() => {
    // resetar e levar para rota Dashboard
    reset({
      routes: [
        {
          name: 'Dashboard',
        },
      ],
      index: 0,
    });
  }, [reset]);

  // formata data
  const formattedDate = useMemo(() => {
    return format(
      routeParams.date,
      "EEEE', dia' dd 'de' MMMM 'de' yyyy 'às' HH:mm'h'",
      { locale: ptBR },
    );
  }, [routeParams.date]);

  return (
    <Container>
      <Icon name="check" size={80} color="#04d361" />

      <Title>Agendamento concluído</Title>
      <Description>{formattedDate}</Description>
      <OkButton onPress={handleOkPressed}>
        <OkButtonText>Ok</OkButtonText>
      </OkButton>
    </Container>
  );
};

export default AppointmentCreated;
