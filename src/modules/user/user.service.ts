import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { DBEntity } from 'src/db/db-entity';
import { DB_PROVIDER } from 'src/db/db.provider';
import { randomUUID } from 'node:crypto';

@Injectable()
export class UserService {
  constructor(
    @Inject(DB_PROVIDER)
    private db: { users: DBEntity<User> },
  ) {}

  async create(createUserDto: CreateUserDto) {
    const data = this.mapCreateDtoToEntity(createUserDto);
    const user = this.db.users.create(data);
    return this.mapToResponseDto(user);
  }

  async findAll() {
    const users = this.db.users.getAll();

    return users.map((user) => this.mapToResponseDto(user));
  }

  async findOne(id: string) {
    const user = this.db.users.getById(id);

    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    return this.mapToResponseDto(user);
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const user = this.db.users.getById(id);

    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    this.verifyOldPassword(user, updateUserDto.oldPassword);
    const userData = this.mapUpdateDtoToEntity(user, updateUserDto);
    const updatedUser = this.db.users.update(id, userData);

    return this.mapToResponseDto(updatedUser);
  }

  async remove(id: string) {
    const deletedUser = this.db.users.delete(id);

    if (!deletedUser) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    return null;
  }

  private mapCreateDtoToEntity(dto: CreateUserDto): User {
    return {
      id: randomUUID(),
      login: dto.login,
      password: dto.password,
      version: 1,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };
  }

  private mapUpdateDtoToEntity(user: User, dto: UpdateUserDto): User {
    return {
      ...user,
      password: dto.newPassword,
      version: user.version + 1,
      updatedAt: Date.now(),
    };
  }

  private mapToResponseDto(user: User) {
    return {
      id: user.id,
      login: user.login,
      version: user.version,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }

  verifyOldPassword(user: User, oldPassword: string) {
    if (user.password !== oldPassword) {
      throw new HttpException(
        'Old password is incorrect',
        HttpStatus.FORBIDDEN,
      );
    }
  }
}
