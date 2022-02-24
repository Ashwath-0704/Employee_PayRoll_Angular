import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  /* This is a class property that is used to store the base URL for the HTTP requests. */
  private baseUrl: string = "http://localhost:8080/employeepayrollservice/";

/**
 * It creates a new instance of the HttpClient class.
 * @param {HttpClient} httpClient - The HttpClient object.
 */
  constructor(private httpClient: HttpClient) {}

  /**
   * Get the employee data from the server
   * @returns An Observable of type any.
   */
  getEmployeeData(): Observable<any> {
    return this.httpClient.get(this.baseUrl + "get");
  }

  /**
   * The function takes in a body object and returns an Observable
   * @param {any} body - any
   * @returns An Observable of type any.
   */
  addEmployee(body: any): Observable<any> {
    return this.httpClient.post(this.baseUrl + "create", body);
  }

  /**
   * It saves the employee details in the database.
   * @param {any} body - any
   * @returns An Observable of type any.
   */
  saveEmployee(body: any): Observable<any> {
    return this.httpClient.post(this.baseUrl + "save", body);
  }

 /**
  * Delete an employee from the database
  * @param {number} empId - number
  * @returns Observable<any>
  */
  deleteEmployeeData(empId: any): Observable<any> {
    return this.httpClient.delete(this.baseUrl + "delete/" + empId);
  }

/**
 * Update an employee's data by id
 * @param {number} id - The id of the employee we want to update.
 * @param {any} body - any
 * @returns An Observable of type any.
 */
  updateEmployeeData(id: any, body: any): Observable<any> {
    return this.httpClient.post(this.baseUrl + "update/" + id, body);
  }
}
