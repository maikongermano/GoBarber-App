import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler'; // botao melhorado do react

export const Container = styled(RectButton)`
  width: 100%;
  height: 60px;
  padding: 0 16px;
  background: #ff9000;
  border-radius: 10px;
  margin-top: 8px;

  flex-direction: row;

  align-items: center;
`;

export const ButtonText = styled.Text`
  flex: 1;
  text-align: center;
  font-family: 'RobotoSlab-Medium';
  color: #312e38;
  font-size: 18px;
`;
