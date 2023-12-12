import {UserService} from "../services/users/user.service";
import {User} from "../models/user";
import {firstValueFrom} from "rxjs";
import {APP_INITIALIZER, Provider} from "@angular/core";
import {HttpClient} from "@angular/common/http";

 function initializeApp(userService: UserService) {
  return (): Promise<User[]> =>
    firstValueFrom(
      userService.getUsers()
    );
}
export const UserInitializeProvider: Provider = {
  provide: APP_INITIALIZER,
  useFactory: initializeApp,
  multi: true,
  deps: [UserService,HttpClient]
}
