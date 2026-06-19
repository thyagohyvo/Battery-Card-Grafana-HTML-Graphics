# 🔋 Battery Card - Grafana HTML Graphics

> Card visual interativo para monitoramento de bateria/nobreak no Grafana, usando o plugin **HTML Graphics**.

<img width="419" height="422" alt="image" src="https://github.com/user-attachments/assets/14d4a00b-d8c3-4210-b846-0476deefc391" />

---

## 📋 Visão Geral

Este card exibe em tempo real:

- **Nível da bateria** (%) com barra visual animada
- **Status dinâmico** com código de cores por faixa de carga
- **Tempo de carga** em minutos (calculado a partir do campo `runtime` em segundos)
- **Modo operacional** -`CARREGANDO` ou `ESTÁVEL`

---

## 🖼️ Preview

| Nível | Cor | Status |
|-------|-----|--------|
| 81–100% | 🟢 Verde `#22c55e` | NORMAL |
| 51–80% | 🟡 Amarelo `#eab308` | ATENÇÃO |
| 21–50% | 🟠 Laranja `#f97316` | BAIXO |
| 0–20% | 🔴 Vermelho `#ef4444` | CRÍTICO |

---

## 🔧 Requisitos

- **Grafana** v8.0+
- Plugin **[HTML Graphics](https://grafana.com/grafana/plugins/gapit-htmlgraphics-panel/)** instalado
- Fonte de dados com campos:
  - `capacity` -nível da bateria em `%` (0–100)
  - `runtime` -tempo de carga em **segundos**

---

## 🚀 Como Usar

### 1. Instale o plugin HTML Graphics

```bash
grafana-cli plugins install marcusolsson-html-panel
```

Reinicie o Grafana após a instalação.

### 2. Crie um novo painel

No dashboard, adicione um painel e selecione **HTML Graphics** como visualização.

### 3. Cole os arquivos

No editor do painel, cole o conteúdo de cada arquivo na aba correspondente:

| Arquivo | Aba no Plugin |
|---------|---------------|
| `style.css` | **CSS** |
| `index.html` | **HTML** |
| `script.js` | **JavaScript** |

### 4. Configure a fonte de dados

Certifique-se de que sua query retorna campos com os nomes `capacity` e `runtime` (ou contendo essas palavras -a detecção é por `includes`).

---

## 📁 Estrutura dos Arquivos

```
battery-card/
├── index.html     # Estrutura do card (boxes, bateria visual)
├── style.css      # Estilização dark theme
├── script.js      # Lógica: leitura dos dados, animação, cores
└── README.md
```

---

## ⚙️ Funcionamento do Script

O script percorre todas as `data.series` do Grafana buscando os campos por nome:

```js
// Detecta automaticamente por nome do campo
if (name.includes("capacity")) → nível da bateria
if (name.includes("runtime"))  → tempo de carga (em segundos → converte para minutos)
```

A barra visual (`#battery_fill`) tem altura animada via CSS `transition: all 0.5s ease` e muda de cor conforme a faixa de nível.

---

## 🎨 Personalização

### Alterar faixas de cor

No `script.js`, edite o bloco de condicionais:

```js
if (percent <= 20) {
  color = "#ef4444";   // vermelho
  status = "CRÍTICO";
} else if (percent <= 50) {
  color = "#f97316";   // laranja
  status = "BAIXO";
} else if (percent <= 80) {
  color = "#eab308";   // amarelo
  status = "ATENÇÃO";
} else {
  color = "#22c55e";   // verde
  status = "NORMAL";
}
```

### Alterar tamanho da bateria visual

No `style.css`:

```css
.battery-body {
  width: 80px;    /* largura */
  height: 180px;  /* altura */
}
```

---
<img width="926" height="827" alt="image" src="https://github.com/user-attachments/assets/ef828c6f-514d-441b-9639-5e7cdb9fbb64" />

## 📡 Exemplo de Query (InfluxDB / SNMP)

```sql
-- InfluxDB exemplo para nobreak via SNMP
SELECT last("upsAdvBatteryCapacity") AS "capacity",
       last("upsAdvBatteryRunTimeRemaining") AS "runtime"
FROM "snmp"
WHERE $timeFilter
```

> O campo `runtime` deve estar em **segundos**. O card converte automaticamente para minutos.

---

## 🐛 Troubleshooting

| Problema | Solução |
|----------|---------|
| Card mostra `--` | Verifique se os campos `capacity` e `runtime` existem na query |
| Barra não anima | Confirme que o plugin HTML Graphics está atualizado |
| Cores não mudam | Certifique-se que `capacity` retorna valor numérico (0–100) |

---

## 📄 Licença

MIT - sinta-se livre para usar, modificar e distribuir. Se este card te ajudou e você for compartilhar em alguma rede social, blog ou fórum, considere fazer uma referência a este repositório como base. Isso ajuda a comunidade a encontrar o projeto e contribui para que mais pessoas se beneficiem da solução. 🙌 🔗
