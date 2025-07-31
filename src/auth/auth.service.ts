import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { User } from './user.entity';
import { InjectModel } from '@nestjs/sequelize';
import { AuthCredentialsDto } from 'src/tasks/dto/auth-credentials.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './jwt-payload.interface';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User)
    private userModel: typeof User,
    private jwtService: JwtService, // Assuming JwtService is injected for token generation
  ) {}

  async signUp(authCredentialsDto: AuthCredentialsDto): Promise<void> {
    const { username, password } = authCredentialsDto;

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    // console.log('salt', salt);
    // console.log('hashedPassword', hashedPassword);
    // console.log('username', username);
    // console.log('password', password);

    const existingUser = await this.userModel.findOne({
      where: { username },
    });

    if (existingUser) {
      throw new ConflictException('Username already exists');
    }

    try {
      await this.userModel.create({ username, password: hashedPassword });
    } catch (error) {
      if (error) {
        if (error.code === '23505') {
          throw new ConflictException('Username already exists');
        } else {
          throw new InternalServerErrorException(
            'A unique constraint error occurred',
          );
        }
      }
      throw error;
    }
  }
  async signIn(
    authCredentialsDto: AuthCredentialsDto,
  ): Promise<{ accessToken: string }> {
    const { username, password } = authCredentialsDto;
    try {
      const user = await this.userModel.findOne({ where: { username } });
      console.log('user', user?.password);
      // return usera
      if (user && (await bcrypt.compare(password, user.password))) {
        const payload: JwtPayload = { username: user.username, id: user.id };
        const accessToken: string = await this.jwtService.sign(payload);
        return { accessToken };
      } else {
        throw new ConflictException('Invalid credentials');
      }
    } catch (error) {
      throw error;
    }
  }
}
