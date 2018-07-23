const expect = require('chai').expect;
const pipelineSync = require('../src/syncPipeline').pipelineSync;

describe('pipelineSync', () => {
    it('exists', () => {
        expect(pipelineSync).to.be.ok;
    });
    it('parses and returns result', () => {
        expect(pipelineSync('set 1 | add 1 | mult 21')).to.equal(42);
        expect(pipelineSync('set 1 | mult 10 | mult 4 | add 2')).to.equal(42);
    });
});