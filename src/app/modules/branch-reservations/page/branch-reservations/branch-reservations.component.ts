import { Component, OnInit } from '@angular/core';
import { ReservationTable } from '../../../../core/dto/datatable/reservationTable.dto';
import { Config } from 'datatables.net';
import { Subject } from 'rxjs';
import { ReservationService } from '../../../../core/services/datatable/reservations/reservation.service';

@Component({
  selector: 'app-branch-reservations',
  templateUrl: './branch-reservations.component.html',
  styleUrl: './branch-reservations.component.css',
})
export class BranchReservationsComponent implements OnInit {
  reservationTable: ReservationTable[] = [];
  dtoptions: Config = {};
  dttrigger: Subject<any> = new Subject<any>();
  selectedStatus: string = 'all';

  constructor(private service: ReservationService) {}

  // get today date, delete this if the api response is valid
  reservationDate: Date = new Date();

  ngOnInit(): void {
    this.dtoptions = {
      columnDefs: [{ targets: '_all', className: 'dt-head-center' }],
      info: true,
      paging: true,
      autoWidth: true,
      language: {
        searchPlaceholder: 'Search Exchange Rate',
      },
    };
    this.loadData();
  }

  loadData() {
    this.service.LoadData().subscribe(
      (item) => {
        this.reservationTable = item;
        this.dttrigger.next(null);
      },
      (error) => {
        console.error('Error loading data', error);
      }
    );
  }
  

  reservationDetails(){
    console.log("open reservation details page")
  }

  getStatusClass(status: string): string {
    switch (status) {
      case 'Scheduled':
        return 'scheduled';
      case 'Expired':
        return 'expired';
      case 'Done':
        return 'done';
      default:
        return '';
    }
  }

  filterStatus(): void {
    const table = $('#reservationTable').DataTable();
    const filterValue = this.selectedStatus === 'all' ? '' : this.selectedStatus;
    table.column(5).search(filterValue, true, false).draw();
  }
}
