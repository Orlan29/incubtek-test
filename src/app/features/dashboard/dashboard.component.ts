import {Component, inject} from "@angular/core";
import {ButtonComponent} from "@incubtek/ui/button/button.component";
import {AuthService} from "@incubtek/features/auth";

@Component({
  selector: "",
  templateUrl: "./dashboard.component.html",
  standalone: true,
  imports: [
    ButtonComponent
  ]
})
export class DashboardComponent {
  public authService = inject(AuthService);
}
