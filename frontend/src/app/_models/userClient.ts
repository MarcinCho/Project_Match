import { Photo } from './photo';

export interface UserClient {
  id: number;
  username: string;
  userEmail: string;
  photoUrl: string;
  created: Date;
  lastActive: Date;
  location: string;
  company: boolean;
  commercial: boolean;
  privateUser: boolean;
  photos: Photo[];
  userCompany: any;
  userCompanyId: any;
}
