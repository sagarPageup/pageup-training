import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Brand, BrandForm } from '../../../models/brand';
import { FormControl, FormGroup } from '@angular/forms';
import { BrandService } from '../../../services/brand.service';
import { createFind } from 'rxjs/internal/operators/find';

@Component({
  selector: 'app-brand-edit',
  templateUrl: './brand-edit.component.html',
  styleUrl: './brand-edit.component.scss'
})
export class BrandEditComponent {

  private paramId: string = '';
  public brands: Brand[] = [];
  public isEdit: boolean = false;

  constructor(private activatedRoute: ActivatedRoute,
    private router: Router, private brandService: BrandService) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(paramMap => {
      this.paramId = (paramMap.get('id')) ?? '';
    });

    if (this.paramId > '0') {
      this.isEdit = true;
      this.getBrandbyId(this.paramId);
    }
  }
  // brand form of a single formcontrol
  brandForm = new FormGroup<BrandForm>({
    name : new FormControl(null)
  })

 //getting the branc by id
 public getBrandbyId(id: string): void {
  this.brandService.getBrandById(id).subscribe(brand => {
    this.brandForm.controls.name.patchValue(brand.name);
  });
}

public addBrand(): void {
  const brand: Brand = {
    id: Math.floor(Math.random() * 1000).toString(),
    name: this.brandForm.value.name ?? '',
    createdAt: new Date()
  };

  this.brandService.addBrand(brand).subscribe(() => {
    this.router.navigate(['/brand']);
    alert('Brand added successfully');
  });
}

public updateBrand(): void {
  if (!this.paramId) {
    return;
  }
  const data = {
    id: this.paramId,
    name: this.brandForm.value.name ?? '',
    createdAt: new Date()
  }
  this.brandService.updateBrand(this.paramId, data).subscribe(() => {
    this.router.navigate(['/brand']);
    alert('Brand updated successfully');
  });
 }

 }

