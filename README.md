# 🐾 Kedra Pet - Dispenser de Ração Inteligente via Web

Kedra Pet é um sistema automatizado de alimentação para pets, controlado por uma plataforma web. Desenvolvido como Trabalho de Conclusão de Curso (TCC) do curso Técnico em Informática da Escola Agrícola de Jundiaí – UFRN, o projeto integra hardware, software embarcado e uma interface web moderna para facilitar a vida de tutores de animais.

---

## 🎯 Objetivo

Permitir que tutores cadastrem, configurem e executem remotamente alimentações para seus animais com controle preciso de horário e quantidade de ração, tudo por meio de uma plataforma intuitiva, com um dispenser físico integrado ao sistema via ESP32.

---

## ✅ Funcionalidades

- Cadastro e login de usuários
- Registro e visualização de refeições
- Conexão do sistema com o dispenser via WebSocket
- Controle remoto de:
  - ✔️ Distribuição de alimento
  - ⚖️ Leitura do peso do prato
  - 🛠️ Calibração automática da balança

---

## 🧠 Tecnologias Utilizadas

### 💻 Web
- HTML, CSS, JavaScript
- Firebase Realtime Database (armazenamento em nuvem)
- Node.js (API + WebSocket)

### 🤖 Firmware / Hardware
- ESP32
- C++ com Programação Orientada a Objetos
- Servo Motor
- Sensor de carga com módulo HX711

---

## 📁 Estrutura do Projeto

TCC/
├── kedra-server/               # Plataforma Web + Backend
│   ├── public/                 # Páginas HTML, CSS e JS
│   │   ├── login.html
│   │   ├── sign-up.html
│   │   ├── dashboard.html
│   │   └── dispenser.html
│   ├── server.js               # Servidor Node.js
│   ├── package.json
│   └── serviceAccountKey.json # Autenticação Firebase
├── esp32/                      # Código para ESP32
│   ├── main.cpp
│   ├── MotorController.cpp/.h
│   ├── SensorCarga.cpp/.h
│   ├── Refeicao.cpp/.h
│   └── WebSocketConnection.cpp/.h

---

## 📋 Documentação Técnica

* 📌 **Requisitos funcionais e não funcionais**
* 🗂️ **Documento de requisitos**
* 🧾 **Diagrama de Casos de Uso**
* 🧱 **Diagrama de Classes**
* 🔌 **Integração com hardware**
* 🧪 **Testes e validações**
* 🧪 Simulação de circuito via Wokwi:
  [🔗 Projeto no Wokwi](https://wokwi.com/projects/413043738404595713)

---

## 🎓 Informações Acadêmicas

* **Projeto**: Kedra Pet – Dispenser de Ração via Web
* **Autor**: Juan Gabriel Gomes
* **Curso**: Técnico em Informática
* **Instituição**: Escola Agrícola de Jundiaí – UFRN
* **Orientador**: Prof. Dr. Josenalde Barbosa de Oliveira
* **Ano**: 2024

---

## 📫 Contato

* GitHub: https://github.com/JuanGabrielGomes
* LinkedIn: www.linkedin.com/in/juan-gabriel-gomes-274474282
* E-mail: juangabrielgomes.dev@gmail.com
