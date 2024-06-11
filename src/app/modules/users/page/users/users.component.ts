import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { Config } from 'datatables.net';
import { AlluserService } from '../../../../core/services/datatable/users/alluser.service';
import { UserTable } from '../../../../core/dto/datatable/userTable.dto';
import { Subject } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RoleResponseDto } from '../../../../core/dto/user/roleResponse.dto';
import { UsersService } from '../../../../core/services/users/users.service';
import { StorageService } from '../../../../core/services/storage/storage.service';
import { JwtDecoderService } from '../../../../core/services/jwt/jwt-decoder.service';
import { Modal } from 'flowbite';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrl: './users.component.css',
})
export class UsersComponent implements OnInit, AfterViewInit {
  userTable: UserTable[] = [];
  dtoptions: Config = {};
  dttrigger: Subject<any> = new Subject<any>();
  addNewUserForm!: FormGroup;
  roles: RoleResponseDto[] = [];
  showAlert: boolean = false;
  alertType: 'success' | 'error' = 'success';
  alertTitle: string = '';
  alertMessage: string = '';
  selectedStatus: string = 'all';
  @ViewChild('editUserStatusModal') editUserStatusModalRef!: ElementRef;
  @ViewChild('generatePasswordModal') generatePasswordModalRef!: ElementRef;

  editUserStatusModal!: Modal;
  generatePasswordModal!: Modal;

  selectedUser: UserTable | null = null;

  constructor(
    private service: AlluserService,
    private formBuilder: FormBuilder,
    private usersService: UsersService,
    private storageService: StorageService,
    private jwtService: JwtDecoderService,
    private cdRef: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    (this.dtoptions = {
      info: true,
      paging: true,
      destroy: true,
      pageLength: 10,
      pagingType: 'full_numbers',
      autoWidth: true,
      language: {
        searchPlaceholder: 'Search User',
      },
    }),
      this.loadData(),
      (this.addNewUserForm = this.formBuilder.group({
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        nip: ['', Validators.required],
        role: ['', Validators.required],
      })),
      this.getRoles()
  }

  ngAfterViewInit(): void {
    // Initialize modals
      this.initModals();
      this.cdRef.detectChanges();
  }

  private initModals(): void {
    console.log('Initializing modals...');

    if (this.editUserStatusModalRef && this.generatePasswordModalRef) {
      const editUserStatusModalElement = this.editUserStatusModalRef.nativeElement;
      const generatePasswordModalElement = this.generatePasswordModalRef.nativeElement;

      console.log('Edit User Status Modal Element:', editUserStatusModalElement);
      console.log('Generate Password Modal Element:', generatePasswordModalElement);

      if (editUserStatusModalElement && generatePasswordModalElement) {
        this.editUserStatusModal = new Modal(editUserStatusModalElement);
        this.generatePasswordModal = new Modal(generatePasswordModalElement);
        console.log('Modals initialized successfully.');
      } else {
        console.error('Modal elements are not found in the DOM.');
      }
    } else {
      console.error('Modal ViewChild elements are not available.');
    }
  }

  showEditUserStatusModal(user: UserTable): void {
    this.selectedUser = user;
    if (this.editUserStatusModal) {
      this.editUserStatusModal.show();
    } else {
      console.error('Edit User Status Modal is not initialized.');
    }
  }

  hideEditUserStatusModal(): void {
    if (this.editUserStatusModal) {
      this.editUserStatusModal.hide();
    }
  }

  showGeneratePasswordModal(user: UserTable): void {
    this.selectedUser = user;
    if (this.generatePasswordModal) {
      this.generatePasswordModal.show();
    } else {
      console.error('Generate Password Modal is not initialized.');
    }
  }

  hideGeneratePasswordModal(): void {
    if (this.generatePasswordModal) {
      this.generatePasswordModal.hide();
    }
  }

  editUserStatus() : void {
    console.log("change user status" )
  }

  generateUserPassword() : void {
    console.log("generate user password" )
  }

  loadData() {
    const token = this.storageService.getToken();
    const decodedToken: any = this.jwtService.decodeToken(token);
    const branchName = decodedToken.branch;

    // Define a function to fetch data
    const fetchData = () => {
      this.service.LoadData(branchName).subscribe(
        (item) => {
          this.userTable = item;
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

  public onSubmitNewUser(): void {
    if (this.addNewUserForm.valid) {
      if (this.addNewUserForm.value.role === 'ADMIN') {
        const userData = { ...this.addNewUserForm.value };
        if (!userData.password) {
          userData.password = '12345678';
        }
        delete userData.role;
        this.usersService.createEmployeeAdmin(userData).subscribe(
          (response) => {
            console.log('Employee created successfully', response);
            this.addNewUserForm.reset();
            this.showAlertMessage('success', 'Employee created successfully');
          },
          (error) => {
            console.error('Error creating employee', error);
          }
        );
      } else {
        const userData = { ...this.addNewUserForm.value };
        if (!userData.password) {
          userData.password = '12345678';
        }
        delete userData.role;
        this.usersService.createEmployeeTeller(userData).subscribe(
          (response) => {
            this.addNewUserForm.reset();
            this.showAlertMessage('success', 'Employee created successfully');
          },
          (error) => {
            console.error('Error creating employee', error);
          }
        );
      }
    } else {
      console.log('Form is invalid');
    }
  }

  filterStatus(): void {
    const table = $('#userTable').DataTable();
    const filterValue =
      this.selectedStatus === 'all' ? '' : this.selectedStatus;
    table.column(5).search(filterValue, true, false).draw();
  }

  private getRoles(): void {
    this.usersService.getRoles().subscribe(
      (data) => {
        this.roles = data.filter(
          (role: { name: string }) =>
            role.name !== 'ADMIN_MGR' && role.name !== 'USER'
        );
      },
      (error) => {
        console.error('Error loading roles:', error);
      }
    );
  }

  showAlertMessage(type: 'success' | 'error', message: string): void {
    this.showAlert = true;
    this.alertType = type;
    this.alertMessage = message;
  }
}