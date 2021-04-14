import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { API_KEY, CITY } from './app.constant';
const axios = require('axios');

@Injectable()
export class AppService {

  constructor(@InjectModel('Logs') private readonly logModel: Model<any>) {}
  async getWeatherData(): Promise<any> {
    try {
      let options = {
        "method" : "GET",
        "url" : `https://api.openweathermap.org/data/2.5/forecast?q=${CITY}&appid=${API_KEY}&units=metric`
      }
      const response = await axios(options);
      if(response.data && response.data.list) {
        const result = await this.groupByKey(response.data.list, 'dt_txt');
        await this.logModel.create({
          city: response.data.city.name,
          data: result
        })
        return {city : response.data.city, list : result};
      }
    } catch (err) {
      throw new HttpException({message: 'Something went wrong', _errors:err}, HttpStatus.INTERNAL_SERVER_ERROR); 
    }
  }

  async groupByKey(array, key) {
    return array
      .reduce((hash, obj) => {
        if(obj[key].split(' ')[0] === undefined) return hash; 
        return Object.assign(hash, { [obj[key].split(' ')[0]]:( hash[obj[key].split(' ')[0]] || [] ).concat(obj)})
      }, {})
  }
}
