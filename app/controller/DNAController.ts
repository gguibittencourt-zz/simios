import { DNAService } from '../service/DNAService';
import { buildResponse, buildResponseError } from '../utils/Util';

export class DNAController {

  /**
   * Verify if a DNA belongs to a human or simian
   * @param event
   * @return statusCode 200 if is simian or 403 if is human or has error
   */
  async isSimian(event: any): Promise<any> {
    const body: any = JSON.parse(event.body);
    if (!body) {
      return buildResponseError();
    }
    try {
      const result: boolean = await DNAService.isSimian(body.dna);
      if (result) {
        return buildResponse();
      }
      return buildResponseError();
    } catch (err) {
      return buildResponseError();
    }
  }

  /**
   * Returns DNA verification statistics
   */
  async stats(): Promise<any> {
    const result = await DNAService.stats();
    return buildResponse(result);
  }
}
