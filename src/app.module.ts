import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LogSchema } from './log.schema';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/weather-db'),
    MongooseModule.forFeature([{ name: 'Logs', schema: LogSchema }]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
