import {IUser} from "../types";

export const setUser = (user?: Partial<IUser>): IUser => {
  return {
    ...(user?.id && {id: user.id}),
    name: user?.name ?? "",
    email: user?.email ?? "",
  }
}
