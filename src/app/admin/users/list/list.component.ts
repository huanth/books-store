import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

import { UsersService } from '../users.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent {

  constructor(private usersService: UsersService) { }

  users: any = [];
  public confirmDeleteUserID: number = 0;


  ngOnInit(): void {
    this.usersService.getAllUser().subscribe((res: any) => {
      this.users = res;
    });
  }

  deleteUser(id: number): void {
    this.confirmDeleteUserID = id;
  }

  confirmDelete(): void {
    this.usersService.deleteUser(this.confirmDeleteUserID).subscribe((res: any) => {
      this.usersService.getAllUser().subscribe((res: any) => {
        this.users = res;
        Swal.fire({
          icon: 'success',
          title: 'User has been deleted',
          showConfirmButton: false,
          timer: 1500
        });
      });
    });
  }


}
