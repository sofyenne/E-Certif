import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { NavService, Menu } from '../../service/utility/nav.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SidebarComponent implements OnInit {

  currentuser:any
  constructor(private router: Router, public navServices: NavService) {
  
  }
  ngOnInit(): void {
    this.currentuser= JSON.parse( localStorage.getItem('currentuser'))
  }

}
