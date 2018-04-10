import axios from 'axios';
import HelloMNG from '../domain/helloMNG';
import env from './../../../../../config';

const parseHelloMNG = data => new HelloMNG(data);

class HelloMNGService {
  static get HELLO_MNG_PATH() { return '/web/helloMNG/helloMNG.json'; }

  static get HELLO_MNG_URL() { return env.HELLO_MNG_URL; }

  static getUrl() {
    return HelloMNGService.HELLO_MNG_URL + HelloMNGService.HELLO_MNG_PATH;
  }

  static async getMessage() {
    const result = await axios.get(HelloMNGService.getUrl());
    return parseHelloMNG(result.data);
  }
}

export default HelloMNGService;
