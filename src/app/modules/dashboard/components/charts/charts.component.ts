import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import Chart from 'chart.js/auto';
import { DashboardService } from '../../../../core/services/datatable/dashboard/dashboard.service';
import { StorageService } from '../../../../core/services/storage/storage.service';
import { JwtDecoderService } from '../../../../core/services/jwt/jwt-decoder.service';
import { DashboardTable } from '../../../../core/dto/datatable/dashboardTable.dto';

@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.css']
})
export class ChartsComponent implements OnInit {
  @ViewChild('barChart') barChart!: ElementRef<HTMLCanvasElement>;
  dashboardChart: DashboardTable | undefined;

  constructor(
    private service: DashboardService,
    private storageService: StorageService,
    private jwtDecoderService: JwtDecoderService
  ) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    const token = this.storageService.getToken();
    const decodedToken: any = this.jwtDecoderService.decodeToken(token);
    const branchCode = decodedToken.branchCode;

    this.service.LoadData(branchCode, '2024').subscribe(
      (item: DashboardTable) => {
        this.dashboardChart = item;
        this.createBarChart();
      },
      (error) => {
        console.error('Error loading data', error);
        // Handle error loading data, show error message, etc.
      }
    );
  }

  createBarChart(): void {
    if (!this.dashboardChart) {
      console.error('Dashboard chart data is not available');
      return;
    }

    if (!this.dashboardChart.month || !this.dashboardChart.month[0]?.june) {
      console.error('Invalid dashboard chart data structure');
      return;
    }

    const ctx = this.barChart.nativeElement.getContext('2d');
    if (!ctx) {
      console.error('Failed to get 2D context from canvas element');
      return;
    }

    const labels = this.dashboardChart.month[0].june.map(data => data.currencyCode);
    const totalWithdrawal = this.dashboardChart.month[0].june.map(data => data.totalAmount);

    const chart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [{
          label: 'Total Withdrawal',
          data: totalWithdrawal,
          backgroundColor: 'rgba(255, 102, 0, 0.75)',
        }]
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