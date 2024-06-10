import { Component, OnInit, Renderer2 } from '@angular/core';
import { Config } from 'datatables.net';
import { AlluserService } from '../../../../core/services/datatable/users/alluser.service';
import { BalanceTable } from '../../../../core/dto/datatable/balanceTable.dto';
import { Subject } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StorageService } from '../../../../core/services/storage/storage.service';
import { JwtDecoderService } from '../../../../core/services/jwt/jwt-decoder.service';
import { BalanceService } from '../../../../core/services/datatable/balance/balance.service';

@Component({
  selector: 'app-balances',
  templateUrl: './balances.component.html',
  styleUrl: './balances.component.css'
})
export class BalancesComponent {

  balanceTable: BalanceTable[] = [];
  dtoptions: Config = {};
  dttrigger: Subject<any> = new Subject<any>();
  role?: any;
  accessToken?: any;
  user?: any;

  // get today date, delete this if the api response is valid
  updatedAt: Date = new Date();

  constructor(
    private service: BalanceService,
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
    const branchName = decodedToken.branch;

    // Define a function to fetch data
    const fetchData = () => {
      this.service.LoadData(branchName).subscribe(
        (item) => {
          this.balanceTable = item;
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

}
