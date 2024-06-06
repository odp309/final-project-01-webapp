import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Config } from 'datatables.net';
import { AlluserService } from '../../../../core/services/datatable/users/alluser.service';
import { UserTable } from '../../../../core/dto/datatable/userTable.dto';
import { Subject } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent implements OnInit, AfterViewInit{
  userTable: UserTable[] = [];
  dtoptions:Config={}
  dttrigger: Subject<any> = new Subject<any>();
  addNewUserForm!: FormGroup;
  @ViewChild('statusFilter', { static: false }) statusFilter!: ElementRef;

  constructor(private service:AlluserService , private formBuilder: FormBuilder){}

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
        first_name: ['', Validators.required],
        last_name: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        npp: ['', Validators.required],
        role: ['', Validators.required],
      }));
  }


  loadData() {
    this.service.LoadData().subscribe(
      (item) => {
        this.userTable = item;
        this.dttrigger.next(null);
      },
      (error) => {
        console.error('Error loading data', error);
      }
    );
  }


  onSubmitNewUser(): void {
    if (this.addNewUserForm.valid) {
      console.log('Form Submitted', this.addNewUserForm.value);
      this.addNewUserForm.reset();
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

  ngAfterViewInit(): void {
    this.dttrigger.subscribe(() => {
      const table = $('userTable').DataTable();
  
      // Custom filter for the status column
      $.fn.dataTable.ext.search.push((_settings: any, data: any[], dataIndex: any) => {
        const statusFilter = this.statusFilter.nativeElement.value;
        const status = data[6]; // Assuming the status column is index 6
  
        if (!statusFilter || status === statusFilter) {
          return true;
        }
  
        return false;
      });
  
      // Trigger initial filter
      $(this.statusFilter.nativeElement).trigger('change');
    });
  }

  initStatusFilter(): void {
    $(this.statusFilter.nativeElement).on('change', () => {
      const filterValue = this.statusFilter.nativeElement.value;
      const table = $('userTable').DataTable();
      table.column(7).search(filterValue).draw();
    });
  }
  
}
