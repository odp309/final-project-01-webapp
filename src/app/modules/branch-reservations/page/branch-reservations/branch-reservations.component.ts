import { Component, OnInit } from '@angular/core';
import { ReservationTable } from '../../../../core/dto/datatable/reservationTable.dto';
import { Config } from 'datatables.net';
import { Subject } from 'rxjs';
import { ReservationService } from '../../../../core/services/datatable/reservations/reservation.service';
import { FormBuilder } from '@angular/forms';
import { StorageService } from '../../../../core/services/storage/storage.service';
import { JwtDecoderService } from '../../../../core/services/jwt/jwt-decoder.service';

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
  role?: any;
  accessToken?: any;
  user?: any;

  // get today date, delete this if the api response is valid
  reservationDate: Date = new Date();

  constructor(
    private service: ReservationService,
    private formBuilder: FormBuilder,
    private storageService: StorageService,
    private jwtDecoderService: JwtDecoderService,
  ) {
    this.accessToken = localStorage.getItem('jwtToken')?.toString();
  }

  ngOnInit(): void {
    if (this.accessToken) {
      const roles = localStorage.getItem('roles');
      const getRoleName = roles ? JSON.parse(roles) : null;
      this.role = getRoleName.name;
    }
    this.dtoptions = {
      info: true,
      paging: true,
      destroy: true,
      pageLength: 10,
      pagingType: 'full_numbers',
      autoWidth: true,
      language: {
        searchPlaceholder: 'Search Balance',
      },
    },
      this.loadData();
  }

  loadData() {
    const token = this.storageService.getToken();
    const decodedToken: any = this.jwtDecoderService.decodeToken(token);
    const brachName = decodedToken.branch;

    // Define a function to fetch data
    const fetchData = () => {
      this.service.LoadData(brachName).subscribe(
        (item) => {
          console.log('success');
          this.reservationTable = item;
            this.dttrigger.next(null);
        },
        (error) => {
          console.error('Error loading data', error);
        }
      );
    };

    // Fetch data initially
    fetchData();

    // Set an interval to fetch data periodically (e.g., every 5 seconds)
    setInterval(fetchData, 5000); // Adjust the interval as needed
  }
  

  reservationDetails(){
    console.log("open reservation details page")
  }

  getStatusClass(status: string): string {
    switch (status) {
      case 'scheduled':
        return 'scheduled';
      case 'expired':
        return 'expired';
      case 'success':
        return 'success';
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
