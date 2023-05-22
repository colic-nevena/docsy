export interface ProfileView {
  id: string;
  name: string;
  email: string;
}

export default interface IProfileRepository {
  getProfile(): ProfileView;
}
