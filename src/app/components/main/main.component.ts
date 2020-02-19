import { Component, OnInit } from '@angular/core';
import { DiamondsService } from '../../Services/diamonds.service';
import { Diamond } from 'src/app/models/diamond';

export interface DataTableItem {
  Size : number;
  Color : string;
  Clarity : string;
  Price : number;
  ListPrice : number;
  Id : number;
}


const ELEMENT_DATA: DataTableItem[] = [
  {Size: 1, Color: 'Hydrogen', Clarity: "IV", Price:10000, ListPrice:12000, Id : 1 },
  {Size: 1, Color: 'Helium', Clarity: "IV", Price:10000, ListPrice:12000, Id : 2 },
  {Size: 1, Color: 'Lithium', Clarity: "IV", Price:10000, ListPrice:12000, Id : 3 },
  {Size: 1, Color: 'Beryllium', Clarity: "IV", Price:10000, ListPrice:12000, Id : 4 }
];

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  constructor(private diamondsService: DiamondsService)  { }
  
  diamonds : Diamond[];
  diamond = new Diamond();

  ngOnInit() {
    this.diamondsService.getDiamonds().subscribe(
        data =>{
            this.diamonds = data;
        }
    );
    
  }

  public addNewProduct(): void {
    this.diamondsService.addDiamond(this.diamond)
        .subscribe(
            addedDiamond => alert("Succeed Added Product! ID: " + addedDiamond.Id),
            err => alert(err.message));
  }


}
