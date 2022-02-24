import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EmployeeClass } from 'src/app/model/employee-class.model';
import { HttpService } from 'src/app/serviceNew/http.service';
import { UserComponent } from '../user/user.component';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public employeeCount: number = 0; 
  public employeeDetails: EmployeeClass[] = [];
  
  constructor(public dialog: MatDialog,private router: Router,private httpService: HttpService) { }

  ngOnInit() {
    this.httpService.getEmployeeData().subscribe(data => {
      this.employeeDetails = data.data;
      this.employeeCount = this.employeeDetails.length;
    });
  }

  openAddPerson() {
    this.dialog.open(UserComponent, {
      width: '70%',
      height:'100%'
    });
  }

  // --------------------------------------------------------------------------------------------------------
  public employee: EmployeeClass = new EmployeeClass();
  formValues!: FormGroup;

  edit(employee:any){
    // this.formValues.controls['name'].setValue(employee.name);
    // this.formValues.controls['profilePic'].setValue(employee.profilePic);
    // this.formValues.controls['gender'].setValue(employee.gender);
    // this.formValues.controls['department'].setValue(employee.department);
    // this.formValues.controls['salary'].setValue(employee.salary);
    // this.formValues.controls['startDate'].setValue(employee.startDate);
    // this.formValues.controls['note'].setValue(employee.note);

    this.httpService.updateEmployeeData(employee.employeeId, employee).subscribe((response: any) => {
      console.log(response);
      this.ngOnInit();
    });
    console.log(employee.employeeId);
    this.dialog.open(UserComponent,{
      width: '70%',
      height:'100%'
    })
  }

  /**
   * Remove an employee from the employee list
   * @param {any} employeeId - any
   */
  remove(employeeId: any): void {
    console.log(employeeId);
    const id = parseInt(employeeId);
    this.httpService.deleteEmployeeData(id).subscribe(response => {
      console.log(response);
      this.ngOnInit();
    });
  }

}
