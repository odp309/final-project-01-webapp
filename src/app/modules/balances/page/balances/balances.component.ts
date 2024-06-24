import { AfterViewInit, Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { Config } from 'datatables.net';
import { BalanceTable } from '../../../../core/dto/datatable/balanceTable.dto';
import { Subject } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StorageService } from '../../../../core/services/storage/storage.service';
import { JwtDecoderService } from '../../../../core/services/jwt/jwt-decoder.service';
import { BalanceService } from '../../../../core/services/datatable/balance/balance.service';
import { Modal } from 'flowbite';
import { Router } from '@angular/router';

@Component({
  selector: 'app-balances',
  templateUrl: './balances.component.html',
  styleUrl: './balances.component.css'
})
export class BalancesComponent implements OnInit, AfterViewInit {

  balanceTable: BalanceTable[] = [];
  dtoptions: Config = {};
  dttrigger: Subject<any> = new Subject<any>();
  role?: any;
  accessToken?: any;
  user?: any;
  addStockBalanceForm!: FormGroup;

  // get today date, delete this if the api response is valid
  updatedAt: Date = new Date();

  @ViewChild('addStockBalanceModal') addStockBalanceModalRef!: ElementRef;
  addStockBalanceModal!: Modal;
  selectedCurrency: any

  constructor(
    private service: BalanceService,
    private formBuilder: FormBuilder,
    private storageService: StorageService,
    private jwtDecoderService: JwtDecoderService,
    private jwtService: JwtDecoderService,
    private balanceService: BalanceService,
    private router: Router,
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
    this.addStockBalanceForm = this.formBuilder.group({
      balance: ['', Validators.required],
      branchCode: [this.getBranchCode(), Validators.required],
    }),
      this.loadData();
      this.initModals();
  }

  loadData() {
    const token = this.storageService.getToken();
    const decodedToken: any = this.jwtDecoderService.decodeToken(token);
    const branchCode = decodedToken.branchCode;

    // Define a function to fetch data
    const fetchData = () => {
      this.service.LoadData(branchCode).subscribe(
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
    // setInterval(fetchData, 5000); // Adjust the interval as needed
  }

  private getBranchCode(): string {
    const token = this.storageService.getToken();
    const decodedToken: any = this.jwtService.decodeToken(token);
    return decodedToken.branchCode;
  }

  ngAfterViewInit(): void {
    // Initialize modals
      this.initModals();
      this.loadData();
  }

  private initModals(): void {
    console.log('Initializing modals...');

    if (this.addStockBalanceModalRef) {
      const addStockBalanceModalElement = this.addStockBalanceModalRef.nativeElement;
      console.log('Edit User Status Modal Element:', addStockBalanceModalElement);
      if (addStockBalanceModalElement) {
        this.addStockBalanceModal = new Modal(addStockBalanceModalElement);
        console.log('Modals initialized successfully.');
      } else {
        console.error('Modal elements are not found in the DOM.');
      }
    } else {
      console.error('Modal ViewChild elements are not available.');
    }
  }

  showAddStockBalanceModal(currency: BalanceTable): void {
    this.selectedCurrency = currency;
    if (this.addStockBalanceModal) {
      this.addStockBalanceModal.show();
    } else {
      console.error('Add Stock Balance Modal is not initialized.');
    }
  }

  hideAddStockBalanceModal(): void {
    if (this.addStockBalanceModal) {
      this.addStockBalanceModal.hide();
    }
  }

  public addStockBalance():void{
    console.log("Perform Add Stock Balance")
    if (this.selectedCurrency && this.addStockBalanceForm.valid) {
      const currencyCode= this.selectedCurrency.currencyCode;
      const amount= this.addStockBalanceForm.get('balance')?.value;
      const branchCode= this.addStockBalanceForm.get('branchCode')?.value;
      this.balanceService.AddStock(branchCode, currencyCode,amount ).subscribe(
        (response) => {
          console.log('Stock Balance Added ', response);
          this.hideAddStockBalanceModal();
          this.router.navigate(['/balances']).then(() => {
            window.location.reload();
          });
        },
        (error) => {
          console.error('Error update balance', error);
        }
      ); 
    } else {
      console.log('Form is invalid or selectedCurrency is not set');
    }
  }
}