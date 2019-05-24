import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProfilService } from '../../services/profil.service';
import { UserService } from '../../services/user.service';
import { PetsProfil } from '../../model/PetsProfil.model';
import { Location } from '@angular/common';

@Component({
  selector: 'app-single-profils',
  templateUrl: './single-profils.component.html',
  styleUrls: ['./single-profils.component.css']
})
export class SingleProfilsComponent implements OnInit {
  profil : PetsProfil;
  file : File;
  fileInformation : string;
  userPetProfilId : number;
  constructor(private profilService : ProfilService,private userService : UserService,private route: ActivatedRoute, private location: Location) { }

  ngOnInit() {
    this.getProfil();
    ///this.getUserId();
    //to do sup code en dure
    this.userPetProfilId=0;
  }

  getProfil(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.profilService.getProfil(id)
      .subscribe(petProfil => this.profil = petProfil);
  }
  /*getUserId(): void {
    this.userService.getUser(id)
      .subscribe(userPetProfilId => this.userPetProfilId = userPetProfilId);
  }*/
  goBack(): void {
    this.location.back();
  }
  onSelectFile(event) {
    if(event.target.files && event.target.files.length > 0) {
      this.file = event.target.files[0];
      this.fileInformation = null;      
      this.profil.photo=this.file.name;
    }
  }
  save(): void {
    this.profilService.updatePetsProfil(this.profil)
      .subscribe(() => this.goBack());
  }

  /*
  sendFile() {
    const data: FormData = new FormData();
    data.append(`data`, this.file, this.file.name );
    // Pas d'ajout d'header exposant le content-type, le framework le fait pour vous.
    this.httpClient.post(
      '/api/upload',
      data
    ).subscribe(value => {
        this.fileInformation = value as FileInformation;
      })
  } */
}
