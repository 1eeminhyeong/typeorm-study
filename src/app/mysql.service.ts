import { Injectable } from '@nestjs/common';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { config } from './config.service';
import { Cat } from 'src/domain/cat.entity';

@Injectable()
export class MysqlConfigService implements TypeOrmOptionsFactory {
  static checkMysqlAuthenticationInfo(
    username: unknown,
    password: unknown,
  ): void {
    if (!username || !password) {
      throw new Error('Invalid mysql username or password');
    }
  }

  createTypeOrmOptions(): TypeOrmModuleOptions {
    const username = config.mysqlUsername;
    const password = config.mysqlPassword;
    MysqlConfigService.checkMysqlAuthenticationInfo(username, password);

    return {
      type: 'mysql',
      host: config.mysqlHost,
      port: config.mysqlPort,
      username,
      password,
      database: config.mysqlDatabase,
      timezone: 'Z',
      logging: false,
      synchronize: false,
      entities: [__dirname + '/domain/*.{ts,js}'],
      migrations: [__dirname + '/migrations/**/*.{ts,js}'],
      migrationsRun: false,
      autoLoadEntities: true,
    };
  }
}
