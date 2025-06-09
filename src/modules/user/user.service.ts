import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/db/prisma.service';
import { User } from '@prisma/client';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    const user = await this.prisma.user.create({
      data: createUserDto,
    });

    return this.mapToResponseDto(user);
  }

  async findAll() {
    const users = await this.prisma.user.findMany();
    return users.map((user) => this.mapToResponseDto(user));
  }

  async findOne(id: string) {
    const user = await this.prisma.user.findFirst({ where: { id } });

    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    return this.mapToResponseDto(user);
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.prisma.user.findFirst({ where: { id } });

    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    this.verifyOldPassword(user, updateUserDto.oldPassword);
    const updatedUser = await this.prisma.user.update({
      where: { id: user.id },
      data: { password: updateUserDto.newPassword, version: user.version + 1 },
    });

    return this.mapToResponseDto(updatedUser);
  }

  async remove(id: string) {
    const user = await this.prisma.user.findFirst({ where: { id } });

    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    return await this.prisma.user.delete({ where: { id } });
  }

  private mapToResponseDto(user: User) {
    return {
      id: user.id,
      login: user.login,
      version: user.version,
      createdAt: new Date(user.createdAt).getTime(),
      updatedAt: new Date(user.updatedAt).getTime(),
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
