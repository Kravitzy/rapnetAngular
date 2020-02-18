import { Component, OnInit } from '@angular/core';
import { DiamondsService } from '../../Services/diamonds.service';
import { Diamond } from 'src/app/models/diamond';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  constructor(private diamondsService: DiamondsService)  { }

  diamonds : Diamond[];

  ngOnInit() {
    this.diamondsService.getDiamonds().subscribe(
        data =>{
            this.diamonds = data;
        }
    );
    
  }

}
