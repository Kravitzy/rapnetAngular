import { Component, OnInit } from '@angular/core';
import { DiamondsService } from '../../Services/diamonds.service';
import { Diamond } from 'src/app/models/diamond';
import { FormBuilder, FormGroup , Validators} from '@angular/forms';


@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  constructor(private diamondsService: DiamondsService, private fb: FormBuilder) { }

  diamondForm: FormGroup;
  submitted = false;
  
  diamonds: Diamond[];
  diamond : Diamond;
  diamondAmmount : number;
  avarageDiscount : number;
  avaragePrice : number;

  getDiamondsList(){
    this.diamondsService.getDiamonds().subscribe(
      data => {
        this.diamonds = data;

        // update the stats data
        this.diamondAmmount = this.diamonds.length;
        let sumPrice = 0; 
        let sumListPriceWithDiscount = 0;
        let sumDiscount = 0;
        let ammountDiscount = 0;

        this.diamonds.forEach(element => {
          sumPrice += element.price;
          
          if (element.price <  element.listPrice ){
            element.discount = (element.listPrice - element.price) / element.listPrice;
            sumListPriceWithDiscount += element.listPrice;
            sumDiscount += element.discount;
            ammountDiscount++;
          }
        });

        this.avaragePrice = sumPrice / this.diamonds.length;
        this.avarageDiscount = sumDiscount / ammountDiscount;

      }
    );
  }

  ngOnInit() {
    this.diamond = new Diamond();
    this.createForm();
    this.getDiamondsList();
  }

  createForm() {
    this.diamondForm = this.fb.group({
      Shape: ['', Validators.required],
      Size: ['', Validators.required],
      Color: ['', Validators.required],
      Clarity: ['', Validators.required],
      Price: ['', Validators.required],
      ListPrice: ['', Validators.required]
    });
  }

   // convenience getter for easy access to form fields
   get f() { return this.diamondForm.controls; }

  public onSubmit(): void {
    this.submitted = true;

    if (this.diamondForm.invalid) {
      return;
    }

    this.diamondsService.addDiamond(this.diamond)
      .subscribe(
        addedDiamond => {alert("Succeed Added Diamond! ID: " + addedDiamond.id); this.getDiamondsList();},
        err => alert(err.message));
  }


}
