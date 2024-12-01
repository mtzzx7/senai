//Atualização de dados fictícios (em produção, conecte ao ESP32 via API ou WebSocket)
document.addEventListener("DOMContentLoaded", () => {
  const consumoAtual = document.getElementById("consumoAtual");
  const energiaTotal = document.getElementById("energiaTotal");

  // Atualização de dados a cada 2 segundos
  setInterval(() => {
    const consumo = (Math.random() * 5).toFixed(2);
    const energia = (Math.random() * 100).toFixed(2);

    consumoAtual.textContent = `${consumo} kW`;
    energiaTotal.textContent = `${energia} kWh`;

    updateChart(consumo);
  }, 2000);
});

// Configuração do gráfico
const ctx = document.getElementById("graficoConsumo").getContext("2d");
const data = {
  labels: [],
  datasets: [{
    label: 'Consumo (kW)',
    data: [],
    borderColor: '#0fa0e4',
    backgroundColor: '#0fa0e4',
    fill: true,
  }]
};
const config = {
  type: 'line',
  data: data,
  options: {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: 'top',
      }
    },
    scales: {
      x: { display: true },
      y: { display: true }
    }
  }
};
const graficoConsumo = new Chart(ctx, config);

// Atualiza o gráfico com novos valores
function updateChart(consumo) {
  const now = new Date();
  const timeLabel = `${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`;

  if (data.labels.length >= 10) {
    data.labels.shift();
    data.datasets[0].data.shift();
  }

  data.labels.push(timeLabel);
  data.datasets[0].data.push(consumo);
  graficoConsumo.update();
}