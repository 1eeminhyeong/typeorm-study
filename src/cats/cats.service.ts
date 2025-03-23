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
    return this.catRepository.find();
  }

  async findOne(id: number) {
    return await this.catRepository.findOne({ where: { id } });
  }

  async update(id: number, updateCatDto: UpdateCatDto) {
    const cat = await this.catRepository.findOne({ where: { id } });
    if (!cat) {
      throw new Error('Cat not found!');
    }
    Object.assign(cat, updateCatDto);

    return await this.catRepository.save(cat);
  }

  async remove(id: number) {
    const cat = await this.catRepository.findOne({ where: { id } });
    if (!cat) {
      throw new Error('Cat not found!');
    }
    return await this.catRepository.remove(cat);
  }
}
