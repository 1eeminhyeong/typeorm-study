import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CatsModule } from './cats/cats.module';
import { MysqlConfigService } from './app/mysql.service';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({ useClass: MysqlConfigService }),
    CatsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
