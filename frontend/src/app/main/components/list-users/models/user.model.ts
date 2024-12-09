import { IUserResponseModel } from '../interfaces/user-response-model.interface';

export class UserModel {
  public Username: string;
  public Role: string;
  public isActive: boolean;

  constructor(data: IUserResponseModel) {
    this.Username = data.username;
    this.Role = data.role;
    this.isActive = data.is_active;
  }
}
