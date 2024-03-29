import lambdaTester, { HandlerEvent } from 'lambda-tester';
import { expect } from 'chai';
import { isSimian, stats } from '../app/handler';
import * as dnaMock from './dna.mock';
import { DNAModel } from '../app/model/DNAModel';
import sinon, { SinonMock } from 'sinon';

describe('Stats [GET]', () => {
  it('success', () => {
    try {
      const sinonMock: SinonMock = sinon.mock(DNAModel);

      sinonMock.expects('stats')
        .atLeast(1)
        .resolves(dnaMock.stats);

      return lambdaTester(stats).expectResult((result: any) => {
        expect(result.statusCode).to.equal(200);
        expect(result.body).to.equal(JSON.stringify(dnaMock.stats));
        sinonMock.verify();
        sinonMock.restore();
      });
    } catch (err) {
      console.log(err);
    }
  });
});

describe('Is simian [POST]', () => {
  describe('success', () => {
    it('DNA chain with repeated elements in horizontal', () => {
      function handlerEvent(): HandlerEvent<any> {
        return {
          body: JSON.stringify({
            dna: ['ATGCGA', 'CAGTGC', 'TTATGT', 'AGATTG', 'GCCCCA', 'TCACTG'],
          }),
        };
      }

      return successTest(handlerEvent);
    });

    it('DNA chain with repeated elements in diagonal', () => {
      function handlerEvent(): HandlerEvent<any> {
        return {
          body: JSON.stringify({
            dna: ['ATGCGA', 'CAGCGC', 'TTATGT', 'AGTCTG', 'GTCGCA', 'TCACTG'],
          }),
        };
      }

      return successTest(handlerEvent);
    });

    it('DNA chain with repeated elements in vertical', () => {
      function handlerEvent(): HandlerEvent<any> {
        return {
          body: JSON.stringify({
            dna: ['ATGCGA', 'CAGCGA', 'TTAAGA', 'AGTCTA', 'GTCGCA', 'TCACTG'],
          }),
        };
      }

      return successTest(handlerEvent);
    });

    it('DNA chain already exists', () => {
      function handlerEvent(): HandlerEvent<any> {
        return {
          body: JSON.stringify({
            dna: ['ATGCGA', 'CAGTGC', 'TTATGT', 'AGAATG', 'GCCCTA', 'TCACTG'],
          }),
        };
      }

      return successTest(handlerEvent, true);
    });
  });

  describe('Error', () => {
    it('Body empty', () => {
      function handlerEvent(): HandlerEvent<any> {
        return {
          body: '{}',
        };
      }

      return errorTest(handlerEvent);
    });

    it('DNA undefined', () => {
      function handlerEvent(): HandlerEvent<any> {
        return {
          body: JSON.stringify({
            dna: undefined,
          }),
        };
      }

      return errorTest(handlerEvent);
    });

    it('DNA without one chain', () => {
      function handlerEvent(): HandlerEvent<any> {
        return {
          body: JSON.stringify({
            dna: ['GTGCGA', 'CAGTGC', 'TTATGT', 'AGAATG', 'GCCCTA'],
          }),
        };
      }

      return errorTest(handlerEvent);
    });

    it('DNA with one more chain', () => {
      function handlerEvent(): HandlerEvent<any> {
        return {
          body: JSON.stringify({
            dna: ['GTGCGA', 'CAGTGC', 'TTATGT', 'AGAATG', 'GCCCTA', 'TCACTG', 'TCACTG'],
          }),
        };
      }

      return errorTest(handlerEvent);
    });

    it('DNA chain without one element', () => {
      function handlerEvent(): HandlerEvent<any> {
        return {
          body: JSON.stringify({
            dna: ['GTGCGA', 'CAGTGC', 'TTATGT', 'AGAATG', 'GCCCTA', 'TCACT'],
          }),
        };
      }

      return errorTest(handlerEvent);
    });

    it('DNA chain with one more element', () => {
      function handlerEvent(): HandlerEvent<any> {
        return {
          body: JSON.stringify({
            dna: ['GTGCGA', 'CAGTGC', 'TTATGT', 'AGAATG', 'GCCCTA', 'TCACTGG'],
          }),
        };
      }

      return errorTest(handlerEvent);
    });

    it('DNA chain with invalid element', () => {
      function handlerEvent(): HandlerEvent<any> {
        return {
          body: JSON.stringify({
            dna: ['ATGCGA', 'CAGTGC', 'TTATGT', 'AGAATG', 'GCCCTA', 'TCACTX'],
          }),
        };
      }

      return errorTest(handlerEvent);
    });

    it('Human DNA', () => {
      function handlerEvent(): HandlerEvent<any> {
        return {
          body: JSON.stringify({
            dna: ['GTGCGA', 'CAGTGC', 'TTATGT', 'AGAATG', 'GCCCTA', 'TCACTG'],
          }),
        };
      }

      return errorTest(handlerEvent, true);
    });
  });
});

function successTest(handlerEvent: () => lambdaTester.HandlerEvent<any>, alreadyExists?: boolean) {
  const sinonMock: SinonMock = sinon.mock(DNAModel);
  if (alreadyExists) {
    sinonMock.expects('existsWithSameChain').resolves(dnaMock.existsWithSameChain);
  } else {
    sinonMock.expects('createDNA').resolves(dnaMock.createDNA);
    sinonMock.expects('existsWithSameChain').resolves(dnaMock.notExistsWithSameChain);
  }
  return lambdaTester(isSimian)
    .event(handlerEvent)
    .expectResult((result: any) => {
      expect(result.statusCode).to.equal(200);
      sinonMock.verify();
      sinonMock.restore();
    });
}

function errorTest(handlerEvent: () => lambdaTester.HandlerEvent<any>, isHuman = false) {
  const sinonMock: SinonMock = sinon.mock(DNAModel);
  if (isHuman) {
    sinonMock.expects('createDNA').resolves(dnaMock.createDNA);
    sinonMock.expects('existsWithSameChain').resolves(dnaMock.notExistsWithSameChain);
  }
  return lambdaTester(isSimian)
    .event(handlerEvent)
    .expectResult((result: any) => {
      expect(result.statusCode).to.equal(403);
      sinonMock.verify();
      sinonMock.restore();
    });
}
