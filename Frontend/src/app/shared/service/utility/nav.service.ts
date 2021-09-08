import { Injectable, HostListener, Inject } from '@angular/core';
import { BehaviorSubject, Observable, Subscriber } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { WINDOW } from "./windows.service";
// Menu
export interface Menu {
	path?: string;
	title?: string;
	icon?: string;
	type?: string;
	badgeType?: string;
	badgeValue?: string;
	active?: boolean;
	bookmark?: boolean;
	children?: Menu[];
}

@Injectable({
	providedIn: 'root'
})

export class NavService {

	public screenWidth: any
	public collapseSidebar: boolean = false
	MENUITEMS: Menu[] = []
	constructor(@Inject(WINDOW) private window, public authService: AuthService) {
		this.onResize();
		if (this.screenWidth < 991) {
			this.collapseSidebar = true
		}

		this.filMenu()
	}

	// Windows width
	@HostListener("window:resize", ['$event'])
	onResize(event?) {
		this.screenWidth = window.innerWidth;
	}


	filMenu() {
		
	

			this.MENUITEMS.push({

				path: '/dashboard/default', title: 'Dashboard', icon: 'home', type: 'link', badgeType: 'primary', active: false
			},
			{
				title: 'Users', path: '/users/users-crud', icon: 'user-plus', type: 'link', active: false
			},
			{
				title: 'Organisme', path: '/organisme/organisme-crud', icon: 'bar-chart', type: 'link', active: false
			},
			{
				title: 'Gestion SMS', icon: 'chrome', type: 'sub', children: [
						{ path: '/sms/sms-action', title: 'SMS', type: 'link' },
						{ path: '/localization/currency-rates', title: 'Currency Rates', type: 'link' },
						{ path: '/localization/taxes', title: 'Taxes', type: 'link' },
					]
			},
			)
		

		if(this.MENUITEMS.length==0){
			this.MENUITEMS.push({
				title: 'Résultats', path: '/resultat', icon: 'bar-chart', type: 'link', active: false
			})

		}else{
			this.MENUITEMS.splice(2, 0, {
				title: 'Résultats', path: '/resultat', icon: 'bar-chart', type: 'link', active: false
			});
		}
	
		

	}



	// Array
	items = new BehaviorSubject<Menu[]>(this.MENUITEMS);


}
