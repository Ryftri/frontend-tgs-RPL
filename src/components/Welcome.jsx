import React, { useState , useEffect} from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { Chart } from "chart.js/auto";

const Welcome = () => {
  const { user } = useSelector((state) => state.auth);
  const [products, setProducts] = useState([]);
  

  useEffect(() => {
    getProducts();
  }, []);
  
  const getProducts = async () => {
    const response = await axios.get("http://localhost:5000/products");

    const data = {
      labels: response.data.map(product => product.name),
      datasets: [{
        label: 'Data Product',
        data: response.data.map(product => product.quantity),
        backgroundColor: [
          'rgb(66, 63, 62)',
          'rgb(43, 43, 43)',
        ]
      }]
    };

    Chart.defaults.font.size = 20;
    const chart = new Chart(document.getElementById('myChart'), {
      type: 'doughnut',
      data: data,
    })
    chart.canvas.parentNode.style.height = '500px';
    chart.canvas.parentNode.style.width = '500px';
    Chart.defaults.color = '#FFF';
  };

  return (
    <div>
      <h3 className="subtitle">
        Selamat Datang Kembali <p className="fs-4 fw-bold">{user && user.name}</p>
      </h3>

      <canvas id="myChart"></canvas>
    </div>
  );
};

export default Welcome;
