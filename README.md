# upload-file

Sistema web para upload de arquivos, permitindo aos usuários enviar e armazenar documentos como PDF, Word, e imagens (JPEG, PNG, SVG).

## Funcionalidades

1. **Suporte a múltiplos tipos de arquivos:**
   - Imagens (`image/*`)
   - Arquivos PDF (`.pdf`)
   - Documentos Word (`.doc`, `.docx`)

2. **Limite de tamanho de arquivo:**
   - Restrição de 25 MB para o tamanho total dos arquivos enviados.

3. **Feedback visual:**
   - Lista de arquivos carregados com nome e tamanho exibidos na interface.

4. **Envio para o backend:**
   - Uso da API Fetch para enviar arquivos para um servidor backend no endpoint `http://localhost:8080/files/upload`.

## Pré-requisitos

### Frontend

- Navegador moderno com suporte a JavaScript ES6.

### Backend

- Servidor Java configurado para receber arquivos através de um endpoint `POST` no caminho `/files/upload`.
- O backend deve aceitar requisições no formato `multipart/form-data`.

## Estrutura de Arquivos

```/
├── index.html       # Interface principal do dropzone
├── style.css        # Estilo para o dropzone
└── script.js        # Lógica para upload de arquivos
```

## Como Usar

1. **Abra o arquivo `index.html` em um navegador.**
   - A interface do dropzone será exibida, permitindo o carregamento de arquivos.

2. **Adicione arquivos arrastando-os ou selecionando pelo botão.**
   - A lista de arquivos será exibida com nome e tamanho.

3. **Clique em Salvar.**
   - Os arquivos serão enviados para o servidor.

4. **Mensagens de retorno:**
   - Sucesso: Exibe um alerta com o ID de resposta do servidor.
   - Falha: Exibe uma mensagem de erro.

## Personalização

### Alterar tipos de arquivos aceitos

No arquivo `script.js`, você pode alterar os tipos de arquivos permitidos modificando a linha:

```javascript
inputElement.setAttribute("accept", "image/*,.pdf,.doc,.docx");
```

### Alterar o limite de tamanho

Modifique a variável `fileLimit` para ajustar o limite:

```javascript
const fileLimit = 25000000; // Tamanho em bytes (25 MB)
```

## Considerações de Segurança

1. **Validação no Backend:** Certifique-se de validar os arquivos recebidos no servidor para evitar problemas de segurança, como injeções ou uploads maliciosos.
2. **Restrição de Tipos de Arquivos:** Valide os tipos de arquivos no backend, mesmo que já exista uma restrição no frontend.

## Tecnologias Utilizadas

- **HTML5:** Estrutura básica da interface.
- **CSS3:** Estilização do dropzone.
- **JavaScript (ES6):** Lógica para gerenciamento de arquivos e envio.
- **Java (Spring Boot):** Backend para armazenamento de arquivos.

### Contribuição

Sinta-se à vontade para clonar este repositório e contribuir com melhorias. Sugestões e pull requests são bem-vindos!
