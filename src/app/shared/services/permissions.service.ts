export class Permissions {
  canActivate(): boolean {
    return !(localStorage.getItem('isLogged') === null || localStorage.getItem('isLogged') !== 'true');
  }
}
