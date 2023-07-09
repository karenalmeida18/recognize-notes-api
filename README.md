# Recognize Notes
Projeto desenvolvido para o TCC de Ciência da Computação na FCT-Unesp.

## Descrição e tecnologias

Projeto de acessibilidade focado em auxiliar pessoas com deficiência visual. Foi implementada e treinada uma rede neural convolucional para reconhecer cédulas do real, com um conjunto de dados construído do zero. A partir do modelo treinado e salvo, foi construído uma API em Flask para carregar o modelo, receber uma imagem, processar ela, e retorna a classe que ela pertence. A api foi consumida em um aplicativo em React Native, com uma interface simples e acessível, focada nos usuários com deficência visual, portanto foi integrado conversão de texto em fala para apresentar os resultados. 

<h2> IA </h2>
<h3> Principais Tecnologias </h3> 
- Pytorch
- TorchVision
- Técnica de treinamento: transferência de aprendizado com uma rede pré-treinada.

<h2> Backend - API </h2>
<h3> Principais Tecnologias </h3> 
- Python
- Flask
- Pytorch

<h2> Frontend  - Mobile</h2>
<h3> Principais Tecnologias </h3>

- React Native
- Expo
- expo-speech
- React Native Gesture
  
<h3> Ferramentas de requisição a api </h3> 

- Axios.

## Como rodar o projeto

1. Pacotes necessários: NodeJS e NPM
2. Faça clone do repositório na sua máquina: `git clone https://github.com/karenalmeida18/recognize-notes-api`
3. Acesse a pasta que contém o app, "myapp"
4. Execute o comando para instalar as dependências do projeto: `npm install`
5. Execute o comando para iniciar o projeto: `npx expo start`
6. Instale o expo go em seu celular e abra o QR Code gerado no terminal.

  
