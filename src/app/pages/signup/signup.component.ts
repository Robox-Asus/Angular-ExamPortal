import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {


  user = {
    username:'',
    password:'',
    firstName:'',
    lastName:'',
    email:'',
    phone:''
  }

  constructor(private userService:UserService,private snack:MatSnackBar) { }

  ngOnInit(): void {
  }

  formSubmit() {
    if(this.user.username == '' || this.user.password == '' || this.user.firstName == '' || this.user.lastName == '' || this.user.email == '' || this.user.phone == '') {
      this.snack.open("User Field cannot be empty","OK",{
        duration : 3000,
        verticalPosition: "top",
        horizontalPosition:"right"
      });
      return;
    } else {
      this.userService.addUser(this.user).subscribe(
        (data:any)=>{
          console.log(data);
          Swal.fire('Successfully Done','User ID Is'+data.id,'success');
        },(error)=>{
          console.log(error);
          this.snack.open("Error : "+error.error,"OK",{
            duration:3000,
            verticalPosition:"top",
            horizontalPosition:"right"
          })
        }
      )
    }
  }

}
