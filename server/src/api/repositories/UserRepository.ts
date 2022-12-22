import { Repository } from 'typeorm';

import User from '@/api/models/User';

export default class UserRepository extends Repository<User> {}
