export interface ProfileView {
  id: string;
  name: string;
  email: string;
}

export default interface ProfileRepository {
  getProfile(): ProfileView;
}
