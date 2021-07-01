const getData = async () => {
  const response = await axios.get("http://localhost:8080/data")
  console.log(response)
  const currentValue = response.data.map(item => [item.date, item.value])
  const errorFormatted = response.data.map(item => [item.date, item.error])
  const currentData = response.data.map(item => new Date(item.date).getTime())

  const growing = {
    colors: ['#ffa500'],
    chart: {
      height: 450,
      id: 'production',
      group: 'rate',
      type: 'scatter'
    },
    series: [{
      name: 'Water Production',
      data: currentValue,
      type: 'line'
    },
    ],
    xaxis: {
      type: 'datetime',
      dataLabels: {
        enabled: false
      }
    },
    yaxis: {
      title: {
        text: 'Sm³/d',
        style: {
          color: '#36577b'
        },
      },
      decimalsInFloat: '',
    }
  }
  const secondChart = {
    colors: ['#ff0000'],
    chart: {
      height: 200,
      id: 'error',
      group: 'rate',
      type: 'bar'
    },
    dataLabels: {
      enabled: false
    },
    series: [{
      name: 'error',
      data: errorFormatted
    }],
    xaxis: {
      type: 'datetime',

    },
    yaxis: {
      decimalsInFloat: '',
      dataLabels: {

      }
    }
  }
  const chart = new ApexCharts(document.querySelector("#chart"), growing);
  chart.render();
  const errorChart = new ApexCharts(document.querySelector("#errorChart"), secondChart);
  errorChart.render();
}
getData()