import { Request } from 'express';
import { User } from 'src/users/entity/users.entity';

export interface RequestWithUser extends Request {
  user: User;
}

export enum DELETE_STATUSES {
  OK = 'OK',
  ERROR = 'ERROR',
}

export interface DeleteEntityStatus {
  status: DELETE_STATUSES;
  message?: string;
}
