import { Component, OnInit, inject } from '@angular/core';
import { InfiniteScrollCustomEvent } from '@ionic/angular';
import { map } from 'rxjs';
import { CaloriesModel } from 'src/app/core/models/calories/calories.model';
import { ResponseModel } from 'src/app/core/models/response/Response.model';
import { SingletonDocumentService } from 'src/app/core/services/singleton/singleton-document.service';
import { UserService } from 'src/app/core/services/user/user.service';

@Component({
  selector: 'app-dashboard-calories',
  templateUrl: './dashboard-calories.component.html',
  styleUrls: ['./dashboard-calories.component.scss'],
})
export class DashboardCaloriesComponent  implements OnInit {

  private singletonID = inject(SingletonDocumentService);
  private userService = inject(UserService);

  caloriesItems: CaloriesModel[] = [];
  _isLoad: Promise<any> = Promise.resolve(false);

  ngOnInit() {
    this.getCalories();
  }

  async getCalories() {
    const { value } = await this.singletonID.getDocument();
    this.userService.getCaloriesById(`${value}`).pipe(
    ).subscribe(response => {
      if(response.status == 200) {
        response.data.forEach((element: CaloriesModel) => {
          this.caloriesItems?.push(element)
        });
        console.log("response", this.caloriesItems)
        this._isLoad = Promise.resolve(true);
      }else {
        this._isLoad = Promise.resolve(false);
      }
    })
  }

  sendItem(event: CaloriesModel) {
    this.caloriesItems.push(event)
  }

  onIonInfinite(ev: Event) {
    this.getCalories();
    setTimeout(() => {
      (ev as InfiniteScrollCustomEvent).target.complete();
    }, 500);
  }

}
