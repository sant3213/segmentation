import { SplitInterpolation } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-graphic-results',
  templateUrl: './graphic-results.component.html',
  styleUrls: ['./graphic-results.component.css']
})
export class GraphicResultsComponent implements OnInit {

  data: any;
  info: any;
  constructor(private router: ActivatedRoute) { }

  ngOnInit(): void {
    this.router.queryParams.subscribe((params) => {
      this.info = params
    });
    console.log(this.info)
  }

}
