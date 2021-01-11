import { DNAService } from '../service/DNAService';
import { buildResponse, buildResponseError } from '../utils/Util';

export class DNAController {

  private readonly dnaService: DNAService = new DNAService();

  /**
   * Is simian
   * @param {*} event
   */
  async isSimian(event: any) {
    const params: any = JSON.parse(event.body);

    try {
      const result: boolean = await this.dnaService.isSimian(params.dna);
      if (result) {
        return buildResponse();
      }
      return buildResponseError();
    } catch (err) {
      console.log(err);
      return buildResponseError();
    }
  }

  /**
   * Stats
   */
  async stats() {
    try {
      const result = await this.dnaService.stats();
      return buildResponse(result[0]);
    } catch (err) {
      console.log(err);
    }
  }
}
