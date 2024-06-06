import { Component, OnInit } from '@angular/core';
import { Config } from 'datatables.net';
import { AlluserService } from '../../../../core/services/datatable/users/alluser.service';
import { UserTable } from '../../../../core/dto/datatable/userTable.dto';
import { Subject } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RoleDto } from '../../../../core/dto/user/role.dto';
import { Router } from '@angular/router';
import { UsersService } from '../../../../core/services/users/users.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrl: './users.component.css',
})
export class UsersComponent implements OnInit {
  userTable: UserTable[] = [];
  dtoptions: Config = {};
  dttrigger: Subject<any> = new Subject<any>();
  addNewUserForm!: FormGroup;
  roles: RoleDto[] = [];
  showAlert: boolean = false;
  alertType: 'success' | 'error' = 'success';
  alertTitle: string = '';
  alertMessage: string = '';
  statusFilter: string = '';
  filteredUsers:UserTable[] = [];


  constructor(
    private service: AlluserService,
    private formBuilder: FormBuilder,
    private usersService: UsersService
  ) {}

  ngOnInit(): void {
    (this.dtoptions = {
      paging: true,
      pagingType: 'full_number',
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
      this.filterUsers(),
      this.resetFilter();
      this.getRoles();
  }


  loadData() {
    this.service.LoadData().subscribe(
      (item) => {
        // this.userTable = item;
        this.dttrigger.next(null);
      },
      (error) => {
        console.error('Error loading data', error);
      }
    );
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
            console.log('Employee created successfully', response);
            this.addNewUserForm.reset();
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
  

  editUserStatus(): void {
    console.log('edit user status');
  }

  generateUserPassword():void {
    console.log("request generate user password")
  }

  ngOnChanges() {
    this.filterUsers();
  }

  filterUsers() {
    if (this.statusFilter === '') {
      this.filteredUsers = [...this.userTable];
    } else {
      const isActive = this.statusFilter === 'active';
      this.filteredUsers = this.userTable.filter(user => user.status === isActive);
    }
  }

  resetFilter() {
    this.statusFilter = '';
    this.filteredUsers = [...this.userTable];
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
