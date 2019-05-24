import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProfilService } from '../../services/profil.service';
import { UserService } from '../../services/user.service';
import { PetsProfil } from '../../model/PetsProfil.model';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-new-profil',
  templateUrl: './new-profil.component.html',
  styleUrls: ['./new-profil.component.css']
})
export class NewProfilComponent implements OnInit {

  profil : PetsProfil;
  file : File;
  fileInformation : string;
  userPetProfilId : number;

  profilForm: FormGroup;

  constructor(private formBuilder: FormBuilder,private profilService : ProfilService,
    private userService : UserService,private route: ActivatedRoute, private location: Location) { }

  ngOnInit() {
    this.initForm();
  }
  initForm() {
    this.profilForm = this.formBuilder.group({
      name: '',
      photo: '',
      proprio: '',
      genre: '',
      tel: '',   
      description: ''
    });
}
onSubmitForm() {
  const formValue = this.profilForm.value;
  const newProfil = new PetsProfil(
    formValue['name'],
    formValue['photo'],
    formValue['proprio'],
    formValue['genre'],
    formValue['tel'],
    formValue['description']   
  );
  this.add(newProfil);
  //this.router.navigate(['/users']);
}

  add(petProfil: PetsProfil): void {
     this.profilService.addPetsProfil( petProfil )
      .subscribe(() => this.goBack());
  }
  goBack(): void {
    this.location.back();
  }
}
