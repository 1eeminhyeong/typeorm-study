import { Injectable } from '@nestjs/common';
import { CreateCatDto } from './dto/create-cat.dto';
import { UpdateCatDto } from './dto/update-cat.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Cat } from 'src/domain/cat.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CatsService {
  constructor(@InjectRepository(Cat) private catRepository: Repository<Cat>) {}

  async create(createCatDto: CreateCatDto) {
    return await this.catRepository.save(createCatDto);
  }

  findAll() {
    return `This action returns all cats`;
  }

  findOne(id: number) {
    return `This action returns a #${id} cat`;
  }

  update(id: number, updateCatDto: UpdateCatDto) {
    return `This action updates a #${id} cat`;
  }

  remove(id: number) {
    return `This action removes a #${id} cat`;
  }
}
