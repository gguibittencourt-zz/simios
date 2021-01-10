import { Context } from 'aws-lambda';
import { DNAService } from '../service/DNAService';
import { bodyToString } from '../utils/Util';

export class DNAController {

  private readonly dnaService: DNAService = new DNAService();

  /**
   * Is simian
   * @param {*} event
   * @param context
   */
  async isSimian(event: any, context?: Context) {
    const params: any = JSON.parse(event.body);

    try {
      const result = await this.dnaService.isSimian({
        chain: params.dna,
      });
      return bodyToString(result);
    } catch (err) {
      console.log(err);
    }
  }

  /**
   * Stats
   */
  async stats() {
    try {
      const result = await this.dnaService.stats();
      return bodyToString(result);
    } catch (err) {
      console.log(err);
    }
  }
}
