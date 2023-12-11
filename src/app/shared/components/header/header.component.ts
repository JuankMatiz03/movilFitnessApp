import { Component, OnInit, inject } from '@angular/core';
import { IsActiveMatchOptions, Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth/auth.service';

@Component({
  selector: 'cp-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent  implements OnInit {

  private router: Router = inject(Router);
  private authService: AuthService = inject(AuthService);

  constructor() { }

  ngOnInit() {}

  isActive(url: string): boolean {
    const matchOptions: IsActiveMatchOptions = { paths: 'exact', queryParams: 'exact', fragment: 'ignored', matrixParams: 'ignored' };
    return this.router.isActive(url, matchOptions);
  }

  logout() {
    this.authService.logout().subscribe((response: any) => {
      if(response.status == 200) {
        this.router.navigate(['/login'])
      }
    })
  }

}
