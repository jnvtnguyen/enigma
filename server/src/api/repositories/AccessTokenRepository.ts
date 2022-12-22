import { Repository } from 'typeorm';

import AccessToken from '@/api/models/AccessToken';

export default class AccessTokenRepository extends Repository<AccessToken> {}
