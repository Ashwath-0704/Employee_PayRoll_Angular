import { Component, Inject, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { EmployeeClass } from 'src/app/model/employee-class.model';
import { HttpService } from 'src/app/serviceNew/http.service';
import { HomeComponent } from '../home/home.component';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
/* This class is used to create a form for the signup page */
export class UserComponent implements OnInit {
  selected!: Date | null;
 /* This is creating a new instance of the EmployeeClass. */
 public employee: EmployeeClass = new EmployeeClass();
 homeComponent!: HomeComponent;

  constructor(@Inject(MAT_DIALOG_DATA) public editEmployee:any, public dialog: MatDialog,private router: Router, private httpService: HttpService) {
    this.signupUser= new FormGroup({
      name: new FormControl('',[Validators.pattern("^[A-Z]{1}[a-zA-Z\\s]{2,}$")]),
      profilePic: new FormControl('',[Validators.required]),
      gender:new FormControl('',[Validators.required]),
      department: new FormControl(new FormArray(this.departmentArray)),
      salary: new FormControl('',[Validators.required]),
      startDate: new FormControl(this.selected,[Validators.required,]),
      note: new FormControl('',[])
      });
      console.log(this.signupUser.value);
  }
/* Creating a form group. */
signupUser!: FormGroup;

/**
 * This function is used to create a form group for the signup form
 */
ngOnInit() {
  console.log(this.employee);
} 

/**
 * It takes the form values and assigns them to the employee object.
 */
onSubmit(){
  this.employee=this.signupUser.value;
  console.log(this.employee);
  this.httpService.saveEmployee(this.employee).subscribe(resp => {
      console.log(resp);
      this.router.navigateByUrl("/home-page");
      alert("Employee add successfully");
      this.signupUser.reset();
    });
}

/**
 * this.formValues.controls['name'].setValue(employee.name);
    this.formValues.controls['profilePic'].setValue(employee.profilePic);
    this.formValues.controls['gender'].setValue(employee.gender);
    this.formValues.controls['department'].setValue(employee.department);
    this.formValues.controls['salary'].setValue(employee.salary);
    this.formValues.controls['startDate'].setValue(employee.startDate);
    this.formValues.controls['note'].setValue(employee.note);
 */








  /* This is a list of departments that will be displayed in the dropdown. */
  departmentList = ['HR','Sales','Finance','Engineer','Others']
  /* This is a list of genders that will be displayed in the dropdown. */
  genderList=['Male','Female']
  /* This is a list of profile images that will be displayed in the dropdown. */
  profilePicList=[
                  '../../assets/FS HTML_CSS LP02 Employee Payroll App Assets (1)/assets/profile-images/Ellipse -1.png',
                  '../../assets/FS HTML_CSS LP02 Employee Payroll App Assets (1)/assets/profile-images/Ellipse -2.png',
                  '../../assets/FS HTML_CSS LP02 Employee Payroll App Assets (1)/assets/profile-images/Ellipse -3.png',
                  '../../assets/FS HTML_CSS LP02 Employee Payroll App Assets (1)/assets/profile-images/Ellipse -4.png']
/* This is a list of profile images that will be displayed in the dropdown. */
  profilePicId=['profile1','profile2','profile3','profile4']
 /* This is a list of profile images that will be displayed in the dropdown. */
  imageIDList=['image1','image2','image3','image4']
  departmentArray: any[] = [];

  /**
   * If the department is not in the array, add it to the array
   * @param {any}  - any
   * @param {any} department - any
   * @returns The departmentArray is being returned.
   */
  onClickDepartment($event: any,department: any){
    if (this.departmentArray.indexOf(department) == -1) {
      this.departmentArray.push(department);
      console.log(this.departmentArray);
      return this.departmentArray;
    }
    return null;
  }
  
/**
 * Format a number to a string with thousands separator
 * @param {number} value - The value to format.
 * @returns The function is being called with the value of the `formatLabel` function.
 */
  formatLabel(value: number) {
    if (value >= 1000) {
      return Math.round(value / 1000) + 'k';
    }
    return value;
  }
}
