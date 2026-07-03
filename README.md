# Prantinhas

App React Native para cuidar de plantas, baseado no design [Figma Prantinhas](https://www.figma.com/design/n0qJgrRuxQataqyFrwdXzJ/prantinhas?node-id=7-27).

## Stack

- Expo SDK 57
- React Native 0.86
- TypeScript
- React Navigation
- Fonte Inter (Google Fonts)

## Telas implementadas

- Splash
- Onboarding (3 slides)
- Login e Cadastro
- Home (lista de plantas)
- Detalhe da planta
- Edição da planta
- Hidratação em lote
- Cadastro de nova planta (Registration + Organ Select)

## Design tokens

| Token | Cor |
|-------|-----|
| Primary | `#2C8653` |
| Secondary | `#A0D468` |
| Background | `#E0E0E0` |
| Surface | `#F0F0F0` |
| Text title | `#1E1E1E` |
| Text subtitle | `#6E6E6E` |

## Como executar

```bash
npm install
npm start
```

Depois escaneie o QR code com o Expo Go ou pressione `a` (Android) / `i` (iOS) no terminal.

## Estrutura

```
src/
  components/   # Button, Input, PlantCard, HeaderBanner...
  screens/      # Telas do app
  navigation/   # Stack navigator
  theme/        # Cores e tipografia
  data/         # Dados mock das plantas
  types/        # Tipos TypeScript
assets/images/  # Logo, folhas, ícones do Figma
```

## Próximos passos sugeridos

- Integrar backend e autenticação real
- Persistência local com AsyncStorage ou SQLite
- Câmera para fotos das plantas
- Notificações de hidratação
- Análise por IA conforme fluxo do onboarding
