import { Context } from 'aws-lambda';
import { DNAService } from '../service/DNAService';
import { MessageUtil } from '../utils/Message';

export class DNAController extends DNAService {

  /**
   * Is simian
   * @param {*} event
   * @param context
   */
  async isSimian(event: any, context?: Context) {
    const params: any = JSON.parse(event.body);

    try {
      const result = await this.isSimians({
        name: params.name,
        id: params.id,
      });
      return MessageUtil.success(result);
    } catch (err) {
      console.log(err);
      return MessageUtil.error(err.code, err.message);
    }
  }

  /**
   * Stats
   */
  async stats() {
    try {
      const result = await this.statss();
      return JSON.stringify(result);
    } catch (err) {
      console.log(err);
      return MessageUtil.error(err.code, err.message);
    }
  }
}
