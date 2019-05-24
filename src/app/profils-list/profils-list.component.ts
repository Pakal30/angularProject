import { Component, OnInit } from '@angular/core';
import { PetsProfil } from '../model/PetsProfil.model';
import { ProfilService } from '../services/profil.service';
import { from } from 'rxjs';
@Component({
  selector: 'app-profils-list',
  templateUrl: './profils-list.component.html',
  styleUrls: ['./profils-list.component.css']
})
export class ProfilsListComponent implements OnInit {
  petsProfils : PetsProfil[];
  petsProfilsMale : PetsProfil[];
  petsProfilsFemale : PetsProfil[];
  constructor(private profilService : ProfilService) { }

  ngOnInit() {
    this.getPetsProfilsMale();
    this.getPetsProfilsFemale();
    this.getPetsProfils();
  }
  getPetsProfils(): void {
    this.profilService.getProfils()
    .subscribe(petsProfils => this.petsProfils = petsProfils);
  }
  getPetsProfilsMale(): void {
    this.profilService.getProfilsByGenre("male")
    .subscribe(petsProfils => this.petsProfilsMale = petsProfils);
  }
 
  getPetsProfilsFemale(): void {
    this.profilService.getProfilsByGenre("female")
    .subscribe(petsProfils => this.petsProfilsFemale = petsProfils);
  }
 
  delete(petsProfil: PetsProfil): void {
    this.petsProfils = this.petsProfils.filter(h => h !== petsProfil);
    this.profilService.deletePetsProfil(petsProfil).subscribe();
  }
}
