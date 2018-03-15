import axios from 'axios';
import HelloMNG from '../domain/helloMNG';

const URL = process.env.HELLO_MNG_URL;

const parseHelloMNG = data => new HelloMNG(data);

class HelloMNGService {
  static async getMessage() {
    const result = await axios.get(URL);
    return parseHelloMNG(result.data);
  }
}

export default HelloMNGService;
