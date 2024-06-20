import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ReservationTable } from '../../../../core/dto/datatable/reservationTable.dto';
import { Config } from 'datatables.net';
import { Subject } from 'rxjs';
import { ReservationService } from '../../../../core/services/datatable/reservations/reservation.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { StorageService } from '../../../../core/services/storage/storage.service';
import { JwtDecoderService } from '../../../../core/services/jwt/jwt-decoder.service';
import { Modal } from 'flowbite';
import { BranchReservationsService } from '../../../../core/services/branch-reservations/branch-reservations.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-branch-reservations',
  templateUrl: './branch-reservations.component.html',
  styleUrl: './branch-reservations.component.css',
})
export class BranchReservationsComponent implements OnInit {
  reservationTable: ReservationTable[] = [];
  updateStatusForm!: FormGroup;
  dtoptions: Config = {};
  dttrigger: Subject<any> = new Subject<any>();
  selectedStatus: string = 'all';
  role?: any;
  accessToken?: any;
  user?: any;
  reservationStatus?: any;

  @ViewChild('updateReservationModal') updateReservationModalRef!: ElementRef;
  updateReservationModal!: Modal;
  selectedReservation: ReservationTable | null = null;

  // get today date, delete this if the api response is valid
  reservationDate: Date = new Date();

  constructor(
    private service: ReservationService,
    private fb: FormBuilder,
    private storageService: StorageService,
    private jwtDecoderService: JwtDecoderService,
    private router: Router,
    private branchReservationsService: BranchReservationsService,
  ) {
    this.accessToken = localStorage.getItem('jwtToken')?.toString();
    this.updateStatusForm = this.fb.group({
      reservationNumber: [''],
      customerName: [''],
      accountNumber: [''],
      currencyCode: [''],
      amount: [''],
      status: [''],
      reservationDate: [''],
      createdDate: [''],
      doneBy: [''],
    });

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
        searchPlaceholder: 'Search Reservations',
      },
    },
      this.loadData();
  }

  loadData() {
    const token = this.storageService.getToken();
    const decodedToken: any = this.jwtDecoderService.decodeToken(token);
    const branchCode = decodedToken.branchCode;

    // Define a function to fetch data
    const fetchData = () => {
      this.service.LoadData(branchCode).subscribe(
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
  }

  getStatusClass(status: string): string {
    switch (status) {
      case 'Terjadwal':
        return 'scheduled';
      case 'Kadaluarsa':
        return 'expired';
      case 'Sukses':
        return 'success';
      default:
        return '';
    }
  }

  getTranslatedStatus(status: string): string {
    switch (status) {
      case 'Terjadwal':
        return 'Scheduled';
      case 'Kadaluarsa':
        return 'Expired';
      case 'Sukses':
        return 'Success';
      default:
        return '';
    }
  }

  filterStatus(): void {
    const table = $('#reservationTable').DataTable();
    const filterValue = this.selectedStatus === 'all' ? '' : this.selectedStatus;
    table.column(5).search(filterValue, true, false).draw();
  }

  ngAfterViewInit(): void {
    // Initialize modals
      this.initModals();
  }

  private initModals(): void {
    console.log('Initializing modals...');

    if (this.updateReservationModalRef) {
      const updateReservationModalElement = this.updateReservationModalRef.nativeElement;

      console.log('Edit User Status Modal Element:', updateReservationModalElement);
      
      if (updateReservationModalElement) {
        this.updateReservationModal = new Modal(updateReservationModalElement);
        console.log('Modals initialized successfully.');
      } else {
        console.error('Modal elements are not found in the DOM.');
      }
    } else {
      console.error('Modal ViewChild elements are not available.');
    }
  }

  showUpdateReservationModal(item: ReservationTable): void {
    if (this.updateReservationModal) {
      this.updateStatusForm.patchValue({
        reservationNumber: item.reservationNumber,
        customerName: item.customerName,
        accountNumber: item.accountNumber,
        currencyCode: item.currencyCode,
        amount: item.amount,
        status: this.getTranslatedStatus(item.status),
        reservationDate: item.reservationDate,
        createdDate: item.createdDate,
        doneBy: item.doneBy
      });
      this.getReservationStatus();
      this.updateReservationModal.show();
    } else {
      console.error('Edit User Status Modal is not initialized.');
    }
  }

  hideUpdateReservationModal(): void {
    if (this.updateReservationModal) {
      this.updateReservationModal.hide();
    }
  }

  getReservationStatus() {
    return this.reservationStatus = this.updateStatusForm.get('status')?.value.toLowerCase();
  }

  public updateStatusReservationOnSubmit(): void {
    if (this.updateStatusForm.valid) {
        const branchReservationData = { ...this.updateStatusForm.value };
        delete branchReservationData.customerName;
        delete branchReservationData.accountNumber;
        delete branchReservationData.currencyCode;
        delete branchReservationData.amount;
        delete branchReservationData.status;
        delete branchReservationData.reservationDate;
        delete branchReservationData.createdDate;
        delete branchReservationData.doneBy;
        this.branchReservationsService.updateReservationStatus(branchReservationData).subscribe(
          (response) => {
            console.log('updated successfully', response);
            this.router.navigate(['/branch-reservations']).then(() => {
              window.location.reload();
            });
            // this.showAlertMessage('success', 'Employee created successfully');
          },
          (error) => {
            console.error('Error creating employee', error);
            // this.showAlertMessage('error', 'Error creating employee');
          }
        );
    } else {
      console.log('Form is invalid');
    }
  }

}
