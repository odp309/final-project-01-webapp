import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrl: './charts.component.css'
})
export class ChartsComponent implements OnInit {
  private chart: any;

  private salesData = [
    { currencyCode: 'USD', currencyName: 'United States dollar', totalSales: 65, totalPurchase: 28 },
    { currencyCode: 'SGD', currencyName: 'Singapore dollar', totalSales: 59, totalPurchase: 48 },
    { currencyCode: 'JPY', currencyName: 'Japanese yen', totalSales: 80, totalPurchase: 40 },
    { currencyCode: 'EUR', currencyName: 'Euro', totalSales: 81, totalPurchase: 19 },
    { currencyCode: 'GBP', currencyName: 'Pound sterling', totalSales: 56, totalPurchase: 86 },
    { currencyCode: 'AUD', currencyName: 'Australian dollar', totalSales: 55, totalPurchase: 27 },
    { currencyCode: 'MYR', currencyName: 'Malaysian ringgit', totalSales: 40, totalPurchase: 90 },
    { currencyCode: 'NZD', currencyName: 'New Zealand dollar', totalSales: 70, totalPurchase: 50 },
    { currencyCode: 'THB', currencyName: 'Thai baht', totalSales: 65, totalPurchase: 30 },
    { currencyCode: 'CNY', currencyName: 'Chinese yuan', totalSales: 75, totalPurchase: 60 },
    { currencyCode: 'CAD', currencyName: 'Canadian dollar', totalSales: 60, totalPurchase: 40 },
    { currencyCode: 'CHF', currencyName: 'Swiss Franc', totalSales: 55, totalPurchase: 45 },
    { currencyCode: 'HKD', currencyName: 'Hong Kong dollar', totalSales: 70, totalPurchase: 35 }
  ];

  ngOnInit(): void {
      this.createBarChart();
  }

  createBarChart() {
    const ctx = document.getElementById('barChart') as HTMLCanvasElement;
    const labels = this.salesData.map(data => data.currencyCode);
    const totalSales = this.salesData.map(data => data.totalSales);
    const totalPurchases = this.salesData.map(data => data.totalPurchase);

    const chart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [
                {
                    label: 'Total Sales',
                    data: totalSales,
                    backgroundColor: 'rgba(0, 83, 93, 0.75)',
                },
                {
                    label: 'Total Purchase',
                    data: totalPurchases,
                    backgroundColor: 'rgba(255, 102, 0, 0.75)',
                }
            ]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            },
            plugins: {
                legend: {
                    position: 'bottom'
                }
            }
        }
    });
  }
}
