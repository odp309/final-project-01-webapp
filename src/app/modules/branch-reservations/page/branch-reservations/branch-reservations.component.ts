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

  constructor(private service: ReservationService) {}

  ngOnInit(): void {
    this.dtoptions = {
      info: true,
      paging: false,
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
}
