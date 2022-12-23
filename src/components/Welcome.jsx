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
          'rgb(255, 99, 132)',
          'rgb(54, 162, 235)',
          'rgb(55, 205, 86)',
          'rgb(255, 05, 86)',
          'rgb(255, 205, 100)',
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
  };

  return (
    <div>
      <h3 className="subtitle">
        Selamat Datang Kembali <strong className="fs-4">{user && user.name}</strong>
      </h3>

      <canvas id="myChart"></canvas>
    </div>
  );
};

export default Welcome;
