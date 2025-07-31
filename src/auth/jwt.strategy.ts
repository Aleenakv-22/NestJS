import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { User } from './user.entity';
import { InjectModel } from '@nestjs/sequelize';
import { JwtPayload } from './jwt-payload.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectModel(User)
    private userModel: typeof User,
  ) {
    super({
      secretOrKey: 'topSecret51',
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      //ignoreExpiration: false, // Set to true if you want to ignore token expiration
    });
  }
  async validate(payload: JwtPayload): Promise<User> {
    const { id, username } = payload;
    // const user = await this.userModel.findOne({ where: { username } });
    // if (!user) {
    //   throw new UnauthorizedException('User not found');
    // }

    //return user;
    return { id, username } as User; // Return the user object with id and username
  }
}
