import Model from '../model';

export default class Supply extends Model<Supply> {
  id: string;
  name: string;
  imageUrl: string;
  requested: number;
}
